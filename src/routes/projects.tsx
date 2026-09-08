import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { TiltCard } from "@/components/TiltCard";
import { projects, projectCategories } from "@/data/portfolio";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () =>
    pageSeo({
      path: "/projects",
      title: "Projects | Jaswant Yuvarajan — Full-Stack Developer",
      description:
        "Web and software projects built by Jaswant Yuvarajan, a full-stack developer and CSE student at Amrita Vishwa Vidyapeetham, Chennai — with the problem solved, technologies used, source code and live demos.",
    }),
  component: Projects,
});

function Projects() {
  const [active, setActive] = useState<string>("All");
  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <PageShell variant="slide">
      <section className="shell pb-16">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built."
          description="Course work, experiments and side projects. Hover a card to tilt it in 3D; filter by category below."
        />

        <div role="tablist" aria-label="Project categories" className="mt-8 flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c ? "text-primary-foreground" : "border border-border bg-card hover:bg-secondary"
              }`}
            >
              {active === c && (
                <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-primary" />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full rounded-3xl border border-border bg-card p-7" intensity={12}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="mb-5 h-44 w-full object-cover rounded-2xl border border-border/50"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="mb-5 h-36 rounded-2xl"
                      style={{ background: "var(--gradient-hero)", opacity: 0.18 }}
                    />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</span>
                  <h2 className="mt-2 font-display text-xl font-semibold">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li key={t} className="rounded-full bg-secondary px-3 py-1 text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-3">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                      >
                        Live demo ↗
                      </a>
                    )}
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <p className="mt-10 rounded-3xl glass p-8 text-center text-sm text-muted-foreground">
            No projects in this category yet — more coming soon.
          </p>
        )}
      </section>
    </PageShell>
  );
}
