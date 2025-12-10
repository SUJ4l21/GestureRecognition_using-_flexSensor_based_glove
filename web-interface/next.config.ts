import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure to help with Windows path length issues
  distDir: ".next",
  // Disable source maps in development to reduce path length issues
  productionBrowserSourceMaps: false,
};

export default nextConfig;
