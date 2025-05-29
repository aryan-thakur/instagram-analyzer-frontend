import type { NextConfig } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://${BASE_URL}/:path*`, // remote backend
      },
    ];
  },
};

export default nextConfig;
