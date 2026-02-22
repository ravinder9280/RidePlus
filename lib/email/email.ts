import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM!;

type BaseEmail = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

export async function sendEmail({ to, subject, html, text }: BaseEmail) {
  // Keep emails fire-and-forget; log errors, don't explode user flows
  try {
    const emailData: any = { from: FROM, to, subject };
    if (html) emailData.html = html;
    if (text) emailData.text = text;

    const { error } = await resend.emails.send(emailData);
    if (error) console.error("[email] send error", error);
    console.log("🚀 [email] sent successfully");
  } catch (e) {
    console.error("[email] exception", e);
  }
}
