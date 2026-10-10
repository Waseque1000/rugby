import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

interface SearchTask {
  slug: string;
  query: string;
  filename: string;
}

const tasks: SearchTask[] = [
  {
    slug: "womens-svns-dominance-tapper-kelter",
    query: "usa womens rugby sevens alev kelter",
    filename: "womens-svns-dominance.jpg",
  },
  {
    slug: "perry-baker-carlin-isles-speed-dynasty",
    query: "perry baker carlin isles usa rugby 7s",
    filename: "perry-baker-carlin-isles.jpg",
  },
  {
    slug: "rise-of-womens-eagles-sevens",
    query: "usa womens eagles sevens rugby team",
    filename: "rise-of-womens-eagles.jpg",
  },
  {
    slug: "sevens-vs-fifteens-tactical-breakdown",
    query: "rugby sevens match action tackle sprint",
    filename: "sevens-vs-fifteens.jpg",
  },
  {
    slug: "world-rugby-svns-2026-calendar-guide",
    query: "world rugby svns series stadium crowd",
    filename: "world-rugby-svns-guide.jpg",
  },
  {
    slug: "top-college-rugby-programs-usa",
    query: "usa college rugby championship match",
    filename: "college-rugby-pathway.jpg",
  },
  {
    slug: "road-to-la-2028-olympic-rugby",
    query: "usa rugby sevens olympics team",
    filename: "road-to-la-2028.jpg",
  },
];

async function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "https:" ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchHtml(res.headers.location).then(resolve).catch(reject);
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("Timeout"));
    });
  });
}

async function downloadFile(url: string, dest: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === "https:" ? https : http;
      const req = client.get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            downloadFile(res.headers.location, dest).then(resolve);
            return;
          }
          if (res.statusCode !== 200) {
            resolve(false);
            return;
          }
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            // Verify file size > 5KB
            const stats = fs.statSync(dest);
            if (stats.size > 5000) {
              resolve(true);
            } else {
              try { fs.unlinkSync(dest); } catch {}
              resolve(false);
            }
          });
        }
      );
      req.on("error", () => resolve(false));
      req.setTimeout(10000, () => {
        req.destroy();
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

async function run() {
  const outputDir = path.join(process.cwd(), "public", "images", "blog");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const task of tasks) {
    const destPath = path.join(outputDir, task.filename);
    console.log(`Searching Bing for: "${task.query}"...`);

    const bingUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(task.query)}&first=1`;
    try {
      const html = await fetchHtml(bingUrl);
      const matches = Array.from(html.matchAll(/murl&quot;:&quot;([^&"]+)/g)).map((m) => m[1]);

      console.log(`Found ${matches.length} image URLs on Bing for "${task.slug}". Attempting downloads...`);

      let downloaded = false;
      for (const imgUrl of matches.slice(0, 8)) {
        console.log(`Trying: ${imgUrl}`);
        const success = await downloadFile(imgUrl, destPath);
        if (success) {
          console.log(`✓ Saved ${task.filename} (${fs.statSync(destPath).size} bytes)`);
          downloaded = true;
          break;
        }
      }

      if (!downloaded) {
        console.warn(`Could not download image from Bing for ${task.slug}.`);
      }
    } catch (err) {
      console.error(`Error querying Bing for ${task.slug}:`, err);
    }
  }

  console.log("Bing images download complete!");
}

run();
