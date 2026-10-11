import { ActivityEvent } from "./types";

// Confirmed 2026/27 HSBC SVNS dates, venues, and participating teams.
// Keep this list to published fixtures; add camps only after USA Rugby announces them.
export const ACTIVITIES_DATA: ActivityEvent[] = [
  {
    id: "svns-dubai-2026",
    title: "HSBC SVNS Dubai",
    category: "SVNS Series",
    dates: "Nov 28–29, 2026",
    location: "Dubai, UAE",
    venue: "The Sevens Stadium",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The opening stop of the confirmed 2026/27 HSBC SVNS Series schedule.",
    officialUrl: "https://www.svns.com/en/events/dubai",
  },
  {
    id: "svns-cape-town-2026",
    title: "HSBC SVNS Cape Town",
    category: "SVNS Series",
    dates: "Dec 5–6, 2026",
    location: "Cape Town, South Africa",
    venue: "Cape Town Stadium",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The second stop of the 2026/27 HSBC SVNS Series, following Dubai.",
    officialUrl: "https://www.svns.com/en/events/cape-town",
  },
  {
    id: "svns-singapore-2027",
    title: "HSBC SVNS Singapore",
    category: "SVNS Series",
    dates: "Jan 30–31, 2027",
    location: "Singapore",
    venue: "The Kallang",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The 2027 Singapore stop brings the men's and women's series to The Kallang.",
    officialUrl: "https://www.svns.com/en/events/singapore",
  },
  {
    id: "svns-perth-2027",
    title: "HSBC SVNS Perth",
    category: "SVNS Series",
    dates: "Feb 6–7, 2027",
    location: "Perth, Australia",
    venue: "HBF Park",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The Perth round of the 2026/27 HSBC SVNS Series at HBF Park.",
    officialUrl: "https://www.svns.com/en/events/perth",
  },
  {
    id: "svns-vancouver-2027",
    title: "HSBC SVNS Vancouver",
    category: "SVNS Series",
    dates: "Mar 6–7, 2027",
    location: "Vancouver, Canada",
    venue: "BC Place",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The Vancouver round of the 2026/27 HSBC SVNS Series at BC Place.",
    officialUrl: "https://www.svns.com/en/events/vancouver",
  },
  {
    id: "svns-new-york-2027",
    title: "HSBC SVNS New York",
    category: "SVNS Series",
    dates: "Mar 13–14, 2027",
    location: "Harrison, New Jersey, USA",
    venue: "Sports Illustrated Stadium",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The regular-season finale returns to the New York area, with USA among the confirmed men's and women's teams.",
    officialUrl: "https://www.svns.com/en/events/new-york",
  },
  {
    id: "svns-hong-kong-championship-2027",
    title: "HSBC SVNS World Championship Hong Kong",
    category: "Championship",
    dates: "Apr 9–11, 2027",
    location: "Hong Kong",
    venue: "Kai Tak Sports Park",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The first of three confirmed 2027 HSBC SVNS World Championship events.",
    officialUrl: "https://www.svns.com/en/events/hong-kong",
  },
  {
    id: "svns-valladolid-championship-2027",
    title: "HSBC SVNS World Championship Valladolid",
    category: "Championship",
    dates: "May 21–23, 2027",
    location: "Valladolid, Spain",
    venue: "Estadio José Zorrilla",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The second event in the 2027 HSBC SVNS World Championship series.",
    officialUrl: "https://www.svns.com/en/events/valladolid",
  },
  {
    id: "svns-bordeaux-championship-2027",
    title: "HSBC SVNS World Championship Bordeaux",
    category: "Championship",
    dates: "May 28–30, 2027",
    location: "Bordeaux, France",
    venue: "Stade Atlantique",
    teamInvolved: "Men's & Women's 7s",
    status: "Upcoming",
    summary:
      "The final event in the confirmed 2027 HSBC SVNS World Championship series.",
    officialUrl: "https://www.svns.com/en/events/bordeaux",
  },
];

export function getAllActivities(): ActivityEvent[] {
  return ACTIVITIES_DATA;
}

export function getUpcomingActivities(): ActivityEvent[] {
  return ACTIVITIES_DATA.filter((a) => a.status === "Upcoming");
}
