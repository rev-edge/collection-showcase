"use client";

// Day 3 scene composition: <Lights /> + <CardMesh />.
// CardMesh owns the tilt/flip hooks and the actual geometry.

import type { ThemeId } from "@/lib/theme-types";
import CardMesh from "./CardMesh";
import Lights from "./Lights";

interface Props {
  themeId: ThemeId;
}

export default function Scene({ themeId }: Props) {
  return (
    <>
      <Lights />
      <CardMesh themeId={themeId} />
    </>
  );
}
