"use client";

// Day 2-onward — actual r3f <Canvas> wrapper. Loaded only on the client via
// the dynamic import in ./index.tsx (ssr:false). The wrapper aspect ratio
// matches the real saved demo asset's dimensions (688 × 1160) so the front
// face — which is the default visible side — fills the wrapper without
// distortion. The back face is very slightly taller (596 × 1008 → 1.6913
// vs front's 1.6860, ~0.3% diff); imperceptible.

import { Canvas } from "@react-three/fiber";
import type { ThemeId } from "@/lib/theme-types";
import Scene from "./Scene";

interface Props {
  themeId: ThemeId;
}

export default function HoloCardCanvas({ themeId }: Props) {
  return (
    <div
      className="w-72 sm:w-80 touch-none select-none"
      style={{ aspectRatio: "688 / 1160" }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene themeId={themeId} />
      </Canvas>
    </div>
  );
}
