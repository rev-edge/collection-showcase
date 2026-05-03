"use client";

// Public <HoloCard /> entry. Dynamic-imports the actual three.js Canvas with
// ssr:false so three / r3f / drei never run at SSR time. Day 2 ships a static
// placeholder plane only — tilt, flip, holo shader land in days 3–5.
// See plans/v0-implementation-plan.md §3 (component tree) and §4 (theme/shader).

import dynamic from "next/dynamic";
import type { ThemeId } from "@/lib/theme-types";

export interface HoloCardProps {
  themeId: ThemeId;
  /** Front albedo URL. Optional in Day 2 (placeholder); required by day 3. */
  front?: string;
  /** Back albedo URL. Optional in Day 2 (placeholder); required by day 3. */
  back?: string;
}

const HoloCardCanvas = dynamic(() => import("./Canvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="aspect-[2.5/3.5] w-72 sm:w-80 rounded-2xl bg-white/5"
    />
  ),
});

export default function HoloCard(props: HoloCardProps) {
  return <HoloCardCanvas {...props} />;
}
