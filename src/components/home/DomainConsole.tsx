import { useEffect, useRef, useState } from "react";
import { EncryptedText } from "../ui/encrypted-text";

interface DomainLite {
  slug: string;
  name: string;
  designator: string;
  index: string;
  accent: string;
  accentSoft: string;
  tagline: string;
  hero: string;
}

const WIPE_MS = 850;

export default function DomainConsole({ domains }: { domains: DomainLite[] }) {
  // committed = the domain currently shown; incoming = mid-wipe
  const [committed, setCommitted] = useState<DomainLite | null>(null);
  const [incoming, setIncoming] = useState<DomainLite | null>(null);
  const [wiping, setWiping] = useState(false);
  const wipeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = incoming ?? committed;

  const select = (d: DomainLite) => {
    if (active?.slug === d.slug) return;
    if (wipeTimer.current) clearTimeout(wipeTimer.current);
    setIncoming(d);
    setWiping(false);
    // double rAF so the un-wiped state paints before the transition starts
    requestAnimationFrame(() => requestAnimationFrame(() => setWiping(true)));
    wipeTimer.current = setTimeout(() => {
      setCommitted(d);
      setIncoming(null);
      setWiping(false);
    }, WIPE_MS + 60);
  };

  useEffect(() => () => {
    if (wipeTimer.current) clearTimeout(wipeTimer.current);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-near-black flex flex-col"
      style={{ ["--accent" as string]: active?.accent ?? "#FFFFFF" }}
    >
      {/* ── layer 0: monochrome resting state — color belongs to the domain ── */}
      <video
        src="/videos/mechazilla-catch.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(1) contrast(1.05)" }}
      />

      {/* ── layer 1: committed domain ── */}
      {committed && (
        <div className="absolute inset-0">
          <img src={committed.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: committed.accentSoft }} />
        </div>
      )}

      {/* ── layer 2: incoming domain, revealed by the top→bottom wipe ── */}
      {incoming && (
        <div
          className="absolute inset-0"
          style={{
            clipPath: wiping ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            transition: `clip-path ${WIPE_MS}ms cubic-bezier(0.77, 0, 0.18, 1)`,
          }}
        >
          <img src={incoming.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: incoming.accentSoft }} />
        </div>
      )}

      {/* wipe leading edge — thin accent scanline sweeping down */}
      {incoming && (
        <div
          className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
          style={{
            backgroundColor: incoming.accent,
            boxShadow: `0 0 24px 2px ${incoming.accent}`,
            top: wiping ? "100%" : "0%",
            transition: `top ${WIPE_MS}ms cubic-bezier(0.77, 0, 0.18, 1)`,
          }}
        />
      )}

      {/* darkening for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />

      {/* ── content ── */}
      <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-8 pt-24 pb-6 max-w-[1400px] w-full mx-auto">
        {/* status line */}
        <div className="flex items-center justify-between">
          <p className="decal text-white/40">[ SJSU-NSIN // SAN JOS&Eacute;, CA ]</p>
          <p className="decal text-white/40 hidden sm:block">
            {active ? `[ ${active.designator} // FEED ACTIVE ]` : "[ AWAITING DOMAIN SELECT ]"}
          </p>
        </div>

        {/* headline */}
        <div className="flex-1 flex flex-col justify-center py-10">
          {!active ? (
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-8xl text-white leading-[1.02] font-display tracking-tight">
                <EncryptedText text="Every domain needs builders." duration={1400} className="font-display" />
              </h1>
              <p className="mt-7 text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed">
                The next era of national security runs on people who can ship.
                Four operational domains. One campus. Pick where you'd start.
              </p>
            </div>
          ) : (
            <div key={active.slug} className="max-w-4xl">
              <p className="decal mb-4" style={{ color: active.accent }}>
                [ {active.designator} // OPERATIONAL DOMAIN {active.index} / 04 ]
              </p>
              <h1 className="text-7xl sm:text-8xl md:text-9xl text-white leading-[0.95] font-display tracking-tight uppercase">
                <EncryptedText text={active.name} duration={700} className="font-display" />
              </h1>
              <p className="mt-6 text-white/75 text-lg sm:text-2xl max-w-xl leading-relaxed">
                {active.tagline}
              </p>
              <a
                href={`/domains/${active.slug}`}
                className="mt-9 inline-flex items-center gap-3 decal text-near-black px-7 py-3.5 font-medium transition-transform hover:translate-x-1"
                style={{ backgroundColor: active.accent }}
              >
                Enter domain <span aria-hidden>&rarr;</span>
              </a>
            </div>
          )}
        </div>

        {/* domain selector */}
        <div>
          <p className="decal text-white/40 mb-3">[ SELECT DOMAIN ]</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {domains.map((d) => {
              const isActive = active?.slug === d.slug;
              return (
                <button
                  key={d.slug}
                  onClick={() => select(d)}
                  className="group relative text-left bg-near-black/80 backdrop-blur-sm px-5 py-5 transition-colors duration-300 hover:bg-near-black/60 cursor-pointer"
                >
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? d.accent : "transparent",
                      boxShadow: isActive ? `0 0 16px 1px ${d.accent}` : "none",
                    }}
                  />
                  <span className="decal text-white/35 group-hover:text-white/60 transition-colors block">
                    [{d.index}]
                  </span>
                  <span
                    className="mt-1.5 block text-xl sm:text-2xl font-display uppercase tracking-tight transition-colors duration-300"
                    style={{ color: isActive ? d.accent : "rgba(255,255,255,0.85)" }}
                  >
                    {d.name}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="decal text-white/30">[ OR SCROLL FOR BRIEFING &darr; ]</p>
            <p className="decal text-white/30 hidden sm:block">[ COHORT-01 // FALL 2026 ]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
