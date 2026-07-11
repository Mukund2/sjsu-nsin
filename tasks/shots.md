# SHOT BIBLE — AI video pipeline (Replicate / Wan 2.2)
User-approved 2026-06-11. Read with tasks/HANDOFF.md. DO NOT improvise outside this file.

## LOCKED STRUCTURE (user, 2026-06-13) — THE WHITE-OUT IS THE HINGE
The ENTIRE journey is ONE continuous fall that PAUSES in the white for the club
story, then resumes downward:
  SPACE (orbit, descends) -> AIR (jets, descends) -> BREAKTHROUGH (dive into
  cloud white-out, lands on paper #F2EDE3)
  -> [CLUB CONTENT lives ON the white/paper: who we are, what we do, first-year]
  -> the SAME white keeps descending: WHITE -> clears through haze -> SEA
     (destroyer on golden ocean) -> JOIN.
The white-out is BOTH the arrival (club content sits in it) AND the departure
(it continues down into the sea). Continuity contract: descent clips end on
paper white; the sea clip STARTS on paper white (first_image = paper-end.jpg)
and clears down to the ocean. So every clip chains into one shot, the club
content being the held breath in the middle.

## Global style lock (append to every still prompt)
"cinematic 35mm film still, muted desaturated grade, warm charcoal shadows,
cream highlights, subtle film grain, no text, no watermark"
Palette targets: ink #232020 (shadows), paper #F2EDE3 (highlights/white-out),
gold #C9A958 (sun/brass accents). After generation, grade every still with the
house sharp curve (linear 0.94,14 · sat 0.85 · warm recomb · q80 mozjpeg).

## PROVEN CONTINUOUS CHAIN (2026-06-13) — NO DISSOLVES, seeded hard cuts only
A dissolve = two shots blended = NOT one shot. The journey is built by seeding
each clip's first frame from the PRIOR clip's actual last frame, then HARD-CUT
concatenating (ffmpeg concat filter, no xfade). Frame-matched joins are
invisible AND the camera motion carries through. Working draft clips:
  1. d-s1h.mp4    orbit, satellite drifts in, camera tilts down (seed: s1-f.jpg)
  2. d-dive-a.mp4 SEED=s1h lastframe → steep plunge from orbit down to the jets
     (satellite drifts out top, two jets appear over cloud deck). sample_shift 16.
  3. d-s3c.mp4    SEED=dive-a lastframe → dive PAST jets through clouds to white;
     last_image=paper-end.jpg so it lands on #F2EDE3.
  4. [CLUB CONTENT on the white]
  5. d-s4b.mp4    SEED=paper-end.jpg → white haze clears, descends to ocean +
     destroyer (last_image=s4-a.jpg).
Assembled: public/drafts/JOURNEY-CONTINUOUS.mp4 (concat n=4, hard cuts).
Strong downward motion needs sample_shift ~16 + "plunge/dive/falling, no
dissolve" language. The OLD separate jets clip (d-s2) is RETIRED — dive-a
replaces it. Finals: redo this exact chain at 720p on wan-2.2-i2v-a14b w/
negative_prompt to kill sun light-shafts; grab last frames at full res between
each stage.

## Engineering rules
- i2v preserves the input still as FRAME 1 → the still IS the art direction.
- wan-2.2-i2v-fast ALSO takes `last_image` → BOTH endpoints of a clip are
  pinnable. Use it to lock seams: Shot 3's last_image is a SYNTHETIC flat
  #F2EDE3 paper frame w/ faint noise (built w/ sharp, /tmp/nsin-stills/
  paper-end.jpg) so the white-out lands on the exact paper hex IN the video.
- Replicate accepts data URIs for input images (<1MB) — no GitHub push needed.
- macOS system python3 lacks SSL certs → drive the API via curl subprocess
  (script: /tmp/nsin-stills/gen.py).
- Shot 1 frame 1 = the site's opening image; also used as <video poster> so
  first paint is instant and identical.
- Exact-color landings are done in CSS, never by the model: Shot 3 ends
  "soft warm white-out", then a CSS overlay fades to var(--color-paper)
  #F2EDE3 over the last beat (existing flash mechanism).
- Negative prompt everywhere: "text, captions, watermark, logo, UI, jitter,
  warping, morphing, extra objects, people"
- Drafts: wan-video/wan-2.2-i2v-fast 480p. Finals: wan-2.2-i2v-a14b 720p.
  Backup if motion fails twice: kwaivgi/kling-v2.1.
- Last-frame grab for chaining: ffmpeg -sseof -0.1 -i in.mp4 -frames:v 1 out.png

## SHOT 1 — ORBIT (opening; replaces orbit.mp4)
First frame (FLUX, THE most important image on the site):
  Earth's curved limb crossing the lower third, warm amber sunlight grazing
  cloud bands, thin atmosphere glowing pale gold along the curve, terminator
  shading into warm darkness at frame right, deep warm-black space above with
  faint stars, sun glow just below the limb at left. NO satellite in frame 1.
Motion (Wan):
  Slow orbital drift, camera glides gently right above the curved horizon.
  A small satellite with two gold solar panels drifts in from upper left,
  catching warm sunlight, rotating almost imperceptibly. Cloud bands move
  very slowly. In the final second the camera begins a slow pitch DOWN toward
  the glowing atmosphere (sets up the descent). Steady, no cuts.
End state: pitched slightly down, atmosphere glow brightening lower frame.

## SHOT 2 — JETS (replaces clouds.mp4)
Seed: Shot 1's last frame IF it reads as bright hazy descent; otherwise FLUX:
  High above a sunlit cloud deck at golden hour, cumulus tops like a sea of
  amber and cream, low sun ahead casting long warm light, hazy gold
  atmosphere, deep blue-gray sky above, aerial view, no aircraft in frame 1.
Motion (Wan):
  Two fighter jets enter low-left in close formation, sweep across the cloud
  tops toward the horizon, bank right and recede into the golden haze, thin
  contrails. Camera tracks gently right; clouds drift slowly. Steady, no cuts.
End state: jets receded to specks, open cloud deck (clean seed for Shot 3).

## SHOT 3 — CLOUD BREAKTHROUGH (new; feeds the touchdown flash)
Seed: Shot 2's last frame (hard frame-match — this seam is a straight cut).
Motion (Wan):
  Camera dives forward and down into the cloud deck, accelerating. Cloud
  surfaces rush past, frame fills with bright cream-white mist, growing
  brighter until the ENTIRE frame is a soft warm white-out. Ends fully white.
  No objects.
End state: full-frame warm white → CSS fades var(--color-paper) #F2EDE3 over
it → "Lockheed was here before Google." lands on true paper.

## SHOT 4 — WHITE→SEA (the club->sea continuation; CHAINED, not independent)
first_image = paper-end.jpg (#F2EDE3 white, SAME as where club content ends).
last_image  = s4-a.jpg (golden ocean + destroyer on horizon).
Motion (Wan): camera descends through bright cream-white mist; haze thins and
  clears as it drops, revealing the golden ocean far below with the destroyer
  in dark silhouette on the horizon and a gold sun path on the water.
This makes the white from the club section keep falling straight into the sea.
After it lands on the ocean, the destroyer/sea copy plays, then JOIN.

## Seam map (site layer)
S1→S2: scroll crossfade at descent moment (both frames bright/hazy; altimeter
  + motion mask it). S2→S3: invisible (frame-matched). S3→paper: CSS dissolve
  to #F2EDE3. Paper sections→S4: existing seam-to-ink + video fade-in.
Open question (look test after drafts): does S1 replace realtime EarthDive as
  the site opening, or play after the dive? Decide by eye, user calls it.

## Status / budget
$3.50 credit; ~$0.50 spent on round 1 (8 FLUX stills + 5 fast drafts).
ROUND 1 DONE 2026-06-11 night: all 5 drafts at /tmp/nsin-drafts/ and
public/drafts/ (gitignored). Review page: localhost:4321/drafts/
- S1 candidates: s1-e (sun at limb, clean) + s1-d (more dark space, flare
  streak artifact near end). Stills s1-a/b/c REJECTED (Earth read as Mars —
  prompt must say "deep blue Pacific Ocean, white cloud bands" explicitly).
- Space-shot grade: gentler blue pull (recomb blue 0.94, not 0.86).
- S2 jets + S4 destroyer approved-quality drafts; S3 chain verified:
  d-s2_last.jpg → dive → final frame lands on paper (#F2EDE3 synthetic
  last_image works).
AWAITING USER: pick S1 candidate (E or D), approve all drafts → then 720p
finals via wan-2.2-i2v-a14b, same seeds/prompts, and site wiring.
