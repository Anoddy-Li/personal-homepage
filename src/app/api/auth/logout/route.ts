import { NextResponse } from "next/server";

import { getErrorMessage } from "@/lib/app-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();

    return NextResponse.json({ message: "已退出登录。" });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error, "退出登录失败。") }, { status: 500 });
  }
}
