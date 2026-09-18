import { useEffect, useState, useRef } from "react";

/**
 * Clean & Decent Minimalist Developer Cursor.
 * Refined dual-layer pointer with smooth spring lag and gentle interactive expansion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    let rx = -100;
    let ry = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) setVisible(true);

      // Instant inner dot placement
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }

      const el = e.target as HTMLElement | null;
      if (!el) return;

      const interactive = !!el.closest(
        "a, button, [role='button'], input, textarea, select, summary, .lift, article, [data-cursor]"
      );
      setIsHovered(interactive);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    const loop = () => {
      // Gentle spring lerp for the outer ring
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Precision Micro Dot */}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={`rounded-full bg-primary transition-all duration-150 ease-out ${
            isClicking
              ? "h-1 w-1 scale-75 opacity-90"
              : isHovered
                ? "h-1.5 w-1.5 opacity-80"
                : "h-1.5 w-1.5 shadow-[0_0_6px_rgba(37,99,235,0.6)]"
          }`}
        />
      </div>

      {/* Trailing Smooth Ring */}
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={`rounded-full border border-primary/50 transition-all duration-200 ease-out ${
            isClicking
              ? "h-6 w-6 border-primary bg-primary/20 scale-90"
              : isHovered
                ? "h-10 w-10 border-primary/70 bg-primary/10 shadow-[0_0_16px_rgba(37,99,235,0.2)] scale-110"
                : "h-7 w-7 bg-primary/[0.03]"
          }`}
        />
      </div>
    </div>
  );
}



