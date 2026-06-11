export interface DomainProblem {
  num: string;
  title: string;
  desc: string;
}

export interface DomainBuild {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

export interface Domain {
  slug: string;
  name: string;
  designator: string;
  index: string;
  accent: string;
  /** rgba of accent at low alpha, for tints/glows */
  accentSoft: string;
  tagline: string;
  intro: string;
  hero: string;
  problems: DomainProblem[];
  builds: DomainBuild[];
  companies: string[];
  companiesNote: string;
  slogan: string;
}

export const domains: Domain[] = [
  {
    slug: "air",
    name: "Air",
    designator: "DOM-AIR",
    index: "01",
    accent: "#8CA8BF",
    accentSoft: "rgba(140, 168, 191, 0.16)",
    tagline: "Contest the sky without putting a pilot in it.",
    intro:
      "Air superiority used to mean the most expensive jet. Now it means thousands of cheap, smart, autonomous things that can see, decide, and act faster than anything with a cockpit. That shift is happening right now — and it is being built by software people.",
    hero: "/images/domains/air-1.jpg",
    problems: [
      {
        num: "01",
        title: "GPS-denied navigation",
        desc: "Modern jamming turns GPS off over entire regions. Autonomous aircraft need to navigate by terrain, vision, and dead reckoning — a computer vision problem, not an aerospace one.",
      },
      {
        num: "02",
        title: "Affordable mass",
        desc: "A $2,000 drone can threaten a $100M aircraft. The side that can field thousands of cheap, attritable systems wins. That demands manufacturing and software talent more than exquisite hardware.",
      },
      {
        num: "03",
        title: "Counter-UAS",
        desc: "Every base, port, and stadium now needs an answer to small drones. Detection, classification, and defeat at machine speed is one of the fastest-growing problem spaces in defense.",
      },
    ],
    builds: [
      {
        title: "Autonomous flight software",
        desc: "Flight controllers, computer-vision target recognition, and GPS-denied navigation stacks — built for intercollegiate UAS competitions and our DoD-problem hackathon.",
        image: "/images/domains/air-2.jpg",
        tag: "BLD-AIR-01",
      },
      {
        title: "Drone prototype sprints",
        desc: "Rapid build-test-fly cycles on small UAS platforms. You design it, print it, crash it, and fix it — the same loop the industry runs, compressed into a semester.",
        image: "/images/domains/air-3.jpg",
        tag: "BLD-AIR-02",
      },
    ],
    companies: ["Anduril", "Shield AI", "Skydio", "Mach Industries", "Lockheed Martin", "Northrop Grumman"],
    companiesNote:
      "The companies defining autonomous airpower are hiring out of Silicon Valley — and several of them are within an hour of campus.",
    slogan: "Own the sky.",
  },
  {
    slug: "sea",
    name: "Sea",
    designator: "DOM-SEA",
    index: "02",
    accent: "#7FA493",
    accentSoft: "rgba(127, 164, 147, 0.16)",
    tagline: "The Pacific is the largest chessboard on Earth.",
    intro:
      "Seventy percent of the planet is ocean, and almost everything America depends on crosses it. The next generation of seapower is unmanned, autonomous, and built in software-speed iterations — vessels that patrol for months with nobody aboard.",
    hero: "/images/domains/sea-1.jpg",
    problems: [
      {
        num: "01",
        title: "Contested logistics",
        desc: "Supplying allies across 7,000 miles of contested ocean is the hardest math problem in the Pacific. Autonomous resupply vessels and route optimization change the equation.",
      },
      {
        num: "02",
        title: "Undersea infrastructure",
        desc: "Subsea cables carry 99% of intercontinental data, and they are nearly undefended. Sensing, mapping, and protecting the seabed is a brand-new engineering discipline.",
      },
      {
        num: "03",
        title: "Unmanned fleets",
        desc: "Autonomous surface and undersea vehicles multiply what one crew can do by a hundred. The bottleneck isn't hulls — it's autonomy software, perception, and swarm coordination.",
      },
    ],
    builds: [
      {
        title: "Maritime autonomy",
        desc: "Perception and navigation software for surface vessels — the same problem Saronic and Saildrone are solving an hour north of campus, scoped to a student team.",
        image: "/images/domains/sea-2.jpg",
        tag: "BLD-SEA-01",
      },
      {
        title: "ROV & USV prototyping",
        desc: "Waterproof, pressure-rated, remotely operated builds for underwater robotics competitions — mechanical, electrical, and software disciplines on one boat.",
        image: "/images/domains/sea-3.jpg",
        tag: "BLD-SEA-02",
      },
    ],
    companies: ["Saronic", "Anduril", "Saildrone", "HII", "General Dynamics", "Palantir"],
    companiesNote:
      "Maritime autonomy is the youngest, fastest-moving sector in defense tech — Saildrone is headquartered on San Francisco Bay.",
    slogan: "Hold the line.",
  },
  {
    slug: "space",
    name: "Space",
    designator: "DOM-SPC",
    index: "03",
    accent: "#C98C5C",
    accentSoft: "rgba(201, 140, 92, 0.16)",
    tagline: "Orbit is infrastructure now. Someone has to defend it.",
    intro:
      "GPS, weather, banking, communications — modern life runs through orbit, and so does modern defense. Space went from a science project to contested infrastructure in a decade, and the people securing it are launching from the West Coast.",
    hero: "/images/domains/space-1.jpg",
    problems: [
      {
        num: "01",
        title: "Space domain awareness",
        desc: "Tens of thousands of objects cross orbit at 17,000 mph, and we have to know where every one of them is. Tracking, prediction, and collision avoidance is a data problem at planetary scale.",
      },
      {
        num: "02",
        title: "Resilient constellations",
        desc: "One exquisite satellite is a target; five hundred cheap ones are a network. Proliferated LEO demands mass manufacturing, autonomous operations, and laser mesh networking.",
      },
      {
        num: "03",
        title: "Launch cadence",
        desc: "Whoever launches faster iterates faster. Responsive launch — putting a payload up in days, not years — rewrites what's possible in orbit.",
      },
    ],
    builds: [
      {
        title: "CubeSat engineering",
        desc: "Design, build, and qualify a satellite the size of a loaf of bread — power, comms, attitude control, and flight software, end to end, on a student budget.",
        image: "/images/domains/space-2.jpg",
        tag: "BLD-SPC-01",
      },
      {
        title: "Ground systems & orbit tooling",
        desc: "Ground stations, telemetry pipelines, and orbital mechanics software — the unglamorous half of spaceflight where most of the jobs actually are.",
        image: "/images/domains/space-3.jpg",
        tag: "BLD-SPC-02",
      },
    ],
    companies: ["SpaceX", "Rocket Lab", "True Anomaly", "Varda", "Planet", "Vast"],
    companiesNote:
      "Half the commercial space industry sits between Hawthorne and Moffett Field. Planet's satellites are operated from San Francisco.",
    slogan: "Take the high ground.",
  },
  {
    slug: "cyber",
    name: "Cyber",
    designator: "DOM-CYB",
    index: "04",
    accent: "#A8A06A",
    accentSoft: "rgba(168, 160, 106, 0.16)",
    tagline: "The first shots of the next conflict will be fired in milliseconds.",
    intro:
      "Power grids, water systems, hospitals, and ports run on decades-old software that was never meant to face a nation-state. Cyber is the one domain where a student with a laptop is already holding operational-grade equipment.",
    hero: "/images/domains/cyber-1.jpg",
    problems: [
      {
        num: "01",
        title: "Critical infrastructure",
        desc: "Industrial control systems built in the 1990s now face adversaries with AI tooling. Defending the grid is the most consequential security engineering problem in the country.",
      },
      {
        num: "02",
        title: "Software supply chain",
        desc: "One poisoned dependency can compromise thousands of systems at once. Provenance, SBOMs, and secure-by-design pipelines are now national security disciplines.",
      },
      {
        num: "03",
        title: "AI-speed offense and defense",
        desc: "Attacks that took weeks of human effort now take minutes of compute. Defense has to operate at the same speed — autonomous detection, response, and patching.",
      },
    ],
    builds: [
      {
        title: "Competitive CTF team",
        desc: "Capture-the-flag competitions in reverse engineering, binary exploitation, and web security — the most direct skill pipeline into the security industry that exists.",
        image: "/images/domains/cyber-2.jpg",
        tag: "BLD-CYB-01",
      },
      {
        title: "Infrastructure defense projects",
        desc: "Threat modeling and hardening exercises against realistic critical-infrastructure scenarios, including NSA's annual Codebreaker Challenge.",
        image: "/images/domains/cyber-3.jpg",
        tag: "BLD-CYB-02",
      },
    ],
    companies: ["Palantir", "Vannevar Labs", "CrowdStrike", "Anduril", "NSA", "CISA"],
    companiesNote:
      "Cyber has the shortest distance between a student club and a cleared career — agencies and primes recruit directly from CTF leaderboards.",
    slogan: "Move first.",
  },
];

export function getDomain(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}

export function nextDomain(slug: string): Domain {
  const i = domains.findIndex((d) => d.slug === slug);
  return domains[(i + 1) % domains.length];
}
