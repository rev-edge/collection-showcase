export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center text-white/40">
      <p className="text-xs uppercase tracking-[0.2em]">Share</p>
      <p className="mt-3 text-sm">
        Week-2 target — &lt;ShareView /&gt; lands here.
      </p>
      <p className="mt-1 font-mono text-xs text-white/30">token: {token}</p>
    </main>
  );
}
