"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  handleAuthActionError,
  type AuthActionResult,
} from "./errors";

export const signOut = async (): Promise<AuthActionResult | void> => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    return handleAuthActionError(error);
  }

  redirect("/");
};
