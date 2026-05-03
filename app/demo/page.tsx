import HoloCard from "@/components/HoloCard";

export default function DemoPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
        Demo · Day 4.1
      </p>
      <HoloCard themeId="aurora" />
      <p className="mt-6 max-w-xs text-center text-sm text-white/40">
        Move your pointer over the card to see bands shift, sparkle stripes
        light up, and a hot spot follow. Tilt and click still work.
      </p>
    </main>
  );
}
