import { ActivityEvent } from "./types";

export const ACTIVITIES_DATA: ActivityEvent[] = [
  {
    id: "svns-perth-2026",
    title: "HSBC SVNS Perth: Australia Stop",
    category: "SVNS Series",
    dates: "Jan 23–25, 2026",
    location: "Perth, Western Australia",
    venue: "HBF Park",
    teamInvolved: "Men's & Women's 7s",
    status: "Completed",
    broadcast: "RugbyPass TV / Peacock",
    summary:
      "USA Women's Eagles Sevens battle through the Southern Hemisphere leg with Kristi Kirshe leading scoring, facing New Zealand and Australia in pool play.",
  },
  {
    id: "svns-vancouver-2026",
    title: "HSBC SVNS Vancouver: Pacific Showcase",
    category: "SVNS Series",
    dates: "Feb 27 – Mar 01, 2026",
    location: "Vancouver, BC, Canada",
    venue: "BC Place Stadium",
    teamInvolved: "Men's & Women's 7s",
    status: "Completed",
    broadcast: "Peacock / CNBC",
    summary:
      "The fast-turf indoor tournament featuring intense North American rivalry matches between USA and Canada in front of 50,000 rugby fans.",
  },
  {
    id: "svns-hong-kong-2026",
    title: "Cathay / HSBC Hong Kong Sevens",
    category: "SVNS Series",
    dates: "Apr 10–12, 2026",
    location: "Hong Kong, SAR",
    venue: "Kai Tak Sports Park",
    teamInvolved: "Men's & Women's 7s",
    status: "Completed",
    broadcast: "RugbyPass TV",
    summary:
      "The spiritual Mecca of Rugby Sevens moves to the ultra-modern Kai Tak Sports Park Stadium with crucial series qualification points on the line.",
  },
  {
    id: "svns-singapore-2026",
    title: "HSBC SVNS Singapore",
    category: "SVNS Series",
    dates: "May 02–03, 2026",
    location: "Singapore",
    venue: "National Stadium",
    teamInvolved: "Men's Sevens",
    status: "Upcoming",
    broadcast: "Peacock / RugbyPass TV",
    summary:
      "A pivotal test for USA Men's Sevens under high humidity conditions before the championship grand final.",
  },
  {
    id: "svns-madrid-grand-final-2026",
    title: "HSBC SVNS World Championship Grand Final",
    category: "Championship",
    dates: "Jun 05–07, 2026",
    location: "Madrid, Spain",
    venue: "Civitas Metropolitano",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    broadcast: "Peacock / NBC Sports",
    summary:
      "Winner-takes-all Championship weekend crowning the World Rugby SVNS champions and deciding promotion/relegation play-offs.",
  },
  {
    id: "chula-vista-residency-camp-2026",
    title: "USA Eagles High-Performance Summer Camp",
    category: "National Camp",
    dates: "Jul 14–28, 2026",
    location: "Chula Vista, CA",
    venue: "Chula Vista Elite Athlete Training Center",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    broadcast: "USA Rugby Social Coverage",
    summary:
      "Intensive 14-day training block integrating next-generation collegiate crossover talent with Olympic residency veterans.",
  },
  {
    id: "road-to-la-2028-summit",
    title: "LA 2028 Olympic Rugby Sevens Milestone Summit",
    category: "Olympic Milestone",
    dates: "Oct 15, 2026",
    location: "Los Angeles, CA",
    venue: "Dignity Health Sports Park",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    broadcast: "USOPC & USA Rugby Live Stream",
    summary:
      "Official venue walk-through and media launch outlining the Olympic pathway and roster development for the home 2028 Summer Games.",
  },
];

export function getAllActivities(): ActivityEvent[] {
  return ACTIVITIES_DATA;
}

export function getUpcomingActivities(): ActivityEvent[] {
  return ACTIVITIES_DATA.filter((a) => a.status === "Upcoming");
}
