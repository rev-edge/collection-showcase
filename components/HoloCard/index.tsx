"use client";

// V0 <HoloCard /> entry — Canvas + Scene composition lands here in week 1, day 2+.
// See plans/v0-implementation-plan.md §3 (Component tree) and §4 (Theme & shader).

import type { ThemeId } from "@/lib/theme-types";

export interface HoloCardProps {
  front: string;
  back: string;
  themeId: ThemeId;
}

export default function HoloCard(_props: HoloCardProps) {
  return null;
}
