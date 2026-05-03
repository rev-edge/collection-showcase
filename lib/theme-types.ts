// V0 theme contract. Three handcrafted themes; full primitive registry deferred to V1.
// See plans/v0-implementation-plan.md §4 (Theme & shader approach).

export type ThemeId = "aurora" | "flame" | "frost";

export interface Theme {
  id: ThemeId;
  name: string;
  /** Four hex colors used as the iridescence palette ramp. */
  palette: [string, string, string, string];
  background: { gradientCss: string; envMapHint: "studio" | "warm" | "cool" };
  holo: { intensity: number; frequency: number; speed: number };
  rim: { color: string; width: number };
  idle: { breathAmplitude: number; breathSpeed: number };
}
