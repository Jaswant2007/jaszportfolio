import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { profile, socials } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Jaswant — Let's Connect" },
      {
        name: "description",
        content: "Get in touch with Jaswant for internships, collaborations or project ideas.",
      },
      { property: "og:title", content: "Contact Jaswant" },
      { property: "og:description", content: "Send a message — I usually reply within a day or two." },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address.";
    if (values.subject.trim().length < 3) next.subject = "Please add a short subject.";
    if (values.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = "mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring";

  return (
    <PageShell variant="rise">
      <section className="shell grid gap-10 pb-20 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's connect."
            description="Have an idea, an opportunity or just want to say hello? Fill the form and your email client will open with the message ready to send."
          />
          <Reveal delay={0.12} className="mt-8 space-y-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                title={s.handle}
                className="flex items-center justify-between rounded-2xl glass px-5 py-4 text-sm lift"
              >
                <span className="font-semibold">{s.label}</span>
                <span className="text-muted-foreground">{s.handle} ↗</span>
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-card p-7 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input id="name" name="name" value={values.name} onChange={set("name")} className={field} aria-invalid={!!errors.name} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input id="email" name="email" type="email" value={values.email} onChange={set("email")} className={field} aria-invalid={!!errors.email} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input id="subject" name="subject" value={values.subject} onChange={set("subject")} className={field} aria-invalid={!!errors.subject} />
              {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea id="message" name="message" rows={6} value={values.message} onChange={set("message")} className={field} aria-invalid={!!errors.message} />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground lift"
            >
              Send message
            </button>
            <p aria-live="polite" className="mt-4 text-center text-xs text-muted-foreground">
              {sent
                ? "Your email app should have opened with the message ready to send."
                : `Messages go straight to ${profile.email}.`}
            </p>
          </form>
        </Reveal>
      </section>
    </PageShell>
  );
}
