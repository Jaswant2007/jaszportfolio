import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { navLinks, profile, socials, codingProfiles } from "@/data/portfolio";

export function SiteFooter() {
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
          <h2 className="font-display text-2xl font-semibold">{profile.fullName}</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{profile.tagline}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-semibold">Navigate</h3>
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
          <h3 className="text-sm font-semibold">Elsewhere</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[...socials, ...codingProfiles.slice(1, 4)].map((s) => (
              <li key={s.label + s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="shell mt-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.fullName}. Built with care, motion and a little 3D.
      </p>
    </motion.footer>
  );
}
