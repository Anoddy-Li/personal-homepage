"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { ZodIssue } from "zod/v4";

import { StatusAlert } from "@/components/status-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/app-error";
import { safeRedirectPath } from "@/lib/url";
import { loginSchema, type LoginInput } from "@/schemas/auth";

export function LoginForm({
  nextPath,
}: {
  nextPath: string;
}) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function applyIssues(issues: ZodIssue[]) {
    issues.forEach((issue) => {
      const fieldName = issue.path[0];

      if (typeof fieldName === "string") {
        form.setError(fieldName as keyof LoginInput, {
          message: issue.message,
          type: "manual",
        });
      }
    });
  }

  async function onSubmit(values: LoginInput) {
    setIsPending(true);
    setErrorMessage(null);
    form.clearErrors();

    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      applyIssues(parsed.error.issues);
      setIsPending(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        body: JSON.stringify({
          ...parsed.data,
          next: safeRedirectPath(nextPath),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; redirectTo?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "登录失败。");
      }

      startTransition(() => {
        router.push(payload?.redirectTo ?? "/admin");
        router.refresh();
      });
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "登录失败。"));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit((values) => {
        void onSubmit(values);
      })}
    >
      {errorMessage ? <StatusAlert description={errorMessage} title="登录失败" tone="error" /> : null}
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
        <p className="text-sm text-destructive">{form.formState.errors.email?.message}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
        />
        <p className="text-sm text-destructive">{form.formState.errors.password?.message}</p>
      </div>
      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? "登录中..." : "以管理员身份登录"}
      </Button>
    </form>
  );
}
