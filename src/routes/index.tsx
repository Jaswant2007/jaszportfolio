import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { FileText, ArrowRight, Code, Sparkles, Terminal as TerminalIcon } from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { LeetCodeStats } from "@/components/LeetCodeStats";
import { GitHubExplorer } from "@/components/GitHubExplorer";
import { FreelanceServices } from "@/components/FreelanceServices";
import { ResumeModal } from "@/components/ResumeModal";
import { ProjectCaseStudyModal } from "@/components/ProjectCaseStudyModal";
import { profile, projects, currentlyLearning, codingProfiles, Project } from "@/data/portfolio";
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

function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);

  return (
    <PageShell variant="fade">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJsonLd() }} />

      {/* HERO SECTION */}
      <section className="shell relative grid min-h-[82vh] items-center gap-12 pb-16 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Available for internships & collaborations</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-4 font-mono text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide"
          >
            B.Tech CSE Student @ Amrita Vishwa Vidyapeetham, Chennai
          </motion.p>

          {/* Main Heading */}
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="block text-lg md:text-2xl text-muted-foreground font-medium mb-1"
            >
              Hi, I'm <span className="text-foreground font-bold">{profile.name}</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="block"
            >
              Building thoughtful digital experiences with code.
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            Learning, building, and shipping modern web applications while growing into a Full Stack Developer.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-xs sm:text-sm font-semibold text-primary-foreground lift"
            >
              <span className="relative z-10">Explore My Work</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-xs sm:text-sm font-semibold transition-all hover:bg-secondary lift"
            >
              <FileText className="h-4 w-4 text-primary" />
              <span>Download Resume</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-xs sm:text-sm font-semibold text-muted-foreground transition-all hover:text-foreground hover:bg-secondary"
            >
              <span>Let's Connect</span>
            </Link>
          </motion.div>
        </div>

        {/* Hero 360 Visual Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex items-center justify-center w-full max-w-[32rem] aspect-square"
        >
          {/* Glowing Ambient Backdrop */}
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: "var(--gradient-hero)", opacity: 0.28 }}
          />

          {/* 360 Degree Interactive 3D Background Orbit */}
          <HeroScene className="absolute inset-0 h-full w-full pointer-events-none" />

          {/* Large Center Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            className="relative z-10 flex items-center justify-center p-2 rounded-full border-2 border-primary/50 bg-card/60 backdrop-blur-md shadow-[0_0_60px_rgba(37,99,235,0.3)]"
          >
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-full border-2 border-border shadow-2xl">
              <img
                src={profile.photo || "/profile.jpg"}
                alt={`Portrait of ${profile.fullName}`}
                loading="eager"
                className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Glowing Orbit Ring */}
            <span className="absolute -inset-1.5 rounded-full border border-primary/40 pointer-events-none animate-pulse" />
          </motion.div>

          {/* Floating Developer Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-3 z-20 flex items-center gap-3 rounded-full border border-border bg-card/90 px-5 py-2.5 shadow-xl backdrop-blur-md text-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono font-semibold text-foreground">Jaswant Yuvarajan</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-primary font-semibold">CSE @ Amrita</span>
          </motion.div>
        </motion.div>
      </section>


      {/* CURRENTLY LEARNING SECTION */}
      <section className="shell py-16" aria-labelledby="learning-heading">
        <Reveal>
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest">
            <Sparkles className="h-4 w-4" /> Continuous Growth
          </div>
          <h2 id="learning-heading" className="mt-2 font-display text-3xl font-semibold">
            Currently focusing on
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Technologies and core fundamentals I study daily and apply directly to coursework and real-world projects.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentlyLearning.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <TiltCard className="h-full rounded-3xl glass p-6" intensity={6}>
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-primary">
                  {c.progress}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.detail}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="shell py-16" aria-labelledby="featured-heading">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Main Proof</p>
              <h2 id="featured-heading" className="mt-2 font-display text-3xl font-semibold">
                Featured Projects
              </h2>
            </div>
            <Link to="/projects" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              <span>View all projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <TiltCard className="h-full flex flex-col justify-between rounded-3xl border border-border bg-card p-7" intensity={8}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">{project.category}</span>
                    <button
                      type="button"
                      onClick={() => setCaseStudyProject(project)}
                      className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors underline"
                    >
                      View Case Study ↗
                    </button>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <li key={technology} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-border/50 text-xs font-semibold">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full bg-primary px-4 py-2 text-primary-foreground lift"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-border px-4 py-2 text-foreground hover:bg-secondary transition-colors"
                    >
                      Source Code ↗
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setCaseStudyProject(project)}
                    className="rounded-full border border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    Details
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIVE CODING ACTIVITY & GITHUB FEED */}
      <section className="shell grid gap-6 py-16 lg:grid-cols-2" aria-label="Coding Activity & Profiles">
        <Reveal>
          <GitHubExplorer />
        </Reveal>
        <Reveal delay={0.08}>
          <LeetCodeStats />
        </Reveal>
      </section>

      {/* FREELANCE SERVICES SECTION */}
      <FreelanceServices />

      {/* MODALS */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ProjectCaseStudyModal project={caseStudyProject} onClose={() => setCaseStudyProject(null)} />
    </PageShell>
  );
}
