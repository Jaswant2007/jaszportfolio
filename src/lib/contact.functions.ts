import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  subject: z.string().trim().min(3, "Please add a short subject.").max(200),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: ContactInput) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey =
      process.env["RESEND_API_KEY"] ?? process.env["RESEND_API_KEY_2"] ?? process.env["RESEND_KEY"];
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      console.error("[contact] No Resend credential is available in the runtime environment.");
      return { ok: false as const, error: "Message could not be sent right now. Please try again shortly." };
    }


    const to = "jas22happy@gmail.com";
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 12px">New portfolio message</h2>
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <div style="white-space:pre-wrap;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fafafa">${escapeHtml(
          data.message,
        )}</div>
      </div>
    `;

    const payload = JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html,
    });

    const attempts: Array<{ label: string; url: string; headers: Record<string, string> }> = [];
    if (lovableApiKey) {
      attempts.push({
        label: "gateway",
        url: "https://connector-gateway.lovable.dev/resend/emails",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": apiKey,
        },
      });
    }
    if (apiKey.startsWith("re_")) {
      attempts.push({
        label: "resend-direct",
        url: "https://api.resend.com/emails",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
    }

    for (const attempt of attempts) {
      try {
        const response = await fetch(attempt.url, { method: "POST", headers: attempt.headers, body: payload });
        if (response.ok) return { ok: true as const };
        const body = await response.text();
        console.error(`[contact] ${attempt.label} send failed [${response.status}]: ${body}`);
      } catch (error) {
        console.error(`[contact] ${attempt.label} send threw:`, error);
      }
    }

    return {
      ok: false as const,
      error: "Message could not be sent right now. Please try again in a moment.",
    };
  });
