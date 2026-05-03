"use client";

// Public <HoloCard /> entry. Dynamic-imports the actual three.js Canvas with
// ssr:false so three / r3f / drei never run at SSR time. The loading skeleton
// matches the canvas wrapper aspect (real front-image ratio 688/1160) so the
// pre-hydration framing is consistent.

import dynamic from "next/dynamic";
import type { ThemeId } from "@/lib/theme-types";

export interface HoloCardProps {
  themeId: ThemeId;
  /** Front albedo URL. V0 demo uses /demo/card-front.jpg directly. */
  front?: string;
  /** Back albedo URL. V0 demo uses /demo/card-back.jpg directly. */
  back?: string;
}

const HoloCardCanvas = dynamic(() => import("./Canvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="w-72 sm:w-80 rounded-2xl bg-white/5"
      style={{ aspectRatio: "688 / 1160" }}
    />
  ),
});

export default function HoloCard(props: HoloCardProps) {
  return <HoloCardCanvas {...props} />;
}
