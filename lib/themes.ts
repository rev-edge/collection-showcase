// V0 theme catalog. Hand-crafted, IP-clean, deliberately distinct.
// Final palette/uniform values land in week 1 day 4–5 (`leva` tuning on /demo).
// See plans/v0-implementation-plan.md §4.1.

import type { Theme, ThemeId } from "./theme-types";

export const THEMES: Record<ThemeId, Theme> = {
  aurora: {
    id: "aurora",
    name: "Aurora",
    palette: ["#7CF6FF", "#A66CFF", "#FF66E1", "#39E5C0"],
    background: {
      gradientCss:
        "radial-gradient(60% 60% at 50% 35%, rgba(124,246,255,0.08), transparent), #0a0a0c",
      envMapHint: "studio",
    },
    holo: { intensity: 0.85, frequency: 6.0, speed: 0.4 },
    rim: { color: "#7CF6FF", width: 0.18 },
    idle: { breathAmplitude: 0.04, breathSpeed: 0.5 },
  },
  flame: {
    id: "flame",
    name: "Flame",
    palette: ["#FFB45B", "#FF4D4D", "#FF1493", "#FFD24A"],
    background: {
      gradientCss:
        "radial-gradient(55% 55% at 50% 35%, rgba(255,77,77,0.10), transparent), #100808",
      envMapHint: "warm",
    },
    holo: { intensity: 0.95, frequency: 7.5, speed: 0.7 },
    rim: { color: "#FF8A4D", width: 0.22 },
    idle: { breathAmplitude: 0.05, breathSpeed: 0.7 },
  },
  frost: {
    id: "frost",
    name: "Frost",
    palette: ["#CFE9FF", "#FFFFFF", "#C8D6E5", "#9FCFFF"],
    background: {
      gradientCss:
        "linear-gradient(180deg, #0e1418 0%, #06090b 100%)",
      envMapHint: "cool",
    },
    holo: { intensity: 0.7, frequency: 4.5, speed: 0.25 },
    rim: { color: "#E6F4FF", width: 0.14 },
    idle: { breathAmplitude: 0.03, breathSpeed: 0.4 },
  },
};

export const THEME_IDS: ThemeId[] = ["aurora", "flame", "frost"];

export function isThemeId(value: unknown): value is ThemeId {
  return value === "aurora" || value === "flame" || value === "frost";
}
