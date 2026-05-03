// V0 OG image stub — implemented in week 2 with @vercel/og.
// See plans/v0-implementation-plan.md §1 (opengraph-image.tsx) and §6 day-by-day.

export const runtime = "edge";
export const alt = "Card Vault";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Implemented in week 2.
  return new Response(null, { status: 404 });
}
