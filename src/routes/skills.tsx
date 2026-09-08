import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { LeetCodeStats } from "@/components/LeetCodeStats";
import { skillGroups, codingProfiles, profile } from "@/data/portfolio";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () =>
    pageSeo({
      path: "/skills",
      title: "Skills | Jaswant Yuvarajan",
      description:
        "Languages, frontend, backend, database and tooling skills of Jaswant Yuvarajan, full-stack developer and CSE student, plus live GitHub and LeetCode profiles.",
    }),
  component: Skills,
});

function Skills() {
  return (
    <PageShell variant="scale">
      <section className="shell pb-14">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with."
          description="A snapshot of the languages, tools and areas I use — growing steadily with every project."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.07}>
              <TiltCard className="h-full rounded-3xl glass p-7" intensity={8}>
                <h2 className="font-display text-lg font-semibold">{g.group}</h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {g.items.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="rounded-2xl border border-border bg-card px-4 py-2 text-sm font-medium"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-14" aria-labelledby="profiles">
        <Reveal>
          <h2 id="profiles" className="font-display text-3xl font-semibold">
            Coding profiles
          </h2>
          <p className="mt-2 text-muted-foreground">Where I practice, compete and publish code.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {codingProfiles.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer noopener"
                title={`Open my ${p.label} profile`}
                className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 lift"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                </div>
                <span className="mt-6 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                  Visit ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell grid gap-5 py-14 md:grid-cols-2" aria-label="GitHub and LeetCode">
        <Reveal>
          <div className="h-full rounded-3xl glass p-8">
            <h2 className="font-display text-2xl font-semibold">GitHub</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All my source code, coursework and experiments live here. Featured repositories are listed on the
              Projects page.
            </p>
            <a
              href={codingProfiles[0]!.href}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground lift"
            >
              View GitHub ↗
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <LeetCodeStats />
        </Reveal>

      </section>

      <p className="shell pb-6 text-sm text-muted-foreground">
        Want to work together? Email me at{" "}
        <a href={`mailto:${profile.email}`} className="font-medium text-primary hover:underline">
          {profile.email}
        </a>
        .
      </p>
    </PageShell>
  );
}
