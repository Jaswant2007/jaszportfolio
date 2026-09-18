import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  subject: z.string().trim().min(3, "Please add a short subject.").max(200),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: ContactInput) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const targetEmail = "jas22happy@gmail.com";

    // Attempt 1: Resend / Lovable Connector if keys present
    const apiKey = process.env["RESEND_API_KEY"];
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    if (apiKey && lovableApiKey) {
      try {
        const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableApiKey}`,
            "X-Connection-Api-Key": apiKey,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [targetEmail],
            reply_to: data.email,
            subject: `[Portfolio Contact] ${data.subject}`,
            html: `
              <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
                <h2 style="margin:0 0 12px">New portfolio message for Jaswant</h2>
                <p style="margin:0 0 4px"><strong>From:</strong> ${data.name} (&lt;${data.email}&gt;)</p>
                <p style="margin:0 0 4px"><strong>To Owner:</strong> ${targetEmail}</p>
                <p style="margin:0 0 16px"><strong>Subject:</strong> ${data.subject}</p>
                <div style="white-space:pre-wrap;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fafafa">${data.message}</div>
              </div>
            `,
          }),
        });

        if (response.ok) {
          return { ok: true as const, recipient: targetEmail };
        }
      } catch (err) {
        console.warn("[contact] Resend connector attempt failed:", err);
      }
    }

    // Return client-dispatch instruction so browser directly submits to FormSubmit or mailto fallback
    return { ok: false as const, requiresClientSubmit: true, recipient: targetEmail };
  });


