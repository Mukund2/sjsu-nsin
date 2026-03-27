import { useState } from "react";
import FadeIn from "../ui/fade-in";

const focusAreas = [
  {
    num: "01",
    title: "Speaker Series",
    desc: "Defense-tech leaders, policymakers, and intelligence community veterans share how technology is reshaping national security.",
    image: "/images/speaker-podium.jpg",
    when: "Fall & Spring",
  },
  {
    num: "02",
    title: "Hackathons",
    desc: "Build working prototypes for real Department of Defense challenge problems. Prepare for Stanford's Hacking for Defense program.",
    image: "/images/mission-control.jpg",
    when: "Spring",
  },
  {
    num: "03",
    title: "Government & Industry Projects",
    desc: "Get paired with defense and intelligence organizations to work on live problems. Experiential learning, not hypotheticals.",
    image: "/images/satellite.jpg",
    when: "Fall & Spring",
  },
  {
    num: "04",
    title: "Policy & Strategy",
    desc: "Interdisciplinary discussions on AI governance, export controls, and the future of deterrence.",
    image: "/images/capitol.jpg",
    when: "Year-round",
  },
];

function FocusCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {focusAreas.map((area) => {
        const isOpen = expanded === area.num;
        return (
          <div
            key={area.num}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            style={{ height: area.num === "01" || area.num === "04" ? "320px" : "260px" }}
            onClick={() => setExpanded(isOpen ? null : area.num)}
          >
            <img
              src={area.image}
              alt={area.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-mono">
                    {area.when}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display text-white mt-1">
                    {area.title}
                  </h3>
                </div>
                <svg
                  className={`w-5 h-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div
                className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-32 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
              >
                <p className="text-white/70 text-sm leading-relaxed">
                  {area.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Sections() {
  return (
    <>
      {/* --- F-117 with mission text overlay --- */}
      <section className="px-4 sm:px-8 pt-6 pb-6">
        <FadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-lg" style={{ height: "70vh", minHeight: "500px" }}>
              <img
                src="/images/f117.jpg"
                alt="F-117 Nighthawk"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-14 z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white max-w-2xl leading-[1.15] mb-4">
                  We connect students with the people and problems shaping national security.
                </h2>
                <p className="text-white/60 text-lg max-w-lg leading-relaxed">
                  A working group of engineers, designers, and policy thinkers
                  applying startup methodologies to defense challenges at San Jose
                  State University.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- Focus areas with images --- */}
      <section id="focus-areas" className="py-24 sm:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display text-near-black leading-[1.15] mb-10">
              Four focus areas
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <FocusCards />
          </FadeIn>
        </div>
      </section>

      {/* --- CTA Join --- */}
      <section id="join-us" className="mx-4 sm:mx-8 rounded-lg overflow-hidden relative my-10">
        <img
          src="/images/falcon9.jpg"
          alt="Falcon 9 launch"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 py-20 sm:py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={100}>
              <h2 className="text-3xl sm:text-4xl text-white font-display">
                Build things that matter
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-white/50 mt-6 mb-10 text-lg leading-relaxed max-w-xl mx-auto">
                Engineers, designers, and policy thinkers working on real problems
                for real stakeholders.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <a
                href="https://forms.gle/9MLweCMRaaTkrEkGA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-near-black px-10 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] hover:bg-light-gray transition-colors"
              >
                Join Us
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
