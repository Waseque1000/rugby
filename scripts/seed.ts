import { prisma } from "../src/lib/db";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🌱 Starting PostgreSQL database seeding...");

  const dataDir = path.join(process.cwd(), "data");
  const playersPath = path.join(dataDir, "players.json");
  const sourcesPath = path.join(dataDir, "sources.json");

  // 1. Seed Sources
  if (fs.existsSync(sourcesPath)) {
    const sourcesData = JSON.parse(fs.readFileSync(sourcesPath, "utf-8"));
    console.log(`Clearing and importing ${sourcesData.length} sources...`);
    
    await prisma.source.deleteMany({});
    for (const item of sourcesData) {
      await prisma.source.create({
        data: {
          source: item.source,
          url: item.url || null,
          notes: item.notes || null,
        },
      });
    }
    console.log(`✅ Seeded ${sourcesData.length} sources.`);
  }

  // 2. Seed Players
  if (fs.existsSync(playersPath)) {
    const playersData = JSON.parse(fs.readFileSync(playersPath, "utf-8"));
    console.log(`Clearing and importing ${playersData.length} player records...`);

    for (const p of playersData) {
      await prisma.player.upsert({
        where: { id: p.id },
        update: {
          slug: p.slug,
          name: p.name,
          age: p.age ?? null,
          dob: p.dob ?? null,
          team: p.team ?? null,
          format: p.format ?? null,
          position: p.position ?? null,
          hometown: p.hometown ?? null,
          hometownState: p.hometownState ?? null,
          nationality: p.nationality ?? null,
          height: p.height ?? null,
          weight: p.weight ?? null,
          club: p.club ?? null,
          college: p.college ?? null,
          debut: p.debut ?? null,
          nationalYears: p.nationalYears ?? null,
          caps: p.caps ?? null,
          tries: p.tries ?? null,
          points: p.points ?? null,
          fifteensCaps: p.fifteensCaps ?? null,
          olympicGames: p.olympicGames ?? null,
          isOlympian: Boolean(p.isOlympian),
          olympicEditions: Array.isArray(p.olympicEditions) ? p.olympicEditions : [],
          worldCupSevens: p.worldCupSevens ?? null,
          achievements: p.achievements ?? null,
          biography: p.biography ?? null,
          imageUrl: p.imageUrl ?? null,
          imageAlt: p.imageAlt ?? null,
          sourceUrl: p.sourceUrl ?? null,
          sourceNotes: p.sourceNotes ?? null,
          dataStatus: p.dataStatus ?? null,
          lastChecked: p.lastChecked ?? null,
          rawData: p.raw ?? undefined,
        },
        create: {
          id: p.id,
          slug: p.slug,
          name: p.name,
          age: p.age ?? null,
          dob: p.dob ?? null,
          team: p.team ?? null,
          format: p.format ?? null,
          position: p.position ?? null,
          hometown: p.hometown ?? null,
          hometownState: p.hometownState ?? null,
          nationality: p.nationality ?? null,
          height: p.height ?? null,
          weight: p.weight ?? null,
          club: p.club ?? null,
          college: p.college ?? null,
          debut: p.debut ?? null,
          nationalYears: p.nationalYears ?? null,
          caps: p.caps ?? null,
          tries: p.tries ?? null,
          points: p.points ?? null,
          fifteensCaps: p.fifteensCaps ?? null,
          olympicGames: p.olympicGames ?? null,
          isOlympian: Boolean(p.isOlympian),
          olympicEditions: Array.isArray(p.olympicEditions) ? p.olympicEditions : [],
          worldCupSevens: p.worldCupSevens ?? null,
          achievements: p.achievements ?? null,
          biography: p.biography ?? null,
          imageUrl: p.imageUrl ?? null,
          imageAlt: p.imageAlt ?? null,
          sourceUrl: p.sourceUrl ?? null,
          sourceNotes: p.sourceNotes ?? null,
          dataStatus: p.dataStatus ?? null,
          lastChecked: p.lastChecked ?? null,
          rawData: p.raw ?? undefined,
        },
      });
    }
    console.log(`✅ Seeded ${playersData.length} player records into PostgreSQL.`);
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
