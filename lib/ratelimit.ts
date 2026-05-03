// V0 stub — Upstash Redis sliding window per IP. Implemented in week 2.
// See plans/v0-implementation-plan.md §8 R6 (abuse mitigation).
export async function checkRateLimit(_ip: string): Promise<{
  ok: boolean;
  remaining: number;
}> {
  return { ok: true, remaining: Number.POSITIVE_INFINITY };
}
