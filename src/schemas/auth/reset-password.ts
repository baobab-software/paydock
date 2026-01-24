import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters long"),
}).refine(
  ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
  {
    message: "Passwords must match",
    path: ["confirmPassword"],
  }
);

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
