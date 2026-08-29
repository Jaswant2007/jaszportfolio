import { useEffect, useState } from "react";

/** Subtle two-layer cursor. Desktop / fine-pointer only. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    let rx = -100;
    let ry = -100;
    let raf = 0;
    let tx = -100;
    let ty = -100;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setPos({ x: tx, y: ty });
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [data-cursor='hover'], input, textarea"));
    };
    const loop = () => {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      setRing({ x: rx, y: ry });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        className="absolute h-1.5 w-1.5 rounded-full bg-primary"
        style={{ transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)` }}
      />
      <div
        className="absolute rounded-full border border-primary/50 transition-[width,height,opacity] duration-300"
        style={{
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          opacity: active ? 1 : 0.6,
          transform: `translate3d(${ring.x - (active ? 22 : 13)}px, ${ring.y - (active ? 22 : 13)}px, 0)`,
        }}
      />
    </div>
  );
}
