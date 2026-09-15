import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { GraduationCap, MapPin, Award, BookOpen, FileText, ExternalLink } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { profile, education, currentlyLearning, certificates, codingProfiles, socials } from "@/data/portfolio";
import { pageSeo } from "@/lib/seo";
import { ResumeModal } from "@/components/ResumeModal";

export const Route = createFileRoute("/about")({
  head: () =>
    pageSeo({
      path: "/about",
      title: "About Jaswant Yuvarajan | CSE Student at Amrita Vishwa Vidyapeetham",
      description:
        "About Jaswant Yuvarajan — B.Tech Computer Science & Engineering student at Amrita Vishwa Vidyapeetham, Chennai, full-stack developer, with his academic journey, learning path and certificates.",
    }),
  component: About,
});

function About() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <PageShell variant="curtain">
      {/* Profile Overview */}
      <section className="shell pb-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading eyebrow="About" title="About Jaswant Yuvarajan" description={profile.intro} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto lg:mx-0 p-2 rounded-3xl border border-border bg-card shadow-xl"
          >
            <img
              src={profile.avatar}
              alt={`Portrait of ${profile.fullName}, B.Tech CSE student at Amrita Vishwa Vidyapeetham, Chennai`}
              loading="lazy"
              width={192}
              height={192}
              className="h-48 w-48 rounded-2xl object-cover"
            />
          </motion.div>
        </div>

        {/* Quick Info Grid */}
        <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl glass p-6">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <MapPin className="h-4 w-4" /> Location
            </div>
            <p className="mt-2 font-display text-base font-semibold">{profile.location}</p>
          </div>
          <div className="rounded-3xl glass p-6">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <GraduationCap className="h-4 w-4" /> Institution
            </div>
            <p className="mt-2 font-display text-base font-semibold">Amrita Vishwa Vidyapeetham, Chennai</p>
          </div>
          <div className="rounded-3xl glass p-6">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <BookOpen className="h-4 w-4" /> Degree & Batch
            </div>
            <p className="mt-2 font-display text-base font-semibold">B.Tech CSE (2025 — 2029)</p>
          </div>
          <div className="rounded-3xl glass p-6">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <Award className="h-4 w-4" /> Core Focus
            </div>
            <p className="mt-2 font-display text-base font-semibold">Full Stack Dev & DSA</p>
          </div>
        </Reveal>
      </section>

      {/* Academic Journey */}
      <section className="shell py-14" aria-labelledby="edu">
        <Reveal>
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Education</span>
              <h2 id="edu" className="mt-1 font-display text-3xl font-semibold">
                Academic Journey
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
            >
              <FileText className="h-4 w-4 text-primary" /> View Resume
            </button>
          </div>
        </Reveal>

        <ol className="relative mt-10 space-y-6 border-l border-border pl-6">
          {education.map((e, i) => (
            <motion.li
              key={e.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-border bg-card p-6 lift"
            >
              <span
                aria-hidden
                className="absolute -left-[1.9rem] top-8 h-3 w-3 rounded-full ring-4 ring-background"
                style={{ background: "var(--gradient-hero)" }}
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{e.period}</span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">{e.status}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{e.title}</h3>
              <p className="text-xs font-semibold text-muted-foreground">{e.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Currently Learning */}
      <section className="shell py-14" aria-labelledby="learn">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Active Learning</span>
          <h2 id="learn" className="mt-1 font-display text-3xl font-semibold">
            What I'm building skill in right now
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {currentlyLearning.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <TiltCard className="h-full rounded-3xl glass p-6" intensity={6}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                    {c.progress}
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.detail}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hackathons & Certificates */}
      <section className="shell py-14" aria-labelledby="certs">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Achievements</span>
          <h2 id="certs" className="mt-1 font-display text-3xl font-semibold">
            Certificates & Hackathons
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {certificates.map((c, i) => (
            <Reveal key={c.title + i} delay={i * 0.06}>
              <div className="h-full flex flex-col justify-between rounded-3xl border border-border bg-card p-6 lift">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary">
                    {c.date}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.org}</p>
                </div>
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Official Credential</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <h2 id="profiles" className="mt-16 font-display text-3xl font-semibold">
            Profiles & links
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...codingProfiles, ...socials.filter((s) => s.label !== "GitHub")].map((p, i) => (
            <Reveal key={p.label + i} delay={i * 0.06}>
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="flex h-full items-center justify-between rounded-3xl glass px-6 py-5 text-sm lift"
              >
                <span className="font-display font-semibold">{p.label}</span>
                <span className="text-muted-foreground">↗</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-4 items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-xs sm:text-sm font-semibold text-primary-foreground lift"
            >
              Get In Touch With Jaswant
            </Link>
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-xs sm:text-sm font-semibold hover:bg-secondary transition-colors"
            >
              Download Resume PDF
            </button>
          </div>
        </Reveal>
      </section>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </PageShell>
  );
}
