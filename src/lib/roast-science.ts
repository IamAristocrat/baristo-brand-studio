export const PACKAGING_REPRESENTATION_COPY =
  "The imagery on this site represents the Baristo packaging design language. Current release batches are packed in premium pouches and finished with signature Baristo labels. Product quality, roast integrity, and brand specifications remain unchanged.";

export const ON_DEMAND_BATCH_COPY =
  "Baristo is prepared through an On-Demand Batch model: deliberately limited production lots are aligned to confirmed demand and roast scheduling rather than continuous mass inventory. Availability and dispatch timing are confirmed before payment.";

export type RoastScienceKey = "noble-dark" | "truly-dark";

export type RoastScienceProfile = {
  key: RoastScienceKey;
  name: "Noble Dark" | "Truly Dark";
  classification: string;
  expression: string;
  intention: string;
  colorTarget: string;
  agtronOrientation: string;
  massLossTarget: string;
  developmentPosition: string;
  surfaceCharacter: string;
  body: string;
  acidity: string;
  bitterness: string;
  solubility: string;
  aromaticFamily: string;
  finish: string;
  bestFor: string[];
  brew: Array<{ method: string; grind: string; startingPoint: string }>;
  image: string;
};

export const roastScience: Record<RoastScienceKey, RoastScienceProfile> = {
  "noble-dark": {
    key: "noble-dark",
    name: "Noble Dark",
    classification: "Medium-Dark Roast",
    expression: "Structure without harshness",
    intention:
      "A balanced post-first-crack development designed to increase body, caramelised sweetness and cacao depth while retaining enough origin structure to avoid a flat or carbonised cup.",
    colorTarget:
      "Deep chestnut to dark brown; instrumentally darker than a medium roast but materially lighter than Truly Dark.",
    agtronOrientation:
      "Indicative medium-dark orientation, approximately 45–55 on an Agtron-style ground-coffee scale. Final release limits must be calibrated against the production instrument and roast system.",
    massLossTarget:
      "Indicative 14–17% roasted mass loss. Mass loss is recorded as a process-control metric, not used alone to define roast quality.",
    developmentPosition:
      "Post-first-crack development with end-point selected by color, aroma, mass loss, rate-of-rise behaviour and cupping. No universal fixed end-temperature is claimed because probe geometry and roaster design materially change temperature readings.",
    surfaceCharacter: "Predominantly dry to lightly satin at pack-out; minimal visible oil expected when fresh.",
    body: "Medium-full",
    acidity: "Rounded and moderated; low sharpness rather than zero acidity",
    bitterness: "Controlled and integrated",
    solubility: "Versatile; espresso-friendly without requiring extreme extraction",
    aromaticFamily: "Cacao warmth, toasted almond, warm caramel, roasted nut and gentle spice",
    finish: "Polished, rounded and lingering",
    bestFor: ["Espresso", "Moka pot", "South Indian filter", "AeroPress", "French press"],
    brew: [
      { method: "Espresso", grind: "Fine", startingPoint: "Begin near a 1:2 beverage ratio; tune dose, yield and time to balance sweetness, body and bitterness." },
      { method: "Moka pot", grind: "Medium-fine", startingPoint: "Use an even bed and controlled heat; remove before aggressive sputtering to protect the polished finish." },
      { method: "South Indian filter", grind: "Medium-fine", startingPoint: "Use a compact bed and adjust coffee-to-water ratio for a dense decoction without excessive bitterness." },
      { method: "French press", grind: "Coarse", startingPoint: "Start around 1:15 coffee-to-water and adjust contact time for body while limiting sediment-driven harshness." },
      { method: "AeroPress", grind: "Medium-fine", startingPoint: "Use moderate temperature and short-to-medium contact time for cacao clarity and caramel sweetness." },
    ],
    image: "/roast-science/noble-dark-architecture.svg",
  },
  "truly-dark": {
    key: "truly-dark",
    name: "Truly Dark",
    classification: "Intense Dark Roast",
    expression: "Intensity without vulgar bitterness",
    intention:
      "A deeper roast-development architecture designed to lower perceived brightness, increase solubility and body, and build dark-cacao, toasted and smoke-kissed aromatic families without using burnt character as the quality target.",
    colorTarget:
      "Dark brown to near-ebony brown; materially lower reflectance than Noble Dark, verified by calibrated roast-color measurement where available.",
    agtronOrientation:
      "Indicative dark orientation, approximately 25–40 on an Agtron-style ground-coffee scale. Final commercial limits must be calibrated on the production instrument rather than copied across machines.",
    massLossTarget:
      "Indicative 17–20% roasted mass loss. The value is a process benchmark; sensory approval and color measurement remain necessary because time, heat transfer and green-bean properties interact.",
    developmentPosition:
      "Deeper post-first-crack development. Proximity to second crack may occur depending on roaster and lot, but second crack is not treated as a universal specification by itself.",
    surfaceCharacter: "Dark, low-reflectance surface; low-to-moderate oil expression may emerge with roast intensity and post-roast ageing.",
    body: "Full to dense",
    acidity: "Low and subdued",
    bitterness: "Assertive but managed; roast-derived bitterness should remain structured rather than ashy",
    solubility: "High extraction friendliness; particularly suitable to concentrated methods and milk pairing",
    aromaticFamily: "Dark cacao, toasted walnut, smoked caramel, charred-sugar nuance and deep roast aromatics",
    finish: "Long, bold, concentrated and commanding",
    bestFor: ["Espresso", "Moka pot", "South Indian filter", "French press", "Milk-based coffee"],
    brew: [
      { method: "Espresso", grind: "Fine", startingPoint: "Start near a 1:1.8–1:2 beverage ratio and shorten extraction if roast bitterness overtakes cacao sweetness." },
      { method: "Moka pot", grind: "Medium-fine", startingPoint: "Use controlled heat and stop early enough to avoid extracting the harshest late-stage compounds." },
      { method: "South Indian filter", grind: "Medium-fine", startingPoint: "Build a concentrated decoction; dilute or add milk to preference while preserving the roast's dense backbone." },
      { method: "French press", grind: "Coarse", startingPoint: "Use a slightly shorter contact time than a lighter roast if bitterness rises faster than body." },
      { method: "Milk-based coffee", grind: "Method-specific", startingPoint: "Use the roast where high flavour persistence is needed through milk; adjust beverage ratio rather than increasing extraction indiscriminately." },
    ],
    image: "/roast-science/truly-dark-architecture.svg",
  },
};

export const roastComparison = [
  ["Roast family", "Medium-Dark", "Intense Dark"],
  ["Core expression", "Balanced depth", "Controlled intensity"],
  ["Body", "Medium-full", "Full-dense"],
  ["Acidity", "Rounded, low-sharpness", "Low, subdued"],
  ["Bitterness", "Controlled", "More assertive, structured"],
  ["Sweetness", "Warm caramelic", "Dark bittersweet"],
  ["Surface", "Dry to light satin", "Dark; oil may emerge"],
  ["Solubility", "Versatile", "Higher extraction friendliness"],
  ["Cup mood", "Composed daily ritual", "Bold concentrated ritual"],
  ["Espresso", "Excellent", "Excellent"],
  ["Milk pairing", "Elegant", "Powerful"],
] as const;

export const roastReferences = [
  {
    label: "Specialty Coffee Association — roast-color measurement",
    href: "https://sca.coffee/sca-news/25/issue-21/what-color-is-your-coffee-37lk7",
    note: "Industry context for objective roast-color measurement and Agtron-style scales.",
  },
  {
    label: "Food Chemistry — roasting degree and sensory/chemical change",
    href: "https://pubmed.ncbi.nlm.nih.gov/32559595/",
    note: "Arabica research linking roast degree with physical morphology, chemical markers and sensory evaluation.",
  },
  {
    label: "Agronomy — heat and mass transfer during Arabica roasting",
    href: "https://www.mdpi.com/2073-4395/12/11/2880",
    note: "Peer-reviewed evidence that time, temperature, mass loss and roaster design interact; no single universal temperature/time rule defines roast degree.",
  },
  {
    label: "Applied Sciences — roast degree, mass loss and Agtron",
    href: "https://www.mdpi.com/2076-3417/11/15/7025",
    note: "Experimental Arabica data illustrating how darker roasts show lower Agtron values and greater mass loss.",
  },
] as const;
