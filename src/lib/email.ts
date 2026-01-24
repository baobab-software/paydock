import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rawFrom = process.env.RESEND_FROM ?? process.env.NEXT_PUBLIC_RESEND_FROM;
const fromName = process.env.RESEND_FROM_NAME ?? "Paydock";
const baseEmail =
  rawFrom && rawFrom.includes("@") ? rawFrom : "no-reply@bbbsoftware.co.za";
const from =
  baseEmail.includes("<") && baseEmail.includes("@")
    ? baseEmail
    : `${fromName} <${baseEmail}>`;

export async function sendPasswordResetEmail({
  to,
  url,
  name,
}: {
  to: string;
  url: string;
  name?: string | null;
}) {
  const subject = "Reset your password";
  const html = `
    <p>Hi ${name ?? "there"},</p>
    <p>We received a request to reset your password. Click the button below to set a new password.</p>
    <p><a href="${url}" style="display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">Reset password</a></p>
    <p>If you did not request this, you can ignore this email.</p>
  `;

  await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}
