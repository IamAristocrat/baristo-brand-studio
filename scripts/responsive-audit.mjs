import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseURL = process.env.AUDIT_URL || "http://127.0.0.1:3000";
const viewports = [
  { name: "iphone-se", width: 320, height: 568 },
  { name: "compact-android", width: 360, height: 800 },
  { name: "iphone-modern", width: 390, height: 844 },
  { name: "large-android", width: 412, height: 915 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "ipad-air", width: 820, height: 1180 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "large-desktop", width: 1920, height: 1080 },
];

const journalViewports = [
  { name: "journal-phone", width: 390, height: 844 },
  { name: "journal-tablet", width: 820, height: 1180 },
  { name: "journal-desktop", width: 1440, height: 900 },
];

const journalRoutes = [
  { name: "journal-index", path: "/journal", selector: "#journal-articles" },
  { name: "noble-dark-journal", path: "/journal/noble-dark-indian-arabica-espresso-minded-ritual", selector: "article" },
  { name: "truly-dark-journal", path: "/journal/truly-dark-intense-dark-roast-indian-arabica", selector: "article" },
];

await fs.mkdir("artifacts/responsive", { recursive: true });
const browser = await chromium.launch({ headless: true });
const failures = [];
const report = [];

function collectConsole(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error" && !/favicon|font/i.test(message.text())) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

async function geometry(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const widthOverflow = root.scrollWidth - window.innerWidth;
    const sections = Array.from(document.querySelectorAll("main section, [data-baristo-enhancement] section, article"));
    const badlyOverflowing = sections
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          id: element.id || element.getAttribute("data-baristo-enhancement") || element.tagName,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.left < -4 || item.right > window.innerWidth + 4);
    return { scrollWidth: root.scrollWidth, innerWidth: window.innerWidth, widthOverflow, badlyOverflowing };
  });
}

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = collectConsole(page);

  try {
    await page.goto(baseURL, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForSelector("#home", { timeout: 15_000 });
    await page.waitForSelector("#cognitive-intelligence", { timeout: 15_000 });
    await page.waitForSelector("#ritual-library", { timeout: 15_000 });
    await page.waitForSelector("#journal-preview", { timeout: 15_000 });

    const pageGeometry = await geometry(page);
    if (pageGeometry.widthOverflow > 3 || pageGeometry.badlyOverflowing.length) {
      failures.push(`${viewport.name}: horizontal overflow ${JSON.stringify(pageGeometry)}`);
    }
    if (consoleErrors.length) failures.push(`${viewport.name}: console errors: ${consoleErrors.join(" | ")}`);

    await page.screenshot({ path: `artifacts/responsive/${viewport.name}.png`, fullPage: true });

    if (viewport.name === "iphone-modern") {
      const firstPour = page.locator("a:visible").filter({ hasText: /First Pour/i }).first();
      await firstPour.click();
      await page.getByRole("heading", { name: /Join the First Pour Circle/i }).waitFor({ timeout: 5_000 });
      await page.screenshot({ path: "artifacts/responsive/iphone-modern-first-pour.png", fullPage: false });
      await page.getByRole("button", { name: /Close First Pour form/i }).click();

      const reserve = page.locator("a:visible").filter({ hasText: /Reserve Noble Dark/i }).first();
      await reserve.scrollIntoViewIfNeeded();
      await reserve.click();
      await page.getByRole("heading", { name: /Reserve Noble Dark/i }).waitFor({ timeout: 5_000 });
      await page.screenshot({ path: "artifacts/responsive/iphone-modern-reservation.png", fullPage: false });
      await page.getByRole("button", { name: /Close reservation/i }).click();
    }

    report.push({ route: "/", viewport, geometry: pageGeometry, consoleErrors });
  } catch (error) {
    failures.push(`${viewport.name}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await context.close();
  }
}

for (const route of journalRoutes) {
  for (const viewport of journalViewports) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    const consoleErrors = collectConsole(page);
    const testName = `${route.name}-${viewport.name}`;

    try {
      await page.goto(`${baseURL}${route.path}`, { waitUntil: "networkidle", timeout: 45_000 });
      await page.waitForSelector(route.selector, { timeout: 15_000 });
      const pageGeometry = await geometry(page);
      if (pageGeometry.widthOverflow > 3 || pageGeometry.badlyOverflowing.length) {
        failures.push(`${testName}: horizontal overflow ${JSON.stringify(pageGeometry)}`);
      }
      if (consoleErrors.length) failures.push(`${testName}: console errors: ${consoleErrors.join(" | ")}`);
      await page.screenshot({ path: `artifacts/responsive/${testName}.png`, fullPage: true });
      report.push({ route: route.path, viewport, geometry: pageGeometry, consoleErrors });
    } catch (error) {
      failures.push(`${testName}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await context.close();
    }
  }
}

await browser.close();
await fs.writeFile("artifacts/responsive/report.json", JSON.stringify({ baseURL, report, failures }, null, 2));

if (failures.length) {
  console.error("Responsive audit failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Responsive audit passed for ${viewports.length} homepage viewports and ${journalRoutes.length * journalViewports.length} Journal combinations.`);
