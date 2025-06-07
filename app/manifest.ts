import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CricHattric - Your Cricket Universe",
    short_name: "CricHattric",
    description: "Real-time cricket scores, news, and comprehensive coverage",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/logo.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/logo.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
    categories: ["sports", "news", "entertainment"],
    lang: "en",
    orientation: "portrait-primary",
  }
}
