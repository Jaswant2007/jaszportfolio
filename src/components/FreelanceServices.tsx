import { Link } from "@tanstack/react-router";
import { Layout, Globe, Calendar, UserCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export function FreelanceServices() {
  const services = [
    {
      icon: Globe,
      title: "Business Websites",
      desc: "Fast, modern, and SEO-optimized web applications designed to build credibility and convert visitors into clients.",
    },
    {
      icon: Layout,
      title: "Landing Pages",
      desc: "High-converting single page websites tailored for product launches, marketing campaigns, or personal branding.",
    },
    {
      icon: UserCheck,
      title: "Portfolio Websites",
      desc: "Custom, interactive developer & professional portfolios with dark mode, animations, and custom domain setup.",
    },
    {
      icon: Calendar,
      title: "Appointment Booking Systems",
      desc: "Custom booking & schedule interfaces suitable for clinics, consultants, and service-based professionals.",
    },
  ];

  const workflow = [
    { step: "01", title: "Discovery", desc: "Understanding your goals, requirements, and target audience." },
    { step: "02", title: "Design & Specs", desc: "Crafting wireframes, UI layouts, and selecting technical stack." },
    { step: "03", title: "Build & Test", desc: "Developing responsive, accessible code with thorough testing." },
    { step: "04", title: "Launch & Support", desc: "Deploying to production with domain configuration and docs." },
  ];

  return (
    <section className="shell py-16" aria-labelledby="freelance-heading">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Web Solutions</span>
            <h2 id="freelance-heading" className="mt-2 font-display text-3xl font-semibold">
              Need a website for your business?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground lift"
          >
            <span>Request a Quote</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      {/* Services Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 0.06}>
              <TiltCard className="h-full rounded-3xl border border-border bg-card p-6" intensity={8}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      {/* Development Process */}
      <div className="mt-12 rounded-3xl border border-border bg-card p-8">
        <Reveal>
          <h3 className="font-display text-xl font-semibold">Development Process</h3>
          <p className="mt-1 text-sm text-muted-foreground">How we move from idea to production-ready software.</p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((w, i) => (
            <Reveal key={w.step} delay={i * 0.05}>
              <div className="rounded-2xl bg-secondary/50 p-5">
                <span className="font-mono text-xs font-bold text-primary">{w.step}</span>
                <h4 className="mt-2 font-display font-semibold text-sm">{w.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
