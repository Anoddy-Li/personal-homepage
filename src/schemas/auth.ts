import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password is too long."),
});

export interface LoginInput {
  email: string;
  password: string;
}
