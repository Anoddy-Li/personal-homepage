import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/auth";
import { getErrorMessage } from "@/lib/app-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { safeRedirectPath } from "@/lib/url";
import { loginSchema } from "@/schemas/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "登录信息不合法。" },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!isAdminEmail(data.user?.email)) {
      await supabase.auth.signOut();

      return NextResponse.json(
        { error: "这个账号没有后台访问权限。" },
        { status: 403 },
      );
    }

    return NextResponse.json({
      redirectTo: safeRedirectPath(typeof body.next === "string" ? body.next : "/admin"),
    });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error, "登录失败。") }, { status: 500 });
  }
}
