import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/discord",
        destination: "/.well-known/discord.txt",
      },
    ];
  },
};

export default nextConfig;