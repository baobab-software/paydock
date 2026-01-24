import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const sent = resolved?.sent === "1";
  const error = resolved?.error === "1";

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-md">
        {error && (
          <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            Something went wrong. Please try again.
          </div>
        )}
        {sent && (
          <div className="mb-4 rounded-md border border-primary/50 bg-primary/5 px-4 py-3 text-sm text-primary">
            If an account exists for that email, a reset link has been sent.
          </div>
        )}
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
