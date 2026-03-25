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

  async headers() {
    return [
      {
        source: "/.well-known/discord",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ];
  },
};

export default nextConfig;