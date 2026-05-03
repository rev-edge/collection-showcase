// V0 stub — wraps <HoloCard /> + name + "Make your own" CTA on /s/[token].
import type { ThemeId } from "@/lib/theme-types";

export interface ShareViewProps {
  name: string;
  themeId: ThemeId;
  frontUrl: string;
  backUrl: string;
}

export default function ShareView(_props: ShareViewProps) {
  return null;
}
