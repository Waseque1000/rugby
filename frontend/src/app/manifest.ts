import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "USA Sevens Stats",
    short_name: "USA 7s Stats",
    description: "The stats and profiles hub for USA men's and women's Rugby Sevens players.",
    start_url: "/",
    display: "standalone",
    background_color: "#06130b",
    theme_color: "#155e3b",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
