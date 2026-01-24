import { redirect } from "next/navigation";

import { ResetPasswordForm } from "@/components/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const resolved = await searchParams;
  const token = resolved?.token;

  if (!token) {
    redirect("/auth/forgot-password");
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-md">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
