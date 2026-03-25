import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/discord",
        destination: "/api/discord",
      },
    ];
  },
};

export default nextConfig;