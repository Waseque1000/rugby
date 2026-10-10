import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const PORT = process.env.PORT || 8000;

// PostgreSQL Connection Pool
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgrespassword@localhost:5432/rugby_db?schema=public";

const pool = new Pool({
  connectionString,
});

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// 1. Health Check
app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    const dbRes = await pool.query("SELECT 1 AS status");
    res.json({
      status: "ok",
      uptime: process.uptime(),
      database: dbRes.rows.length > 0 ? "connected" : "error",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(503).json({
      status: "degraded",
      database: "disconnected",
      error: err.message,
    });
  }
});

// 2. GET all players (with optional filters: team, position, isOlympian, college, q)
app.get("/api/players", async (req: Request, res: Response) => {
  try {
    const { team, position, isOlympian, college, q, sort, limit, offset } =
      req.query;

    let query = "SELECT * FROM players WHERE 1=1";
    const values: any[] = [];
    let paramIndex = 1;

    if (team) {
      query += ` AND LOWER(team) LIKE LOWER($${paramIndex++})`;
      values.push(`%${team}%`);
    }

    if (position) {
      query += ` AND LOWER(position) = LOWER($${paramIndex++})`;
      values.push(position);
    }

    if (isOlympian !== undefined) {
      query += ` AND is_olympian = $${paramIndex++}`;
      values.push(isOlympian === "true");
    }

    if (college) {
      query += ` AND LOWER(college) LIKE LOWER($${paramIndex++})`;
      values.push(`%${college}%`);
    }

    if (q) {
      query += ` AND (
        LOWER(name) LIKE LOWER($${paramIndex}) OR
        LOWER(COALESCE(college, '')) LIKE LOWER($${paramIndex}) OR
        LOWER(COALESCE(position, '')) LIKE LOWER($${paramIndex}) OR
        LOWER(COALESCE(hometown, '')) LIKE LOWER($${paramIndex})
      )`;
      values.push(`%${q}%`);
      paramIndex++;
    }

    // Sort order
    if (sort === "name-asc") query += " ORDER BY name ASC";
    else if (sort === "name-desc") query += " ORDER BY name DESC";
    else if (sort === "age-desc") query += " ORDER BY age DESC NULLS LAST";
    else if (sort === "age-asc") query += " ORDER BY age ASC NULLS LAST";
    else if (sort === "caps-desc") query += " ORDER BY caps DESC NULLS LAST";
    else query += " ORDER BY name ASC";

    if (limit) {
      query += ` LIMIT $${paramIndex++}`;
      values.push(parseInt(limit as string, 10));
    }

    if (offset) {
      query += ` OFFSET $${paramIndex++}`;
      values.push(parseInt(offset as string, 10));
    }

    const result = await pool.query(query, values);

    // Map database snake_case columns to camelCase API structure
    const players = result.rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      age: p.age,
      dob: p.dob,
      team: p.team,
      format: p.format,
      position: p.position,
      hometown: p.hometown,
      hometownState: p.hometown_state,
      nationality: p.nationality,
      height: p.height,
      weight: p.weight,
      club: p.club,
      college: p.college,
      debut: p.debut,
      nationalYears: p.national_years,
      caps: p.caps,
      tries: p.tries,
      points: p.points,
      fifteensCaps: p.fifteens_caps,
      olympicGames: p.olympic_games,
      isOlympian: p.is_olympian,
      olympicEditions: p.olympic_editions || [],
      worldCupSevens: p.world_cup_sevens,
      achievements: p.achievements,
      biography: p.biography,
      imageUrl: p.image_url,
      imageAlt: p.image_alt,
      sourceUrl: p.source_url,
      sourceNotes: p.source_notes,
      dataStatus: p.data_status,
      lastChecked: p.last_checked,
      raw: p.raw_data,
    }));

    res.json({
      count: players.length,
      players,
    });
  } catch (err: any) {
    console.error("GET /api/players error:", err);
    res.status(500).json({ error: "Failed to fetch players", details: err.message });
  }
});

// 3. GET player by slug or ID
app.get("/api/players/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT * FROM players WHERE slug = $1 OR id = $1 LIMIT 1;",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    const p = result.rows[0];
    const player = {
      id: p.id,
      slug: p.slug,
      name: p.name,
      age: p.age,
      dob: p.dob,
      team: p.team,
      format: p.format,
      position: p.position,
      hometown: p.hometown,
      hometownState: p.hometown_state,
      nationality: p.nationality,
      height: p.height,
      weight: p.weight,
      club: p.club,
      college: p.college,
      debut: p.debut,
      nationalYears: p.national_years,
      caps: p.caps,
      tries: p.tries,
      points: p.points,
      fifteensCaps: p.fifteens_caps,
      olympicGames: p.olympic_games,
      isOlympian: p.is_olympian,
      olympicEditions: p.olympic_editions || [],
      worldCupSevens: p.world_cup_sevens,
      achievements: p.achievements,
      biography: p.biography,
      imageUrl: p.image_url,
      imageAlt: p.image_alt,
      sourceUrl: p.source_url,
      sourceNotes: p.source_notes,
      dataStatus: p.data_status,
      lastChecked: p.last_checked,
      raw: p.raw_data,
    };

    res.json(player);
  } catch (err: any) {
    console.error("GET /api/players/:slug error:", err);
    res.status(500).json({ error: "Failed to fetch player", details: err.message });
  }
});

// 4. GET player database stats summary
app.get("/api/stats", async (_req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        COUNT(*) AS total_players,
        COUNT(CASE WHEN is_olympian THEN 1 END) AS olympians,
        COUNT(CASE WHEN LOWER(team) LIKE '%men%' AND LOWER(team) NOT LIKE '%women%' THEN 1 END) AS mens_count,
        COUNT(CASE WHEN LOWER(team) LIKE '%women%' THEN 1 END) AS womens_count,
        COUNT(DISTINCT college) FILTER (WHERE college IS NOT NULL AND college != '') AS colleges_count
      FROM players;
    `;
    const result = await pool.query(query);
    const row = result.rows[0];

    res.json({
      totalPlayers: parseInt(row.total_players, 10) || 0,
      olympians: parseInt(row.olympians, 10) || 0,
      mensCount: parseInt(row.mens_count, 10) || 0,
      womensCount: parseInt(row.womens_count, 10) || 0,
      collegesCount: parseInt(row.colleges_count, 10) || 0,
    });
  } catch (err: any) {
    console.error("GET /api/stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats", details: err.message });
  }
});

// 5. GET all documentation sources
app.get("/api/sources", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM sources ORDER BY id ASC;");
    res.json(result.rows);
  } catch (err: any) {
    console.error("GET /api/sources error:", err);
    res.status(500).json({ error: "Failed to fetch sources", details: err.message });
  }
});

// 6. POST Newsletter Subscription
app.post("/api/newsletter", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    const cleanEmail = email.toLowerCase().trim();
    await pool.query(
      `INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING;`,
      [cleanEmail]
    );

    res.status(201).json({
      success: true,
      message: "Subscribed successfully to USA Sevens Stats dispatch",
      email: cleanEmail,
    });
  } catch (err: any) {
    console.error("POST /api/newsletter error:", err);
    res.status(500).json({ error: "Newsletter subscription failed", details: err.message });
  }
});

// 7. POST Contact Form
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All contact fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO contact_submissions (name, email, subject, message) 
       VALUES ($1, $2, $3, $4) RETURNING id, created_at;`,
      [name.trim(), email.toLowerCase().trim(), subject.trim(), message.trim()]
    );

    res.status(201).json({
      success: true,
      message: "Message received by editorial team",
      submission: result.rows[0],
    });
  } catch (err: any) {
    console.error("POST /api/contact error:", err);
    res.status(500).json({ error: "Contact submission failed", details: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Rugby Sevens Backend API listening on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏉 Players API:  http://localhost:${PORT}/api/players`);
});
