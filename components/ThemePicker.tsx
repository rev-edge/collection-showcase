"use client";

// V0 stub — three radio thumbnails for the V0 theme catalog (aurora, flame, frost).
import type { ThemeId } from "@/lib/theme-types";

export interface ThemePickerProps {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
}

export default function ThemePicker(_props: ThemePickerProps) {
  return null;
}
