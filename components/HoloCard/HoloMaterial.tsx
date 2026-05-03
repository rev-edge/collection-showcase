"use client";

// Day 4.1 — wraps the holo shader as <shaderMaterial /> with theme-derived
// uniforms. Drives `uTime` and `uTilt` from r3f's useFrame so the holo
// reacts to pointer input visibly. Other uniforms are theme-fixed and
// recomputed only when theme/albedo change.

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, type ShaderMaterial, type Texture, Vector2 } from "three";
import vertexShader from "@/shaders/holo.vert";
import fragmentShader from "@/shaders/holo.frag";
import type { Theme } from "@/lib/theme-types";

interface Props {
  albedo: Texture;
  theme: Theme;
  /** Live tilt vector from useTilt; [-1, 1] each axis, mutated each frame. */
  tilt: { x: number; y: number };
}

export default function HoloMaterial({ albedo, theme, tilt }: Props) {
  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTilt: { value: new Vector2(0, 0) },
      uPalette: { value: theme.palette.map((hex) => new Color(hex)) },
      uIntensity: { value: theme.holo.intensity },
      uFrequency: { value: theme.holo.frequency },
      uSpeed: { value: theme.holo.speed },
      uAlbedo: { value: albedo },
      uRimColor: { value: new Color(theme.rim.color) },
      uRimWidth: { value: theme.rim.width },
    }),
    [albedo, theme],
  );

  useFrame((state) => {
    const m = materialRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    // Pointer tilt drives band offset, hot-spot position, and effect strength.
    m.uniforms.uTilt.value.set(tilt.x, tilt.y);
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
}
