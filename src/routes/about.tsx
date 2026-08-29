import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { profile, education, currentlyLearning, certificates } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Jaswant — CSE Student & Developer" },
      {
        name: "description",
        content:
          "About Jaswant: B.Tech CSE at Amrita Vishwa Vidyapeetham Chennai, academic journey, current learning and certificates.",
      },
      { property: "og:title", content: "About Jaswant" },
      { property: "og:description", content: "Academic journey, interests, learning path and certificates." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell variant="curtain">
      <section className="shell pb-14">
        <SectionHeading eyebrow="About" title="A student who ships." description={profile.intro} />
        <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Based in", v: profile.location },
            { k: "Focus", v: "Python · DSA · Web" },
            { k: "Degree", v: "B.Tech CSE" },
          ].map((s) => (
            <div key={s.k} className="rounded-3xl glass p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.k}</p>
              <p className="mt-2 font-display text-lg font-semibold">{s.v}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="shell py-14" aria-labelledby="edu">
        <Reveal>
          <h2 id="edu" className="font-display text-3xl font-semibold">
            Academic journey
          </h2>
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
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{e.status}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{e.title}</h3>
              <p className="text-sm font-medium text-muted-foreground">{e.org}</p>
              <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="shell py-14" aria-labelledby="learn">
        <Reveal>
          <h2 id="learn" className="font-display text-3xl font-semibold">
            Currently learning
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {currentlyLearning.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <TiltCard className="h-full rounded-3xl glass p-6">
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
                <span className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs">{c.progress}</span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-14" aria-labelledby="certs">
        <Reveal>
          <h2 id="certs" className="font-display text-3xl font-semibold">
            Certificates & achievements
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => (
            <Reveal key={c.title + i} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 lift">
                <h3 className="font-display text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{c.date}</p>
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    View credential ↗
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link
            to="/contact"
            className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground lift"
          >
            Contact Me
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
}
