import Link from "next/link";

export default function ShareNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">404</p>
      <h1 className="mt-4 text-2xl font-semibold">This card isn&apos;t here.</h1>
      <p className="mt-2 max-w-sm text-sm text-white/60">
        The link may have been revoked, or the token is wrong.
      </p>
      <Link
        href="/new"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-black transition-opacity hover:opacity-90"
      >
        Create your own
      </Link>
    </main>
  );
}
