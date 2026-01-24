"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { forgotPasswordSchema } from "@/schemas/auth/forgot-password";
import { handleAuthActionError } from "./errors";

const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.APP_URL ??
  "http://localhost:3000";

export const requestPasswordReset = async (input: FormData) => {
  const { email } = forgotPasswordSchema.parse(
    Object.fromEntries(input.entries())
  );

  const redirectTo = `${appBaseUrl}/auth/reset-password`;

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo,
      },
    });
  } catch (error) {
    handleAuthActionError(error);
    redirect("/auth/forgot-password?error=1");
  }

  redirect("/auth/forgot-password?sent=1");
};
