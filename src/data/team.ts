export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const team: TeamMember[] = [
  {
    name: "Mukund Kunapareddy",
    role: "President",
    bio: "Leading SJSU NSIN's mission to bridge Silicon Valley innovation with national security challenges. Focused on building partnerships between students, defense industry, and government agencies.",
  },
  {
    name: "Saksham",
    role: "Treasurer",
    bio: "Managing SJSU NSIN's operations and finances, ensuring the club has the resources to deliver impactful programs and events.",
  },
];
