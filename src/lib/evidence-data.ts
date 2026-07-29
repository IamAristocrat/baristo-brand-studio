export interface ProofDossier {
  id: string;
  title: string;
  summary: string;
  includes: string[];
  release: "On demand" | "On application";
  turnaround: string;
}

export const proofDossiers: ProofDossier[] = [
  {
    id: "origin",
    title: "Origin & Lot Dossier",
    summary:
      "Where the green coffee for your pouch of premium ground coffee came from, and how the lot was selected.",
    includes: [
      "Lot reference and harvest window",
      "Altitude band and processing method",
      "Green intake date and moisture reading",
      "Cup score sheet from the intake table",
    ],
    release: "On demand",
    turnaround: "Same working day",
  },
  {
    id: "roast",
    title: "Roast Curve & Date Record",
    summary:
      "The exact roast session behind your batch code — dates, profile milestones and grind release.",
    includes: [
      "Roast date, packed date and best-before",
      "Charge, first-crack and drop temperatures",
      "Development time ratio for the batch",
      "Grind setting used for the ground release",
    ],
    release: "On demand",
    turnaround: "Same working day",
  },
  {
    id: "quality",
    title: "Purity & Quality Record",
    summary:
      "The declaration that your premium ground coffee is only roasted Arabica — nothing else.",
    includes: [
      "Ingredient declaration: 100% roasted Arabica",
      "Chicory / filler nil-addition statement",
      "Packing line hygiene sign-off",
      "Available third-party testing summaries",
    ],
    release: "On application",
    turnaround: "2–3 working days",
  },
  {
    id: "sensory",
    title: "Sensory Panel Notes",
    summary: "The tasting record the roast team signed off before the batch was released.",
    includes: [
      "Panel cupping scores by attribute",
      "Descriptor set agreed for the batch",
      "Espresso extraction reference shot data",
      "Release approval initials and date",
    ],
    release: "On application",
    turnaround: "2–3 working days",
  },
  {
    id: "compliance",
    title: "Label & Compliance File",
    summary: "How the pack is worded, and why we never make medicinal claims.",
    includes: [
      "FSSAI-format label proof",
      "Net quantity and storage declarations",
      "Claim policy: sensory and lifestyle language only",
      "Batch-level artwork revision history",
    ],
    release: "On application",
    turnaround: "3–5 working days",
  },
  {
    id: "chain",
    title: "Chain of Custody Log",
    summary: "Every hand the lot passed through, from intake to sealed pouch.",
    includes: [
      "Intake, storage and roast transfer log",
      "Grind and pack session timestamps",
      "Nitrogen flush and seal verification",
      "Dispatch reference for your order",
    ],
    release: "On application",
    turnaround: "3–5 working days",
  },
];

export interface RoastStage {
  step: string;
  title: string;
  detail: string;
  metric: string;
}

export const roastStages: RoastStage[] = [
  {
    step: "01",
    title: "Green Intake",
    detail:
      "High-altitude single-origin Indian Arabica is graded, screened and moisture-checked before a single bean is charged.",
    metric: "10.5–11.5% moisture",
  },
  {
    step: "02",
    title: "Charge & Turnaround",
    detail:
      "Small batches only. The drum is stabilised so every bean meets the same heat, in the same second.",
    metric: "Small-batch drum",
  },
  {
    step: "03",
    title: "Maillard Build",
    detail:
      "The sweetness window is stretched deliberately — this is where cacao, caramel and toasted nut structure is written into the cup.",
    metric: "Extended sweetness phase",
  },
  {
    step: "04",
    title: "First Crack Read",
    detail:
      "Crack is read by ear and by probe together. Airflow is opened to protect clarity before the roast is pushed dark.",
    metric: "Dual-read confirmation",
  },
  {
    step: "05",
    title: "Development to Dark",
    detail:
      "Dark and Truly Dark diverge here — a measured development ratio, never a rushed scorch, never a baked flat finish.",
    metric: "Controlled DTR",
  },
  {
    step: "06",
    title: "Drop & Crash Cool",
    detail:
      "Dropped on target and cooled fast so the profile stops exactly where the roaster intended it to stop.",
    metric: "Rapid air cool",
  },
  {
    step: "07",
    title: "Rest, Grind, Seal",
    detail:
      "The batch rests, then is ground for espresso-minded extraction and sealed with roast and packed dates printed on pack.",
    metric: "Dated on every pouch",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  city: string;
  quote: string;
  roast: "Dark Roast" | "Truly Dark Roast";
}

export const testimonials: Testimonial[] = [
  {
    name: "Aravind Krishnan",
    role: "Product Architect",
    city: "Bengaluru",
    quote:
      "I have chased good espresso across three cities. This premium ground coffee is the first Indian pack that pulls a shot I do not have to apologise for.",
    roast: "Dark Roast",
  },
  {
    name: "Meera Raghavan",
    role: "Equity Research Analyst",
    city: "Mumbai",
    quote:
      "Six a.m. desk, market open at nine. Truly Dark gives me a clean, composed sharpness — no jitter, no crash at eleven.",
    roast: "Truly Dark Roast",
  },
  {
    name: "Devansh Kapoor",
    role: "Surgeon",
    city: "New Delhi",
    quote:
      "The roast date printed on the pouch is the reason I switched. I asked for the batch record and received it the same day.",
    roast: "Dark Roast",
  },
  {
    name: "Ananya Iyer",
    role: "Architect",
    city: "Chennai",
    quote:
      "Cacao, toasted almond, a long finish. The ground coffee is consistent enough that my moka pot ritual finally has no variables.",
    roast: "Dark Roast",
  },
  {
    name: "Rohan Deshpande",
    role: "Founder, D2C Studio",
    city: "Pune",
    quote:
      "Truly Dark is genuinely intense without turning bitter. It has replaced every imported bag in my office cabinet.",
    roast: "Truly Dark Roast",
  },
  {
    name: "Kavya Nair",
    role: "Neuroscience Researcher",
    city: "Kochi",
    quote:
      "I read labels for a living. Zero chicory, zero fillers, a documented ingredient declaration — that is rare honesty in this category.",
    roast: "Dark Roast",
  },
  {
    name: "Siddharth Menon",
    role: "Investment Banker",
    city: "Gurugram",
    quote:
      "Two shots before a pitch and my thinking is noticeably ordered. The Limited Reserve pouch is worth every rupee.",
    roast: "Truly Dark Roast",
  },
  {
    name: "Ishita Bansal",
    role: "Design Director",
    city: "Hyderabad",
    quote:
      "The grind is dialled for espresso beautifully. Crema comes out dense and rose-brown, every single morning.",
    roast: "Dark Roast",
  },
  {
    name: "Pranav Subramanian",
    role: "Marathoner & Data Scientist",
    city: "Coimbatore",
    quote:
      "A short black before a long run. Truly Dark carries me through the first ten kilometres with a very calm kind of alertness.",
    roast: "Truly Dark Roast",
  },
  {
    name: "Ritika Malhotra",
    role: "Corporate Counsel",
    city: "Noida",
    quote:
      "I requested the roast curve record out of curiosity. They actually sent it. That settled it for me.",
    roast: "Dark Roast",
  },
  {
    name: "Vikram Sethi",
    role: "Cinematographer",
    city: "Mumbai",
    quote:
      "Fourteen-hour shoot days. This is the only ground coffee I carry in my kit, and the crew now expects it.",
    roast: "Truly Dark Roast",
  },
  {
    name: "Nandita Sharma",
    role: "Clinical Psychologist",
    city: "Jaipur",
    quote:
      "One measured cup, taken slowly, before my first session. It has become the most reliable part of my morning.",
    roast: "Dark Roast",
  },
  {
    name: "Aditya Rao",
    role: "Chess Coach",
    city: "Visakhapatnam",
    quote:
      "My students joke that I brew before every endgame lesson. The focus it gives is genuinely different from instant.",
    roast: "Truly Dark Roast",
  },
  {
    name: "Shruti Kulkarni",
    role: "Pastry Chef",
    city: "Goa",
    quote:
      "Smoked caramel is not a marketing word here — I can taste it, and I bake with it. The ground consistency is faultless.",
    roast: "Truly Dark Roast",
  },
  {
    name: "Karthik Balakrishnan",
    role: "Aerospace Engineer",
    city: "Bengaluru",
    quote:
      "High-altitude coffee for high-altitude work. I appreciate that every claim on the pack can be traced to a document.",
    roast: "Dark Roast",
  },
  {
    name: "Priyanka Ghosh",
    role: "Editor-in-Chief",
    city: "Kolkata",
    quote:
      "Elegant packaging, but the cup is the real luxury. It reads as a considered premium ground coffee, not a trend.",
    roast: "Dark Roast",
  },
];
