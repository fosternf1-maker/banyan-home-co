import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This package is not the marketing site. Pin Turbopack to this directory
  // so the parent repo's lockfile is not treated as this app's workspace root.
  turbopack: {
    root: path.join(process.cwd()),
  },
};

export default nextConfig;
