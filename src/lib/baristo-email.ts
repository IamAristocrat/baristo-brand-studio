export type BuyerRoast = "Noble Dark" | "Truly Dark";

export const BARISTO_SUPPORT_EMAIL = "support@baristo.online";
export const BARISTO_PACK = "12 oz / 340 g";
export const BARISTO_UNIT_PRICE = 2579;

type RoastEmailProfile = {
  name: BuyerRoast;
  classification: string;
  expression: string;
  color: string;
  agtron: string;
  massLoss: string;
  surface: string;
  body: string;
  acidity: string;
  bitterness: string;
  aromatics: string;
  bestFor: string;
  route: string;
  journal: string;
};

export const roastEmailProfiles: Record<BuyerRoast, RoastEmailProfile> = {
  "Noble Dark": {
    name: "Noble Dark",
    classification: "Medium-Dark Roast",
    expression: "Structure without harshness",
    color: "Deep chestnut to dark brown",
    agtron: "Indicative Agtron-style ground-coffee orientation: approximately 45–55",
    massLoss: "Indicative roasted mass-loss target: approximately 14–17%",
    surface: "Predominantly dry to lightly satin when fresh",
    body: "Medium-full",
    acidity: "Rounded and moderated",
    bitterness: "Controlled and integrated",
    aromatics: "Cacao warmth, toasted almond, warm caramel, roasted nut and gentle spice",
    bestFor: "Espresso, moka pot, South Indian filter, AeroPress and French press",
    route: "https://baristo.online/roasts/dark",
    journal: "https://baristo.online/journal/noble-dark-indian-arabica-espresso-minded-ritual",
  },
  "Truly Dark": {
    name: "Truly Dark",
    classification: "Intense Dark Roast",
    expression: "Intensity without vulgar bitterness",
    color: "Dark brown to near-ebony brown",
    agtron: "Indicative Agtron-style ground-coffee orientation: approximately 25–40",
    massLoss: "Indicative roasted mass-loss target: approximately 17–20%",
    surface: "Dark, low-reflectance surface; low-to-moderate oil expression may emerge with ageing",
    body: "Full to dense",
    acidity: "Low and subdued",
    bitterness: "Assertive but structured",
    aromatics: "Dark cacao, toasted walnut, smoked caramel, charred-sugar nuance and deep roast aromatics",
    bestFor: "Espresso, moka pot, South Indian filter, French press and milk-based coffee",
    route: "https://baristo.online/roasts/truly-dark",
    journal: "https://baristo.online/journal/truly-dark-intense-dark-roast-indian-arabica",
  },
};

export function emailEscape(value: string) {
  return value.replace(/[&<>'"]/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] || char,
  );
}

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function button(label: string, href: string, secondary = false) {
  return `<a href="${href}" style="display:inline-block;margin:8px 8px 0 0;padding:13px 18px;border-radius:4px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;${
    secondary
      ? "background:#fff8f1;color:#4a2d23;border:1px solid #b77054;"
      : "background:#b77054;color:#fffaf1;border:1px solid #9c5d45;"
  }">${label}</a>`;
}

function roastCard(profile: RoastEmailProfile) {
  return `
    <div style="margin:22px 0;padding:22px;border:1px solid #e3c4b6;border-radius:12px;background:#fffaf5;">
      <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#a75438;">${profile.classification}</div>
      <h3 style="margin:7px 0 3px;font-family:Georgia,serif;font-size:27px;line-height:1.1;color:#3b2119;">${profile.name}</h3>
      <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#a75438;">${profile.expression}</div>
      <p style="margin:16px 0 8px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#5b3a2f;"><strong>Sensory direction:</strong> ${profile.aromatics}.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;line-height:1.55;color:#4a2d23;">
        <tr><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;width:34%;"><strong>Roast colour</strong></td><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;">${profile.color}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;"><strong>Roast colour target</strong></td><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;">${profile.agtron}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;"><strong>Mass-loss target</strong></td><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;">${profile.massLoss}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;"><strong>Surface</strong></td><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;">${profile.surface}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;"><strong>Body</strong></td><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;">${profile.body}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;"><strong>Acidity</strong></td><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;">${profile.acidity}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;"><strong>Bitterness</strong></td><td style="padding:7px 0;border-bottom:1px solid #ecd8ce;">${profile.bitterness}</td></tr>
        <tr><td style="padding:7px 0;"><strong>Best suited for</strong></td><td style="padding:7px 0;">${profile.bestFor}</td></tr>
      </table>
      <p style="margin:15px 0 0;font-family:Arial,sans-serif;font-size:11px;line-height:1.55;color:#80665c;">The roast-colour and mass-loss values are target orientations used for production control; they are not universal statutory definitions and require calibration to the production roast system.</p>
      <div style="margin-top:12px;">${button("View this roast", profile.route)}${button("Read the detailed guide", profile.journal, true)}</div>
    </div>`;
}

function comparisonTable() {
  const noble = roastEmailProfiles["Noble Dark"];
  const truly = roastEmailProfiles["Truly Dark"];
  return `
    <h3 style="margin:24px 0 10px;font-family:Georgia,serif;font-size:24px;color:#3b2119;">Choose by the cup you want</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;line-height:1.55;color:#4a2d23;">
      <tr>
        <td style="padding:10px;border:1px solid #e3c4b6;background:#f7e8df;"><strong>Decision</strong></td>
        <td style="padding:10px;border:1px solid #e3c4b6;background:#f7e8df;"><strong>Noble Dark</strong></td>
        <td style="padding:10px;border:1px solid #e3c4b6;background:#201b18;color:#fffaf1;"><strong>Truly Dark</strong></td>
      </tr>
      <tr><td style="padding:10px;border:1px solid #ead8cf;">Roast</td><td style="padding:10px;border:1px solid #ead8cf;">${noble.classification}</td><td style="padding:10px;border:1px solid #ead8cf;">${truly.classification}</td></tr>
      <tr><td style="padding:10px;border:1px solid #ead8cf;">Body</td><td style="padding:10px;border:1px solid #ead8cf;">${noble.body}</td><td style="padding:10px;border:1px solid #ead8cf;">${truly.body}</td></tr>
      <tr><td style="padding:10px;border:1px solid #ead8cf;">Acidity</td><td style="padding:10px;border:1px solid #ead8cf;">${noble.acidity}</td><td style="padding:10px;border:1px solid #ead8cf;">${truly.acidity}</td></tr>
      <tr><td style="padding:10px;border:1px solid #ead8cf;">Character</td><td style="padding:10px;border:1px solid #ead8cf;">Composed, cacao-caramel, polished</td><td style="padding:10px;border:1px solid #ead8cf;">Dense, dark-cacao, smoke-kissed</td></tr>
      <tr><td style="padding:10px;border:1px solid #ead8cf;">Choose it when</td><td style="padding:10px;border:1px solid #ead8cf;">You want a refined daily dark roast with structure and balance.</td><td style="padding:10px;border:1px solid #ead8cf;">You want deeper roast intensity, lower brightness and stronger persistence.</td></tr>
    </table>`;
}

function emailShell(title: string, preheader: string, body: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3ece5;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ece5;padding:24px 10px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#fffaf5;border:1px solid #e4c9bc;border-radius:14px;overflow:hidden;">
          <tr><td style="padding:28px 34px;background:#11100e;color:#fffaf1;">
            <div style="font-family:Georgia,serif;font-size:28px;font-weight:700;">Baristo.Online</div>
            <div style="margin-top:5px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#d99a7e;">Experience Your Nobility.</div>
          </td></tr>
          <tr><td style="padding:32px 34px;">
            <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#a75438;">Private buyer communication</div>
            <h1 style="margin:9px 0 18px;font-family:Georgia,serif;font-size:34px;line-height:1.08;color:#3b2119;">${title}</h1>
            ${body}
          </td></tr>
          <tr><td style="padding:24px 34px;background:#f6e9e0;border-top:1px solid #e4c9bc;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;line-height:1.65;color:#5b3a2f;">Questions can continue simply by replying to this email. Your reply reaches <a href="mailto:${BARISTO_SUPPORT_EMAIL}" style="color:#8f472f;font-weight:700;">${BARISTO_SUPPORT_EMAIL}</a>.</p>
            <p style="margin:12px 0 0;font-family:Georgia,serif;font-size:18px;color:#3b2119;">For Expresso Noble Minds.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function reservationCustomerEmail(input: {
  name: string;
  id: string;
  roast: BuyerRoast;
  pack: string;
  quantity: number;
  total: number;
}) {
  const profile = roastEmailProfiles[input.roast];
  const name = emailEscape(input.name);
  const id = emailEscape(input.id);
  const pack = emailEscape(input.pack);
  const total = formatInr(input.total);
  const body = `
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#5b3a2f;">Dear ${name},</p>
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#5b3a2f;">Your reservation has reached <strong>${BARISTO_SUPPORT_EMAIL}</strong>. We will verify On-Demand Batch availability, your delivery location and the final payable amount before a secure payment link is issued.</p>
    <div style="margin:20px 0;padding:18px;border-radius:10px;background:#11100e;color:#fffaf1;">
      <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.17em;text-transform:uppercase;color:#d99a7e;">Reservation ${id}</div>
      <div style="margin-top:8px;font-family:Georgia,serif;font-size:24px;">${profile.name} · ${pack}</div>
      <div style="margin-top:7px;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#eee4d9;">Quantity: ${input.quantity}<br>Provisional merchandise total: <strong style="color:#fffaf1;">${total}</strong></div>
    </div>
    <h2 style="margin:26px 0 8px;font-family:Georgia,serif;font-size:27px;color:#3b2119;">What happens next</h2>
    <ol style="margin:0 0 18px;padding-left:22px;font-family:Arial,sans-serif;font-size:14px;line-height:1.8;color:#5b3a2f;">
      <li>Baristo verifies availability and delivery eligibility.</li>
      <li>We confirm the final payable amount.</li>
      <li>A secure payment link is sent only after verification.</li>
      <li>Dispatch begins after payment confirmation and On-Demand Batch preparation.</li>
    </ol>
    ${roastCard(profile)}
    <h3 style="margin:24px 0 8px;font-family:Georgia,serif;font-size:24px;color:#3b2119;">Current presentation</h3>
    <p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:#5b3a2f;">The imagery on this site represents the Baristo packaging design language. Current release batches are packed in premium pouches and finished with signature Baristo labels. Product quality, roast integrity, and brand specifications remain unchanged.</p>
    <div style="margin-top:22px;">${button("Explore Roast Architecture", "https://baristo.online/#roast-architecture")}${button("Visit the Journal", "https://baristo.online/journal", true)}</div>
  `;

  const text = [
    `Dear ${input.name},`,
    "",
    `Your Baristo reservation has reached ${BARISTO_SUPPORT_EMAIL}.`,
    `Reference: ${input.id}`,
    `Product: ${input.roast}`,
    `Pack: ${input.pack}`,
    `Quantity: ${input.quantity}`,
    `Provisional merchandise total: ${total}`,
    "",
    "What happens next:",
    "1. We verify On-Demand Batch availability and delivery eligibility.",
    "2. We confirm the final payable amount.",
    "3. We send a secure payment link only after verification.",
    "4. Dispatch begins after payment confirmation.",
    "",
    `${profile.name} — ${profile.classification}`,
    `Expression: ${profile.expression}`,
    `Sensory direction: ${profile.aromatics}`,
    `Roast colour: ${profile.color}`,
    profile.agtron,
    profile.massLoss,
    `Surface: ${profile.surface}`,
    `Body: ${profile.body}`,
    `Acidity: ${profile.acidity}`,
    `Bitterness: ${profile.bitterness}`,
    `Best suited for: ${profile.bestFor}`,
    "",
    "These roast-colour and mass-loss values are target orientations, not universal statutory definitions.",
    "",
    "Packaging: The imagery on this site represents the Baristo packaging design language. Current release batches are packed in premium pouches and finished with signature Baristo labels. Product quality, roast integrity, and brand specifications remain unchanged.",
    "",
    `Questions? Reply to this email or write to ${BARISTO_SUPPORT_EMAIL}.`,
    "",
    "Baristo.Online",
    "For Expresso Noble Minds.",
  ].join("\n");

  return {
    subject: `Welcome to Baristo — your ${input.roast} roast brief — ${input.id}`,
    text,
    html: emailShell(`Your ${input.roast} reservation is with us.`, `Reservation ${input.id} received by Baristo.Online.`, body),
  };
}

export function inquiryCustomerEmail(input: {
  name: string;
  id: string;
  preferredRoast: string;
  topic: string;
  question: string;
}) {
  const normalized = input.preferredRoast === "Noble Dark" || input.preferredRoast === "Truly Dark"
    ? (input.preferredRoast as BuyerRoast)
    : null;
  const selected = normalized ? `${comparisonTable()}${roastCard(roastEmailProfiles[normalized])}` : `${comparisonTable()}${roastCard(roastEmailProfiles["Noble Dark"])}${roastCard(roastEmailProfiles["Truly Dark"])}`;
  const name = emailEscape(input.name);
  const id = emailEscape(input.id);
  const topic = emailEscape(input.topic);
  const question = emailEscape(input.question);
  const body = `
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#5b3a2f;">Dear ${name},</p>
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#5b3a2f;">Your question has reached <strong>${BARISTO_SUPPORT_EMAIL}</strong>. A Baristo reply can continue on this email thread. Meanwhile, this buyer brief gives you the core product, roast and reservation information immediately.</p>
    <div style="margin:20px 0;padding:18px;border-radius:10px;background:#f6e9e0;border:1px solid #e3c4b6;">
      <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.17em;text-transform:uppercase;color:#a75438;">Inquiry ${id} · ${topic}</div>
      <p style="margin:10px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#4a2d23;"><strong>Your question:</strong> ${question}</p>
    </div>
    <h2 style="margin:26px 0 8px;font-family:Georgia,serif;font-size:27px;color:#3b2119;">The Baristo offer</h2>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.75;color:#5b3a2f;"><strong>Two roasts. One size. One price.</strong><br>Noble Dark and Truly Dark are both premium ground roasted Indian Arabica, offered in a 12 oz / 340 g pack at <strong>${formatInr(BARISTO_UNIT_PRICE)}</strong> each.</p>
    ${selected}
    <h3 style="margin:24px 0 8px;font-family:Georgia,serif;font-size:24px;color:#3b2119;">How reservation works</h3>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.75;color:#5b3a2f;">Reservation records purchase intent. Baristo verifies availability, delivery eligibility and the final payable amount before sending a secure payment link. Dispatch begins only after payment confirmation and On-Demand Batch preparation.</p>
    <h3 style="margin:24px 0 8px;font-family:Georgia,serif;font-size:24px;color:#3b2119;">Packaging transparency</h3>
    <p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:#5b3a2f;">The imagery on this site represents the Baristo packaging design language. Current release batches are packed in premium pouches and finished with signature Baristo labels. Product quality, roast integrity, and brand specifications remain unchanged.</p>
    <div style="margin-top:22px;">${button("Choose & Reserve", "https://baristo.online/#roasts")}${button("Read the Journal", "https://baristo.online/journal", true)}</div>
  `;

  const roastText = normalized
    ? [
        `${normalized} — ${roastEmailProfiles[normalized].classification}`,
        `Expression: ${roastEmailProfiles[normalized].expression}`,
        `Sensory direction: ${roastEmailProfiles[normalized].aromatics}`,
        roastEmailProfiles[normalized].agtron,
        roastEmailProfiles[normalized].massLoss,
        `Body: ${roastEmailProfiles[normalized].body}`,
        `Acidity: ${roastEmailProfiles[normalized].acidity}`,
        `Bitterness: ${roastEmailProfiles[normalized].bitterness}`,
        `Best suited for: ${roastEmailProfiles[normalized].bestFor}`,
      ]
    : [
        "Noble Dark — Medium-Dark — composed, medium-full, rounded acidity, controlled bitterness; cacao, toasted almond and warm caramel.",
        "Truly Dark — Intense Dark — full-dense, low acidity, assertive structured bitterness; dark cacao, toasted walnut and smoked caramel.",
      ];

  return {
    subject: `Baristo Private Buyer Brief — your question has reached us — ${input.id}`,
    text: [
      `Dear ${input.name},`,
      "",
      `Your question has reached ${BARISTO_SUPPORT_EMAIL}.`,
      `Reference: ${input.id}`,
      `Topic: ${input.topic}`,
      `Question: ${input.question}`,
      "",
      "Two roasts. One size. One price.",
      `Noble Dark and Truly Dark are both 12 oz / 340 g at ${formatInr(BARISTO_UNIT_PRICE)} each.`,
      "",
      ...roastText,
      "",
      "Reservation: we verify availability, delivery eligibility and the final payable amount before sending a secure payment link. Dispatch begins after payment confirmation.",
      "",
      "Packaging: The imagery on this site represents the Baristo packaging design language. Current release batches are packed in premium pouches and finished with signature Baristo labels. Product quality, roast integrity, and brand specifications remain unchanged.",
      "",
      `Reply to this email or write to ${BARISTO_SUPPORT_EMAIL} for a human response.`,
      "",
      "Baristo.Online",
      "For Expresso Noble Minds.",
    ].join("\n"),
    html: emailShell("Your Baristo buyer brief.", `Inquiry ${input.id} has reached Baristo.Online.`, body),
  };
}
