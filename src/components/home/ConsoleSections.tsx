import FadeIn from "../ui/fade-in";

const programs = [
  {
    num: "01",
    title: "Speaker Series",
    desc: "Defense-tech founders, policymakers, and intelligence veterans on how technology is reshaping national security.",
    image: "/images/speaker-podium.jpg",
  },
  {
    num: "02",
    title: "Build & Compete",
    desc: "Prototype sprints and DoD challenge competitions. The preparation pipeline for the National Security Hackathon.",
    image: "/images/hackathon.jpg",
  },
  {
    num: "03",
    title: "Government & Industry Projects",
    desc: "Paired with defense and intelligence organizations on live problems. Experiential learning, not hypotheticals.",
    image: "/images/mission-control.jpg",
  },
  {
    num: "04",
    title: "Policy & Strategy",
    desc: "AI governance, export controls, and the future of deterrence — argued across engineering, business, and political science.",
    image: "/images/capitol.jpg",
  },
];

export default function ConsoleSections() {
  return (
    <>
      {/* thesis */}
      <section className="px-4 sm:px-8 py-16 sm:py-24">
        <FadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden" style={{ height: "72vh", minHeight: "520px" }}>
              <img
                src="/images/f117.jpg"
                alt="F-117 Nighthawk"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-14 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-paper leading-[1.12] mb-5">
                  The best tech talent and the hardest problems are separated by a single gap: access.
                </h2>
                <p className="text-paper/65 leading-relaxed mb-7 max-w-xl">
                  San Jos&eacute; State sits in the middle of Silicon Valley, surrounded by the
                  companies rebuilding American defense. NSIN at SJSU is the pipeline that
                  connects this campus to those missions. Real projects, real challenges,
                  real relationships.
                </p>
                <a href="/about" className="text-[14px] text-paper border-b border-paper/40 pb-1 hover:border-paper transition-colors">
                  More about the club &rarr;
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* programs — warm paper scheme */}
      <section id="programs" className="bg-paper py-20 sm:py-28 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display text-ink leading-tight mb-4">
              Four ways in.
            </h2>
            <p className="text-ink/60 max-w-xl mb-12">
              Whatever you study, there's a seat. Engineers build, writers argue,
              and everyone ships something real by the end of the semester.
            </p>
          </FadeIn>
          <div className="border-t border-ink/15">
            {programs.map((p, i) => (
              <FadeIn key={p.num} delay={i * 80}>
                <div className="group grid grid-cols-1 md:grid-cols-[64px_1fr_300px] gap-5 md:gap-10 items-center border-b border-ink/15 py-8">
                  <p className="font-display text-2xl text-ink/35">{p.num}</p>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-ink/60 leading-relaxed max-w-xl">{p.desc}</p>
                  </div>
                  <div className="relative overflow-hidden aspect-video md:h-[150px] md:aspect-auto">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* cohort CTA */}
      <section id="join-us" className="relative overflow-hidden">
        <img
          src="/images/falcon9.jpg"
          alt="Falcon 9 launch"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 py-32 sm:py-44 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-4xl sm:text-6xl text-paper font-display">Join the first cohort.</h2>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="text-paper/70 mt-7 mb-12 text-lg leading-relaxed max-w-xl mx-auto">
                Engineers, designers, and policy thinkers working on problems the
                country can't afford to ignore. Applications open fall 2026 —
                no experience required.
              </p>
            </FadeIn>
            <FadeIn delay={250}>
              <a
                href="https://forms.gle/9MLweCMRaaTkrEkGA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-paper text-ink px-9 py-3.5 text-[14px] font-medium hover:bg-paper-dim transition-colors"
              >
                Apply to Cohort 01
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
