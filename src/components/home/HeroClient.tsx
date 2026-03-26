import { Spotlight } from "../ui/spotlight";
import { EncryptedText } from "../ui/encrypted-text";
import { ElevatingGrid } from "../ui/elevating-grid";

export default function HeroClient() {
  return (
    <Spotlight className="relative min-h-screen w-full flex items-center justify-center bg-white">
      <ElevatingGrid />

      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
        <p className="text-near-black text-xs font-semibold uppercase tracking-[0.3em] mb-6 font-mono">
          SJSU
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-near-black leading-[1.1] font-display tracking-tight">
          <EncryptedText
            text="National Security Innovation Network"
            speed={25}
            className="font-display"
          />
        </h1>

        <p className="mt-8 text-dark-gray text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Bridging Silicon Valley innovation with our nation's most pressing
          security challenges
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/join"
            className="inline-block bg-near-black text-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-dark-gray transition-colors font-display"
          >
            Get Involved
          </a>
          <a
            href="#what-we-do"
            className="inline-block border border-near-black text-near-black px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-near-black hover:text-white transition-colors font-display"
          >
            Learn More
          </a>
        </div>
      </div>
    </Spotlight>
  );
}
