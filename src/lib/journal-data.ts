export type JournalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
};

export type JournalSource = {
  label: string;
  url: string;
  note: string;
};

export type JournalArticle = {
  slug: string;
  product: "Noble Dark" | "Truly Dark";
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  readingTime: string;
  published: string;
  keywords: string[];
  opening: string[];
  sections: JournalSection[];
  sources: JournalSource[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "noble-dark-indian-arabica-espresso-minded-ritual",
    product: "Noble Dark",
    eyebrow: "Baristo Journal · Noble Dark",
    title: "Noble Dark: the medium-dark Indian Arabica built for espresso-minded ritual",
    subtitle:
      "A detailed guide to Baristo.Online Noble Dark—its sensory architecture, ideal drinker, home-brewing logic, cognitive context, recipe system and place in India’s emerging premium-coffee culture.",
    description:
      "Explore Baristo.Online Noble Dark, a 12 oz / 340 g medium-dark single-origin Indian Arabica designed around cacao warmth, toasted almond, caramel depth and espresso-minded home ritual.",
    readingTime: "18–22 min",
    published: "2026-08-07",
    keywords: [
      "Noble Dark coffee India",
      "medium dark roast Indian Arabica",
      "premium ground coffee India",
      "espresso coffee India",
      "single origin Indian Arabica",
      "Baristo.Online",
      "coffee and alertness",
      "home espresso ritual",
    ],
    opening: [
      "India’s premium coffee culture is moving beyond a simple café-versus-instant distinction. For a growing urban audience, coffee is becoming a designed part of the day: a home ritual, a desk object, a sensory preference, a conversation about origin and a small expression of personal standards. Noble Dark was conceived for that moment.",
      "Noble Dark is Baristo.Online’s medium-dark expression: 100% single-origin Indian Arabica, ground and roasted for a cup with cacao warmth, toasted almond, restrained caramel and a long polished finish. It is the more composed of Baristo’s two dark-roast products. Truly Dark pushes intensity further; Noble Dark holds structure, sweetness and roast depth in tighter balance.",
      "The point is not to make coffee sound medicinal. Baristo does not promise that a roast profile will make a person smarter, more productive or more successful. The useful scientific context is narrower: caffeine is a well-characterised stimulant, and evidence supports acute effects on alertness and some attention measures. Baristo places that evidence beside—rather than inside—the product claim. The product itself is sold on origin, roast, sensory character, preparation and ritual.",
    ],
    sections: [
      {
        heading: "1. Why Noble Dark exists",
        paragraphs: [
          "Dark coffee in India often gets trapped between two stereotypes. One is commodity bitterness: roast pushed so far that origin becomes irrelevant. The other is the specialty-coffee assumption that seriousness requires acidity, light roasting and an increasingly technical tasting vocabulary. Noble Dark takes a third route.",
          "It is intended for people who genuinely prefer espresso-minded depth—cacao, nuts, caramel, density, lower perceived brightness—but still want the cup to feel deliberate rather than burnt. The design brief is therefore not ‘make it dark’. It is ‘build structure without harshness’.",
          "That distinction matters commercially. A customer who wants a dark roast is not necessarily unsophisticated; she may simply value body, familiarity, milk compatibility, moka-pot performance or a more compact sensory profile. Noble Dark treats that preference as premium rather than apologising for it.",
        ],
        callout: "Noble Dark is not the lighter Baristo. It is the composed dark Baristo.",
      },
      {
        heading: "2. The sensory architecture",
        paragraphs: [
          "Noble Dark is described through four anchors: cacao, toasted almond, warm caramel and a long finish. Those words are useful only when they guide expectation. Cacao signals roast-linked depth without implying sugary chocolate. Toasted almond points toward nutty warmth. Caramel describes a rounded sweetness. The finish is designed to remain present after the swallow rather than disappear into a thin, sharp close.",
          "The cup should therefore feel more architectural than fruity. It is not positioned as a floral filter coffee or a fermentation showcase. Its purpose is density, coherence and versatility across espresso-style preparation, moka pot, French press and concentrated home brewing.",
        ],
        bullets: [
          "Body: medium-full to full depending on brew method.",
          "Perceived acidity: restrained rather than absent.",
          "Primary flavour direction: cacao, toasted nuts, caramel.",
          "Best use case: concentrated black coffee or milk-based preparation where the roast must remain legible.",
          "Format: one 12 oz / 340 g pack, premium ground roasted coffee.",
        ],
      },
      {
        heading: "3. The ideal customer: who Noble Dark is actually for",
        paragraphs: [
          "Baristo should not market Noble Dark to ‘everyone who drinks coffee’. Its strongest initial customer is narrower: an affluent or aspirational urban Indian who already spends on premium tools, food, fitness, technology, work environments or personal optimisation and sees coffee as part of that system.",
          "This person may be a founder, senior operator, consultant, researcher, physician, designer, lawyer, investor, technologist, creator or executive. The profession is less important than the behaviour: long blocks of cognitive work, preference for high-quality objects, willingness to pay for sensory distinction, and a tendency to ritualise the beginning of demanding work.",
          "A second valuable segment is the home-coffee upgrader: someone who has moved beyond instant coffee, has bought a French press, moka pot, Aeropress or espresso machine, and now wants a darker coffee that still feels premium. A third is the luxury-gifting buyer who needs a product with visual ceremony and a story that reads well before the pack is opened.",
        ],
        bullets: [
          "Primary ICP: 28–48, metro or high-income Tier-2, professionally ambitious, premium discretionary spend.",
          "Psychographic: values discernment, evidence, ritual, design and Indian provenance.",
          "Coffee behaviour: 1–3 cups/day, prefers strong body, likely to drink espresso-style, moka pot or milk coffee.",
          "Purchase trigger: wants the private-café feeling at home or work without becoming a coffee hobbyist first.",
          "Retention trigger: consistency, replenishment, recipe variety and identity—not discounting alone.",
        ],
      },
      {
        heading: "4. Who should choose Truly Dark instead",
        paragraphs: [
          "Noble Dark is not the right answer for every dark-roast customer. If the buyer explicitly wants maximum roast intensity, a heavier smoky edge, very low perceived brightness and a cup that remains forceful through milk, Truly Dark is the better Baristo choice.",
          "This qualification is important. Premium brands gain trust when they help a customer choose rather than forcing every person into the hero SKU. Noble Dark is the broadest entry point; Truly Dark is the conviction product.",
        ],
      },
      {
        heading: "5. Why Indian origin is part of the luxury proposition",
        paragraphs: [
          "The premium story should not be built on imitation of imported coffee. India already produces Arabica across established mountain coffee landscapes, and the Coffee Board of India continues to publish detailed production and consumption statistics. Baristo’s position is that Indian provenance can be the source of luxury rather than a local substitute for it.",
          "For Noble Dark, origin is therefore not a patriotic sticker added after the roast. It is the beginning of the story: Indian Arabica, shaped into a roast profile intended for contemporary home ritual. ‘Born at altitude. Roasted for ascent.’ works because the first altitude is literal provenance and the second is metaphorical ambition.",
        ],
      },
      {
        heading: "6. Coffee, caffeine and the cognitive-work context",
        paragraphs: [
          "Many Noble Dark buyers will drink coffee before or during work that demands sustained attention. It is reasonable to discuss that context, but only with precision. The European Food Safety Authority notes that caffeine in moderate doses increases alertness and reduces sleepiness. A 2025 systematic review and meta-analysis of randomised double-blind placebo-controlled trials in healthy adults reported small acute improvements in attention accuracy and reaction time.",
          "Those findings concern caffeine generally. They do not prove that Noble Dark, a particular roast profile or a Baristo recipe uniquely enhances cognition. Caffeine exposure also depends on coffee dose, extraction method, serving size and individual physiology. Sleep timing matters; caffeine taken too late can work against the very cognitive performance a person is trying to protect.",
          "That is why Baristo uses the phrase ‘espresso-minded’ as a cultural and preparation idea, not a medical claim. The brand can credibly own the attentive ritual without pretending the packet is a pharmaceutical intervention.",
        ],
        callout: "The claim is the ritual. The evidence belongs to caffeine. The product remains coffee.",
      },
      {
        heading: "7. How to brew Noble Dark at home",
        paragraphs: [
          "Noble Dark is designed to be forgiving enough for serious everyday use. The exact extraction should always be adapted to the grinder, equipment and water available, but the following starting points fit the product architecture.",
        ],
        bullets: [
          "Espresso-style: begin around a 1:2 beverage ratio and adjust for bitterness, flow and body.",
          "Moka pot: use medium-fine coffee, preheated water where appropriate, and remove from heat before aggressive sputtering to preserve a cleaner finish.",
          "French press: use a coarse grind, approximately 1:15 coffee-to-water as a starting point, and allow enough contact time for body without excessive sediment extraction.",
          "Pour-over: use a slightly tighter recipe than a bright light roast; the goal is cacao clarity and caramel sweetness, not maximum acidity.",
          "With milk: use less milk than a café latte if you want the roast architecture to remain dominant.",
        ],
      },
      {
        heading: "8. The recipe ecosystem: one roast, multiple identities",
        paragraphs: [
          "A major retention idea behind Baristo is that the customer should not need twelve physical SKUs to experience variety. The recipe system changes texture, aroma, temperature and context while preserving the same coffee identity.",
          "Noble Dark anchors Baristo Classic, Sage, Zen, Harmony, Glow, Sigma and Ignition/Burst. These are culinary rituals, not therapeutic formulas. Sage uses nut butter, fat, date and cinnamon for a dense blended cup. Zen moves toward milk, cardamom and floral notes. Glow combines turmeric, pepper, milk and honey. Sigma creates a private-luxury latte profile with vanilla and maca. The same roast can therefore move from austere black coffee to a highly composed beverage without forcing the customer to abandon the core product.",
        ],
      },
      {
        heading: "9. Why the price must be defended by experience, not adjectives",
        paragraphs: [
          "Baristo is positioned well above mainstream Indian specialty-coffee pricing. That makes ordinary category language insufficient. ‘Premium’, ‘single origin’ and ‘Arabica’ are not enough on their own because established Indian roasters already use those terms at much lower prices.",
          "The premium must therefore be expressed as a system: limited one-size format, distinctive ceremonial packaging, two-product simplicity, origin narrative, batch identity, evidence discipline, strong visual art direction, concierge-style reservation, detailed recipe library, selective sampling and a First Pour community. The customer should understand that Baristo is not competing to be the cheapest route to good Arabica.",
          "This also means discounting should be rare. Frequent 30–40% promotions would destroy the very signalling function the price is meant to create. Sampling, gifting, limited allocations and member access are better levers than permanent couponing.",
        ],
      },
      {
        heading: "10. Where Noble Dark fits in India’s premium-coffee moment",
        paragraphs: [
          "Redseer research reported by ET Retail projected India’s out-of-home coffee market at roughly US$2.6–3.2 billion by 2028, with the premium segment above ₹200 per cup expected to account for a majority share. More recent reporting in 2026 describes premium coffee increasingly as a lifestyle and personal-expression category rather than only a beverage category. Home brewing is also becoming more visible in major tech cities.",
          "Baristo should not interpret that as permission to copy café culture online. It should exploit the opposite: bring the status, theatre and sensory expectation of a premium café into the private environment. Noble Dark is the office, home, studio and founder-desk product—the coffee for people who want the ritual without needing to travel to a third place every time.",
        ],
      },
      {
        heading: "11. The Noble Dark marketing message hierarchy",
        paragraphs: [
          "The most effective communication sequence is sensory first, identity second, evidence third and cognitive context fourth. Starting with ‘brain performance’ would make the product feel like a supplement. Starting only with tasting notes would make Baristo look like another specialty roaster.",
        ],
        bullets: [
          "Hero: Born at altitude. Roasted for ascent.",
          "Product promise: Structure without harshness.",
          "Identity: For Expresso Noble Minds.",
          "Sensory proof: cacao warmth, toasted almond, restrained caramel, long polished finish.",
          "Purity proof: 100% Arabica, no chicory, no fillers, no artificial flavour.",
          "Evidence discipline: publish batch and quality information only when it genuinely exists.",
          "Cognitive context: discuss caffeine research carefully; never guarantee mental performance.",
        ],
      },
      {
        heading: "12. The final choice",
        paragraphs: [
          "Choose Noble Dark when you want the Baristo idea in its most balanced form: dark enough to feel serious, polished enough to drink repeatedly, strong enough for espresso-minded preparation and flexible enough to become the base of multiple rituals.",
          "It is the product for a customer who wants depth without aggression. Truly Dark exists for the customer who wants the aggression refined rather than removed.",
        ],
      },
    ],
    sources: [
      {
        label: "Coffee Board of India — Coffee Statistics",
        url: "https://coffeeboard.gov.in/coffee-statistics.html",
        note: "Official Indian production and consumption statistics.",
      },
      {
        label: "ET Retail / Redseer — India out-of-home coffee market",
        url: "https://retail.economictimes.indiatimes.com/news/food-entertainment/food-services/indias-out-of-home-coffee-market-projected-to-reach-up-to-3-2-billion-by-2028/116879147",
        note: "Premium coffee market growth and consumer shift toward experience.",
      },
      {
        label: "EFSA — Caffeine",
        url: "https://www.efsa.europa.eu/en/topics/topic/caffeine",
        note: "Caffeine safety and alertness context.",
      },
      {
        label: "PubMed — 2025 caffeine attention meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/40335666/",
        note: "Randomised-trial evidence on acute attention accuracy and reaction time.",
      },
      {
        label: "FSSAI — Advertising and Claims Regulations",
        url: "https://www.fssai.gov.in/cms/Amendment-FSS-Advertising-Claims.php",
        note: "Regulatory context for truthful, substantiated food claims in India.",
      },
    ],
  },
  {
    slug: "truly-dark-intense-dark-roast-indian-arabica",
    product: "Truly Dark",
    eyebrow: "Baristo Journal · Truly Dark",
    title: "Truly Dark: how an intense dark roast can be powerful without becoming crude",
    subtitle:
      "A deep guide to Baristo.Online Truly Dark—its intense roast philosophy, ideal drinker, espresso use, sensory structure, performance-culture context, recipes and premium positioning in India.",
    description:
      "Discover Baristo.Online Truly Dark, an intense dark single-origin Indian Arabica in a 12 oz / 340 g format with dark cacao, toasted walnut, smoked caramel and a bold lingering finish.",
    readingTime: "18–22 min",
    published: "2026-08-07",
    keywords: [
      "Truly Dark coffee India",
      "intense dark roast Indian Arabica",
      "premium dark roast India",
      "espresso dark roast India",
      "single origin Indian coffee",
      "Baristo Truly Dark",
      "strong coffee India",
      "dark roast home espresso",
    ],
    opening: [
      "Truly Dark begins with a contrarian premise: intensity is not the enemy of refinement. Dark roasting becomes crude when bitterness is the only story left. It becomes compelling when the roast still has shape—dark cacao, toasted walnut, smoke-kissed caramel, dense body and a finish that feels deliberate rather than scorched.",
      "This is Baristo.Online’s conviction product. Noble Dark is the broader medium-dark expression; Truly Dark is for the buyer who actively wants a darker cup. It is still 100% single-origin Indian Arabica, still one 12 oz / 340 g format and still the same premium price. The difference is sensory attitude.",
      "The product is designed around decisive preparation: espresso-style shots, moka pot, short milk drinks, cold brew and the darker end of the Baristo recipe system. Its identity is not ‘more caffeine because it is darker’—roast level alone does not justify that claim. Its identity is greater roast intensity and a more commanding sensory signature.",
    ],
    sections: [
      {
        heading: "1. What ‘Truly Dark’ means",
        paragraphs: [
          "The name is deliberately literal. Many products described as dark are medium-dark by sensory standards. Truly Dark is intended to remove ambiguity: it is the intense end of the Baristo ladder.",
          "That does not mean roasting until every bean tastes identical. The ambition is to push roasted depth far enough that dark-cacao and toasted-walnut characteristics dominate, while retaining enough sweetness and structure to avoid an ash-only profile. The phrase ‘intensity without vulgar bitterness’ captures the design target.",
        ],
        callout: "Truly Dark is not a punishment cup. It is controlled intensity.",
      },
      {
        heading: "2. Sensory architecture: darkness with shape",
        paragraphs: [
          "Truly Dark is built around dark cacao, toasted walnut, smoked caramel and a bold finish. The emphasis moves away from Noble Dark’s polished almond-and-caramel balance toward a more forceful roasted profile.",
          "Dark cacao provides the central bitter-sweet axis. Toasted walnut adds dryness and nutty weight. Smoked caramel contributes a darker sweetness that can survive concentration and milk. The finish should remain long and warm rather than collapse into acrid sharpness.",
        ],
        bullets: [
          "Body: full and dense when brewed concentratively.",
          "Perceived acidity: low to restrained.",
          "Primary flavour direction: dark cacao, toasted walnut, smoke-kissed caramel.",
          "Best use case: espresso-style, moka pot, short milk drinks, concentrated cold brew.",
          "Format: one 12 oz / 340 g pack at the same price as Noble Dark.",
        ],
      },
      {
        heading: "3. The ideal Truly Dark customer",
        paragraphs: [
          "Truly Dark should not be the default recommendation simply because a customer says ‘strong coffee’. The correct buyer wants roast intensity specifically. She dislikes bright, tea-like or fruit-dominant coffees; she wants body, low perceived acidity and a flavour that remains obvious through milk or dilution.",
          "Psychographically, Truly Dark suits the more absolutist side of the Baristo ICP: the founder who drinks a short black cup before a difficult decision, the surgeon or consultant who wants a forceful morning ritual, the designer who treats objects and flavours as identity signals, the strength-training professional who prefers concentrated coffee, or the home-barista who thinks mainstream dark roasts are either too flat or too cheap-feeling.",
          "This buyer is not necessarily a coffee nerd. In fact, Baristo’s opportunity is partly to sell sophistication without requiring the customer to memorise fermentation terminology. Truly Dark communicates quickly: intense dark roast, premium Indian Arabica, clear sensory notes, deliberate preparation.",
        ],
        bullets: [
          "Primary ICP: high-agency professionals and founders who already buy premium lifestyle products.",
          "Taste preference: dark chocolate, roasted nuts, low acidity, dense espresso, short milk drinks.",
          "Behaviour: values concentration and repeatability over novelty flights.",
          "Emotional trigger: command, privacy, control, intensity.",
          "Avoid targeting: light-roast enthusiasts seeking florals, high acidity or delicate fruit expression.",
        ],
      },
      {
        heading: "4. Truly Dark versus Noble Dark",
        paragraphs: [
          "The two-product system should make selection easier, not create artificial complexity. Noble Dark is medium-dark, balanced and broadly versatile. Truly Dark is intense dark, denser and more roast-forward. Both use the same pack size and same price so the choice is taste—not a good/better/best hierarchy.",
        ],
        bullets: [
          "Choose Noble Dark for cacao + almond + caramel balance.",
          "Choose Truly Dark for dark cacao + walnut + smoked caramel intensity.",
          "Choose Noble Dark for wider recipe flexibility and daily repeatability.",
          "Choose Truly Dark when you want the roast to dominate milk and concentrated brewing.",
        ],
      },
      {
        heading: "5. Strong flavour is not the same thing as more caffeine",
        paragraphs: [
          "A common consumer shortcut is to equate darker taste with more caffeine. That is not a safe product claim. Caffeine in a prepared cup depends on the coffee dose, bean composition, grind, extraction method, beverage volume and other variables. Roast colour by itself is not enough to promise a specific caffeine advantage.",
          "Baristo therefore markets Truly Dark as a stronger sensory experience—not as a guaranteed higher-caffeine product. Until a defined serving and brew protocol are analytically characterised, the site should not invent a milligram figure or claim superior stimulation versus Noble Dark.",
          "This restraint actually strengthens the premium positioning. Evidence discipline is more credible than exaggerated biohacker language.",
        ],
      },
      {
        heading: "6. The cognitive-performance context—without pretending coffee is a drug product",
        paragraphs: [
          "Truly Dark naturally sits inside performance culture because intense black coffee is culturally associated with demanding work, training and late creative sessions. The scientifically defensible part of that story comes from caffeine research. EFSA notes that caffeine increases alertness and reduces sleepiness in moderate doses, while controlled-trial evidence indicates small acute effects on attention accuracy and reaction time.",
          "The brand should use those facts educationally. It should not say ‘Truly Dark enhances executive function’ or ‘improves cognition’ as a product-specific promise. Individual response, tolerance, sleep debt and timing can reverse the intended benefit. A cup that keeps someone awake too late can reduce next-day performance.",
          "The premium message is therefore disciplined intensity: a coffee ritual chosen for moments of high demand, with honest acknowledgement that caffeine is active and context-dependent.",
        ],
      },
      {
        heading: "7. Espresso: the natural home of Truly Dark",
        paragraphs: [
          "Truly Dark is designed to make sense under pressure—literally and sensorially. Espresso-style extraction concentrates the roasted profile, amplifies body and allows smoked caramel and dark cacao to remain present in a small beverage.",
          "A useful starting point is a conventional espresso-style ratio around 1:2, then adjust. If the shot is sharply bitter and dry, reduce extraction or lower brew temperature. If it is hollow, increase extraction slightly. The target is density with sweetness, not maximum darkness for its own sake.",
          "For milk drinks, keep the beverage short. A cortado, flat white or compact cappuccino structure allows Truly Dark to remain identifiable. Large milk volumes can turn even a powerful coffee into background flavour.",
        ],
      },
      {
        heading: "8. Moka pot, French press and cold brew",
        paragraphs: [
          "The moka pot is arguably the most accessible Baristo method for Indian homes that want espresso-minded concentration without a full espresso machine. Truly Dark’s roast profile is well suited to the method, provided the brewer avoids overheating and extended sputtering.",
          "French press creates a wider, heavier cup. Coarse grind and controlled contact time help keep the finish dense rather than muddy. Cold brew moves the product in a different direction: long cold extraction can soften perceived bitterness while retaining chocolate and roast depth, making it useful in warm climates and office refrigeration setups.",
        ],
      },
      {
        heading: "9. The darker Baristo rituals",
        paragraphs: [
          "Truly Dark forms the base for the most assertive part of the Baristo recipe library. Command/Alpha adds protein, chia, flax and salt to a cooled double shot. Forge/Rage combines dark chocolate, cayenne and cinnamon. Focus/Cage layers coffee with matcha and mint. Ascent/Charge combines coffee with beetroot and ginger in a pre-training-style culinary ritual. Phoenix uses maple, cayenne, cinnamon and orange zest. Ignition/Burst can use either roast with cacao and ghee or butter.",
          "These are recipes, not treatment or performance protocols. Their value is sensory and behavioural: the customer can change the experience of the same roast while preserving the dark Baristo identity.",
        ],
      },
      {
        heading: "10. Why Truly Dark can command a luxury position in India",
        paragraphs: [
          "India’s specialty-coffee market contains many excellent dark and espresso-oriented coffees at materially lower prices. Blue Tokai currently lists Vienna and French Roast around ₹650 for 250 g, while Naivo lists several espresso roasts from roughly ₹670–₹895 depending on coffee. Baristo cannot win by claiming that a dark roast itself is rare.",
          "The luxury case must therefore be built above the bean: limited format, ceremonial package, two-roast clarity, concierge reservation, detailed ritual content, provenance storytelling, batch evidence when available, high-touch service, deliberate scarcity and a visual identity that behaves more like luxury fragrance or spirits than supermarket coffee.",
          "This also dictates distribution. Truly Dark should first appear in contexts that reinforce the story: founder communities, executive gifting, premium gyms and studios, high-end co-working spaces, design-led hospitality, private tastings, selected chef or barista collaborations and tightly targeted digital acquisition. Broad discount-marketplace visibility too early would make the premium price look arbitrary.",
        ],
      },
      {
        heading: "11. Marketing Truly Dark: command, not noise",
        paragraphs: [
          "The strongest creative direction is dark, architectural and restrained. Avoid flames, gym clichés and pseudo-neuroscience. The product does not need to shout ‘energy’. Its visual language should imply contained power: obsidian, rose gold, espresso crema, polished metal, mountain shadow, dark cacao, walnut and sparse typography.",
          "Performance creative should show context: a short espresso beside a marked-up document, a late design review, a studio desk, a founder’s dawn routine, a private boardroom, a quiet home gym or an after-dinner moka ritual. The person should look composed, not manic. The distinction is important: Baristo sells command rather than stimulation theatre.",
        ],
        bullets: [
          "Hero line: Intensity without vulgar bitterness.",
          "Identity line: For Expresso Noble Minds.",
          "Product descriptor: Intense Dark Roast · 100% single-origin Indian Arabica.",
          "Sensory proof: dark cacao, toasted walnut, smoked caramel, bold finish.",
          "Behavioural idea: the command cup for decisive hours.",
          "Evidence rule: never imply that roast darkness itself means more caffeine or better cognition.",
        ],
      },
      {
        heading: "12. Final choice: when Truly Dark is the right Baristo",
        paragraphs: [
          "Choose Truly Dark when darkness is the preference, not an accident. You want a dense cup, low perceived brightness, a roast that remains visible through milk and a sensory profile that feels more forceful than Noble Dark.",
          "The goal is not to be the darkest coffee in India. The goal is to make darkness feel considered enough to belong in a luxury system.",
        ],
      },
    ],
    sources: [
      {
        label: "Coffee Board of India — Coffee Statistics",
        url: "https://coffeeboard.gov.in/coffee-statistics.html",
        note: "Official Indian coffee-market context.",
      },
      {
        label: "ET Retail / Redseer — India premium coffee growth",
        url: "https://retail.economictimes.indiatimes.com/news/food-entertainment/food-services/indias-out-of-home-coffee-market-projected-to-reach-up-to-3-2-billion-by-2028/116879147",
        note: "Premiumisation and out-of-home market projections.",
      },
      {
        label: "EFSA — Caffeine",
        url: "https://www.efsa.europa.eu/en/topics/topic/caffeine",
        note: "Alertness, sleep and safety context.",
      },
      {
        label: "PubMed — 2025 caffeine attention meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/40335666/",
        note: "Controlled-trial evidence on attention outcomes.",
      },
      {
        label: "Blue Tokai — Vienna Roast",
        url: "https://bluetokaicoffee.com/products/vienna-roast",
        note: "Current Indian dark-roast category benchmark.",
      },
      {
        label: "Naivo — Attikan White Mist",
        url: "https://naivo.in/product/attikan-white-mist/",
        note: "Current medium-dark espresso-roast category benchmark.",
      },
      {
        label: "FSSAI — Advertising and Claims Regulations",
        url: "https://www.fssai.gov.in/cms/Amendment-FSS-Advertising-Claims.php",
        note: "Indian regulatory framework for advertising and claims.",
      },
    ],
  },
];

export function getJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
