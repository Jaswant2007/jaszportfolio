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
    const apiKey = process.env["RESEND_API_KEY"];
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey || !lovableApiKey) {
      console.error("[contact] Email delivery credentials are unavailable in the runtime environment.");
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

    const url = "https://connector-gateway.lovable.dev/resend/emails";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableApiKey}`,
      "X-Connection-Api-Key": apiKey,
    };

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await fetch(url, { method: "POST", headers, body: payload });
        if (response.ok) return { ok: true as const };

        const body = await response.text();
        console.error(`[contact] send failed [${response.status}]: ${body}`);

        const retryable = response.status === 429 || response.status >= 500;
        if (!retryable || attempt === 2) break;

        const retryAfter = Number(response.headers.get("Retry-After"));
        const delayMs = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : 750 * 2 ** attempt;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } catch (error) {
        console.error(`[contact] send attempt ${attempt + 1} threw:`, error);
        if (attempt === 2) break;
        await new Promise((resolve) => setTimeout(resolve, 750 * 2 ** attempt));
      }
    }

    return {
      ok: false as const,
      error: "Message could not be sent right now. Please try again in a moment.",
    };
  });
