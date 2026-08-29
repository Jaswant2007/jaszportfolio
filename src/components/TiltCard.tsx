import { useRef, useState, type ReactNode } from "react";

/** 3D cursor-tracking tilt. Falls back to a plain card on touch devices. */
export function TiltCard({
  children,
  className = "",
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${(px - 0.5) * intensity}deg) translateY(-6px)`,
    });
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)" });
    setGlare((g) => ({ ...g, on: false }));
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ ...style, transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glare.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${glare.x}% ${glare.y}%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
