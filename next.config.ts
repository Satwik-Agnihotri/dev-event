import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // You have this one!
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // 👈 YOU ARE MISSING THIS ONE!
      },
    ],
  },
};

export default nextConfig;