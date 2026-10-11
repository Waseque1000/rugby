import * as XLSX from "xlsx";
import * as path from "path";
import * as fs from "fs";

interface RawPlayerRecord {
  "Player ID"?: string | null;
  "Full Name"?: string | null;
  "Age (as of 2026-10-10)"?: number | string | null;
  "Date of Birth"?: string | null;
  "Team"?: string | null;
  "Format"?: string | null;
  "Playing Position"?: string | null;
  "Hometown / Birthplace"?: string | null;
  "Nationality"?: string | null;
  "Height"?: string | null;
  "Weight"?: string | null;
  "Current / Known Club"?: string | null;
  "College / School"?: string | null;
  "National Sevens Debut"?: string | null;
  "National Team Years"?: string | null;
  "Sevens Caps"?: number | string | null;
  "Sevens Tries"?: number | string | null;
  "Sevens Points"?: number | string | null;
  "Fifteens Caps (if known)"?: number | string | null;
  "Olympic Games"?: string | null;
  "Rugby World Cup Sevens"?: string | null;
  "Major Achievements"?: string | null;
  "Career Timeline / Biography"?: string | null;
  "Estimated Net Worth (USD)"?: string | number | null;
  "Net Worth Source / Confidence"?: string | null;
  "Data Status"?: string | null;
  "Primary Source / Notes"?: string | null;
  "Source URL"?: string | null;
  "Last Checked"?: string | null;
  [key: string]: unknown;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  age: number | null;
  dob: string | null;
  team: string | null;
  format: string | null;
  position: string | null;
  hometown: string | null;
  hometownState: string | null;
  nationality: string | null;
  height: string | null;
  weight: string | null;
  club: string | null;
  college: string | null;
  debut: string | null;
  nationalYears: string | null;
  caps: number | null;
  tries: number | null;
  points: number | null;
  fifteensCaps: number | null;
  isOlympian: boolean;
  olympicEditions: string[];
  worldCupSevens: string | null;
  honours: string | null;
  sources: string[];
  dataStatus: string | null;
  lastChecked: string | null;
}

export interface SourceItem {
  source: string;
  url: string | null;
  notes: string | null;
}

function cleanValue<T>(val: T): T | null {
  if (val === undefined || val === null) return null;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "" || trimmed.toLowerCase() === "null" || trimmed.toLowerCase() === "n/a" || trimmed.toLowerCase() === "none") {
      return null;
    }
    return trimmed as unknown as T;
  }
  return val;
}

function parseNumber(val: unknown): number | null {
  if (val === null || val === undefined) return null;
  if (typeof val === "number" && !isNaN(val)) return val;
  if (typeof val === "string") {
    const cleaned = val.replace(/[^0-9.-]+/g, "");
    const num = Number(cleaned);
    return !isNaN(num) && cleaned.length > 0 ? num : null;
  }
  return null;
}

function extractState(hometown: string | null): string | null {
  if (!hometown) return null;
  // Match standard 2-letter state abbreviations at the end or following a comma, e.g., "Daytona Beach, FL"
  const match = hometown.match(/,\s*([A-Z]{2})(?:\s|$)/);
  if (match) return match[1];
  return null;
}

function extractOlympics(debut: string | null, olympics: string | null, achievements: string | null): { isOlympian: boolean; editions: string[] } {
  const combined = `${debut || ""} ${olympics || ""} ${achievements || ""}`;
  const editions: string[] = [];
  if (/rio\s*2016/i.test(combined)) editions.push("Rio 2016");
  if (/tokyo\s*2020/i.test(combined)) editions.push("Tokyo 2020");
  if (/paris\s*2024/i.test(combined)) editions.push("Paris 2024");
  if (/la\s*2028/i.test(combined)) editions.push("LA 2028");
  
  const isOlympian = editions.length > 0 || /olympi(c|an)/i.test(combined);
  return { isOlympian, editions };
}

function convertDatabase() {
  const projectRoot = process.cwd();
  const filePath = path.join(projectRoot, "data", "USA_Rugby_Sevens_Player_Database.xlsx");

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
  }

  const workbook = XLSX.readFile(filePath);
  
  // 1. Process "Players" sheet
  const playersSheet = workbook.Sheets["Players"];
  if (!playersSheet) {
    console.error(`Error: Sheet "Players" not found in workbook`);
    process.exit(1);
  }

  const rawRows: RawPlayerRecord[] = XLSX.utils.sheet_to_json(playersSheet, { defval: null });
  console.log(`Read ${rawRows.length} player rows from "Players" sheet.`);

  const players: Player[] = rawRows.map((row) => {
    const playerId = cleanValue(row["Player ID"]) as string || `player-${Math.random().toString(36).substring(7)}`;
    const name = cleanValue(row["Full Name"]) as string || "Unknown Player";
    const hometown = cleanValue(row["Hometown / Birthplace"]) as string | null;
    const debut = cleanValue(row["National Sevens Debut"]) as string | null;
    const olympicsField = cleanValue(row["Olympic Games"]) as string | null;
    const achievements = cleanValue(row["Major Achievements"]) as string | null;
    const team = cleanValue(row["Team"]) as string | null;

    const { isOlympian, editions } = extractOlympics(debut, olympicsField, achievements);
    const clubValue = cleanValue(row["Current / Known Club"]) as string | null;
    const club = clubValue && !/^(?:\d{4}|.*\bseries\b|.*\bselection\b)/i.test(clubValue)
      ? clubValue
      : null;
    const honours = [olympicsField, achievements]
      .filter((value): value is string => Boolean(value && !/^https?:\/\//i.test(value)))
      .filter((value, index, values) => values.indexOf(value) === index)
      .join("; ") || null;
    const sources = [
      cleanValue(row["Source URL"]) as string | null,
      ...(achievements && /^https?:\/\//i.test(achievements) ? [achievements] : []),
    ].filter((value): value is string => Boolean(value));

    return {
      id: playerId,
      slug: playerId, // "Use the Player ID column as the slug"
      name: name,
      dob: cleanValue(row["Date of Birth"]) as string | null,
      team: team,
      format: cleanValue(row["Format"]) as string | null,
      position: cleanValue(row["Playing Position"]) as string | null,
      hometown: hometown,
      hometownState: extractState(hometown),
      nationality: cleanValue(row["Nationality"]) as string | null,
      height: cleanValue(row["Height"]) as string | null,
      weight: cleanValue(row["Weight"]) as string | null,
      club,
      college: cleanValue(row["College / School"]) as string | null,
      debut: debut,
      nationalYears: cleanValue(row["National Team Years"]) as string | null,
      caps: parseNumber(row["Sevens Caps"]),
      tries: parseNumber(row["Sevens Tries"]),
      points: parseNumber(row["Sevens Points"]),
      fifteensCaps: parseNumber(row["Fifteens Caps (if known)"]),
      isOlympian: isOlympian,
      olympicEditions: editions,
      worldCupSevens: cleanValue(row["Rugby World Cup Sevens"]) as string | null,
      honours,
      sources: [...new Set(sources)],
      dataStatus: cleanValue(row["Data Status"]) as string | null,
      lastChecked: cleanValue(row["Last Checked"]) as string | null,
    };
  });

  // Write players.json
  const playersJsonPath = path.join(projectRoot, "data", "players.json");
  fs.writeFileSync(playersJsonPath, JSON.stringify(players, null, 2), "utf-8");
  console.log(`Saved ${players.length} players to ${playersJsonPath}`);

  // 2. Process "Sources" sheet
  const sourcesSheet = workbook.Sheets["Sources"];
  let sources: SourceItem[] = [];
  if (sourcesSheet) {
    const rawSources: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sourcesSheet, { defval: null });
    sources = rawSources.map((s) => ({
      source: (cleanValue(s["Source"]) as string) || "Unknown Source",
      url: cleanValue(s["URL"]) as string | null,
      notes: (cleanValue(s["What it supports / caveat"]) as string) || null,
    }));
    const sourcesJsonPath = path.join(projectRoot, "data", "sources.json");
    fs.writeFileSync(sourcesJsonPath, JSON.stringify(sources, null, 2), "utf-8");
    console.log(`Saved ${sources.length} sources to ${sourcesJsonPath}`);
  }

  // 3. Process "Read Me" sheet if available
  const readMeSheet = workbook.Sheets["Read Me"];
  if (readMeSheet) {
    const rawReadMe = XLSX.utils.sheet_to_json(readMeSheet, { header: 1 });
    const readMeJsonPath = path.join(projectRoot, "data", "readme.json");
    fs.writeFileSync(readMeJsonPath, JSON.stringify(rawReadMe, null, 2), "utf-8");
    console.log(`Saved Read Me to ${readMeJsonPath}`);
  }

  console.log("Data conversion complete!");
}

convertDatabase();
