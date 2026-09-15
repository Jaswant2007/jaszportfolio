import { useEffect, useState } from "react";

/** Premium two-layer dot & ring cursor. Desktop / fine-pointer only. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);

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
      setActive(
        !!el?.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='hover'], .lift, article, summary"
        )
      );
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      setRing({ x: rx, y: ry });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  if (!enabled) return null;

  const ringSize = clicked ? (active ? 48 : 24) : active ? 40 : 30;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Central Dot */}
      <div
        className="absolute h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0) scale(${clicked ? 0.7 : 1})`,
        }}
      />
      {/* Trailing Ring */}
      <div
        className="absolute rounded-full border-2 border-primary/70 bg-primary/5 transition-[width,height,opacity,border-color,background-color] duration-200 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: active ? 0.95 : 0.5,
          transform: `translate3d(${ring.x - ringSize / 2}px, ${ring.y - ringSize / 2}px, 0)`,
        }}
      />
    </div>
  );
}

