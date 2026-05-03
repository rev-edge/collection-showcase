import HoloCard from "@/components/HoloCard";

export default function DemoPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
        Demo · Day 3
      </p>
      <HoloCard themeId="aurora" />
      <p className="mt-6 max-w-xs text-center text-sm text-white/40">
        Hover or touch to tilt. Click to flip. Holo shader lands in days 4–5.
      </p>
    </main>
  );
}
