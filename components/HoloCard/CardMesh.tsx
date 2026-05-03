"use client";

// Day 4 — the card. Loads the demo slab textures and applies the holo
// shader (front) + a plain textured material (back). Front and back planes
// each preserve their source image's exact aspect ratio so neither slab
// is distorted; widths derived per-side from the saved files' real dims.
//
// Asset dimensions read with `sips -g pixelWidth -g pixelHeight ...`:
//   public/demo/card-front.jpg : 688 × 1160 (h/w = 1.6860)
//   public/demo/card-back.jpg  : 596 × 1008 (h/w = 1.6913)
//
// PLANE_HEIGHT chosen to fit comfortably inside the camera frustum
// (camera at z=5, fov=35° → vertical viewport ≈ 3.15). The two demo
// images are temporary V0 assets — V1's upload pipeline will compute
// aspect per-asset at write time and store both originals + derived
// variants properly.

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Group, SRGBColorSpace } from "three";
import type { ThemeId } from "@/lib/theme-types";
import { THEMES } from "@/lib/themes";
import HoloMaterial from "./HoloMaterial";
import { useFlip } from "./useFlip";
import { useTilt } from "./useTilt";

const FRONT_SRC_W = 688;
const FRONT_SRC_H = 1160;
const BACK_SRC_W = 596;
const BACK_SRC_H = 1008;

const PLANE_HEIGHT = 2.7;
const FRONT_PLANE_W = (PLANE_HEIGHT * FRONT_SRC_W) / FRONT_SRC_H;
const BACK_PLANE_W = (PLANE_HEIGHT * BACK_SRC_W) / BACK_SRC_H;

const TILT_AMOUNT = 0.35;

interface Props {
  themeId: ThemeId;
}

function Card({ themeId }: Props) {
  const theme = THEMES[themeId];
  const groupRef = useRef<Group>(null);
  const tilt = useTilt();
  const flip = useFlip();

  const [frontTex, backTex] = useTexture([
    "/demo/card-front.jpg",
    "/demo/card-back.jpg",
  ]);
  // Texture is a three.js class instance; assigning colorSpace is the
  // documented way to opt these JPEGs into sRGB sampling. Setting it before
  // first paint (synchronous, in render) is more reliable than an effect-based
  // set-after-load which races the first frame. React 19's
  // react-hooks/immutability rule flags hook-returned-value mutation generically;
  // the suppression is scoped to these two lines.
  // eslint-disable-next-line react-hooks/immutability
  frontTex.colorSpace = SRGBColorSpace;
  // eslint-disable-next-line react-hooks/immutability
  backTex.colorSpace = SRGBColorSpace;

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
        <planeGeometry args={[FRONT_PLANE_W, PLANE_HEIGHT]} />
        <HoloMaterial albedo={frontTex} theme={theme} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[BACK_PLANE_W, PLANE_HEIGHT]} />
        <meshStandardMaterial map={backTex} />
      </mesh>
    </group>
  );
}

export default function CardMesh({ themeId }: Props) {
  // Suspense boundary for texture loading so <Lights /> doesn't suspend
  // alongside the card.
  return (
    <Suspense fallback={null}>
      <Card themeId={themeId} />
    </Suspense>
  );
}
