import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.string().trim().email("请输入有效的邮箱地址。"),
  password: z.string().min(8, "密码至少需要 8 位。").max(128, "密码长度过长。"),
});

export interface LoginInput {
  email: string;
  password: string;
}
