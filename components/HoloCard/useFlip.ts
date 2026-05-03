"use client";

// Day 3 — click/tap toggles a target Y rotation between 0 and π; current angle
// lerps toward target each frame. Same imperative-ref animation pattern as
// useTilt — the consumer reads `flip.angle.current` from its own useFrame
// (not during render), so no react-hooks/refs suppression is needed here.

import { useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";

interface FlipState {
  angle: { current: number };
  toggle: () => void;
}

const FLIP_RATE = 9;

export function useFlip(): FlipState {
  const targetRef = useRef(0);
  const angleRef = useRef(0);

  const toggle = useCallback(() => {
    targetRef.current = targetRef.current === 0 ? Math.PI : 0;
  }, []);

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-FLIP_RATE * delta);
    angleRef.current += (targetRef.current - angleRef.current) * t;
  });

  return { angle: angleRef, toggle };
}
