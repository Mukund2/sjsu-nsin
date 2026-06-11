# HANDOFF — current state & next actions

## NORTH STAR (user's reference, decoded 2026-06-11)

terminal-industries.com (via TikTok @wearebrand.io). The genre the user wants:
ONE cinematic world where scroll drives seamless scene continuity — their
truck: golden-hour hero → SAME truck in a rendered yard → dissolves into a
wireframe/particle "digital twin" → particle scenes → clean type sections.
Tech (from the video credits + inspection): Webflow + Osmo (GSAP toolkit),
React/Three.js/R3F, Lenis, Barba, and **webP image sequences scrubbed on
canvas** for the cinematic shots (pre-rendered in 3D software, NOT realtime).
Their nav is a floating glass pill that persists over everything.

What we can't do: Blender-quality pre-rendered sequences. What we CAN do:
1. Keep the realtime three.js Earth (built, works, looks great).
2. SEAMLESS transitions between all movements — no hard section cuts. The
   cloud→paper-flash match-cut pattern (built) is the template; apply it at
   timeline→traverse and traverse→CTA. Overlap, don't stack.
3. Our "truck→wireframe" equivalent: the photographic world dissolving into
   the drawn instrument language (hairlines + gold + particles) at the cyber
   beat of the descent — photo → particle/wireframe dissolve (canvas or
   shader on the cyber tile). This is the missing signature transform.
4. Optional: generate short FLUX frame *sequences* (4-8 frames) and scrub
   them for micro-moments if a true pre-rendered shot is ever needed.

Branch: `redesign/domain-console` (pushed). Do NOT push/merge to `main` — that deploys.
Dev server: `npm run dev` → localhost:4321 (often already running in background).
Verify visually with Chrome MCP tools; build with `npx astro build`.

## Where the project is

Full redesign of sjsunsin.org per DIRECTION.md ("Golden Hour": ink #232020 /
paper #F2EDE3 / gold #C9A958, Instrument Serif + Geist, t-* type scale in
global.css, grain overlay, Lenis+GSAP motion in BaseLayout, photography graded
via tools/grade-images.mjs, AI frames generated with HF FLUX Krea then graded).
tasks/lessons.md = banned AI-design tells. User taste: no decals/ordinals/neon,
specific copy, agency-tier craft, "instrument not document."

Homepage = three movements (user's vision, all wired in src/pages/index.astro):
1. `<EarthDive />` (src/components/home/EarthDive.astro) — three.js textured
   globe (textures /images/earth/2k_earth_{daymap,nightmap,clouds}.jpg),
   golden-hour DirectionalLight, gold fresnel rim, stars; pinned 260% scrub:
   camera dist 3.4→1.13, earth rotY→TARGET_ROT_Y≈3.70 (Bay Area front), clouds
   opacity→1, paper #dive-flash at 0.74, canvas hidden 0.82, #dive-title
   ("Lockheed was here before Google.") in at 0.83.
2. `<ValleyTimeline />` (src/components/home/ValleyTimeline.astro) — pinned
   horizontal scrub: paper scheme, ink hairline axis, gold #valley-progress,
   fixed gold marker at left-[38vw], track slides under it; 9 milestones 1933
   Moffett → Spring '27 hackathon (last 3 are club items, gold stems).
3. Altitude descent traverse (in index.astro): #alt-pin, 500vh #alt-strip of 5
   FLUX-generated tiles (orbit-limb, cloud-deck, sea-surface, water-column,
   seabed-cable in /images/domains/), descends 408 km → −4,000 m, live
   #alt-readout altimeter + #alt-marker on rail, cyber crossfades at the end
   ("no altitude"). Then cohort CTA + ConsoleFooter.

Domain pages /domains/{air,sea,space,cyber}, /about, /contact, /404,
/security-policy all on the console system already.

## BROKEN / NEXT (the current task: visual tuning pass)

1. **EarthDive framing is wrong.** Screenshots show warm-brown texture filling
   the viewport at load instead of a globe floating in space. Suspects, in
   order: (a) renderer sized before layout → wrong aspect/size (call
   renderer.setSize from a ResizeObserver or after rAF, and on load); (b) the
   scrub timeline's progress not 0 at top (check ScrollTrigger start), so dist
   already ≈1.13; (c) camera z vs sphere scale. Fix by iterating: edit
   constants → screenshot localhost:4321 top of page → expect: dark space,
   stars, golden-rimmed Earth ~60% of viewport height, slowly rotating.
2. **Dive sequence check**: scroll through #dive-pin — Earth should grow,
   clouds whiten the frame, paper flash, title lands. Tune TARGET_ROT_Y /
   TILT_X so the US west coast faces camera before the flash.
3. **ValleyTimeline check**: paper section after the dive — confirm axis draws,
   marker passes milestones, reveals pop (containerAnimation triggers at
   "left 42%"). Screenshots showed mostly-dark frames — possibly fine (was
   mid-pin between sections) but verify, esp. that the pin height isn't
   collapsing and intro h2 ("The Valley was a defense town first.") shows.
4. **Traverse regression check** after the above: descent still works, altimeter
   counts 408 km → −4,000 m, eager-loaded tiles paint (NEVER loading="lazy" on
   #alt-strip imgs — lazy uses untransformed layout position = never loads).
   Known GSAP gotcha already fixed: never put inline translateY on #alt-strip;
   GSAP composes inline transform + yPercent additively.
5. After visual pass: commit + push branch. Then remaining queue: mobile pass,
   prefers-reduced-motion checks on the two new components (CSS fallbacks exist
   in-component), about/contact hero variation (audit items #41/#42), replace
   falcon9/rocket-launch SpaceX images (CC BY-NC, off-PD-rule) — falcon9 no
   longer on homepage but still on /contact via rocket-launch.jpg.

## Tools/facts that save time

- Image gen: HF MCP `gr1_flux_1_krea_dev_infer` (prompt ≤70 words, width 1216
  height 704, steps 28) → curl the returned URL → grade with sharp:
  .linear(0.94,14).modulate({saturation:0.85}).recomb warm matrix (see
  tools/grade-images.mjs or the seabed commit). User can connect Midjourney on
  request; style-lock prompt in DIRECTION.md §3.
- The user wants ONE continuous cinematic feel; research verdict (Earth dive =
  Path 2) is in the chat/commits: textured sphere + cloud match-cut, never
  stream tiles. CSP: three.js is eval-free; don't add Draco/KTX2 loaders;
  textures self-hosted only. antialias:false, DPR≤1.75, kill RAF off-screen.
- Browser: get tab via tabs_context_mcp (tabs change often), batch actions,
  scrub by scrolling ~12-ticks per beat with 1.5s waits.
- npm scripts: build = `npx astro build` (CSP warnings about dev are normal).
  GSAP + Lenis init lives in BaseLayout (console theme only) with [data-reveal]
  SplitText line masks; .has-motion gates all motion CSS.

## PROTAGONIST (user requirement, locked 2026-06-11)
ONE persistent hero object through the WHOLE homepage, like Terminal's truck:
REAL rendered Three.js object (procedural PBR satellite, golden-hour lit, own
transparent fixed canvas above the page) — NOT flat SVG line art. Beats: drifts
past Earth in orbit intro → flies the timeline axis → parks and pitches down
through the descent → disperses into particles at the cyber dissolve →
resolves into the gold paper-plane logo (SVG) above "Join the first cohort."
Built in src/components/home/Protagonist.astro (agent in flight; trigger table
in its report). User explicitly wants "the technology" — Three.js — used.
