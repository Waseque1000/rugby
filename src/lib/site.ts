export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://usa-sevens-stats.vercel.app"
).replace(/\/+$/, "");

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
