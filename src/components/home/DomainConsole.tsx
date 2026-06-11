import { useEffect, useRef, useState } from "react";

interface DomainLite {
  slug: string;
  name: string;
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
      className="relative min-h-screen w-full overflow-hidden bg-ink flex flex-col"
      style={{ ["--accent" as string]: active?.accent ?? "#F2EDE3" }}
    >
      {/* resting state */}
      <video
        src="/videos/mechazilla-catch.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* committed domain */}
      {committed && (
        <div className="absolute inset-0">
          <img src={committed.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}

      {/* incoming domain, revealed by the top-to-bottom wipe */}
      {incoming && (
        <div
          className="absolute inset-0"
          style={{
            clipPath: wiping ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            transition: `clip-path ${WIPE_MS}ms cubic-bezier(0.77, 0, 0.18, 1)`,
          }}
        >
          <img src={incoming.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}

      {/* wipe leading edge */}
      {incoming && (
        <div
          className="absolute left-0 right-0 h-px z-20 pointer-events-none"
          style={{
            backgroundColor: incoming.accent,
            top: wiping ? "100%" : "0%",
            transition: `top ${WIPE_MS}ms cubic-bezier(0.77, 0, 0.18, 1)`,
          }}
        />
      )}

      {/* legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

      {/* content */}
      <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-8 pt-28 pb-8 max-w-[1400px] w-full mx-auto">
        <div className="flex-1 flex flex-col justify-center py-10">
          {!active ? (
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl text-paper leading-[1.05] font-display tracking-tight">
                Every domain needs builders.
              </h1>
              <p className="mt-6 text-paper/70 text-lg sm:text-xl max-w-xl leading-relaxed">
                The next era of national security runs on people who can ship.
                Pick where you'd start.
              </p>
            </div>
          ) : (
            <div key={active.slug} className="max-w-3xl">
              <h1 className="text-7xl sm:text-8xl md:text-9xl text-paper leading-[0.95] font-display tracking-tight">
                {active.name}
              </h1>
              <p className="mt-6 text-paper/80 text-lg sm:text-2xl max-w-xl leading-relaxed">
                {active.tagline}
              </p>
              <a
                href={`/domains/${active.slug}`}
                className="mt-9 inline-block bg-paper text-ink px-7 py-3.5 text-[14px] font-medium hover:bg-paper-dim transition-colors"
              >
                Explore {active.name} &rarr;
              </a>
            </div>
          )}
        </div>

        {/* domain selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-paper/20">
          {domains.map((d) => {
            const isActive = active?.slug === d.slug;
            return (
              <button
                key={d.slug}
                onClick={() => select(d)}
                className="group relative text-left px-1 pt-4 pb-5 cursor-pointer"
              >
                <span
                  className="absolute -top-px left-0 right-0 h-px transition-colors duration-300"
                  style={{ backgroundColor: isActive ? d.accent : "transparent" }}
                />
                <span
                  className="block text-2xl sm:text-[1.7rem] font-display tracking-tight transition-colors duration-300"
                  style={{ color: isActive ? d.accent : "rgba(242,237,227,0.75)" }}
                >
                  {d.name}
                </span>
                <span className="mt-0.5 block text-[13px] text-paper/40 group-hover:text-paper/65 transition-colors leading-snug pr-4 hidden sm:block">
                  {d.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
