/**
 * Frontend API client to communicate with the standalone Express / PostgreSQL backend service
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface BackendHealth {
  status: string;
  uptime: number;
  database: string;
  timestamp: string;
}

export interface BackendStats {
  totalPlayers: number;
  olympians: number;
  mensCount: number;
  womensCount: number;
  collegesCount: number;
}

export interface PlayerQueryParams {
  team?: string;
  position?: string;
  isOlympian?: boolean;
  college?: string;
  q?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

/**
 * Fetch health status of the backend API and PostgreSQL database
 */
export async function getBackendHealth(): Promise<BackendHealth | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("Backend API not reachable at", BACKEND_URL, err);
    return null;
  }
}

/**
 * Fetch players directly from the Express backend API
 */
export async function fetchPlayersFromBackend(params?: PlayerQueryParams) {
  try {
    const url = new URL(`${BACKEND_URL}/api/players`);
    if (params) {
      if (params.team) url.searchParams.set("team", params.team);
      if (params.position) url.searchParams.set("position", params.position);
      if (params.isOlympian !== undefined)
        url.searchParams.set("isOlympian", String(params.isOlympian));
      if (params.college) url.searchParams.set("college", params.college);
      if (params.q) url.searchParams.set("q", params.q);
      if (params.sort) url.searchParams.set("sort", params.sort);
      if (params.limit) url.searchParams.set("limit", String(params.limit));
      if (params.offset) url.searchParams.set("offset", String(params.offset));
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Error fetching from backend API:", err);
    return null;
  }
}

/**
 * Fetch player by slug from the backend API
 */
export async function fetchPlayerBySlugFromBackend(slug: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/players/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`Error fetching player '${slug}' from backend API:`, err);
    return null;
  }
}

/**
 * Fetch database stats summary from backend API
 */
export async function fetchStatsFromBackend(): Promise<BackendStats | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/stats`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("Error fetching stats from backend API:", err);
    return null;
  }
}
