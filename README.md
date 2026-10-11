# USA Sevens Stats

USA Sevens Stats is a single Next.js application for USA rugby sevens player profiles, tournament activities, curated rosters, and editorial articles. It reads its published content from local JSON and MDX files; it has no PostgreSQL database or separate API server.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update site data

- Edit `data/players.json` and `data/sources.json` for player and source records.
- Edit the master workbook at `data/USA_Rugby_Sevens_Player_Database.xlsx`, then run `npm run convert-data` to regenerate the JSON files.
- Add or update articles in `content/blog/*.mdx`.
- Update tournament dates and links in `src/lib/activities.ts`.

The JSON and MDX content is version controlled, so updates are reviewable and recoverable through Git.

## Contact and newsletter submissions

The Next.js API routes save form submissions as JSON under `storage/`. This directory is ignored by Git because it contains private contact details. Set `JSON_STORAGE_DIR` to choose another location. Back up this folder if you need to retain submissions.

## Run with Docker

```bash
docker compose up --build
```

This starts one web container on port 3000. Docker Compose mounts a persistent volume at `/app/storage` for form submissions. There is no database service.

## Build

```bash
npm run build
npm start
```
