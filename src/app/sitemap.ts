import { MetadataRoute } from "next";
import { getAllPlayerHubs, getAllPlayers, getAllLists } from "@/lib/players";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/players`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/lists`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/activities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Player profiles
  const playerRoutes: MetadataRoute.Sitemap = getAllPlayers().filter((player) => player.indexable).map((player) => ({
    url: `${SITE_URL}/players/${player.slug}`,
    lastModified: player.lastChecked ? new Date(player.lastChecked) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const playerHubs: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/players/hubs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getAllPlayerHubs().map((hub) => ({
      url: `${SITE_URL}/players/hubs/${hub.dimension}/${hub.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Curated lists
  const listRoutes: MetadataRoute.Sitemap = getAllLists().map((list) => ({
    url: `${SITE_URL}/lists/${list.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Blog posts
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...playerRoutes, ...playerHubs, ...listRoutes, ...blogRoutes];
}
