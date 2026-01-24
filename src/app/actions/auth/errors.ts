import { isRedirectError } from "@/lib/is-redirect-error";

export type AuthActionResult = { error?: string };

const defaultMessage = "Something went wrong. Please try again.";

export const handleAuthActionError = (
  error: unknown
): AuthActionResult => {
  if (isRedirectError(error)) {
    throw error;
  }

  const message =
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
      ? (error as { message: string }).message
      : defaultMessage;

  console.error(error);

  return { error: message || defaultMessage };
};
