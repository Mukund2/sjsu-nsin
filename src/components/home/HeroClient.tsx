import { EncryptedText } from "../ui/encrypted-text";

export default function HeroClient() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <img
        src="/images/mechazilla-catch.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl text-white leading-[1.1] font-display tracking-tight drop-shadow-lg">
          <EncryptedText
            text="National Security Innovation Network"
            speed={25}
            className="font-display"
          />
        </h1>

        <p className="mt-8 text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Bridging Silicon Valley technology with Washington's most pressing national security challenges
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#join-us"
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
