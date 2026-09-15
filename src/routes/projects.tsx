import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { TiltCard } from "@/components/TiltCard";
import { ProjectCaseStudyModal } from "@/components/ProjectCaseStudyModal";
import { projects, projectCategories, Project } from "@/data/portfolio";
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
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <PageShell variant="slide">
      <section className="shell pb-16">
        <SectionHeading
          eyebrow="Main Proof"
          title="Projects & Works"
          description="Real web applications and software experiments. Click 'Case Study' for problem breakdown, architecture, and learnings."
        />

        {/* Category Filter Pills */}
        <div role="tablist" aria-label="Project categories" className="mt-8 flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                active === c ? "text-primary-foreground" : "border border-border bg-card hover:bg-secondary text-muted-foreground"
              }`}
            >
              {active === c && (
                <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-primary" />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
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
                <TiltCard className="h-full flex flex-col justify-between rounded-3xl border border-border bg-card p-7" intensity={10}>
                  <div>
                    {/* Visual Card Header */}
                    <div
                      aria-hidden
                      className="mb-5 flex h-36 flex-col justify-end rounded-2xl p-4 border border-border/40"
                      style={{ background: "var(--gradient-hero)", opacity: 0.15 }}
                    >
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                        {p.title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedCaseStudy(p)}
                        className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Case Study</span>
                      </button>
                    </div>

                    <h2 className="mt-2 font-display text-2xl font-semibold">{p.title}</h2>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <li key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border/50 text-xs font-semibold">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-primary-foreground lift"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 hover:bg-secondary transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedCaseStudy(p)}
                      className="rounded-full border border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      Read Case Study
                    </button>
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

      {/* Case Study Modal */}
      <ProjectCaseStudyModal project={selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} />
    </PageShell>
  );
}
