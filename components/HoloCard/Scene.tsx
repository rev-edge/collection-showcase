"use client";

// Day 2 scene — ambient + directional lights + a single textured-color plane.
// Uses the active theme's first palette color so the three V0 themes are visually
// distinguishable even at this stage. Lights and CardMesh get split out into
// dedicated components on day 3+ when interaction logic arrives.

import type { ThemeId } from "@/lib/theme-types";
import { THEMES } from "@/lib/themes";

interface Props {
  themeId: ThemeId;
}

export default function Scene({ themeId }: Props) {
  const theme = THEMES[themeId];
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <mesh>
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial color={theme.palette[0]} />
      </mesh>
    </>
  );
}
