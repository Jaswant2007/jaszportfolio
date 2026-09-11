import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HeroScene } from "@/components/HeroScene";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { profile, projects, currentlyLearning, codingProfiles } from "@/data/portfolio";
import { pageSeo, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageSeo({
      path: "/",
      title: "Jaswant Yuvarajan | CSE Student & Full-Stack Developer",
      description:
        "Jaswant Yuvarajan — B.Tech Computer Science & Engineering student at Amrita Vishwa Vidyapeetham, Chennai, and full-stack developer building practical web applications.",
    }),
  component: Home,
});

const nameWords = "Jaswant Yuvarajan.".split(" ");

const ease = [0.22, 1, 0.36, 1] as const;

function Home() {
  return (
    <PageShell variant="fade">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJsonLd() }} />

      <section className="shell section-y relative grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="flex flex-col items-start gap-8 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-accent px-4 py-2 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-primary">
              Available for internships &amp; collaborations
            </span>
          </motion.p>

          <div className="space-y-4">
            <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.25rem)] font-extrabold leading-[1.08] tracking-tight">
              <span className="sr-only">
                Hi, I'm {profile.fullName} — {profile.headline}
              </span>
              <span aria-hidden className="block">
                {nameWords.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.7, ease }}
                    className="mr-[0.28em] inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.7, ease }}
                className="block text-primary"
                aria-hidden
              >
                {profile.headline}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.7, ease }}
              className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {profile.identity}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.7, ease }}
            className="flex flex-wrap items-center gap-4 pt-1 sm:gap-6"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Projects
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-xl border border-primary/10 bg-accent px-8 py-4 text-sm font-bold text-primary transition-colors duration-300 hover:bg-accent/70"
            >
              Get in Touch
            </Link>
            <a
              href={codingProfiles[0]!.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2.5 text-sm font-bold transition-colors hover:text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </span>
              GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="flex justify-center lg:col-span-5 lg:justify-end"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-full blur-3xl"
              style={{ background: "var(--gradient-hero)", opacity: 0.14 }}
            />
            <HeroScene className="pointer-events-none absolute -inset-6 opacity-40" />
            <div
              aria-hidden
              className="absolute -inset-6 animate-[spin_26s_linear_infinite] rounded-full border-2 border-primary/10"
            />
            <div aria-hidden className="absolute -inset-3 rounded-full border-2 border-primary/5" />

            <div className="relative h-64 w-64 overflow-hidden rounded-full border-8 border-card shadow-2xl ring-1 ring-foreground/5 md:h-80 md:w-80">
              <img
                src={profile.avatar || profile.photo || "/profile.jpg"}
                alt={`Portrait of ${profile.fullName}, full-stack developer and CSE student`}
                loading="eager"
                width={320}
                height={320}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>

            <div className="absolute bottom-6 -left-4 flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-xl md:-left-12">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                  Currently
                </span>
                <span className="font-display text-base font-bold">B.Tech CSE · Amrita</span>
              </span>
            </div>
          </div>
        </motion.div>
      </section>


      <section className="shell py-16" aria-labelledby="learning-heading">
        <Reveal>
          <h2 id="learning-heading" className="font-display text-3xl font-semibold">
            Currently learning
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            The things on my desk right now — practiced daily, not just bookmarked.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentlyLearning.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <TiltCard className="h-full rounded-3xl glass p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{c.progress}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-16" aria-labelledby="featured-heading">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="featured-heading" className="font-display text-3xl font-semibold">
              Featured work
            </h2>
            <Link to="/projects" className="text-sm font-semibold text-primary hover:underline">
              All projects →
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.slice(0, 2).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <TiltCard className="h-full rounded-3xl border border-border bg-card p-7">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{p.category}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
