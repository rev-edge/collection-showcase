"use client";
/* eslint-disable react-hooks/refs */

// Day 3 — pointer/touch position over the mesh, smoothed into a tilt vector.
// Reads `e.uv` (mesh-local UV in [0,1]); converts to [-1,1]; exponential lerp
// in useFrame keeps motion frame-rate independent.
//
// File-level disable of `react-hooks/refs`: this hook intentionally bypasses
// React's render cycle. Target/current live in refs, mutated imperatively,
// read each frame by useFrame *and* by the consuming mesh's own useFrame.
// The return statement captures `currentRef.current` (a stable inner-object
// reference, never reassigned) so the consumer can read live `.x`/`.y` values.
// Standard r3f pattern; the React 19 lint rule's "no ref access at render"
// guidance is overly broad here and conflicts with the deliberate design.

import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef } from "react";

interface TiltState {
  current: { x: number; y: number };
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
  onPointerLeave: () => void;
}

const TILT_RATE = 12;

export function useTilt(): TiltState {
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!e.uv) return;
    targetRef.current.x = (e.uv.x - 0.5) * 2;
    targetRef.current.y = (e.uv.y - 0.5) * 2;
  }, []);

  const onPointerLeave = useCallback(() => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
  }, []);

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-TILT_RATE * delta);
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * t;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * t;
  });

  return {
    current: currentRef.current,
    onPointerMove,
    onPointerLeave,
  };
}
