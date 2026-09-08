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

const nameLetters = "Jaswant Yuvarajan".split("");

function Home() {
  return (
    <PageShell variant="fade">
      <section className="shell relative grid min-h-[82vh] items-center gap-10 pb-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Available for internships & collaborations
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.05]">
            <span className="sr-only">{profile.fullName}</span>
            <span aria-hidden className="block">
              {words[0]!.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotate: 6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1], duration: 0.7 }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block gradient-text"
              aria-hidden
            >
              builds for the web.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {profile.role} · {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground lift"
            >
              <span className="relative z-10">View Projects</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-hero)" }}
              />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold lift"
            >
              Let's Connect
            </Link>
            <a
              href={codingProfiles[0]!.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              View GitHub ↗
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[26rem] flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: "var(--gradient-hero)", opacity: 0.25 }} />
          <HeroScene className="absolute inset-0 h-full w-full pointer-events-none opacity-60" />
          <div className="relative z-10 p-2.5 rounded-full border border-primary/30 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/20">
            <img
              src={profile.avatar || profile.photo || "/profile.jpg"}
              alt={profile.fullName}
              className="h-56 w-56 sm:h-64 sm:w-64 rounded-full object-cover shadow-inner transition-transform duration-500 hover:scale-[1.03]"
            />
            <div className="absolute bottom-2 right-4 flex items-center gap-1.5 rounded-full bg-background/90 border border-border px-3 py-1 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available</span>
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
