import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
