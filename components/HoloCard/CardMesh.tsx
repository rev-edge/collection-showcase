"use client";

// Day 3 — the actual card. A group containing two front-side planes:
// the back plane is pre-rotated π on Y so when the group's flip angle
// reaches π, the back face is now facing the camera. No DoubleSide
// trickery, no overlap. Front/back colors come from the active theme's
// palette so the flip is visible with no textures yet (textures land
// in day 4+).

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import type { ThemeId } from "@/lib/theme-types";
import { THEMES } from "@/lib/themes";
import { useFlip } from "./useFlip";
import { useTilt } from "./useTilt";

interface Props {
  themeId: ThemeId;
}

const TILT_AMOUNT = 0.35;

export default function CardMesh({ themeId }: Props) {
  const theme = THEMES[themeId];
  const groupRef = useRef<Group>(null);
  const tilt = useTilt();
  const flip = useFlip();

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y = flip.angle.current + tilt.current.x * TILT_AMOUNT;
    g.rotation.x = -tilt.current.y * TILT_AMOUNT;
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      onClick={flip.toggle}
    >
      <mesh>
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial color={theme.palette[0]} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial color={theme.palette[2]} />
      </mesh>
    </group>
  );
}
