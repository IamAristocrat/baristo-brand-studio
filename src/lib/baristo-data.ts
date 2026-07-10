export const brandSubtitle =
  "Single-origin premium coffee beans sourced from high altitudes and gracefully roasted for Noble minds with Elite attitudes — fueling peak performance and cognitive sharpness.";

export type RoastKey = "medium" | "medium-dark" | "truly-dark";

export interface Roast {
  key: RoastKey;
  name: string;
  tagline: string;
  notes: string[];
  description: string;
  recipeBase: string;
  sizes: { label: string; sub: string; grams: number; price: number; mrp: number }[];
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
      { label: "250 g", sub: "Everyday", grams: 250, price: 1649, mrp: 1799 },
      { label: "500 g", sub: "Reserve", grams: 500, price: 2099, mrp: 2399 },
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
      { label: "250 g", sub: "Everyday", grams: 250, price: 1699, mrp: 1899 },
      { label: "500 g", sub: "Reserve", grams: 500, price: 2199, mrp: 2549 },
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
      { label: "250 g", sub: "Everyday", grams: 250, price: 1749, mrp: 1949 },
      { label: "500 g", sub: "Reserve", grams: 500, price: 2299, mrp: 2699 },
    ],
    intensity: 5,
    cta: "Shop Truly Dark",
  },
];

export const roastRecipeName: Record<RoastKey, "Medium" | "Medium-Dark" | "Truly Dark"> = {
  medium: "Medium",
  "medium-dark": "Medium-Dark",
  "truly-dark": "Truly Dark",
};

export interface BrewMethod {
  method: string;
  grind: string;
  ratio: string;
  temp: string;
  time: string;
  note: string;
}

export interface BrewGuide {
  ritual: string;
  cupping: { attribute: string; value: string }[];
  origin: { label: string; value: string }[];
  methods: BrewMethod[];
  pairings: string[];
}

export const brewGuides: Record<RoastKey, BrewGuide> = {
  medium: {
    ritual:
      "Poured slowly into porcelain at first light — a clean, elegant cup for minds that begin the day with intention.",
    cupping: [
      { attribute: "Body", value: "Light–Medium" },
      { attribute: "Acidity", value: "Bright, citrus-forward" },
      { attribute: "Sweetness", value: "Honeyed almond" },
      { attribute: "Finish", value: "Refined, lingering" },
    ],
    origin: [
      { label: "Origin", value: "Single-origin Indian Arabica" },
      { label: "Altitude", value: "1,400–1,600 m" },
      { label: "Process", value: "Washed" },
      { label: "Roast Level", value: "Medium (City)" },
    ],
    methods: [
      { method: "Pour-Over", grind: "Medium", ratio: "1:16", temp: "94°C", time: "3:30", note: "Best canvas for citrus lift." },
      { method: "French Press", grind: "Coarse", ratio: "1:15", temp: "94°C", time: "4:00", note: "Rounder body, honeyed close." },
      { method: "Moka Pot", grind: "Fine–Medium", ratio: "1:10", temp: "Off boil", time: "4:00", note: "Elegant, cocoa-toned espresso-style." },
    ],
    pairings: ["Almond croissant", "Honey toast", "Soft cheeses"],
  },
  "medium-dark": {
    ritual:
      "The espresso-minded pour — cocoa warmth and structured depth, sculpted for the ritual between meetings.",
    cupping: [
      { attribute: "Body", value: "Medium–Full" },
      { attribute: "Acidity", value: "Soft, balanced" },
      { attribute: "Sweetness", value: "Warm caramel" },
      { attribute: "Finish", value: "Long, noble" },
    ],
    origin: [
      { label: "Origin", value: "Single-origin Indian Arabica" },
      { label: "Altitude", value: "1,400–1,600 m" },
      { label: "Process", value: "Washed / Natural blend" },
      { label: "Roast Level", value: "Medium-Dark (Full City)" },
    ],
    methods: [
      { method: "Espresso", grind: "Fine", ratio: "1:2", temp: "93°C", time: "27–30 s", note: "Signature cocoa-caramel shot." },
      { method: "Moka Pot", grind: "Fine", ratio: "1:10", temp: "Off boil", time: "4:00", note: "Dense crema, milk-ready." },
      { method: "French Press", grind: "Coarse", ratio: "1:15", temp: "94°C", time: "4:30", note: "Full-bodied, cacao-forward." },
    ],
    pairings: ["Dark chocolate 70%", "Cardamom biscuits", "Toasted brioche"],
  },
  "truly-dark": {
    ritual:
      "The command cup — bold intensity for decisive hours. Poured heavy, drunk with purpose.",
    cupping: [
      { attribute: "Body", value: "Full, syrupy" },
      { attribute: "Acidity", value: "Low, tamed" },
      { attribute: "Sweetness", value: "Smoked caramel" },
      { attribute: "Finish", value: "Bold, roasted depth" },
    ],
    origin: [
      { label: "Origin", value: "Single-origin Indian Arabica" },
      { label: "Altitude", value: "1,400–1,600 m" },
      { label: "Process", value: "Natural" },
      { label: "Roast Level", value: "Dark (Vienna)" },
    ],
    methods: [
      { method: "Espresso", grind: "Fine", ratio: "1:2", temp: "92°C", time: "26–28 s", note: "Dense, smoked-caramel intensity." },
      { method: "Moka Pot", grind: "Fine", ratio: "1:10", temp: "Off boil", time: "4:00", note: "Bold, syrupy pour." },
      { method: "Cold Brew", grind: "Coarse", ratio: "1:8", temp: "Cold", time: "16 h", note: "Chocolate-forward, smooth." },
    ],
    pairings: ["Espresso tartufo", "Salted caramel", "Aged gouda"],
  },
};


export type RecipeRoast = "Medium" | "Medium-Dark" | "Truly Dark";
export type RecipeBrewMethod = "Moka Pot" | "French Press" | "Pour-Over" | "Espresso";

export interface Recipe {
  slug: string;
  name: string;
  roasts: RecipeRoast[];
  theme: string;
  ingredients: string[];
  moment: string;
  copy: string;
  method: string;
  brewMethods: RecipeBrewMethod[];
  prepTime: string;
  servings: string;
  difficulty: "Easy" | "Considered" | "Ritual";
  steps: string[];
  tastingNotes: string[];
  pairing: string;
}

export const recipes: Recipe[] = [
  {
    slug: "baristo-classic",
    name: "Baristo Classic",
    roasts: ["Medium", "Medium-Dark"],
    theme: "Sovereign daily cup",
    ingredients: ["18 g Baristo (freshly ground)", "220 ml filtered water at 94°C", "Warmed porcelain cup"],
    moment: "The first noble cup of the day",
    copy: "The unadorned expression of Indian altitude Arabica — a sovereign daily cup, poured without compromise.",
    method: "Pour-Over",
    brewMethods: ["Pour-Over", "French Press", "Moka Pot"],
    prepTime: "4 min",
    servings: "1 cup",
    difficulty: "Easy",
    steps: [
      "Rinse a paper filter with hot water; discard the water and warm the vessel.",
      "Grind 18 g of Baristo to a medium coarseness — the texture of coarse sea salt.",
      "Bloom with 40 ml of water at 94°C for 30 seconds; stir gently once.",
      "In three pours of 60 ml each, spiral in the remaining water, keeping the bed even.",
      "Total brew time 3:30. Discard the filter, swirl, and pour into a warmed cup.",
    ],
    tastingNotes: [
      "Honeyed almond opening, gentle citrus lift",
      "Soft cacao mid-palate with clean acidity",
      "Refined, lingering finish — no astringency",
    ],
    pairing: "Almond croissant or plain honey toast",
  },
  {
    slug: "sage",
    name: "Sage",
    roasts: ["Medium"],
    theme: "Composed clarity",
    ingredients: ["1 shot Baristo Medium (double)", "1 tsp almond or cashew butter", "1 tsp olive or MCT oil", "1 pitted date or 1 tsp honey", "Pinch of Ceylon cinnamon"],
    moment: "Deep-work mornings",
    copy: "A composed, buttery ritual for minds that think in long arcs — clarity, blended slowly.",
    method: "Blender ritual",
    brewMethods: ["Espresso", "Pour-Over"],
    prepTime: "5 min",
    servings: "1 tall cup",
    difficulty: "Considered",
    steps: [
      "Pull a double espresso-style shot of Baristo Medium (or brew 60 ml of strong pour-over).",
      "Add the nut butter, oil, date, and cinnamon to a high-speed blender.",
      "Pour the hot coffee over the ingredients and blend on high for 25 seconds.",
      "Pour into a warm cup — the crema should be thick and glossy.",
      "Rest 20 seconds before the first sip; the layers settle into silk.",
    ],
    tastingNotes: [
      "Buttery-smooth body with roasted-almond warmth",
      "Date sweetness laced with cinnamon lift",
      "Composed, clarifying finish — no crash",
    ],
    pairing: "A single square of dark chocolate",
  },
  {
    slug: "zen",
    name: "Zen",
    roasts: ["Medium"],
    theme: "Soft evening nobility",
    ingredients: ["1 shot Baristo Medium", "150 ml warm almond or oat milk", "1 chamomile tea bag", "1 tsp lavender honey", "2 cardamom pods, crushed"],
    moment: "The quiet hour before dusk",
    copy: "Nobility in its softest register — florals, cardamom, and a cup that lowers the volume of the day.",
    method: "Infusion & pour",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "6 min",
    servings: "1 mug",
    difficulty: "Considered",
    steps: [
      "Warm the milk gently with crushed cardamom pods; do not boil.",
      "Steep the chamomile bag in the warm milk for 3 minutes, then remove.",
      "Stir in the lavender honey until fully dissolved.",
      "Pour a fresh shot of Baristo Medium into a mug, then float the infused milk on top.",
      "Dust with a whisper of extra cardamom before serving.",
    ],
    tastingNotes: [
      "Chamomile and lavender wrap the roast in florals",
      "Cardamom warmth softens the acidity",
      "Long, quieting finish — a coffee that whispers",
    ],
    pairing: "Rose shortbread or a warm cardamom biscuit",
  },
  {
    slug: "harmony",
    name: "Harmony",
    roasts: ["Medium"],
    theme: "Balanced body & green luxury",
    ingredients: ["1 shot Baristo Medium, cooled", "1/4 ripe avocado", "1 tsp walnut or almond butter", "180 ml almond milk", "1/2 tsp spirulina or moringa"],
    moment: "Mindful mid-mornings",
    copy: "Green luxury meets roasted elegance — a balanced-body blend for refined, intentional living.",
    method: "Cold blend",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "5 min",
    servings: "1 tall glass",
    difficulty: "Considered",
    steps: [
      "Brew and cool a shot of Baristo Medium; place in the freezer while prepping.",
      "Add avocado, nut butter, almond milk, and spirulina to a blender.",
      "Pour in the cooled coffee and blend on high for 30 seconds.",
      "Pour over one large ice cube in a tall glass.",
      "Finish with a dust of cacao or a green olive oil drizzle.",
    ],
    tastingNotes: [
      "Silken avocado body with roasted-nut depth",
      "Green, herbal high notes from spirulina",
      "Balanced, refreshing finish — cool and grounded",
    ],
    pairing: "Sourdough with olive oil and flaky salt",
  },
  {
    slug: "glow",
    name: "Glow",
    roasts: ["Medium"],
    theme: "Beauty-coded elegance",
    ingredients: ["1 shot Baristo Medium", "150 ml coconut or almond milk", "1/2 tsp fresh turmeric paste", "Pinch of black pepper", "1 tsp honey"],
    moment: "Golden-hour afternoons",
    copy: "Turmeric gold folded into altitude Arabica — elegance you can pour into a cup.",
    method: "Steamed ritual",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "5 min",
    servings: "1 cup",
    difficulty: "Considered",
    steps: [
      "Whisk turmeric, black pepper, and honey into the milk in a small saucepan.",
      "Warm gently until steaming, whisking to a soft foam — do not boil.",
      "Pull a fresh shot of Baristo Medium into a warmed cup.",
      "Pour the golden milk over the shot in a slow spiral.",
      "Finish with a fine grate of cinnamon or dried rose petals.",
    ],
    tastingNotes: [
      "Turmeric warmth folded into roasted almond",
      "Coconut sweetness with a peppery lift",
      "Glowing, honeyed close — luminous, not loud",
    ],
    pairing: "Saffron shortbread or spiced pear",
  },
  {
    slug: "alpha",
    name: "Alpha",
    roasts: ["Truly Dark"],
    theme: "Command ritual",
    ingredients: ["1 double shot Baristo Truly Dark", "1 scoop unflavored or cacao protein", "1 tsp chia seeds", "1 tsp ground flaxseed", "Pinch of sea salt", "200 ml cold water or oat milk"],
    moment: "Before decisive days",
    copy: "The command ritual — dark intensity fortified for those who set the agenda.",
    method: "Shake & pour",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "3 min",
    servings: "1 tall cup",
    difficulty: "Easy",
    steps: [
      "Pull a double shot of Baristo Truly Dark; let it cool for 60 seconds.",
      "Combine protein, chia, flax, and salt in a shaker with the water or oat milk.",
      "Shake hard for 20 seconds until fully suspended.",
      "Pour the double shot into a tall glass, then stream the protein blend in.",
      "Stir once and drink standing — this is a command ritual, not a lounge cup.",
    ],
    tastingNotes: [
      "Dense, smoked-caramel body under a cacao veil",
      "Salt sharpens the roasted depth",
      "Bold, sustaining finish — engineered momentum",
    ],
    pairing: "Two squares of 85% dark chocolate",
  },
  {
    slug: "rage",
    name: "Rage",
    roasts: ["Truly Dark"],
    theme: "Fire & momentum",
    ingredients: ["1 double shot Baristo Truly Dark", "15 g 85% dark chocolate, chopped", "Pinch of cayenne", "1/4 tsp Ceylon cinnamon", "1 tsp maple or jaggery", "120 ml oat milk"],
    moment: "When momentum matters",
    copy: "Cacao fire with a cayenne edge — momentum, engineered in a cup.",
    method: "Stovetop mocha",
    brewMethods: ["Moka Pot", "Espresso"],
    prepTime: "6 min",
    servings: "1 short mug",
    difficulty: "Considered",
    steps: [
      "Warm the oat milk with chocolate, cayenne, cinnamon, and sweetener; whisk until glossy.",
      "Do not simmer — pull off the heat as soon as the chocolate melts.",
      "Pull a double shot of Baristo Truly Dark into a heat-safe mug.",
      "Pour the chocolate-oat mixture over the shot in one steady stream.",
      "Rest for 30 seconds; the cayenne finish blooms as it cools.",
    ],
    tastingNotes: [
      "Deep cacao body with smoked-caramel edges",
      "Cinnamon warmth into a slow cayenne rise",
      "Fiery, propulsive finish — momentum in the throat",
    ],
    pairing: "Chilli-salted almonds",
  },
  {
    slug: "cage",
    name: "Cage",
    roasts: ["Truly Dark"],
    theme: "Contained focus",
    ingredients: ["1 shot Baristo Truly Dark, cooled", "1/2 tsp ceremonial matcha", "3 fresh mint leaves", "150 ml almond milk or hot water", "1 tsp honey (optional)"],
    moment: "Long focus blocks",
    copy: "Dark roast held inside matcha green — contained, cooled, and pointed at one thing.",
    method: "Cold layered",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "5 min",
    servings: "1 short glass",
    difficulty: "Considered",
    steps: [
      "Whisk matcha with 60 ml warm water into a smooth paste; cool.",
      "Muddle the mint leaves into the matcha to release oils.",
      "Fill a short glass with ice; pour in the almond milk.",
      "Layer the matcha over the milk with the back of a spoon.",
      "Slowly stream the cooled Baristo Truly Dark shot on top — three visible bands.",
    ],
    tastingNotes: [
      "Bittersweet dark roast held inside green matcha",
      "Cool mint lift threading the layers",
      "Contained, focused finish — sharp but calm",
    ],
    pairing: "Salted dark chocolate wafer",
  },
  {
    slug: "sigma",
    name: "Sigma",
    roasts: ["Medium-Dark"],
    theme: "Private luxury",
    ingredients: ["1 shot Baristo Medium-Dark", "1/2 tsp maca powder", "1/2 tsp vanilla extract", "1 tsp maple syrup", "180 ml steamed whole or oat milk"],
    moment: "Solitary excellence hours",
    copy: "A private-luxury pour — maca, vanilla, and steamed silk for those who need no audience.",
    method: "Steamed latte",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "5 min",
    servings: "1 mug",
    difficulty: "Considered",
    steps: [
      "Whisk maca, vanilla, and maple into a paste at the bottom of a warm mug.",
      "Pull a fresh shot of Baristo Medium-Dark directly over the paste and stir.",
      "Steam the milk to a fine, glossy microfoam at 60–65°C.",
      "Pour the milk from height, then close in tight to draw a single tulip.",
      "Serve immediately with no dusting — the pour is the finish.",
    ],
    tastingNotes: [
      "Caramel and cocoa lifted by vanilla",
      "Maca adds a rounded, malted body",
      "Silken, private-luxury finish",
    ],
    pairing: "A vanilla-bean canelé",
  },
  {
    slug: "burst",
    name: "Burst",
    roasts: ["Medium-Dark", "Truly Dark"],
    theme: "Cacao-driven energy ritual",
    ingredients: ["1 double shot Baristo Medium-Dark or Truly Dark", "1 tsp grass-fed butter or ghee", "1 tsp raw cacao", "Pinch of sea salt"],
    moment: "High-output afternoons",
    copy: "Raw cacao and roasted depth, whipped into a dense, energetic ritual.",
    method: "Whipped shot",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "3 min",
    servings: "1 short cup",
    difficulty: "Easy",
    steps: [
      "Pull a double shot of Baristo hot into a tall, narrow blending vessel.",
      "Add butter or ghee, raw cacao, and sea salt while the shot is still hot.",
      "Immersion-blend for 15 seconds until glossy and thick.",
      "Pour into a short, warmed cup — the crema should hold a spoon.",
      "Drink immediately; the whip loses its density within minutes.",
    ],
    tastingNotes: [
      "Dense, silken cacao body",
      "Salt sharpens the roasted depth",
      "Fast, energetic finish — a burst, not a lounge",
    ],
    pairing: "Handful of activated almonds",
  },
  {
    slug: "charge",
    name: "Charge",
    roasts: ["Truly Dark"],
    theme: "Pre-workout style ritual",
    ingredients: ["1 double shot Baristo Truly Dark, cooled", "60 ml fresh beetroot juice", "1 cm ginger, grated", "1 tsp ghee or coconut oil", "Pinch of black salt"],
    moment: "Before training",
    copy: "Beetroot crimson meets truly dark roast — a charge ritual for physical altitude.",
    method: "Shake & shoot",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "4 min",
    servings: "1 short glass",
    difficulty: "Considered",
    steps: [
      "Pull a double shot of Baristo Truly Dark and let it cool briefly.",
      "Combine beetroot juice, ginger, oil, and black salt in a shaker.",
      "Add the cooled coffee and shake hard for 20 seconds.",
      "Strain into a short glass to leave the ginger fibres behind.",
      "Drink in two draws, 10 minutes before training.",
    ],
    tastingNotes: [
      "Deep beetroot earthiness under smoked caramel",
      "Ginger heat lifts the roast",
      "Grounded, propulsive finish — physical altitude",
    ],
    pairing: "A pinch of soaked chia in water alongside",
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    roasts: ["Truly Dark"],
    theme: "Renewal & fire",
    ingredients: ["1 double shot Baristo Truly Dark", "1 tsp maple syrup", "Pinch of cayenne", "1/4 tsp Ceylon cinnamon", "Zest of 1/4 orange", "1 tbsp coconut cream (optional)"],
    moment: "New beginnings",
    copy: "Fire, citrus, and renewal — the cup you pour when you rise again.",
    method: "Aromatic pour",
    brewMethods: ["Espresso", "Moka Pot"],
    prepTime: "5 min",
    servings: "1 mug",
    difficulty: "Considered",
    steps: [
      "Warm a mug and add maple, cayenne, cinnamon, and orange zest.",
      "Pull a double shot of Baristo Truly Dark directly over the spices.",
      "Stir slowly for 20 seconds — the oils from the zest bloom into the crema.",
      "If using coconut cream, float a spoonful on the surface.",
      "Sip while the citrus and fire are still rising off the cup.",
    ],
    tastingNotes: [
      "Orange oil lifts the smoked-caramel roast",
      "Cayenne rises after the swallow",
      "Renewing, warming finish — fire without weight",
    ],
    pairing: "Candied orange peel or dark-chocolate rind",
  },
];


export const aPlusModules = [
  {
    title: "Single-Origin. High Altitudes. Noble Ritual.",
    body: "Single-origin Arabica sourced from the high altitudes of India and gracefully roasted for Noble minds with Elite attitudes — a rarer, more intelligent expression of premium coffee tuned to peak performance and cognitive sharpness.",
  },
  {
    title: "Three Roasts. One Peak Performance Ladder.",
    body: "Medium for elegance. Medium-Dark for structure. Truly Dark for espresso-minded intensity. One master roast ladder, sculpted for minds chasing cognitive sharpness and higher altitudes of thought.",
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
    body: "A functional recipe ecosystem — from the sovereign Baristo Classic to Phoenix — turning one single-origin roast ladder into twelve rituals for peak performance and cognitive sharpness.",
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
    body: "Sourced from India's high altitudes for an origin-first cup tuned to peak performance and cognitive sharpness.",
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

export interface CasePack {
  key: string;
  name: string;
  packSplit: string;
  total: string;
  mrp: string;
  price: string;
  useCase: string;
  accent: "medium" | "medium-dark" | "truly-dark" | "discovery" | "executive" | "altitude";
}

export const casePacks: CasePack[] = [
  {
    key: "medium",
    name: "Baristo Medium Roast Case",
    packSplit: "5 × 250 g Medium + 5 × 500 g Medium",
    total: "3.75 kg",
    mrp: "₹14,490",
    price: "₹10,999",
    useCase: "Daily luxury drinkers",
    accent: "medium",
  },
  {
    key: "medium-dark",
    name: "Baristo Medium-Dark Roast Case",
    packSplit: "5 × 250 g Medium-Dark + 5 × 500 g Medium-Dark",
    total: "3.75 kg",
    mrp: "₹15,990",
    price: "₹12,499",
    useCase: "Espresso-minded users",
    accent: "medium-dark",
  },
  {
    key: "truly-dark",
    name: "Baristo Truly Dark Roast Case",
    packSplit: "5 × 250 g Truly Dark + 5 × 500 g Truly Dark",
    total: "3.75 kg",
    mrp: "₹17,490",
    price: "₹13,999",
    useCase: "Bold premium users",
    accent: "truly-dark",
  },
  {
    key: "discovery",
    name: "Baristo Noble Discovery Case",
    packSplit:
      "2 × 250 g Medium + 2 × 500 g Medium + 2 × 250 g Medium-Dark + 2 × 500 g Medium-Dark + 1 × 250 g Truly Dark + 1 × 500 g Truly Dark",
    total: "3.75 kg",
    mrp: "₹15,690",
    price: "₹12,199",
    useCase: "Best mixed launch pack",
    accent: "discovery",
  },
  {
    key: "executive",
    name: "Baristo Executive Ritual Case",
    packSplit:
      "1 × 250 g Medium + 2 × 500 g Medium + 2 × 250 g Medium-Dark + 3 × 500 g Medium-Dark + 1 × 250 g Truly Dark + 1 × 500 g Truly Dark",
    total: "4 kg",
    mrp: "₹16,790",
    price: "₹13,299",
    useCase: "Founders / CEOs / offices",
    accent: "executive",
  },
  {
    key: "altitude",
    name: "Baristo Dark Altitude Case",
    packSplit:
      "1 × 250 g Medium + 1 × 500 g Medium + 1 × 250 g Medium-Dark + 2 × 500 g Medium-Dark + 2 × 250 g Truly Dark + 3 × 500 g Truly Dark",
    total: "4 kg",
    mrp: "₹17,490",
    price: "₹13,999",
    useCase: "Dark roast lovers",
    accent: "altitude",
  },
];
