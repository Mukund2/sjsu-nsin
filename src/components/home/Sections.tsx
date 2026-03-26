import FadeIn from "../ui/fade-in";

export default function Sections() {
  return (
    <>
      {/* --- Section 1: Mission statement, left-aligned, lots of whitespace --- */}
      <section className="py-32 sm:py-40 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-mid-gray text-[11px] uppercase tracking-[0.3em] font-mono mb-6">
              Our Mission
            </p>
          </FadeIn>
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

      {/* --- Section 2: Contained image, offset --- */}
      <section className="px-6 sm:px-12 pb-8">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-lg" style={{ height: "60vh", minHeight: "400px" }}>
              <img
                src="/images/server-room.jpg"
                alt="Server infrastructure"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- Section 3: Focus areas, asymmetric 2-column --- */}
      <section id="focus-areas" className="py-32 sm:py-40 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Left column: heading */}
            <div className="md:col-span-4">
              <FadeIn>
                <p className="text-mid-gray text-[11px] uppercase tracking-[0.3em] font-mono mb-4">
                  What We Do
                </p>
                <h2 className="text-3xl sm:text-4xl font-display text-near-black leading-[1.15]">
                  Four focus areas
                </h2>
              </FadeIn>
            </div>

            {/* Right column: items */}
            <div className="md:col-span-7 md:col-start-6 space-y-16">
              <FadeIn>
                <div className="group">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-mid-gray font-mono">01</span>
                  <h3 className="text-2xl font-display text-near-black mt-2 mb-3">Speaker Series</h3>
                  <p className="text-mid-gray leading-relaxed text-[15px] max-w-md">
                    Defense-tech founders, operators, and policymakers share how
                    technology is reshaping national security.
                  </p>
                  <div className="mt-6 h-px bg-light-gray group-hover:bg-near-black transition-colors duration-500" />
                </div>
              </FadeIn>

              <FadeIn>
                <div className="group">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-mid-gray font-mono">02</span>
                  <h3 className="text-2xl font-display text-near-black mt-2 mb-3">Hackathons</h3>
                  <p className="text-mid-gray leading-relaxed text-[15px] max-w-md">
                    Team-based sprints on real-world security challenges. Build
                    prototypes, deliver actionable outcomes.
                  </p>
                  <div className="mt-6 h-px bg-light-gray group-hover:bg-near-black transition-colors duration-500" />
                </div>
              </FadeIn>

              <FadeIn>
                <div className="group">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-mid-gray font-mono">03</span>
                  <h3 className="text-2xl font-display text-near-black mt-2 mb-3">Government & Industry Projects</h3>
                  <p className="text-mid-gray leading-relaxed text-[15px] max-w-md">
                    Get paired with defense and intelligence organizations to work
                    on live problems. Real projects, not hypotheticals.
                  </p>
                  <div className="mt-6 h-px bg-light-gray group-hover:bg-near-black transition-colors duration-500" />
                </div>
              </FadeIn>

              <FadeIn>
                <div className="group">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-mid-gray font-mono">04</span>
                  <h3 className="text-2xl font-display text-near-black mt-2 mb-3">Policy & Strategy</h3>
                  <p className="text-mid-gray leading-relaxed text-[15px] max-w-md">
                    Interdisciplinary discussions on AI governance, export controls,
                    and the future of deterrence.
                  </p>
                  <div className="mt-6 h-px bg-light-gray group-hover:bg-near-black transition-colors duration-500" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Two contained images side by side --- */}
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
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={150}>
            <div className="relative overflow-hidden rounded-lg" style={{ height: "50vh", minHeight: "350px" }}>
              <img
                src="/images/circuit-board.jpg"
                alt="Circuit board technology"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Section 5: Pull quote / stat --- */}
      <section className="py-32 sm:py-40 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <p className="text-mid-gray text-[11px] uppercase tracking-[0.3em] font-mono mb-8">
              The Network
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-near-black max-w-3xl mx-auto leading-[1.15]">
              From campus to the front lines of innovation
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 text-mid-gray text-lg max-w-xl mx-auto leading-relaxed font-light">
              Experiential learning on live problems from the national security
              community. Tested in the field, not just on paper.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- Section 6: Dark CTA --- */}
      <section className="mx-6 sm:mx-12 rounded-lg bg-near-black py-24 sm:py-32 px-6 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-mono mb-6">
              Get Started
            </p>
          </FadeIn>
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
        </div>
      </section>
    </>
  );
}
