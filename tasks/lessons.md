# Lessons

## 2026-06-11 — Round 3: the root cause, named

User caught: numbered "01–04" program rows, mono-uppercase year/place labels
positioned above headlines, a naked CSS gradient hero, and a vague headline
("The Valley was built for this" — "this" has no antecedent).

The underlying failure mode, finally identified: **whenever there is a slot to
fill, I emit the category-typical filler** ("a label goes here", "lists get
numbers", "heroes get gradients") instead of making a content-specific choice.
Category-typical = statistical average = AI-looking, by definition. Knowing
the tells isn't enough; I reintroduce them whenever I stop deriving from the
specific content.

The mechanical rule that prevents it:
1. Every element must carry SPECIFIC content (a real year, name, fact) — or be
   deleted. No element exists to "mark structure."
2. Every visual effect must be real material (an actual photograph, drawn
   artwork) — or nothing. Never a naked CSS gradient, glow, or texture.
3. Labels never float above headlines. If the information matters, it goes IN
   the sentence ("1933. The orchards came down…").
4. Copy test: would the sentence mean anything to someone who hasn't read the
   rest of the page? "Lockheed was here before Google" passes; "built for
   this" fails.

## 2026-06-11 — "It looks AI-generated" (domain console redesign, round 1)

User correction: the first pass of the dark redesign read as AI-generated. Specific complaints:

1. **Repetition of one idea everywhere.** Domains appeared in the navbar, hero, a homepage grid section, AND the footer. One concept should have one canonical home; everywhere else earns at most a quiet link.
2. **Decorative flavor text is noise.** `[ END BRIEFING ]`, `[ AWAITING DOMAIN SELECT ]`, `[ FEED // CAM-01 ]`, coordinate decals — terminal cosplay. Decoration that carries no information is the #1 AI tell. Cut all of it.
3. **Neon accents on near-black = AI slop palette.** Acid green/cyan/violet on #0A0A0A is the default "techno" look models regress to. Use desaturated, photographic color; warm blacks; let full-color photography carry the color. Never grayscale-filter photos by default.
4. **Too black and white.** Monochrome + one neon accent feels generated. Real art direction varies section schemes (warm charcoal / cream / photo-led) and pulls accents from the imagery.

Rules for myself:
- Before shipping a design, audit: "would a tasteful human have made THIS specific choice for THIS specific brand, or is it the statistical average of the genre?"
- Each motif (label style, accent, interaction) appears in at most ONE place unless it carries real information.
- Derive palettes from the photography/brand story (SJSU gold, military olive/steel/ember), not from "dark mode + neon" defaults.
- Restraint: one signature moment per page; everything else quiet.
