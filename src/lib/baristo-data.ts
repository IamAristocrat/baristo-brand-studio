export type RoastKey = "medium" | "medium-dark" | "truly-dark";

export interface Roast {
  key: RoastKey;
  name: string;
  tagline: string;
  notes: string[];
  description: string;
  recipeBase: string;
  sizes: { label: string; sub: string }[];
  intensity: number; // 1–5
  cta: string;
}

export const roasts: Roast[] = [
  {
    key: "medium",
    name: "Medium Roast",
    tagline: "Clean. Elegant. Aromatic.",
    notes: ["Honeyed Almond", "Soft Cacao", "Gentle Citrus", "Refined Finish"],
    description:
      "A clean, elegant, aromatic cup — honeyed almond and soft cacao lifted by gentle citrus, closing on a refined finish.",
    recipeBase: "Baristo Classic · Sage · Zen · Harmony · Glow",
    sizes: [
      { label: "250 g", sub: "8.8 oz" },
      { label: "500 g", sub: "17.6 oz" },
    ],
    intensity: 2,
    cta: "Shop Medium Roast",
  },
  {
    key: "medium-dark",
    name: "Medium-Dark Roast",
    tagline: "Deeper Body. Espresso-Minded Structure.",
    notes: ["Cacao", "Toasted Almond", "Warm Caramel", "Long Noble Finish"],
    description:
      "Deeper body and cocoa warmth with espresso-minded structure — cacao, toasted almond, and warm caramel into a long, noble finish.",
    recipeBase: "Classic espresso-style · Sigma · Burst · Milk-based rituals",
    sizes: [
      { label: "250 g", sub: "8.8 oz" },
      { label: "500 g", sub: "17.6 oz" },
    ],
    intensity: 4,
    cta: "Shop Medium-Dark",
  },
  {
    key: "truly-dark",
    name: "Truly Dark Roast",
    tagline: "Bold. Intense. Roasted Depth.",
    notes: ["Dark Cacao", "Toasted Walnut", "Smoked Caramel", "Bold Finish"],
    description:
      "Bold, intense, roasted depth — dark cacao and toasted walnut wrapped in smoked caramel, ending on a bold finish.",
    recipeBase: "Alpha · Rage · Cage · Charge · Phoenix",
    sizes: [
      { label: "250 g", sub: "8.8 oz" },
      { label: "500 g", sub: "17.6 oz" },
    ],
    intensity: 5,
    cta: "Shop Truly Dark",
  },
];

export type RecipeRoast = "Medium" | "Medium-Dark" | "Truly Dark";

export interface Recipe {
  name: string;
  roasts: RecipeRoast[];
  theme: string;
  ingredients: string[];
  moment: string;
  copy: string;
}

export const recipes: Recipe[] = [
  {
    name: "Baristo Classic",
    roasts: ["Medium", "Medium-Dark"],
    theme: "Sovereign daily cup",
    ingredients: ["Freshly ground Baristo", "Hot water or steamed milk"],
    moment: "The first noble cup of the day",
    copy: "The unadorned expression of Indian altitude Arabica — a sovereign daily cup, poured without compromise.",
  },
  {
    name: "Sage",
    roasts: ["Medium"],
    theme: "Composed clarity",
    ingredients: ["Almond / cashew butter", "Olive / MCT oil", "Date / honey", "Cinnamon"],
    moment: "Deep-work mornings",
    copy: "A composed, buttery ritual for minds that think in long arcs — clarity, blended slowly.",
  },
  {
    name: "Zen",
    roasts: ["Medium"],
    theme: "Soft evening nobility",
    ingredients: ["Almond / oat milk", "Chamomile", "Lavender honey", "Cardamom"],
    moment: "The quiet hour before dusk",
    copy: "Nobility in its softest register — florals, cardamom, and a cup that lowers the volume of the day.",
  },
  {
    name: "Harmony",
    roasts: ["Medium"],
    theme: "Balanced body & green luxury",
    ingredients: ["Avocado", "Walnut / almond butter", "Almond milk", "Spirulina / moringa"],
    moment: "Mindful mid-mornings",
    copy: "Green luxury meets roasted elegance — a balanced-body blend for refined, intentional living.",
  },
  {
    name: "Glow",
    roasts: ["Medium"],
    theme: "Beauty-coded elegance",
    ingredients: ["Coconut / almond milk", "Turmeric", "Black pepper", "Honey"],
    moment: "Golden-hour afternoons",
    copy: "Turmeric gold folded into altitude Arabica — elegance you can pour into a cup.",
  },
  {
    name: "Alpha",
    roasts: ["Truly Dark"],
    theme: "Command ritual",
    ingredients: ["Protein powder", "Chia", "Flaxseed", "Sea salt"],
    moment: "Before decisive days",
    copy: "The command ritual — dark intensity fortified for those who set the agenda.",
  },
  {
    name: "Rage",
    roasts: ["Truly Dark"],
    theme: "Fire & momentum",
    ingredients: ["Dark chocolate", "Cayenne", "Cinnamon", "Maple / jaggery"],
    moment: "When momentum matters",
    copy: "Cacao fire with a cayenne edge — momentum, engineered in a cup.",
  },
  {
    name: "Cage",
    roasts: ["Truly Dark"],
    theme: "Contained focus",
    ingredients: ["Matcha", "Mint", "Almond milk / hot water", "Honey (optional)"],
    moment: "Long focus blocks",
    copy: "Dark roast held inside matcha green — contained, cooled, and pointed at one thing.",
  },
  {
    name: "Sigma",
    roasts: ["Medium-Dark"],
    theme: "Private luxury",
    ingredients: ["Maca", "Vanilla", "Maple", "Steamed milk"],
    moment: "Solitary excellence hours",
    copy: "A private-luxury pour — maca, vanilla, and steamed silk for those who need no audience.",
  },
  {
    name: "Burst",
    roasts: ["Medium-Dark", "Truly Dark"],
    theme: "Cacao-driven energy ritual",
    ingredients: ["Butter / ghee", "Raw cacao", "Sea salt"],
    moment: "High-output afternoons",
    copy: "Raw cacao and roasted depth, whipped into a dense, energetic ritual.",
  },
  {
    name: "Charge",
    roasts: ["Truly Dark"],
    theme: "Pre-workout style ritual",
    ingredients: ["Beetroot", "Ginger", "Ghee / coconut oil", "Black salt"],
    moment: "Before training",
    copy: "Beetroot crimson meets truly dark roast — a charge ritual for physical altitude.",
  },
  {
    name: "Phoenix",
    roasts: ["Truly Dark"],
    theme: "Renewal & fire",
    ingredients: ["Maple", "Cayenne", "Cinnamon", "Orange zest", "Coconut cream (optional)"],
    moment: "New beginnings",
    copy: "Fire, citrus, and renewal — the cup you pour when you rise again.",
  },
];

export const aPlusModules = [
  {
    title: "Indian Altitude. Noble Ritual.",
    body: "For noble attitudes aspiring altitudes — single-origin Arabica sourced from the mountain altitudes of India, crafted to surpass imported international sophistication with a nobler, rarer, more intelligent expression of premium coffee.",
  },
  {
    title: "Three Roasts for Three Altitudes of Taste.",
    body: "Medium for elegance. Medium-Dark for structure. Truly Dark for espresso-minded intensity. One master roast ladder, sculpted by craftsmen for minds operating at peak-performance altitudes.",
  },
  {
    title: "Purity, Provenance & Roast — Visible in Every Pack.",
    body: "Batch-coded, QR-enabled, quality-tested. Origin, roast profile, brewing guidance, and available testing documentation — evidence, not adjectives.",
  },
  {
    title: "Designed for Espresso-Minded Homes.",
    body: "Elite cafe refinement in at-home convenience — moka pot, French press, pour-over, or espresso-style. A refined daily ritual for lifestyle royals.",
  },
  {
    title: "One Coffee. Twelve Elevated Recipes.",
    body: "A functional recipe ecosystem — from the sovereign Baristo Classic to Phoenix — turning one noble roast ladder into twelve elevated rituals.",
  },
];

export const evidencePoints = [
  { title: "100% Roasted Arabica", body: "Nothing but single-origin Indian Arabica coffee — roasted, ground, sealed." },
  { title: "No Chicory. No Fillers.", body: "No chicory, no fillers, no artificial flavor. Purity as a standing policy." },
  { title: "Batch-Coded & QR-Enabled", body: "Every batch carries QR-enabled origin, roast, brewing, and available testing documentation." },
  { title: "Compliant by Design", body: "Lifestyle and sensory language only — not intended to diagnose, treat, cure, or prevent any disease." },
];

export const listingTitles = [
  "Baristo.Online Medium Roast Coffee | 100% Single-Origin Indian Arabica | High-Altitude Ground Roasted Coffee | No Chicory, No Fillers | 250 g",
  "Baristo.Online Medium-Dark Roast Coffee | Espresso-Minded Indian Arabica | High-Altitude Ground Roasted Coffee | Quality-Tested | 250 g / 500 g",
  "Baristo.Online Truly Dark Roast Coffee | Bold Single-Origin Indian Arabica | High-Altitude Ground Roasted Coffee | No Artificial Flavor | 250 g / 500 g",
];

export const listingBullets = [
  {
    lead: "Single-Origin Indian Arabica",
    body: "Carefully sourced from mountain-altitude coffee regions for a refined origin-first cup.",
  },
  {
    lead: "Master Roast Ladder",
    body: "Choose Medium for elegance, Medium-Dark for structure, or Truly Dark for espresso-minded intensity.",
  },
  {
    lead: "Pure Ground Roasted Coffee",
    body: "No chicory, no fillers, no artificial flavor — only 100% roasted Arabica coffee.",
  },
  {
    lead: "Quality-Tested Ritual",
    body: "Batch-coded coffee with QR-enabled origin, roast, brewing, and available testing documentation.",
  },
  {
    lead: "Made for Home Cafe Luxury",
    body: "Designed for moka pot, French press, pour-over, espresso-style brew, and the Baristo recipe ecosystem.",
  },
];

export const sopChecklist = [
  "GST / PAN registration",
  "FSSAI license number on pack",
  "Barcode (GS1) allocated per SKU",
  "MRP declaration (inclusive of all taxes)",
  "Batch number printed per lot",
  "Roast date",
  "Packed date",
  "Best-before declaration",
  "QR code — origin, roast, brewing & testing docs",
  "Customer care contact details",
  "Registered legal address",
];

export const sopPackaging = [
  "Recyclable flat-bottom pouch",
  "Tear-off zipper reclosure",
  "One-way degassing valve",
  "Baristo.Online dominant on front panel",
  "LifeCodeOS & Aristoverse DeepTech in statutory / story area",
];
