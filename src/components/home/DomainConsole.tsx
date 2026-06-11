import { useEffect, useRef, useState } from "react";

interface DomainLite {
  slug: string;
  name: string;
  accent: string;
  tagline: string;
  hero: string;
}

const WIPE_MS = 850;

export default function DomainConsole({ domains }: { domains: DomainLite[] }) {
  // committed = the domain currently shown; incoming = mid-wipe
  const [committed, setCommitted] = useState<DomainLite>(domains[0]);
  const [incoming, setIncoming] = useState<DomainLite | null>(null);
  const [wiping, setWiping] = useState(false);
  const wipeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = incoming ?? committed;

  const select = (d: DomainLite) => {
    if (active.slug === d.slug) return;
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
    <div className="relative min-h-[88vh] w-full overflow-hidden bg-ink flex flex-col">
      {/* committed domain */}
      <img src={committed.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* incoming domain, revealed by the top-to-bottom wipe */}
      {incoming && (
        <div
          className="absolute inset-0"
          style={{
            clipPath: wiping ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            transition: `clip-path ${WIPE_MS}ms cubic-bezier(0.87, 0, 0.13, 1)`,
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
            transition: `top ${WIPE_MS}ms cubic-bezier(0.87, 0, 0.13, 1)`,
          }}
        />
      )}

      {/* legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30" />

      {/* content */}
      <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-10 pt-16 pb-8 max-w-[1500px] w-full mx-auto">
        <div className="flex-1 flex flex-col justify-end pb-10" key={active.slug}>
          <h3 className="t-h1 text-paper">{active.name}</h3>
          <p className="t-lede mt-4 text-paper/80 max-w-[36ch]">{active.tagline}</p>
          <a
            href={`/domains/${active.slug}`}
            className="press mt-8 inline-block w-fit bg-paper text-ink px-7 py-3.5 text-[15px] font-medium"
          >
            Explore {active.name} &rarr;
          </a>
        </div>

        {/* domain selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-paper/25">
          {domains.map((d) => {
            const isActive = active.slug === d.slug;
            return (
              <button
                key={d.slug}
                onClick={() => select(d)}
                className="group relative text-left pr-4 pt-4 pb-5 cursor-pointer"
              >
                <span
                  className="absolute -top-px left-0 right-4 h-px transition-colors duration-300"
                  style={{ backgroundColor: isActive ? d.accent : "transparent" }}
                />
                <span
                  className="t-h3 block transition-colors duration-300"
                  style={{ color: isActive ? d.accent : "rgba(242,237,227,0.7)" }}
                >
                  {d.name}
                </span>
                <span className="t-caption mt-1 text-paper/45 group-hover:text-paper/70 transition-colors leading-snug hidden sm:block">
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
