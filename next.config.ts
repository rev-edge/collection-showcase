import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // V0 has no custom Turbopack/webpack rules. Shaders are TS template strings
  // (see shaders/holo.vert.ts). If shader authoring grows enough to want a real
  // .glsl extension + syntax highlighting, add raw-loader + a turbopack rule then.
};

export default nextConfig;
