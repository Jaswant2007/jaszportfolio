import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "fade" | "slide" | "scale" | "curtain" | "blur" | "rise";

const variants: Record<Variant, { initial: object; animate: object; exit?: object }> = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slide: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.965 }, animate: { opacity: 1, scale: 1 } },
  curtain: { initial: { opacity: 0, y: 70 }, animate: { opacity: 1, y: 0 } },
  blur: { initial: { opacity: 0, filter: "blur(14px)" }, animate: { opacity: 1, filter: "blur(0px)" } },
  rise: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
};

/** Full-page entry transition; each route picks its own flavour. */
export function PageShell({
  children,
  variant = "fade",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const v = variants[variant];
  return (
    <motion.main
      initial={v.initial}
      animate={v.animate}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pt-28 ${className}`}
    >
      {children}
    </motion.main>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="mt-3 text-4xl font-semibold sm:text-5xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mt-4 text-base leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
