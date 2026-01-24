"use client";

import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/app/actions/auth";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schemas/auth/forgot-password";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const toFieldErrors = useMemo(
    () => (error?: { message?: string }) => (error ? [error] : undefined),
    []
  );

  const onSubmit = form.handleSubmit((values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => requestPasswordReset(formData));
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email to receive a password reset link
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            {...form.register("email")}
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            aria-invalid={!!form.formState.errors.email}
            aria-describedby={
              form.formState.errors.email ? "email-error" : undefined
            }
          />
          <FieldError
            id="email-error"
            errors={toFieldErrors(form.formState.errors.email)}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send reset link"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Remembered your password?{" "}
            <a href="/auth/signin" className="underline underline-offset-4">
              Back to sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
