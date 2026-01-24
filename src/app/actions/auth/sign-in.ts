"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  handleAuthActionError,
  type AuthActionResult,
} from "./errors";

export const signIn = async (
  input: FormData
): Promise<AuthActionResult | void> => {
  const { email, password } = Object.fromEntries(input.entries()) as {
    email: string;
    password: string;
  };

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    return handleAuthActionError(error);
  }

  redirect("/dashboard");
};
