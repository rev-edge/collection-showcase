"use client";

// Day 2 — actual r3f <Canvas> wrapper. Loaded only on the client via the
// dynamic import in ./index.tsx (ssr:false). Sized with a fixed
// trading-card aspect (2.5:3.5) so the placeholder framing is honest.

import { Canvas } from "@react-three/fiber";
import type { ThemeId } from "@/lib/theme-types";
import Scene from "./Scene";

interface Props {
  themeId: ThemeId;
}

export default function HoloCardCanvas({ themeId }: Props) {
  return (
    <div className="aspect-[2.5/3.5] w-72 sm:w-80">
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
