import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["fakestoreapi.com", "img.freepik.com",

    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
      },
  
    ],
  },
};

export default nextConfig;
