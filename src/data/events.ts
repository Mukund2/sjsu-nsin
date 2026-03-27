export interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rsvpLink?: string;
  status: 'upcoming' | 'past';
}

export const events: Event[] = [
  {
    title: "Defense Tech in Silicon Valley: The New Frontier",
    date: "2026-04-15",
    time: "6:00 PM",
    location: "Burdick Room, SJSU",
    description: "A speaker series event exploring how Silicon Valley startups are reshaping defense technology and what it means for the next generation of engineers.",
    rsvpLink: "#",
    status: "upcoming",
  },
  {
    title: "Cybersecurity & National Infrastructure",
    date: "2026-04-29",
    time: "6:00 PM",
    location: "Burdick Room, SJSU",
    description: "Industry experts discuss the evolving threat landscape targeting critical national infrastructure and the role of emerging technologies in defense.",
    rsvpLink: "#",
    status: "upcoming",
  },
  {
    title: "AI in Defense: Ethics, Applications & Careers",
    date: "2026-05-13",
    time: "6:00 PM",
    location: "Burdick Room, SJSU",
    description: "From autonomous systems to intelligence analysis, artificial intelligence is transforming national security. Here's where SJSU students fit in.",
    rsvpLink: "#",
    status: "upcoming",
  },
];
