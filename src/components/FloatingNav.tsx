import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

export function FloatingNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav aria-label="Main" className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full glass px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2 rounded-full px-2 py-1 font-display text-sm font-semibold">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "var(--gradient-hero)" }} />
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to} className="relative">
                <Link
                  to={l.to}
                  className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <Link
          to="/contact"
          className="hidden rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium transition-colors hover:bg-secondary md:inline-flex"
        >
          Let's Connect
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1">
            <span className={`block h-0.5 w-4 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-4 bg-foreground transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-4xl space-y-1 rounded-3xl glass p-3 md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-2.5 text-sm ${
                    pathname === l.to ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
