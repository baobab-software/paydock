"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { resetPasswordSchema } from "@/schemas/auth/reset-password";
import {
  handleAuthActionError,
  type AuthActionResult,
} from "./errors";

export const resetPassword = async (
  input: FormData
): Promise<AuthActionResult | void> => {
  const { token, newPassword } = resetPasswordSchema.parse(
    Object.fromEntries(input.entries())
  );

  try {
    await auth.api.resetPassword({
      query: {
        token,
      },
      body: {
        token,
        newPassword,
      },
    });
  } catch (error) {
    return handleAuthActionError(error);
  }

  redirect("/auth/signin");
};
