import { createServerFn } from "@tanstack/react-start";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: ContactInput): ContactInput => {
    const name = String(data?.name ?? "").trim();
    const email = String(data?.email ?? "").trim();
    const subject = String(data?.subject ?? "").trim();
    const message = String(data?.message ?? "").trim();

    if (name.length < 2) throw new Error("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");
    if (subject.length < 3) throw new Error("Please add a short subject.");
    if (message.length < 10) throw new Error("Message should be at least 10 characters.");

    return {
      name: name.slice(0, 120),
      email: email.slice(0, 200),
      subject: subject.slice(0, 200),
      message: message.slice(0, 5000),
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not configured");
      return { ok: false as const, error: "Email service is not configured." };
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

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject: `[Portfolio] ${data.subject}`,
          html,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        console.error(`[contact] Resend request failed [${response.status}]: ${body}`);
        return { ok: false as const, error: "Could not send the message right now." };
      }

      return { ok: true as const };
    } catch (error) {
      console.error("[contact] Unexpected error sending email:", error);
      return { ok: false as const, error: "Could not send the message right now." };
    }
  });
