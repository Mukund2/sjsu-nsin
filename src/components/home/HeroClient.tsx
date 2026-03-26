import { Spotlight } from "../ui/spotlight";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { GridBackground } from "../ui/grid-background";

export default function HeroClient() {
  return (
    <Spotlight className="relative min-h-screen w-full flex items-center justify-center bg-white">
      <GridBackground />

      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
        <img
          src="/logo.svg"
          alt="SJSU NSIN"
          className="h-12 mx-auto mb-10"
        />

        <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          SJSU
        </p>

        <TextGenerateEffect
          words="National Security Innovation Network"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-near-black leading-tight"
        />

        <p className="mt-6 text-dark-gray text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Bridging Silicon Valley innovation with our nation's most pressing
          security challenges
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/events"
            className="inline-block bg-near-black text-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-dark-gray transition-colors"
          >
            Attend a Meeting
          </a>
          <a
            href="#what-we-do"
            className="inline-block border border-near-black text-near-black px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-near-black hover:text-white transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </Spotlight>
  );
}
