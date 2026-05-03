"use client";

// Day 4 — wraps the holo shader as a <shaderMaterial /> with theme-derived
// uniforms. Drives `uTime` from the r3f clock; all other uniforms are
// fixed per-theme and recomputed only when theme or albedo changes.

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, type ShaderMaterial, type Texture } from "three";
import vertexShader from "@/shaders/holo.vert";
import fragmentShader from "@/shaders/holo.frag";
import type { Theme } from "@/lib/theme-types";

interface Props {
  albedo: Texture;
  theme: Theme;
}

export default function HoloMaterial({ albedo, theme }: Props) {
  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
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
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
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
