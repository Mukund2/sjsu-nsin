# HANDOFF — single source of truth (REWRITTEN 2026-06-11 night — supersedes everything)

Branch: redesign/domain-console (pushed). NEVER push/merge main (deploys).
Dev: npm run dev → localhost:4321. Build: npx astro build.
PROCESS RULE (user demand): when sub-agents run, actively monitor mid-flight
(TaskOutput / check their file edits) and redirect via SendMessage the moment
they drift from this file. Re-read this file before launching any agent.

## THE STRUCTURE — NEW CONTRACT (user redirect, replaces all prior structure)
The Valley map/timeline M1 is CUT. No undersea cables (niche). No cyber (not
our thing). No subterranean. Domains = the Anduril triad: SPACE / AIR / SEA.

THE SITE = JOURNEY SPLIT AROUND THE GROUND (user-approved outline):
ACT I (pinned animation): space (Earth + satellite + space copy) -> sky
  (jets + air copy) -> cloud-breakthrough TOUCHDOWN; headline "Lockheed was
  here before Google." lands at touchdown.
ACT II GROUND = THE CLUB (plain sections, scheme-paper, same type/grade):
  who-we-are statement -> four programs editorial rows ("What we do.") ->
  real-footage slot (user shooting club-room phone clip; graded still
  placeholder until then) -> first-year row (Fall '26 / Spring '27).
ACT III (animation resumes): SEA beat = pinned full-bleed ocean.mp4 video
  with sea copy + Explore Sea (destroyer silhouette re-render later).
ACT IV: Join CTA -> footer.
Original notes below still apply where not superseded:
1. OPEN IN SPACE: Earth rotating (realtime three.js EarthDive stays as base).
   Scroll-jacked: a SATELLITE comes into view. Text overlays: SPACE problems
   (domain copy from src/data/domains.ts space entry).
2. DOWN TO THE SKY: fighter jets come into view, fly away as you scroll.
   Text overlays: AIR problems.
3. SEA: ships (destroyer silhouette) on the golden ocean
   (base clip exists: public/videos/ocean.mp4). Text overlays: SEA problems.
4. GROUND/HUMAN BEAT (decision pending user): their club room in the SJSU
   engineering building was floated; HONEST CALL = too hard to animate
   credibly in Blender. RECOMMENDED ALTERNATIVE (Terminal pattern): real
   phone-shot footage of students/campus, graded with the house curve, as a
   normal <video> section — ask user to shoot 10-20s clips, OR use graded
   stills (hackathon.jpg etc.) until footage exists.
5. M3 JOIN: "Join the first cohort." CTA → footer (unchanged).

RENDER SCOPE (reduced): up to THREE clips for the hero sequence —
  orbit/satellite, jets-flythrough, ocean+destroyer. Possibly stitched as
  one continuous scroll film; cyber.py and seabed clip are CANCELLED
  (seabed render killed; frames_seabed + seabed.mp4 unused — keep ocean.mp4).
SITE CLEANUP QUEUE: drop cyber from domains.ts + delete /domains/cyber page
  + nav/footers; journey captions become Space/Air/Sea only; altimeter range
  ends at sea level (no negative depths) unless sea beat wants shallow.

## RENDER PIPELINE (proven — Blender 5.1.2 headless)
/Applications/Blender.app/Contents/MacOS/Blender -b -P tools/render/<shot>.py
PREVIEW=1 → 960x540 still → Read PNG → tweak → repeat; full = 240 PNG frames
1920x1080 → ffmpeg -framerate 30 -i frames/<shot>_%04d.png -c:v libx264
-crf 20 -pix_fmt yuv420p -movflags +faststart public/videos/<shot>.mp4
Scripts: ocean.py (approved, needs destroyer silhouette added),
seabed.py (CANCELLED, keep file for reference).
Skills: ~/.claude/skills blender-* suite + blender-cinematic-fx (§4 ocean,
§7 headless). Consult via Skill tool per shot.
Blender 5.1 traps (solved): NISHITA→MULTIPLE_SCATTERING; dust→aerosol_density;
Action.fcurves removed→set preferences.edit.keyframe_new_interpolation_type
BEFORE keyframing; scene.node_tree→compositing_node_group (bloom skipped);
VIDEO EXPORT REMOVED→PNG frames + ffmpeg (/opt/homebrew/bin/ffmpeg).
Look targets: AgX; sky MULTIPLE_SCATTERING sun_elevation 0.035 aerosol 1.6
bg 0.55; water base (0.004,0.010,0.016) rough 0.08; 12km far-field plane.
Palette ink #232020 / paper #F2EDE3 / gold #C9A958.
Assets: venice_sunset_2k.hdr (CC0); NASA-3D-Resources .blend (Voyager web
GLB at public/models/satellite.glb); logo delta = public/logo.svg.

## NEXT QUEUE (in order)
1. Restructure homepage to the new journey: remove MapScene from index,
   re-point journey captions to Space/Air/Sea, remove cyber beat from
   EnvironmentJourney (it stays as the realtime base under the future clips).
2. Site-wide cyber removal (domains.ts, /domains/cyber, links, footer).
3. orbit.py — satellite into view over rotating Earth (or keep realtime
   satellite via existing web Voyager — decide by look).
4. jets.py — fighter jet(s) (logo-delta extrusion) flying through sky/clouds.
5. ocean.py + destroyer silhouette re-render.
6. Wire clips as scroll-jacked <video> beats w/ text overlays per domain.
7. Ground/human beat per user decision; mobile + reduced-motion pass;
   replace /contact rocket-launch.jpg (SpaceX CC BY-NC).

## WEB FACTS
DIRECTION.md design bible; tasks/lessons.md banned AI tells. index.astro:
Protagonist, EarthDive, seam, MapScene (TO REMOVE), EnvironmentJourney, CTA
(#join), ConsoleFooter. GSAP+Lenis in BaseLayout; .has-motion gating.
Gotchas: no loading="lazy" in transformed strips; no inline transform +
GSAP yPercent on same element.
