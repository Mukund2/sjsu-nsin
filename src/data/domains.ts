export interface DomainProblem {
  title: string;
  desc: string;
}

export interface DomainBuild {
  title: string;
  desc: string;
  image: string;
}

export interface DomainCompany {
  name: string;
  url: string;
}

export interface Domain {
  slug: string;
  name: string;
  accent: string;
  tagline: string;
  intro: string;
  hero: string;
  heroAlt: string;
  problems: DomainProblem[];
  builds: DomainBuild[];
  companies: DomainCompany[];
  companiesNote: string;
  closing: string;
}

export const domains: Domain[] = [
  {
    slug: "air",
    name: "Air",
    accent: "#8CA8BF",
    tagline: "Contest the sky without putting a pilot in it.",
    intro:
      "Air superiority used to mean the most expensive jet. Now it means thousands of cheap, smart, autonomous things that can see, decide, and act faster than anything with a cockpit. That shift is happening right now — and it is being built by software people.",
    hero: "/images/domains/air-2.jpg",
    heroAlt:
      "An MQ-9 Reaper drone parked on a floodlit flightline at night",
    problems: [
      {
        title: "GPS-denied navigation",
        desc: "Modern jamming turns GPS off over entire regions. Autonomous aircraft need to navigate by terrain, vision, and dead reckoning — and it has become a computer vision problem.",
      },
      {
        title: "Affordable mass",
        desc: "A $2,000 drone can threaten a $100M aircraft. The side that can field thousands of cheap, attritable systems wins. That demands manufacturing and software talent more than exquisite hardware.",
      },
      {
        title: "Counter-UAS",
        desc: "Every base, port, and stadium now needs an answer to small drones. Detection, classification, and defeat at machine speed is one of the fastest-growing problem spaces in defense.",
      },
    ],
    builds: [
      {
        title: "Autonomous flight software",
        desc: "Flight controllers, computer-vision target recognition, and GPS-denied navigation stacks — built for intercollegiate UAS competitions and our DoD-problem hackathon.",
        image: "/images/domains/air-1.jpg",
      },
      {
        title: "Drone prototype sprints",
        desc: "Rapid build-test-fly cycles on small UAS platforms. You design it, print it, crash it, and fix it — the same loop the industry runs, compressed into a semester.",
        image: "/images/domains/air-3.jpg",
      },
    ],
    companies: [
      { name: "Anduril", url: "https://www.anduril.com" },
      { name: "Shield AI", url: "https://shield.ai" },
      { name: "Skydio", url: "https://www.skydio.com" },
      { name: "Mach Industries", url: "https://machindustries.com" },
      { name: "Lockheed Martin", url: "https://www.lockheedmartin.com" },
      { name: "Northrop Grumman", url: "https://www.northropgrumman.com" },
    ],
    companiesNote:
      "The companies defining autonomous airpower are hiring out of Silicon Valley — and several of them are within an hour of campus.",
    closing: "The drone that decides the next war might start as a senior project.",
  },
  {
    slug: "sea",
    name: "Sea",
    accent: "#7FA493",
    tagline: "The Pacific is the largest chessboard on Earth.",
    intro:
      "Seventy percent of the planet is ocean, and almost everything America depends on crosses it. The next generation of seapower is unmanned, autonomous, and built in software-speed iterations — vessels that patrol for months with nobody aboard.",
    hero: "/images/domains/sea-1.jpg",
    heroAlt:
      "An attack submarine leaving Pearl Harbor under storm clouds",
    problems: [
      {
        title: "Contested logistics",
        desc: "Supplying allies across 7,000 miles of contested ocean is the hardest math problem in the Pacific. Autonomous resupply vessels and route optimization change the equation.",
      },
      {
        title: "Undersea infrastructure",
        desc: "Subsea cables carry 99% of intercontinental data, and they are nearly undefended. Sensing, mapping, and protecting the seabed is a brand-new engineering discipline.",
      },
      {
        title: "Unmanned fleets",
        desc: "Autonomous surface and undersea vehicles multiply what one crew can do by a hundred. The bottleneck isn’t hulls — it’s autonomy software, perception, and swarm coordination.",
      },
    ],
    builds: [
      {
        title: "Maritime autonomy",
        desc: "Perception and navigation software for surface vessels — the same problem Saronic and Saildrone are solving an hour north of campus, scoped to a student team.",
        image: "/images/domains/sea-2.jpg",
      },
      {
        title: "ROV & USV prototyping",
        desc: "Waterproof, pressure-rated, remotely operated builds for underwater robotics competitions — mechanical, electrical, and software disciplines on one boat.",
        image: "/images/domains/sea-3.jpg",
      },
    ],
    companies: [
      { name: "Saronic", url: "https://www.saronic.com" },
      { name: "Anduril", url: "https://www.anduril.com" },
      { name: "Saildrone", url: "https://www.saildrone.com" },
      { name: "HII", url: "https://hii.com" },
      { name: "General Dynamics", url: "https://www.gd.com" },
      { name: "Palantir", url: "https://www.palantir.com" },
    ],
    companiesNote:
      "Maritime autonomy is the youngest, fastest-moving sector in defense tech — Saildrone is headquartered on San Francisco Bay.",
    closing: "The first crewless fleets are being coded an hour north of campus.",
  },
  {
    slug: "space",
    name: "Space",
    accent: "#C98C5C",
    tagline: "Orbit is infrastructure now. Someone has to defend it.",
    intro:
      "GPS, weather, banking, communications — modern life runs through orbit, and so does modern defense. Space went from a science project to contested infrastructure in a decade, and the people securing it are launching from the West Coast.",
    hero: "/images/domains/space-1.jpg",
    heroAlt:
      "The Artemis I rocket lifting off the pad in a night launch",
    problems: [
      {
        title: "Space domain awareness",
        desc: "Tens of thousands of objects cross orbit at 17,000 mph, and we have to know where every one of them is. Tracking, prediction, and collision avoidance is a data problem at planetary scale.",
      },
      {
        title: "Resilient constellations",
        desc: "One exquisite satellite is a target; five hundred cheap ones are a network. Proliferated LEO demands mass manufacturing, autonomous operations, and laser mesh networking.",
      },
      {
        title: "Launch cadence",
        desc: "Whoever launches faster iterates faster. Responsive launch — putting a payload up in days, not years — rewrites what’s possible in orbit.",
      },
    ],
    builds: [
      {
        title: "CubeSat engineering",
        desc: "Design, build, and qualify a satellite the size of a loaf of bread — power, comms, attitude control, and flight software, end to end, on a student budget.",
        image: "/images/domains/space-2.jpg",
      },
      {
        title: "Ground systems & orbit tooling",
        desc: "Ground stations, telemetry pipelines, and orbital mechanics software — the unglamorous half of spaceflight where most of the jobs actually are.",
        image: "/images/domains/space-3.jpg",
      },
    ],
    companies: [
      { name: "SpaceX", url: "https://www.spacex.com" },
      { name: "Rocket Lab", url: "https://rocketlabcorp.com" },
      { name: "True Anomaly", url: "https://www.trueanomaly.space" },
      { name: "Varda", url: "https://www.varda.com" },
      { name: "Planet", url: "https://www.planet.com" },
      { name: "Vast", url: "https://www.vast.space" },
    ],
    companiesNote:
      "Half the commercial space industry sits between Hawthorne and Moffett Field. Planet’s satellites are operated from San Francisco.",
    closing: "Half the commercial space industry is a Caltrain ride away.",
  },
];

export function getDomain(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}

export function nextDomain(slug: string): Domain {
  const i = domains.findIndex((d) => d.slug === slug);
  return domains[(i + 1) % domains.length];
}

