import { useEffect, useRef } from "react";

/**
 * Three.js hero object: a wireframe icosahedron + inner glow sphere that
 * follows the cursor. Loaded lazily in the browser only.
 */
export function HeroScene({ className }: { className?: string }) {
  const mount = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const el = mount.current;
      if (!el || disposed) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4.2;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      el.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      const group = new THREE.Group();
      scene.add(group);

      const wire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.5, isMobile ? 1 : 2),
        new THREE.MeshBasicMaterial({ color: 0x3f6fd8, wireframe: true, transparent: true, opacity: 0.5 }),
      );
      group.add(wire);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.05, 3),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.15,
          metalness: 0.25,
          emissive: 0x6fc7d6,
          emissiveIntensity: 0.25,
        }),
      );
      group.add(core);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.01, 8, 140),
        new THREE.MeshBasicMaterial({ color: 0xe0a35c, transparent: true, opacity: 0.55 }),
      );
      ring.rotation.x = Math.PI / 2.6;
      group.add(ring);



      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(3, 4, 5);
      scene.add(key);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const target = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 0.9;
        target.y = (e.clientY / window.innerHeight - 0.5) * 0.9;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let raf = 0;
      const tick = () => {
        group.rotation.y += reduced ? 0 : 0.0035;
        group.rotation.x += (target.y - group.rotation.x) * 0.05;
        group.rotation.y += (target.x - group.rotation.y * 0.02) * 0.004;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        wire.geometry.dispose();
        (wire.material as THREE.Material).dispose();
        core.geometry.dispose();
        (core.material as THREE.Material).dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mount} className={className} aria-hidden />;
}
