import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@convex-dev/client'],
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'odaat1.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // For placeholder generation if needed
      }
    ],
  },
};

export default nextConfig;
