export interface Contributor {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  contributions: number;
  badge?: "gold" | "silver" | "bronze";
}

export const leaderboardData: Contributor[] = [
  {
    rank: 1,
    name: "Sarah Chen",
    points: 2450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    contributions: 48,
    badge: "gold",
  },
  {
    rank: 2,
    name: "Alex Kumar",
    points: 2180,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    contributions: 42,
    badge: "silver",
  },
  {
    rank: 3,
    name: "Maria Garcia",
    points: 1950,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    contributions: 38,
    badge: "bronze",
  },
  {
    rank: 4,
    name: "James Wilson",
    points: 1720,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    contributions: 35,
  },
  {
    rank: 5,
    name: "Priya Patel",
    points: 1580,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    contributions: 31,
  },
  {
    rank: 6,
    name: "Michael Brown",
    points: 1420,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    contributions: 28,
  },
  {
    rank: 7,
    name: "Emma Johnson",
    points: 1290,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    contributions: 25,
  },
  {
    rank: 8,
    name: "David Lee",
    points: 1150,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    contributions: 22,
  },
  {
    rank: 9,
    name: "Sophie Martin",
    points: 980,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    contributions: 19,
  },
  {
    rank: 10,
    name: "Ryan Taylor",
    points: 850,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    contributions: 17,
  },
];