import type { User } from "@supabase/supabase-js";

import { AppError } from "@/lib/app-error";
import { getAdminEmails, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface SessionContext {
  isAdmin: boolean;
  isAuthenticated: boolean;
  isConfigured: boolean;
  user: User | null;
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  return getAdminEmails().includes(email.toLowerCase());
}

export function assertAdminAccess(user: Pick<User, "email"> | null | undefined) {
  if (!isAdminEmail(user?.email)) {
    throw new AppError(403, "只有管理员可以执行这个操作。");
  }
}

export async function getSessionContext(): Promise<SessionContext> {
  if (!isSupabaseConfigured()) {
    return {
      isAdmin: false,
      isAuthenticated: false,
      isConfigured: false,
      user: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    isAdmin: isAdminEmail(user?.email),
    isAuthenticated: Boolean(user),
    isConfigured: true,
    user,
  };
}
