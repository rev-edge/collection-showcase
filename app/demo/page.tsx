import HoloCard from "@/components/HoloCard";

export default function DemoPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
        Demo · Day 2
      </p>
      <HoloCard themeId="aurora" />
      <p className="mt-6 max-w-xs text-center text-sm text-white/40">
        Static plane in r3f. Tilt, flip, and holo shader land in days 3–5.
      </p>
    </main>
  );
}
