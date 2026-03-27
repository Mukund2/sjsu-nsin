import { EncryptedText } from "../ui/encrypted-text";

export default function HeroClient() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/images/fighter-jets.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="text-sm uppercase tracking-[0.3em] mb-6 font-mono font-medium drop-shadow-[0_1px_8px_rgba(255,255,255,0.5)]"
          style={{ color: "#0055A2" }}
        >
          San Jose State University
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl text-white leading-[1.1] font-display tracking-tight drop-shadow-lg">
          <EncryptedText
            text="National Security Innovation Network"
            speed={25}
            className="font-display"
          />
        </h1>

        <p className="mt-8 text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
          Applying innovation methodologies to national security challenges
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-block bg-white text-near-black px-8 py-3 text-[13px] font-medium uppercase tracking-[0.15em] hover:bg-light-gray transition-colors"
          >
            Get Involved
          </a>
          <a
            href="#focus-areas"
            className="inline-block border border-white/50 text-white px-8 py-3 text-[13px] font-medium uppercase tracking-[0.15em] hover:border-white transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
