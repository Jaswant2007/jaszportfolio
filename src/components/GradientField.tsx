import { motion } from "motion/react";

/** Slow-drifting gradient blurs that give the light theme depth. */
export function GradientField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <motion.div
        className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 68%)", opacity: 0.22 }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-52 top-1/4 h-[34rem] w-[34rem] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 68%)", opacity: 0.24 }}
        animate={{ x: [0, -70, 30, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-14rem] left-1/3 h-[32rem] w-[32rem] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", opacity: 0.18 }}
        animate={{ x: [0, 50, -60, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
