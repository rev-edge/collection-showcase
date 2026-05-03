import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        Card Vault · V0
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Bring your collection to life.
      </h1>
      <p className="mt-4 max-w-md text-base text-white/60">
        Upload one card. Pick a theme. Watch it come alive. Share the link.
      </p>
      <Link
        href="/new"
        className="mt-10 inline-flex h-12 items-center rounded-full bg-white px-6 font-medium text-black transition-opacity hover:opacity-90"
      >
        Create yours
      </Link>
      <Link
        href="/demo"
        className="mt-3 text-sm text-white/40 hover:text-white/70"
      >
        See the demo →
      </Link>
    </main>
  );
}
