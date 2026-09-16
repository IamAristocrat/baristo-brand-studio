# BARISTO.ONLINE — ASTRA BUILD HANDOFF

This file is the authoritative handoff for rebuilding or substantially redesigning Baristo.Online with Astra.
It summarizes the production decisions made in the working thread. Preserve these decisions unless the owner explicitly changes them.

## 1. Product architecture
- Consumer brand: **Baristo.Online**
- Two retail roasts only:
  - **Noble Dark** — Medium-Dark Roast
  - **Truly Dark** — Intense Dark Roast
- Pack size: **12 oz / 340 g**
- Active selling price for both roasts: **₹2,579**
- Current struck reference MRP: **₹4,779**
- Production language: **On-Demand Batch**. Do not call it “First Release” or “Founding Release”.

## 2. Brand language
Header subtitle ONLY: **EXPERIENCE YOUR NOBILITY.**
Hero: **BORN AT ALTITUDE. ROASTED FOR ASCENT.**
Identity line: **FOR EXPRESSO NOBLE MINDS.**
Brand command: **BE NOBLE.**
Secondary line: **Elevated by nature. Roasted for perfection.**
Important: “Expresso” is intentional.

## 3. Navigation
Home → Roasts → Story → Evidence → Ritual Lab → Journal → Join First Pour

## 4. Visual direction
- premium, high-contrast, readable
- Noble Dark: rose-gold / ivory / champagne
- Truly Dark: obsidian / black / rose-gold
- editorial and cinematic
- strong hierarchy, clear CTAs, clear section separation
- no faint low-contrast body copy

Do not regress into 35–60% opacity text for important content.

## 5. Packaging representation disclosure
Use this exact wording:
**The imagery on this site represents the Baristo packaging design language. Current release batches are packed in premium pouches and finished with signature Baristo labels. Product quality, roast integrity, and brand specifications remain unchanged.**

Applied-label packaging should be framed as premium pouch + signature Baristo labels + On-Demand Batch.

## 6. Physical label direction
Four labels:
- Noble Dark front — 10×10 cm
- Noble Dark back — 10×10 cm
- Truly Dark front — 10×10 cm
- Truly Dark back — 10×10 cm

Noble Dark: shiny rose-gold, soft/refined/feminine-leaning, contrasted.
Truly Dark: black background with rose-gold/ivory contrast.

Exclude from labels:
- social pages
- QR
- taste-profile section
- storage section
- barcode
- empty placeholders

Required wording:
**Roasted, packed and marketed by LifeCodeOS portfolio by Aristoverse DeepTech.**

Do not invent FSSAI details.

## 7. Roast architecture
Use target roast architecture rather than pretending a universal fixed temperature/time definition.

Noble Dark:
- Medium-Dark
- indicative Agtron-style 45–55
- indicative mass loss 14–17%
- dry to light-satin surface
- medium-full body
- rounded acidity
- controlled bitterness
- cacao, toasted almond, warm caramel, polished finish

Truly Dark:
- Intense Dark
- indicative Agtron-style 25–40
- indicative mass loss 17–20%
- deeper development, possible surface oil over time
- full/dense body
- subdued acidity
- structured bitterness
- dark cacao, toasted walnut, smoked caramel, bold finish

Treat ranges as production targets, not statutory guarantees.

## 8. Cognitive communication
Use evidence-aware caffeine context. Do not make Baristo-specific clinical or medicinal claims.

## 9. The 12 rituals
1. Baristo Classic
2. Sage
3. Zen
4. Harmony
5. Glow
6. Command
7. Forge
8. Focus
9. Sigma
10. Ignition
11. Ascent
12. Phoenix

Each recipe needs ingredients, steps, brew method, timing, serving size, tasting notes, pairing, roast recommendation and product CTA.

## 10. Journal
Keep visible Journal routes and long-form guides for both Noble Dark and Truly Dark.
Journal should support origin, roast education, brewing, differentiation, Indian luxury narrative and reservation conversion.

## 11. Join First Pour
Marketing lead capture, not an order.
Collect name, email, phone/WhatsApp with country code, country, city, preferred roast, brew style, coffee frequency, role/identity, principal interest and consent.

## 12. Reservation funnel
Reserve → submit details → internal email → customer acknowledgement → verify availability/delivery → secure payment link → payment → On-Demand Batch → pack → dispatch → tracking → delivery → follow-up.

Unit price: **₹2,579**
Pack: **12 oz / 340 g**

Price must remain consistent on homepage, shared data, roast pages, modal, API, emails and structured data.

## 13. SMTP
Hostinger defaults:
- smtp.hostinger.com
- support@baristo.online
- never commit passwords
- support 465/587 fallback

## 14. Hostinger deployment
- Node 22.x
- npm
- build: npm run build
- output: .output
- entry: server/index.mjs
- Nitro preset: node-server
- HOST/NITRO_HOST=0.0.0.0
- PORT/NITRO_PORT=3000
- canonical: https://baristo.online
- www must also serve assets correctly

## 15. QA
Test 320px phone, modern phone, tablet portrait, tablet landscape, laptop, desktop, 1440+.
Reject horizontal overflow, broken modals, unreadable text, missing assets, dead Journal links, stale prices, duplicate navs and placeholders.

## 16. Image direction
Preferred:
- credible pouch representations
- espresso extraction
- beans and brewing tools
- Indian mountain landscapes
- restrained medallion use
- premium work/ritual scenes
- scientific roast graphics

Avoid:
- fantasy medallion domination
- glowing brains
- fake lab theatre
- generic stock celebration
- mismatched packs
- fabricated testimonials

## 17. Official medallion
Use the existing official asset in `src/assets/medallion.png`. Do not casually replace it with a generated logo.

## 18. Positioning
Baristo is a private luxury ritual built around Indian Arabica, not a commodity coffee comparison.

Noble Dark = Quiet Command / structure without harshness.
Truly Dark = Controlled Intensity / intensity without vulgar bitterness.

## 19. Fulfilment
D2C first. Amazon FBA is not required for the current build.
Courier label goes on outer shipper, not retail pouch.
Premium inserts: welcome note, roast intelligence card, first ritual/brewing card.

## 20. Current source baseline
Repository: `IamAristocrat/baristo-brand-studio`
Pre-handoff production baseline: `ee1cf54e7b12d0478eda8c6a31bf7816ea546384`

## 21. Astra rebuild priorities
1. functional correctness
2. price consistency
3. reservation + First Pour reliability
4. readability
5. premium hierarchy
6. performance
7. accessibility
8. SEO + Journal
9. refined animation/shine
10. payment/logistics extensibility

Do not delete useful existing content just to make the site minimal. Consolidate duplicated systems rather than hiding them with CSS overrides.
