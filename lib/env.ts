// V0 env loader. Validates required env at boot for server code.
// In week 1 nothing is required yet; week 2 introduces Supabase + Upstash vars.
// We keep validation tolerant in V0 so the dev server boots without a Supabase project.

interface ServerEnv {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  NEXT_PUBLIC_SITE_URL?: string;
}

export const env: ServerEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

/** Throws when a required var is missing. Call at server-only code paths in week 2. */
export function requireServerEnv<K extends keyof ServerEnv>(
  ...keys: K[]
): { [P in K]: string } {
  const out = {} as { [P in K]: string };
  for (const key of keys) {
    const value = env[key];
    if (!value) throw new Error(`Missing required env var: ${key}`);
    out[key] = value;
  }
  return out;
}
