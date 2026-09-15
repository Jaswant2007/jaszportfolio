import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { navLinks, profile, socials, codingProfiles } from "@/data/portfolio";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-24 border-t border-border/70 py-14"
    >
      <div className="shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <h2 className="font-display text-2xl font-bold">{profile.fullName}</h2>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            B.Tech CSE Student @ Amrita Vishwa Vidyapeetham, Chennai. Aspiring Full Stack Developer building real-world projects.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer Navigation">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">Navigation</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">Profiles & Socials</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[...socials, ...codingProfiles.slice(1, 3)].map((s) => (
              <li key={s.label + s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-foreground"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {profile.fullName}. Built with React 19, TanStack & Tailwind.
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-semibold text-foreground transition-all hover:bg-secondary hover:text-primary lift"
        >
          <span>Back to top</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.footer>
  );
}

