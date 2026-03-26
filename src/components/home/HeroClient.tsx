import { EncryptedText } from "../ui/encrypted-text";
import { DotGrid } from "../ui/dot-grid";

export default function HeroClient() {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #ffffff 40%, #f5f0eb 100%)",
      }}
    >
      <DotGrid />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pointer-events-none">
        <p className="text-mid-gray text-[11px] uppercase tracking-[0.3em] mb-6 font-mono">
          San Jose State University
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl text-near-black leading-[1.1] font-display tracking-tight">
          <EncryptedText
            text="National Security Innovation Network"
            speed={25}
            className="font-display"
          />
        </h1>

        <p className="mt-8 text-mid-gray text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Applying innovation methodologies to national security challenges
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          <a
            href="/join"
            className="inline-block bg-near-black text-white px-8 py-3 text-[13px] font-medium uppercase tracking-[0.15em] hover:bg-dark-gray transition-colors"
          >
            Get Involved
          </a>
          <a
            href="#focus-areas"
            className="inline-block border border-light-gray text-near-black px-8 py-3 text-[13px] font-medium uppercase tracking-[0.15em] hover:border-near-black transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
