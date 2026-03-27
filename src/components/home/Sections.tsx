import { useState } from "react";
import FadeIn from "../ui/fade-in";

const focusAreas = [
  {
    num: "01",
    title: "Speaker Series",
    desc: "Defense-tech founders, operators, and policymakers share how technology is reshaping national security.",
    image: "/images/speaker.jpg",
  },
  {
    num: "02",
    title: "Hackathons",
    desc: "Team-based sprints on real-world security challenges. Build prototypes, deliver actionable outcomes.",
    image: "/images/hackathon.jpg",
  },
  {
    num: "03",
    title: "Government & Industry Projects",
    desc: "Get paired with defense and intelligence organizations to work on live problems.",
    image: "/images/handshake.jpg",
  },
  {
    num: "04",
    title: "Policy & Strategy",
    desc: "Interdisciplinary discussions on AI governance, export controls, and the future of deterrence.",
    image: "/images/capitol.jpg",
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
                    {area.num}
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
      {/* --- Mission --- */}
      <section className="py-24 sm:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-near-black max-w-3xl leading-[1.15]">
              We connect students with the people and problems shaping national security.
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-mid-gray text-lg max-w-lg leading-relaxed">
              Not a club. A working group of engineers, designers, and policy
              thinkers applying startup methodologies to defense challenges.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- F-117 Nighthawk image --- */}
      <section className="px-4 sm:px-8 pb-6">
        <FadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-lg" style={{ height: "55vh", minHeight: "380px" }}>
              <img
                src="/images/f117.jpg"
                alt="F-117 Nighthawk stealth fighter"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-10 z-10">
                <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-2">
                  The Nighthawk
                </p>
                <h3 className="text-2xl sm:text-3xl font-display text-white max-w-md">
                  Stealth, precision, and innovation — the principles behind everything we do
                </h3>
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

      {/* --- Two images --- */}
      <section className="px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          <FadeIn direction="left">
            <div className="relative overflow-hidden rounded-lg" style={{ height: "45vh", minHeight: "320px" }}>
              <img
                src="/images/satellite.jpg"
                alt="Satellite in orbit above Earth"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-display text-white max-w-xs">
                  Space, cyber, and autonomous systems
                </h3>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={150}>
            <div className="relative overflow-hidden rounded-lg" style={{ height: "45vh", minHeight: "320px" }}>
              <img
                src="/images/reaper-drone.jpg"
                alt="MQ-9 Reaper unmanned aerial vehicle"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-display text-white max-w-xs">
                  Unmanned systems and autonomous defense
                </h3>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- CTA Join --- */}
      <section className="mx-4 sm:mx-8 rounded-lg overflow-hidden relative my-10">
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
