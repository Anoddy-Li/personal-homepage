import { createClient } from "@supabase/supabase-js";

import type { Database } from "../src/db/database.types";
import { getErrorMessage } from "../src/lib/app-error";
import { env, isSupabaseAdminConfigured } from "../src/lib/env";
import { buildStudyLogBaseSlug } from "../src/lib/study-log-slug";
import { parseStudyLogFormValues } from "../src/schemas/study-log";

async function main() {
  if (!isSupabaseAdminConfigured()) {
    throw new Error(
      "缺少 Supabase 管理端配置，请先设置 NEXT_PUBLIC_SUPABASE_URL、NEXT_PUBLIC_SUPABASE_ANON_KEY 和 SUPABASE_SERVICE_ROLE_KEY。",
    );
  }

  const supabase = createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const entries = [
    {
      content: `## 今天学了什么

- 回顾匀加速直线运动的基本推导
- 重新整理速度、位移和时间之间的关系
- 把推导过程改写成更容易复习的版本

## 复盘

真正重新推一遍公式之后，理解会比只记结果更稳。以后遇到类似内容，我想继续坚持“先推导，再总结”的节奏。`,
      date: "2026-03-20",
      durationMinutes: "95",
      isPublic: true,
      mood: "专注",
      summary: "重新推导匀加速运动公式，并把过程整理成更容易复习的笔记。",
      tagsInput: "物理, 力学, 反思",
      title: "重新推导匀加速运动公式",
    },
    {
      content: `## 今天学了什么

- 调整一个 Next.js 表单页面的结构
- 重新检查 Zod 校验边界
- 把重复的交互反馈整理得更清楚

## 复盘

表单体验往往不是靠大改，而是靠一处一处细小调整。数据结构越清楚，页面维护起来就越轻松。`,
      date: "2026-03-21",
      durationMinutes: "75",
      isPublic: false,
      mood: "平稳",
      summary: "继续打磨表单体验，并梳理校验与反馈之间的边界。",
      tagsInput: "编程, typescript, zod",
      title: "继续整理表单体验和校验边界",
    },
  ].map((entry) => {
    const parsed = parseStudyLogFormValues(entry);

    return {
      content: parsed.content,
      date: parsed.date,
      duration_minutes: parsed.durationMinutes,
      is_public: parsed.isPublic,
      mood: parsed.mood,
      slug: buildStudyLogBaseSlug(parsed.date, parsed.title),
      summary: parsed.summary,
      tags: parsed.tags,
      title: parsed.title,
    };
  });

  const { error } = await supabase.from("study_logs").upsert(entries, {
    onConflict: "slug",
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(`已写入 ${entries.length} 篇示例学习日志。`);
}

main().catch((error) => {
  console.error(getErrorMessage(error, "写入示例学习日志失败。"));
  process.exitCode = 1;
});
