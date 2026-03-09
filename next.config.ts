import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
      },
    ];
  },

  images: {
    domains: ["i.ibb.co", "i.ibb.co.com"], // allow imgbb images
  },
};

export default nextConfig;
