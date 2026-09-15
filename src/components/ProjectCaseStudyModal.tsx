import { X, ExternalLink, Github, Code, CheckCircle, Lightbulb, Target } from "lucide-react";
import { Project } from "@/data/portfolio";

export function ProjectCaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;

  // Customized case study details for LearnSphere or fallback
  const isLearnSphere = project.title.toLowerCase().includes("learnsphere");

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card text-foreground p-6 sm:p-8 shadow-2xl scrollbar-thin">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {project.category} · Case Study
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold">{project.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="mt-6 space-y-8 text-sm">
          {/* Overview Banner */}
          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <h3 className="font-display font-semibold text-foreground text-base">Project Overview</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 text-amber-500 font-semibold font-display">
                <Target className="h-4 w-4" /> Problem Statement
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {isLearnSphere
                  ? "Students often struggle to manage study schedules, track task progress, maintain focus during sessions, and organize quick revision notes in a unified interface without clutter."
                  : "Addressing practical workflow challenges by building clean, functional tools with efficient algorithms and clear user interfaces."}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 text-emerald-500 font-semibold font-display">
                <Lightbulb className="h-4 w-4" /> Proposed Solution
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {isLearnSphere
                  ? "Built a centralized student productivity dashboard featuring a customizable Pomodoro timer, progress metrics, task planner, and local storage notes system using pure Vanilla JavaScript."
                  : "Engineered a responsive, lightweight web solution with modular code architecture and zero external framework overhead."}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="font-display text-base font-semibold border-b border-border pb-2">
              Key Features & Capabilities
            </h3>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {isLearnSphere ? (
                <>
                  <li className="flex items-start gap-2.5 rounded-xl border border-border p-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-xs">Integrated Pomodoro Timer</h4>
                      <p className="text-[11px] text-muted-foreground">Custom interval controls with visual status countdown.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 rounded-xl border border-border p-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-xs">Interactive Task Planner</h4>
                      <p className="text-[11px] text-muted-foreground">Add, complete, and filter daily study goals.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 rounded-xl border border-border p-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-xs">Progress Tracking Dashboard</h4>
                      <p className="text-[11px] text-muted-foreground">Visual indicators of completed vs remaining work.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 rounded-xl border border-border p-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-xs">Persistent Storage</h4>
                      <p className="text-[11px] text-muted-foreground">Saves user state locally across browser refreshes.</p>
                    </div>
                  </li>
                </>
              ) : (
                <li className="flex items-start gap-2.5 rounded-xl border border-border p-3 col-span-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs">Clean Architecture & Responsive Design</h4>
                    <p className="text-[11px] text-muted-foreground">Structured code following standards and mobile adaptability.</p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-display text-base font-semibold border-b border-border pb-2">Technologies Used</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  <Code className="h-3 w-3 text-primary" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* What I Learned */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display font-semibold text-foreground text-sm">Key Learnings</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {isLearnSphere
                ? "Gained deep experience in DOM manipulation, JavaScript event loops, state persistence, CSS Flexbox/Grid layouts, and deploying production builds to Vercel."
                : "Reinforced fundamentals in problem decomposition, code modularity, and crafting user-centric web tools."}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <div className="flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground lift"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-secondary"
              >
                <Github className="h-4 w-4" /> Source Code ↗
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
