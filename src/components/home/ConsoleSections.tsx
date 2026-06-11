import FadeIn from "../ui/fade-in";

interface DomainLite {
  slug: string;
  name: string;
  designator: string;
  index: string;
  accent: string;
  tagline: string;
  hero: string;
}

const programs = [
  {
    tag: "SPK-01",
    title: "Speaker Series",
    desc: "Defense-tech founders, policymakers, and intelligence veterans on how technology is reshaping national security.",
    image: "/images/speaker-podium.jpg",
  },
  {
    tag: "BLD-02",
    title: "Build & Compete",
    desc: "Prototype sprints and DoD challenge competitions. The preparation pipeline for the National Security Hackathon.",
    image: "/images/hackathon.jpg",
  },
  {
    tag: "GOV-03",
    title: "Government & Industry Projects",
    desc: "Paired with defense and intelligence organizations on live problems. Experiential learning, not hypotheticals.",
    image: "/images/mission-control.jpg",
  },
  {
    tag: "POL-04",
    title: "Policy & Strategy",
    desc: "AI governance, export controls, and the future of deterrence — argued across engineering, business, and political science.",
    image: "/images/capitol.jpg",
  },
];

export default function ConsoleSections({ domains }: { domains: DomainLite[] }) {
  return (
    <>
      {/* ── [ THE GAP ] thesis ── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24">
        <FadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden border border-white/10" style={{ height: "72vh", minHeight: "520px" }}>
              <img
                src="/images/f117.jpg"
                alt="F-117 Nighthawk"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                <p className="decal text-white/50">[ THE GAP ]</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-14 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white leading-[1.12] mb-5">
                  The best tech talent and the hardest problems are separated by a single gap: access.
                </h2>
                <p className="text-white/55 leading-relaxed mb-7 max-w-xl">
                  San Jos&eacute; State sits in the middle of Silicon Valley, surrounded by the
                  companies rebuilding American defense. NSIN at SJSU is the pipeline that
                  connects this campus to those missions. Real projects, real challenges,
                  real relationships.
                </p>
                <a href="/about" className="decal text-white border-b border-white/40 pb-1 hover:border-white transition-colors">
                  Read the briefing &rarr;
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── [ THE DOMAINS ] ── */}
      <section id="domains" className="px-4 sm:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="decal text-white/40 mb-3">[ THE DOMAINS ]</p>
                <h2 className="text-3xl sm:text-5xl font-display text-white leading-tight">
                  Pick where you'd start.
                </h2>
              </div>
              <p className="decal text-white/30 hidden md:block">[ 04 OPERATIONAL DOMAINS ]</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {domains.map((d) => (
                <a
                  key={d.slug}
                  href={`/domains/${d.slug}`}
                  className="group relative bg-near-black overflow-hidden"
                  style={{ ["--accent" as string]: d.accent }}
                >
                  <div className="relative h-[420px]">
                    <img
                      src={d.hero}
                      alt={d.name}
                      loading="lazy"
                      className="mono-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
                    <span
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: d.accent, boxShadow: `0 0 16px 1px ${d.accent}` }}
                    />
                    <div className="absolute top-5 left-5">
                      <p className="decal text-white/45">[ {d.designator} ]</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="decal mb-2 transition-colors duration-300 text-white/40 group-hover:text-accent">
                        {d.index} / 04
                      </p>
                      <h3 className="text-3xl font-display text-white uppercase tracking-tight">{d.name}</h3>
                      <p className="mt-2 text-sm text-white/50 leading-snug max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        {d.tagline}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── [ THE PROGRAMS ] designator rows ── */}
      <section id="programs" className="px-4 sm:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="decal text-white/40 mb-3">[ THE PROGRAMS ]</p>
            <h2 className="text-3xl sm:text-5xl font-display text-white leading-tight mb-10">
              Four ways in.
            </h2>
          </FadeIn>
          <div className="border-t border-white/10">
            {programs.map((p, i) => (
              <FadeIn key={p.tag} delay={i * 80}>
                <div className="group grid grid-cols-1 md:grid-cols-[140px_1fr_300px] gap-5 md:gap-8 items-center border-b border-white/10 py-7 md:py-6">
                  <p className="decal text-white/35 group-hover:text-white transition-colors">[ {p.tag} ]</p>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display text-white/85 group-hover:text-white transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/45 leading-relaxed max-w-xl">{p.desc}</p>
                  </div>
                  <div className="relative overflow-hidden border border-white/10 aspect-video md:h-[150px] md:aspect-auto">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="mono-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── [ COHORT-01 ] CTA ── */}
      <section id="join-us" className="mx-4 sm:mx-8 overflow-hidden relative my-12 border border-white/10">
        <img
          src="/images/falcon9.jpg"
          alt="Falcon 9 launch"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 py-32 sm:py-44 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="decal text-sjsu-gold mb-6">[ COHORT-01 // APPLICATIONS OPEN — FALL 2026 ]</p>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-4xl sm:text-6xl text-white font-display">Join the first cohort.</h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-white/55 mt-7 mb-12 text-lg leading-relaxed max-w-xl mx-auto">
                Engineers, designers, and policy thinkers working on problems the country
                can't afford to ignore. No experience required. Conviction required.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <a
                href="https://forms.gle/9MLweCMRaaTkrEkGA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-near-black px-10 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] hover:bg-light-gray transition-colors"
              >
                Apply &mdash; Cohort 01
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── giant closing slogan ── */}
      <section className="py-20 sm:py-28 px-4 text-center overflow-hidden">
        <FadeIn>
          <p className="decal text-white/30 mb-8">[ END BRIEFING ]</p>
          <h2 className="font-display text-white leading-[0.95] tracking-tight text-[11vw] sm:text-[9vw]">
            Every domain.
            <br />
            One campus.
          </h2>
        </FadeIn>
      </section>
    </>
  );
}
