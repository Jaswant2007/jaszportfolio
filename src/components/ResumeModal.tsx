import { X, Download, ExternalLink, GraduationCap, Code, FileText, CheckCircle2 } from "lucide-react";
import { profile, education, skillGroups, projects } from "@/data/portfolio";

export function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (profile.resumeUrl) {
      window.open(profile.resumeUrl, "_blank");
    } else {
      // Print or save summary as PDF preview
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card text-foreground p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-5">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">{profile.fullName} — Resume</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              B.Tech CSE Student @ Amrita Vishwa Vidyapeetham, Chennai · Expected 2029
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="mt-6 space-y-6 text-sm">
          {/* Objective / Summary */}
          <div className="rounded-2xl border border-border bg-secondary/50 p-4">
            <h3 className="font-display font-semibold text-primary uppercase text-xs tracking-wider">
              Professional Summary
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Motivated 2nd-year B.Tech Computer Science & Engineering student passionate about full-stack web development,
              data structures, algorithms, and clean software architecture. Active builder of functional web applications
              and daily competitive problem solver.
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold border-b border-border pb-2">
              <GraduationCap className="h-4 w-4 text-primary" /> Education
            </h3>
            <div className="mt-3 space-y-4">
              {education.map((edu) => (
                <div key={edu.title} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <div>
                    <h4 className="font-semibold">{edu.title}</h4>
                    <p className="text-xs text-muted-foreground">{edu.org}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{edu.detail}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary shrink-0 sm:text-right">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold border-b border-border pb-2">
              <Code className="h-4 w-4 text-primary" /> Technical Skills
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillGroups.map((g) => (
                <div key={g.group} className="rounded-xl border border-border p-3">
                  <span className="text-xs font-semibold text-primary uppercase">{g.group}</span>
                  <p className="mt-1 text-xs font-medium">{g.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Major Projects */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold border-b border-border pb-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Key Projects
            </h3>
            <div className="mt-3 space-y-3">
              {projects.map((p) => (
                <div key={p.title} className="rounded-xl border border-border p-3.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{p.title}</h4>
                    <span className="text-[10px] rounded-full bg-secondary px-2 py-0.5 font-medium">{p.category}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                  <p className="mt-2 text-[11px] font-mono text-primary">Tech: {p.tech.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <span className="text-xs text-muted-foreground">Last Updated: September 2026</span>
          <div className="flex items-center gap-3">
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground lift"
              >
                <Download className="h-4 w-4" /> Download PDF ↗
              </a>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground lift"
              >
                <Download className="h-4 w-4" /> Download / Print Resume
              </button>
            )}
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
    </div>
  );
}
