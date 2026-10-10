# USA Sevens Stats 🏉🇺🇸

**USA Sevens Stats** is a production-ready web application and statistical profiles hub for the United States Men's and Women's National Rugby Sevens players, Olympic squads, and collegiate feeder pathways.

Built with **Next.js 14+ / App Router**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

- **Player Directory (`/players`)**: High-performance client-side filtering by team (Men's / Women's), position, college, hometown state, and Olympic Games. Sortable by name, age, and caps.
- **Player Profiles (`/players/[slug]`)**: Static generation (`generateStaticParams`) for every athlete. Strict zero-guess policy: unknown or null fields are hidden cleanly rather than showing `null` or `N/A`.
- **Curated Collections (`/lists`, `/lists/[slug]`)**: Auto-generated cohorts including:
  - *All USA Olympians in Sevens* (Rio 2016, Tokyo 2020, Paris 2024)
  - *Women's Eagles Sevens Roster*
  - *Men's Eagles Sevens Roster*
  - *Players by College & University*
- **MDX Blog & Tactical Analysis (`/blog`, `/blog/[slug]`)**: Long-form editorial pieces with frontmatter metadata, reading time estimates, and Schema.org `Article` JSON-LD.
- **Data Provenance & Citations (`/sources`)**: Complete documentation of official USA Rugby releases, World Rugby tournament bios, and Olympic rosters.
- **SEO & Structured Data**: Dynamic `sitemap.xml`, `robots.txt`, OpenGraph tags, semantic breadcrumbs, and `Person` JSON-LD schema on athlete profiles.
- **Monetization Architecture**:
  - Reusable `<AdSlot />` (controlled via `NEXT_PUBLIC_ENABLE_ADS=false` by default).
  - Reusable `<AffiliateBox />` for rugby boots, balls, and compression gear with transparent affiliate disclosures.
  - Newsletter subscription form connected to `/api/newsletter`.
  - Privacy-compliant `<CookieConsent />` banner with local storage persistence.
- **Theme & Accessibility**: System, Light, and Dark modes via `next-themes` featuring an original dark green, white, and athletic amber/gold palette.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Processing**: `xlsx` (Excel workbook sheet processing) & `gray-matter` (MDX parser)
- **Icons**: `lucide-react`
- **Theming**: `next-themes`

---

## 📁 Project Structure

```
usa-sevens-stats/
├── content/
│   └── blog/                       # MDX articles with frontmatter
├── data/
│   ├── USA_Rugby_Sevens_Player_Database.xlsx  # Master Excel workbook
│   ├── players.json                # Generated JSON dataset
│   ├── sources.json                # Extracted sources archive
│   └── readme.json                 # Extracted notes & caveats
├── scripts/
│   ├── convert-data.ts             # XLSX to JSON build converter
│   └── create-seed-xlsx.ts         # Excel seed workbook creator
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with ThemeProvider, Header & Footer
│   │   ├── page.tsx                # Homepage (Hero search, stats counter, featured)
│   │   ├── players/                # Directory & [slug] profile pages
│   │   ├── lists/                  # Auto-generated rosters & [slug]
│   │   ├── blog/                   # Articles archive & [slug] reader
│   │   ├── sources/                # Citations & methodology
│   │   ├── about/, contact/, privacy/, terms/
│   │   ├── api/newsletter/         # Newsletter subscription endpoint
│   │   ├── sitemap.ts              # Dynamic XML sitemap
│   │   └── robots.ts               # Robots.txt
│   ├── components/
│   │   ├── layout/                 # Header, Footer, ThemeToggle, Breadcrumbs
│   │   ├── players/                # PlayerCard, PlayersFilter, QuickSearch, PlayerAvatar
│   │   ├── monetization/           # AdSlot, AffiliateBox
│   │   └── ui/                     # CookieConsent, NewsletterForm, StatCounter
│   └── lib/
│       ├── players.ts              # Data queries & statistics aggregators
│       ├── blog.ts                 # MDX reader & gray-matter parser
│       └── types.ts                # TypeScript interfaces
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20+ and v26)
- **npm** or **pnpm**

### 2. Installation
```bash
npm install
```

### 3. Build & Convert Data
Convert the master Excel database into static JSON:
```bash
npm run convert-data
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 Updating Player & Tournament Data

To add new players or update caps after a tournament:

1. Open `/data/USA_Rugby_Sevens_Player_Database.xlsx`.
2. Add or edit rows in the **"Players"** sheet.
   - Set **"Player ID"** to the desired URL slug (e.g., `usa-john-smith`).
   - If a statistic or college is unknown, leave the cell blank. **Do not guess or invent data.**
3. Add any new reference URLs or tournament PDFs to the **"Sources"** sheet.
4. Run the conversion build script:
   ```bash
   npm run convert-data
   ```
5. Commit the updated Excel file and generated JSON:
   ```bash
   git add data/
   git commit -m "Update player stats after tournament cycle"
   ```

---

## 🌐 Deploying to Vercel

The application is pre-configured for automated deployment on Vercel:

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/usa-sevens-stats.git
   git branch -M main
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and select your repository.
   - The Framework Preset will automatically detect **Next.js**.
   - Build Command: `npm run build` (runs `convert-data` then `next build`).
   - Output Directory: `.next`.
3. **Environment Variables**:
   Configure these optional environment variables in your Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL`: Your custom domain (e.g., `https://usasevensstats.com`).
   - `NEXT_PUBLIC_ENABLE_ADS`: `false` (default) or `true` (enables `<AdSlot />` units).
4. Click **Deploy**. Your static pages, dynamic sitemaps, and optimized athlete profiles will be live globally on Vercel's Edge Network.

---

## ⚖️ Legal Disclaimer

*USA Sevens Stats is an independent statistical and educational resource. It is not affiliated with, endorsed by, or sponsored by USA Rugby or World Rugby.*
