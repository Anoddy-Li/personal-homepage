import { z } from "zod/v4";

import { AppError } from "@/lib/app-error";

const envSchema = z.object({
  ADMIN_EMAILS: z.string().optional().default(""),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
});

function readEnv() {
  return envSchema.parse({
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

const parsedEnv = readEnv();

export const env = parsedEnv;

export function getSiteUrl() {
  return readEnv().NEXT_PUBLIC_SITE_URL;
}

export function getAdminEmails() {
  return readEnv().ADMIN_EMAILS.split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export function isSupabaseConfigured() {
  const currentEnv = readEnv();

  return Boolean(
    currentEnv.NEXT_PUBLIC_SUPABASE_URL &&
      currentEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function isSupabaseAdminConfigured() {
  const currentEnv = readEnv();

  return Boolean(
    isSupabaseConfigured() && currentEnv.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function assertSupabaseConfigured() {
  if (!isSupabaseConfigured()) {
    throw new AppError(
      503,
      "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
}

export function assertSupabaseAdminConfigured() {
  if (!isSupabaseAdminConfigured()) {
    throw new AppError(
      503,
      "Supabase admin access is not configured yet. Add SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
}
