import { useState } from "react";
import FadeIn from "../ui/fade-in";

const focusAreas = [
  {
    num: "01",
    title: "Speaker Series",
    desc: "Defense-tech leaders, policymakers, and intelligence community veterans share how technology is reshaping national security.",
    image: "/images/speaker-podium.jpg",
    tall: true,
  },
  {
    num: "02",
    title: "Build & Compete",
    desc: "Prototype sprints and challenge competitions tackling real Department of Defense problems. Preparation pipeline for the National Security Hackathon.",
    image: "/images/mission-control.jpg",
    tall: false,
  },
  {
    num: "03",
    title: "Government & Industry Projects",
    desc: "Get paired with defense and intelligence organizations to work on live problems. Experiential learning, not hypotheticals.",
    image: "/images/satellite.jpg",
    tall: false,
  },
  {
    num: "04",
    title: "Policy & Strategy",
    desc: "Interdisciplinary discussions on AI governance, export controls, and the future of deterrence.",
    image: "/images/capitol.jpg",
    tall: true,
  },
];

function FocusCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Split into two columns for proper alignment
  const leftCol = [focusAreas[0], focusAreas[2]]; // 01 tall, 03 short
  const rightCol = [focusAreas[1], focusAreas[3]]; // 02 short, 04 tall

  const renderCard = (area: typeof focusAreas[0]) => {
    const isOpen = expanded === area.num;
    return (
      <div
        key={area.num}
        className="relative overflow-hidden rounded-lg cursor-pointer group"
        style={{ height: area.tall ? "340px" : "240px" }}
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
            <h3 className="text-lg sm:text-xl font-display text-white">
              {area.title}
            </h3>
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
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Left column: tall then short */}
      <div className="flex flex-col gap-3">
        {leftCol.map(renderCard)}
      </div>
      {/* Right column: short then tall */}
      <div className="flex flex-col gap-3">
        {rightCol.map(renderCard)}
      </div>
    </div>
  );
}

export default function Sections() {
  return (
    <>
      {/* --- The Mission --- */}
      <section className="px-4 sm:px-8 mt-12 mb-12">
        <FadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-none" style={{ height: "70vh", minHeight: "500px" }}>
              <img
                src="/images/f117.jpg"
                alt="F-117 Nighthawk"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-14 z-10 max-w-2xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 mb-4">
                  The Mission
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white leading-[1.15] mb-5">
                  The best tech talent and the hardest problems are separated by a single gap: access.
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  NSIN at SJSU connects engineers, designers, and strategists directly to the people defending the country — through real projects, real challenges, and real relationships.
                </p>
                <a
                  href="/about"
                  className="inline-block text-[13px] font-medium uppercase tracking-[0.15em] text-white border-b border-white/50 pb-1 hover:border-white transition-colors"
                >
                  Learn our story
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- Focus areas with images --- */}
      <section id="focus-areas" className="py-16 sm:py-24 px-4 bg-white">
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
      <section id="join-us" className="mx-4 sm:mx-8 rounded-none overflow-hidden relative my-12">
        <img
          src="/images/falcon9.jpg"
          alt="Falcon 9 launch"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 py-32 sm:py-44 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={100}>
              <h2 className="text-3xl sm:text-5xl text-white font-display">
                Build things that matter
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-white/50 mt-8 mb-12 text-lg leading-relaxed max-w-xl mx-auto">
                Engineers, designers, and policy thinkers working on real problems
                that our country can't afford to ignore.
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
