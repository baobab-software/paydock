"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { isRedirectError } from "@/lib/is-redirect-error";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/app/actions/auth";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/schemas/auth/reset-password";
import { cn } from "@/lib/utils";

export function ResetPasswordForm({
  token,
  className,
  ...props
}: React.ComponentProps<"form"> & { token: string }) {
  const [isPending, startTransition] = useTransition();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const toFieldErrors = useMemo(
    () => (error?: { message?: string }) => (error ? [error] : undefined),
    []
  );

  const onSubmit = form.handleSubmit((values) => {
    setFormError(null);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      resetPassword(formData)
        .then((result) => {
          if (result?.error) {
            setFormError(result.error);
          }
        })
        .catch((error) => {
          if (isRedirectError(error)) {
            throw error;
          }
          console.error(error);
          setFormError("Something went wrong. Please try again.");
        });
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Choose a new password to secure your account
          </p>
        </div>
        {formError && (
          <div className="rounded-md border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {formError}
          </div>
        )}
        <input type="hidden" {...form.register("token")} />
        <Field>
          <FieldLabel htmlFor="newPassword">New password</FieldLabel>
          <div className="relative">
            <Input
              id="newPassword"
              {...form.register("newPassword")}
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              className="pr-10"
              aria-invalid={!!form.formState.errors.newPassword}
              aria-describedby={
                form.formState.errors.newPassword
                  ? "new-password-error"
                  : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="focus-visible:ring-ring focus-visible:ring-offset-background absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-pressed={showNewPassword}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle new password visibility</span>
            </button>
          </div>
          <FieldError
            id="new-password-error"
            errors={toFieldErrors(form.formState.errors.newPassword)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          <div className="relative">
            <Input
              id="confirmPassword"
              {...form.register("confirmPassword")}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="pr-10"
              aria-invalid={!!form.formState.errors.confirmPassword}
              aria-describedby={
                form.formState.errors.confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="focus-visible:ring-ring focus-visible:ring-offset-background absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-pressed={showConfirmPassword}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                Toggle confirm password visibility
              </span>
            </button>
          </div>
          <FieldError
            id="confirm-password-error"
            errors={toFieldErrors(form.formState.errors.confirmPassword)}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset password"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Already reset it?{" "}
            <a href="/auth/signin" className="underline underline-offset-4">
              Back to sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
