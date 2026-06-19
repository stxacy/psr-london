import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/psr-london",
  assetPrefix: "/psr-london/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
