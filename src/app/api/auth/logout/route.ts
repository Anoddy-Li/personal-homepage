import { NextResponse } from "next/server";

import { getErrorMessage } from "@/lib/app-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();

    return NextResponse.json({ message: "Signed out." });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "Unable to sign out.") },
      { status: 500 },
    );
  }
}
