"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  handleAuthActionError,
  type AuthActionResult,
} from "./errors";

export const signUp = async (
  input: FormData
): Promise<AuthActionResult | void> => {
  const { name, email, password } = Object.fromEntries(input.entries()) as {
    name: string;
    email: string;
    password: string;
  };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    return handleAuthActionError(error);
  }

  redirect("/dashboard");
};
