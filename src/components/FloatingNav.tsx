import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Sun, Moon, Terminal as TerminalIcon, FileText } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { DevTerminal } from "@/components/DevTerminal";
import { ResumeModal } from "@/components/ResumeModal";

export function FloatingNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(isDarkClass);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const nextDark = document.documentElement.classList.contains("dark");
    setIsDark(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          aria-label="Main Navigation"
          className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full glass px-4 py-2.5 shadow-lg"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-2 py-1 font-display text-base font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            <span className="inline-block h-3 w-3 rounded-full bg-primary" />
            <span className="font-mono text-xs font-bold text-primary">JASWANT.DEV</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to} className="relative">
                  <Link
                    to={l.to}
                    className={`relative z-10 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
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

          {/* Controls Right */}
          <div className="flex items-center gap-2">
            {/* Terminal Button */}
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              aria-label="Open developer terminal"
              title="Open Developer Terminal (CLI)"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-secondary hover:text-primary"
            >
              <TerminalIcon className="h-4 w-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light Mode" : "Dark Mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-secondary hover:text-primary"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            {/* Resume Button */}
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold transition-all hover:bg-secondary md:inline-flex"
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span>Resume</span>
            </button>

            {/* Connect Button */}
            <Link
              to="/contact"
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground lift md:inline-flex"
            >
              Let's Connect
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            >
              <div className="space-y-1">
                <span
                  className={`block h-0.5 w-4 bg-foreground transition-transform ${
                    open ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span className={`block h-0.5 w-4 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
                <span
                  className={`block h-0.5 w-4 bg-foreground transition-transform ${
                    open ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-2 max-w-5xl space-y-1 rounded-3xl glass p-3 md:hidden shadow-xl"
            >
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-2.5 text-sm font-medium ${
                    pathname === l.to ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-border/50 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setResumeOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card py-2.5 text-xs font-semibold"
                >
                  <FileText className="h-3.5 w-3.5 text-primary" /> Resume
                </button>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center rounded-2xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
                >
                  Let's Connect
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Terminal & Resume Modals */}
      <DevTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
