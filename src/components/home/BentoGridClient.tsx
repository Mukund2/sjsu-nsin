import { CardSpotlight } from "../ui/card-spotlight";

function MicrophoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <rect width="20" height="14" x="2" y="7" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function BentoGridClient() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-light-gray">
      {/* Speaker Series — spans 2 cols */}
      <CardSpotlight className="md:col-span-2">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <MicrophoneIcon />
          </div>
          <div>
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent bg-accent/10 px-2 py-1 mb-3">
              Current Focus
            </span>
            <h3 className="text-xl font-bold text-near-black mb-2">
              Speaker Series
            </h3>
            <p className="text-dark-gray leading-relaxed">
              Hear from founders, operators, and policymakers at the
              intersection of technology and national security. Our speaker
              series brings defense-tech leaders directly to SJSU students.
            </p>
          </div>
        </div>
      </CardSpotlight>

      {/* Hackathons */}
      <CardSpotlight>
        <div>
          <div className="mb-4">
            <CodeIcon />
          </div>
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-mid-gray mb-3">
            Spring 2027
          </span>
          <h3 className="text-xl font-bold text-near-black mb-2">
            Hackathons
          </h3>
          <p className="text-dark-gray leading-relaxed">
            Build real solutions to national security challenges in
            intensive, team-based sprints alongside DoD stakeholders.
          </p>
        </div>
      </CardSpotlight>

      {/* Externships & Consulting */}
      <CardSpotlight>
        <div>
          <div className="mb-4">
            <BriefcaseIcon />
          </div>
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-mid-gray mb-3">
            Fall 2026
          </span>
          <h3 className="text-xl font-bold text-near-black mb-2">
            Externships & Consulting
          </h3>
          <p className="text-dark-gray leading-relaxed">
            Work directly with defense organizations on real-world projects,
            gaining clearance-track experience while still in school.
          </p>
        </div>
      </CardSpotlight>

      {/* Policy Discussions — spans 2 cols */}
      <CardSpotlight className="md:col-span-2">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <MessageIcon />
          </div>
          <div>
            <h3 className="text-xl font-bold text-near-black mb-2">
              Policy Discussions
            </h3>
            <p className="text-dark-gray leading-relaxed">
              An interdisciplinary forum where engineering, political science,
              and business students debate the policy dimensions of emerging
              defense technology — from AI governance to export controls.
            </p>
          </div>
        </div>
      </CardSpotlight>
    </div>
  );
}
