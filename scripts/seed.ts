import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgrespassword@localhost:5432/rugby_db?schema=public";

const pool = new Pool({ connectionString });

async function main() {
  console.log("🌱 Connecting to PostgreSQL database...");
  const client = await pool.connect();

  try {
    const dataDir = path.join(process.cwd(), "data");
    const playersPath = path.join(dataDir, "players.json");
    const sourcesPath = path.join(dataDir, "sources.json");

    // 1. Seed Sources
    if (fs.existsSync(sourcesPath)) {
      const sourcesData = JSON.parse(fs.readFileSync(sourcesPath, "utf-8"));
      console.log(`Clearing and importing ${sourcesData.length} sources...`);

      await client.query("DELETE FROM sources;");
      for (const item of sourcesData) {
        await client.query(
          `INSERT INTO sources (source, url, notes) VALUES ($1, $2, $3);`,
          [item.source, item.url || null, item.notes || null]
        );
      }
      console.log(`✅ Seeded ${sourcesData.length} sources.`);
    }

    // 2. Seed Players
    if (fs.existsSync(playersPath)) {
      const playersData = JSON.parse(fs.readFileSync(playersPath, "utf-8"));
      console.log(`Importing ${playersData.length} player records...`);

      for (const p of playersData) {
        const query = `
          INSERT INTO players (
            id, slug, name, age, dob, team, format, position,
            hometown, hometown_state, nationality, height, weight, club,
            college, debut, national_years, caps, tries, points,
            fifteens_caps, olympic_games, is_olympian, olympic_editions,
            world_cup_sevens, achievements, biography, image_url,
            image_alt, source_url, source_notes, data_status,
            last_checked, raw_data, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13, $14,
            $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24,
            $25, $26, $27, $28,
            $29, $30, $31, $32,
            $33, $34, CURRENT_TIMESTAMP
          )
          ON CONFLICT (id) DO UPDATE SET
            slug = EXCLUDED.slug,
            name = EXCLUDED.name,
            age = EXCLUDED.age,
            dob = EXCLUDED.dob,
            team = EXCLUDED.team,
            format = EXCLUDED.format,
            position = EXCLUDED.position,
            hometown = EXCLUDED.hometown,
            hometown_state = EXCLUDED.hometown_state,
            nationality = EXCLUDED.nationality,
            height = EXCLUDED.height,
            weight = EXCLUDED.weight,
            club = EXCLUDED.club,
            college = EXCLUDED.college,
            debut = EXCLUDED.debut,
            national_years = EXCLUDED.national_years,
            caps = EXCLUDED.caps,
            tries = EXCLUDED.tries,
            points = EXCLUDED.points,
            fifteens_caps = EXCLUDED.fifteens_caps,
            olympic_games = EXCLUDED.olympic_games,
            is_olympian = EXCLUDED.is_olympian,
            olympic_editions = EXCLUDED.olympic_editions,
            world_cup_sevens = EXCLUDED.world_cup_sevens,
            achievements = EXCLUDED.achievements,
            biography = EXCLUDED.biography,
            image_url = EXCLUDED.image_url,
            image_alt = EXCLUDED.image_alt,
            source_url = EXCLUDED.source_url,
            source_notes = EXCLUDED.source_notes,
            data_status = EXCLUDED.data_status,
            last_checked = EXCLUDED.last_checked,
            raw_data = EXCLUDED.raw_data,
            updated_at = CURRENT_TIMESTAMP;
        `;

        await client.query(query, [
          p.id,
          p.slug,
          p.name,
          p.age ?? null,
          p.dob ?? null,
          p.team ?? null,
          p.format ?? null,
          p.position ?? null,
          p.hometown ?? null,
          p.hometownState ?? null,
          p.nationality ?? null,
          p.height ?? null,
          p.weight ?? null,
          p.club ?? null,
          p.college ?? null,
          p.debut ?? null,
          p.nationalYears ?? null,
          p.caps ?? null,
          p.tries ?? null,
          p.points ?? null,
          p.fifteensCaps ?? null,
          p.olympicGames ?? null,
          Boolean(p.isOlympian),
          Array.isArray(p.olympicEditions) ? p.olympicEditions : [],
          p.worldCupSevens ?? null,
          p.achievements ?? null,
          p.biography ?? null,
          p.imageUrl ?? null,
          p.imageAlt ?? null,
          p.sourceUrl ?? null,
          p.sourceNotes ?? null,
          p.dataStatus ?? null,
          p.lastChecked ?? null,
          p.raw ? JSON.stringify(p.raw) : null,
        ]);
      }
      console.log(`✅ Seeded ${playersData.length} player records into PostgreSQL.`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
