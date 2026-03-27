import { CardSpotlight } from "../ui/card-spotlight";

export default function BentoGridClient() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-light-gray">
      <CardSpotlight>
        <div>
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-mid-gray mb-4 font-mono">
            01
          </span>
          <h3 className="text-xl font-display text-near-black mb-3">
            Speaker Series
          </h3>
          <p className="text-mid-gray leading-relaxed text-[15px]">
            Defense-tech founders, operators, and policymakers share how
            technology is reshaping national security, directly with SJSU
            students.
          </p>
        </div>
      </CardSpotlight>

      <CardSpotlight>
        <div>
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-mid-gray mb-4 font-mono">
            02
          </span>
          <h3 className="text-xl font-display text-near-black mb-3">
            Hackathons
          </h3>
          <p className="text-mid-gray leading-relaxed text-[15px]">
            Team-based sprints on real-world security challenges. Build
            prototypes, test solutions, deliver actionable outcomes alongside
            government stakeholders.
          </p>
        </div>
      </CardSpotlight>

      <CardSpotlight>
        <div>
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-mid-gray mb-4 font-mono">
            03
          </span>
          <h3 className="text-xl font-display text-near-black mb-3">
            Government & Industry Projects
          </h3>
          <p className="text-mid-gray leading-relaxed text-[15px]">
            Get paired with defense and intelligence organizations to work on
            live problems. Experiential learning on real-world projects, not
            hypotheticals.
          </p>
        </div>
      </CardSpotlight>

      <CardSpotlight>
        <div>
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-mid-gray mb-4 font-mono">
            04
          </span>
          <h3 className="text-xl font-display text-near-black mb-3">
            Policy & Strategy
          </h3>
          <p className="text-mid-gray leading-relaxed text-[15px]">
            Interdisciplinary discussions on the policy dimensions of emerging
            defense technology: AI governance, export controls, and the future
            of deterrence.
          </p>
        </div>
      </CardSpotlight>
    </div>
  );
}
