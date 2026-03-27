import { useState } from "react";
import FadeIn from "../ui/fade-in";

const focusAreas = [
  {
    num: "01",
    title: "Speaker Series",
    desc: "Defense-tech founders, operators, and policymakers share how technology is reshaping national security.",
  },
  {
    num: "02",
    title: "Hackathons",
    desc: "Team-based sprints on real-world security challenges. Build prototypes, deliver actionable outcomes.",
  },
  {
    num: "03",
    title: "Government & Industry Projects",
    desc: "Get paired with defense and intelligence organizations to work on live problems. Real projects, not hypotheticals.",
  },
  {
    num: "04",
    title: "Policy & Strategy",
    desc: "Interdisciplinary discussions on AI governance, export controls, and the future of deterrence.",
  },
];

function FocusAccordion() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (num: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      return next;
    });
  };

  return (
    <div>
      {focusAreas.map((area) => {
        const isOpen = openItems.has(area.num);
        return (
          <FadeIn key={area.num}>
            <div
              className="cursor-pointer border-b border-light-gray py-6 transition-colors hover:border-near-black"
              onClick={() => toggle(area.num)}
            >
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-mid-gray font-mono">
                    {area.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display text-near-black">
                    {area.title}
                  </h3>
                </div>
                <svg
                  className={`w-5 h-5 text-mid-gray transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div
                className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
              >
                <p className="text-mid-gray leading-relaxed text-[15px] max-w-lg ml-[calc(1.1em+1.5rem)]">
                  {area.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

export default function Sections() {
  return (
    <>
      {/* --- Mission statement --- */}
      <section className="py-32 sm:py-40 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-near-black max-w-2xl leading-[1.15]">
              We connect students with the people and problems shaping national security.
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 text-mid-gray text-lg max-w-lg leading-relaxed font-light">
              Not a club. A working group of engineers, designers, and policy
              thinkers applying startup methodologies to defense challenges.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- Booster catch image --- */}
      <section className="px-6 sm:px-12 pb-8">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-lg" style={{ height: "60vh", minHeight: "400px" }}>
              <img
                src="/images/rocket-launch.jpg"
                alt="SpaceX Falcon Heavy launch"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-10">
                <h3 className="text-2xl sm:text-3xl font-display text-white max-w-md">
                  Building at the intersection of technology and national defense
                </h3>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- Focus areas, accordion --- */}
      <section id="focus-areas" className="py-32 sm:py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display text-near-black leading-[1.15] mb-12">
              Four focus areas
            </h2>
          </FadeIn>
          <FocusAccordion />
        </div>
      </section>

      {/* --- Two images: satellite + drone --- */}
      <section className="px-6 sm:px-12 py-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn direction="left">
            <div className="relative overflow-hidden rounded-lg" style={{ height: "50vh", minHeight: "350px" }}>
              <img
                src="/images/satellite.jpg"
                alt="Satellite in orbit"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-display text-white max-w-xs">
                  From campus to the front lines of innovation
                </h3>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={150}>
            <div className="relative overflow-hidden rounded-lg" style={{ height: "50vh", minHeight: "350px" }}>
              <img
                src="/images/reaper-drone.jpg"
                alt="MQ-9 Reaper drone in flight"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-display text-white max-w-xs">
                  Real-world problems, real stakeholders
                </h3>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- CTA with background image + Contact --- */}
      <section id="contact" className="mx-6 sm:mx-12 rounded-lg overflow-hidden relative my-12">
        <img
          src="/images/falcon9.jpg"
          alt="Falcon 9 launch"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 py-24 sm:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={100}>
              <h2 className="text-3xl sm:text-4xl text-white font-display">
                Build things that matter
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-white/50 mt-6 mb-12 text-lg leading-relaxed font-light max-w-xl mx-auto">
                Engineers, designers, and policy thinkers working on real problems
                for real stakeholders.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <a
                href="/join"
                className="inline-block bg-white text-near-black px-10 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] hover:bg-light-gray transition-colors"
              >
                Join Us
              </a>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="mt-16 pt-12 border-t border-white/10 flex items-center justify-center gap-8">
                <a
                  href="https://www.instagram.com/sjsunsin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-[13px] uppercase tracking-[0.15em]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/sjsu-nsin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-[13px] uppercase tracking-[0.15em]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
