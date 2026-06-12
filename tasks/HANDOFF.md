# HANDOFF — single source of truth (rewritten clean 2026-06-11 evening)

Branch: `redesign/domain-console` (pushed). NEVER push/merge `main` — that
deploys to sjsunsin.org. Dev server: `npm run dev` → localhost:4321.
Build check: `npx astro build`. Verify visually with Chrome MCP tools
(tabs change often — re-run tabs_context_mcp).

## THE STRUCTURE (user-confirmed contract — do not drift)

**M1 — ARRIVAL (built and approved, keep):**
realtime three.js Earth spins (EarthDive.astro) → scrolljacked dive, cloud
flash → NASA Landsat aerial of Silicon Valley (MapScene.astro), scroll
bounces pin-to-pin: Moffett 1933 → Lockheed 1956 (+headline "Lockheed was
here before Google.") → Fairchild 1957 → Apple 1976 → Google 1998 → gold
SJSU 2026. The Valley timeline STAYS.

**M2 — JOURNEY (Blender-rendered film, scroll-sequenced like
terminal-industries.com — their files literally say "prerender"):**
lift-off after the Valley, then clips in order, ONE protagonist transforming:
1. orbit opener: satellite in profile over golden Earth limb (Terminal-truck
   composition; opens M2 only — site still opens on M1 Earth)
2. satellite → logo-delta JET descending through clouds (jet silhouette
   extruded from public/logo.svg geometry — "it's our logo")
3. golden ocean surface + distant destroyer silhouette
   (base clip DONE: public/videos/ocean.mp4 — needs destroyer re-render)
4. seabed cable, gold data-pulse traveling its length (frames_seabed/ →
   public/videos/seabed.mp4)
5. cyber: X-ray wireframe dissolve (blender-cinematic-fx skill §6 — the
   half-transformed reveal recipe)
Currently the site still runs realtime EnvironmentJourney.astro for M2 —
replaced by these <video> beats once clips exist (Terminal-style: muted
playsinline looping videos crossfaded by ScrollTrigger; CSP media-src 'self'
is fine).

**M3 — JOIN:** world dissolves → "Join the first cohort." CTA → big serif
footer wordmark.

Protagonist on the page (Protagonist.astro, realtime Voyager GLB) still
rides M1/M3; in M2 the protagonist lives INSIDE the rendered clips.

## RENDER PIPELINE (Blender 5.1.2 headless — proven loop)

`/Applications/Blender.app/Contents/MacOS/Blender -b -P tools/render/<shot>.py`
- PREVIEW=1 → single 960x540 still → tools/render/out/<shot>_preview.png →
  Read the PNG → tweak constants → repeat until art-approved.
- Full: 240 frames PNG (1920x1080) → ffmpeg:
  ffmpeg -y -framerate 30 -i frames/<shot>_%04d.png -c:v libx264 -crf 20
  -pix_fmt yuv420p -movflags +faststart public/videos/<shot>.mp4
- Scripts so far: tools/render/ocean.py (approved), seabed.py (approved).
- Skills installed (~/.claude/skills, security-audited): blender-pro-workflow,
  -lighting, -cameras, -materials, -rendering, etc. + blender-cinematic-fx
  (ocean §4, god rays §5, X-RAY TRANSFORM §6, headless §7). Consult via the
  Skill tool before each new shot.
- Assets: tools/render/venice_sunset_2k.hdr (CC0); NASA-3D-Resources .blend
  models (web Voyager already at public/models/satellite.glb).

**Blender 5.1 API traps (already solved — don't re-hit):**
- 'NISHITA' gone → sky_type='MULTIPLE_SCATTERING'; dust_density→aerosol_density
- Action.fcurves REMOVED → set
  preferences.edit.keyframe_new_interpolation_type='LINEAR' BEFORE keyframing
- scene.node_tree → scene.compositing_node_group (Glare API changed too;
  bloom skipped for now — AgX handles glints)
- VIDEO EXPORT REMOVED → render PNG frames, encode with ffmpeg
  (/opt/homebrew/bin/ffmpeg)

**Look targets:** AgX, exposure −0.25..0.2; water base (0.004,0.010,0.016)
rough 0.08; sky sun_elevation 0.035, aerosol 1.6, bg strength 0.55; 12km
far-field plane hides ocean tile edge; seabed bg (0.010,0.026,0.030), 60kW
spot shaft, volume density 0.026, pulse emission (1.0,0.72,0.30)x14.
House palette: ink #232020 / paper #F2EDE3 / gold #C9A958.

## STATUS / NEXT QUEUE
1. seabed full render+encode (bg job bj9bkuvxk; if missing rerun + ffmpeg)
2. orbit.py — M2 opener (satellite profile, Earth limb glow, stars)
3. clouds.py — logo-delta jet through cloud billboards
4. ocean re-render with destroyer silhouette
5. cyber.py — X-ray dissolve per cinematic-fx §6
6. Wire M2 as scroll-sequenced <video> beats replacing EnvironmentJourney
   (keep altimeter + captions as DOM overlays)
7. Then: mobile pass, reduced-motion checks, replace /contact
   rocket-launch.jpg (SpaceX CC BY-NC), about/contact hero variation.

## WEB-SIDE FACTS
DIRECTION.md = design bible (Golden Hour; ink/paper/gold; t-* type scale; no
decals/ordinals/neon — tasks/lessons.md = banned AI-design tells).
index.astro composes: Protagonist, EarthDive, seam, MapScene,
EnvironmentJourney (to be replaced), CTA (#join), ConsoleFooter.
GSAP+Lenis in BaseLayout (console theme); [data-reveal] line masks;
.has-motion gates motion CSS. Web gotchas: never loading="lazy" inside
transformed strips; never inline transform + GSAP yPercent on one element.
