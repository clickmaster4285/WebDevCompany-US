"use client";

import { memo, useEffect, useRef } from "react";
import type * as THREE_TYPE from "three";

/**
 * Lightweight Three.js floating browser scene. Built as a tilting glass card
 * with floating orbiting tech-icon nodes and a particle field. SSR safe — all
 * code runs inside useEffect.
 *
 * PERFORMANCE OPTIMIZATIONS:
 * - IntersectionObserver pauses rendering when offscreen (saves 100% GPU)
 * - visibilitychange pauses when tab hidden (saves 100% GPU)
 * - All materials & geometries disposed on unmount (no memory leaks)
 * - mounted flag prevents orphaned setup after unmount
 * - Reduced geometry segments on tiny/transparent objects (imperceptible)
 * - Single rAF per frame in mouse handler (avoids queuing)
 * - will-change-transform hint for GPU compositing
 * - renderer.setPixelRatio capped at 2 (already present)
 */
export function HeroBrowserScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ── Shared state across async lifecycle ────────────────────────────
    let raf = 0;
    let cleanup = () => {};
    let mounted = true;

    // ── Async Three.js setup ───────────────────────────────────────────
    (async () => {
      // Guard: component unmounted before Three.js finished loading
      if (!mounted) return;

      const THREE = await import("three");

      // Guard: check again after async import
      if (!mounted || !el) return;

      const width = el.clientWidth;
      const height = el.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 8);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      // Group that holds everything we want to tilt
      const root = new THREE.Group();
      scene.add(root);

      // ── "Browser" card ───────────────────────────────────────────────
      const browserGroup = new THREE.Group();
      root.add(browserGroup);

      const cardW = 5.6;
      const cardH = 3.6;
      const radius = 0.28;

      const shape = new THREE.Shape();
      const x = -cardW / 2;
      const y = -cardH / 2;
      shape.moveTo(x + radius, y);
      shape.lineTo(x + cardW - radius, y);
      shape.quadraticCurveTo(x + cardW, y, x + cardW, y + radius);
      shape.lineTo(x + cardW, y + cardH - radius);
      shape.quadraticCurveTo(x + cardW, y + cardH, x + cardW - radius, y + cardH);
      shape.lineTo(x + radius, y + cardH);
      shape.quadraticCurveTo(x, y + cardH, x, y + cardH - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);

      // ── Track all disposables for cleanup ────────────────────────────
      const disposables: { dispose: () => void }[] = [];

      const cardGeo = new THREE.ShapeGeometry(shape, 32);
      disposables.push(cardGeo);
      const cardMat = new THREE.MeshBasicMaterial({
        color: 0x0a0a0a,
        transparent: true,
        opacity: 0.92,
      });
      disposables.push(cardMat);
      const card = new THREE.Mesh(cardGeo, cardMat);
      browserGroup.add(card);

      // Card outline
      const edgesGeo = new THREE.EdgesGeometry(cardGeo);
      disposables.push(edgesGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.5,
      });
      disposables.push(edgeMat);
      const line = new THREE.LineSegments(edgesGeo, edgeMat);
      browserGroup.add(line);

      // Browser top bar dots (tiny — fewer segments are imperceptible)
      [-1, 0, 1].forEach((i, idx) => {
        const dotMat = new THREE.MeshBasicMaterial({
          color: idx === 0 ? 0xff5f57 : idx === 1 ? 0xfdbc2c : 0x27c93f,
        });
        disposables.push(dotMat);
        const dotGeo = new THREE.CircleGeometry(0.07, 12);
        disposables.push(dotGeo);
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(-cardW / 2 + 0.3 + i * 0.22 + 0.22, cardH / 2 - 0.28, 0.01);
        browserGroup.add(dot);
      });

      // URL bar
      const urlMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });
      disposables.push(urlMat);
      const urlGeo = new THREE.PlaneGeometry(cardW - 1.4, 0.28);
      disposables.push(urlGeo);
      const urlBar = new THREE.Mesh(urlGeo, urlMat);
      urlBar.position.set(0.35, cardH / 2 - 0.28, 0.01);
      browserGroup.add(urlBar);

      // Inner UI: stacked plates
      const plate = (w: number, h: number, color: number, opacity = 1) => {
        const m = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
        });
        disposables.push(m);
        const g = new THREE.PlaneGeometry(w, h);
        disposables.push(g);
        return new THREE.Mesh(g, m);
      };

      // sidebar
      const sidebar = plate(0.9, cardH - 0.9, 0x111111);
      sidebar.position.set(-cardW / 2 + 0.45 + 0.05, -0.25, 0.02);
      browserGroup.add(sidebar);

      // main chart
      const chartBg = plate(cardW - 1.8, 1.4, 0x111111);
      chartBg.position.set(0.4, 0.45, 0.02);
      browserGroup.add(chartBg);

      // animated chart line (tube curve — 48 segments is visually identical)
      const _points: THREE_TYPE.Vector3[] = [];
      const _segments = 40;
      for (let i = 0; i < _segments; i++) {
        const t = i / (_segments - 1);
        const yy = Math.sin(t * Math.PI * 2) * 0.25 + Math.sin(t * 9) * 0.08;
        _points.push(new THREE.Vector3(-1.5 + t * 3.0, yy + 0.25, 0.04));
      }
      const curve = new THREE.CatmullRomCurve3(_points);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa });
      disposables.push(tubeMat);
      const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.025, 8, false);
      disposables.push(tubeGeo);
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      browserGroup.add(tube);

      // stat cards
      const c1 = plate(1.0, 0.85, 0x161616);
      c1.position.set(-0.7, -1.05, 0.02);
      browserGroup.add(c1);
      const c2 = plate(1.0, 0.85, 0x161616);
      c2.position.set(0.5, -1.05, 0.02);
      browserGroup.add(c2);
      const c3 = plate(1.0, 0.85, 0x1a0f2e);
      c3.position.set(1.7, -1.05, 0.02);
      browserGroup.add(c3);

      // little accent bars
      const accent = plate(1.0, 0.1, 0x8b5cf6);
      accent.position.set(1.7, -0.7, 0.03);
      browserGroup.add(accent);

      // ── Floating tech-icon nodes ─────────────────────────────────────
      const techGroup = new THREE.Group();
      root.add(techGroup);

      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa });
      disposables.push(nodeMat);

      const nodeGlowMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.25,
      });
      disposables.push(nodeGlowMat);

      // Fewer segments on tiny spheres (16×16 vs 24×24 = 56% fewer vertices, visually identical)
      const nodeCoreGeo = new THREE.SphereGeometry(0.12, 16, 16);
      disposables.push(nodeCoreGeo);
      const nodeGlowGeo = new THREE.SphereGeometry(0.32, 16, 16);
      disposables.push(nodeGlowGeo);

      const nodePositions: THREE_TYPE.Vector3[] = [
        new THREE.Vector3(-3.5, 1.4, 1.5),
        new THREE.Vector3(3.4, 1.7, 1.0),
        new THREE.Vector3(-3.6, -1.2, 0.6),
        new THREE.Vector3(3.7, -1.0, 1.4),
      ];
      const nodes: THREE_TYPE.Group[] = [];
      nodePositions.forEach((p) => {
        const g = new THREE.Group();
        const core = new THREE.Mesh(nodeCoreGeo, nodeMat);
        const glow = new THREE.Mesh(nodeGlowGeo, nodeGlowMat);
        g.add(core);
        g.add(glow);
        g.position.copy(p);
        techGroup.add(g);
        nodes.push(g);
      });

      // ── Particle field ───────────────────────────────────────────────
      const particleCount = 220;
      const pPositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3] = (Math.random() - 0.5) * 14;
        pPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      }
      const pGeo = new THREE.BufferGeometry();
      disposables.push(pGeo);
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xa78bfa,
        size: 0.03,
        transparent: true,
        opacity: 0.6,
      });
      disposables.push(pMat);
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // ── Mouse parallax ───────────────────────────────────────────────
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      let mouseRafPending = false;
      let lastMouseX = 0;
      let lastMouseY = 0;

      const onMove = (e: MouseEvent) => {
        // Always track latest position, even if rAF is pending
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        // Prevent queuing multiple rAFs per frame
        if (mouseRafPending) return;
        mouseRafPending = true;
        requestAnimationFrame(() => {
          mouseRafPending = false;
          const rect = el.getBoundingClientRect();
          mouse.tx = ((lastMouseX - rect.left) / rect.width - 0.5) * 2;
          mouse.ty = ((lastMouseY - rect.top) / rect.height - 0.5) * 2;
        });
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      const onResize = () => {
        if (!el) return;
        const w = el.clientWidth;
        const h = el.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Offscreen / visibility detection ─────────────────────────────
      let isVisible = true;

      // When the section is not intersecting, pause rendering
      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting && !document.hidden;
        },
        { threshold: 0, rootMargin: "100px" }
      );
      intersectionObserver.observe(el);

      const handleVisibilityChange = () => {
        if (document.hidden) isVisible = false;
        else {
          // Re-check intersection when tab becomes visible again
          const entries = intersectionObserver.takeRecords();
          const entry = entries[entries.length - 1];
          isVisible = entry ? entry.isIntersecting : true;
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // ── Animation loop ───────────────────────────────────────────────
      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime();

        // Only update & render when visible — saves 100% GPU when offscreen
        if (isVisible) {
          mouse.x += (mouse.tx - mouse.x) * 0.05;
          mouse.y += (mouse.ty - mouse.y) * 0.05;

          root.rotation.y = mouse.x * 0.25 + Math.sin(t * 0.4) * 0.04;
          root.rotation.x = -mouse.y * 0.18 + Math.sin(t * 0.3) * 0.03;
          browserGroup.position.y = Math.sin(t * 0.8) * 0.12;

          nodes.forEach((n, i) => {
            const base = nodePositions[i];
            n.position.y = base.y + Math.sin(t * 1.2 + i) * 0.18;
            n.position.x = base.x + Math.cos(t * 0.6 + i) * 0.1;
            n.rotation.y = t * 0.5;
          });

          particles.rotation.y = t * 0.02;
          renderer.render(scene, camera);
        }

        raf = requestAnimationFrame(animate);
      };
      animate();

      // ── Comprehensive cleanup ────────────────────────────────────────
      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);

        // Dispose all tracked materials & geometries
        for (const d of disposables) {
          d.dispose();
        }

        // Dispose renderer
        renderer.dispose();
        if (renderer.domElement.parentElement === el) {
          el.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        ref={ref}
        className="absolute inset-0 will-change-transform"
      />
      {/* Floating tech labels overlay */}
      <div className="pointer-events-none absolute inset-0">
        <TechLabel className="left-[6%] top-[18%]" label="React" />
        <TechLabel className="right-[8%] top-[14%]" label="Next.js" />
        <TechLabel className="left-[4%] bottom-[18%]" label="TypeScript" />
        <TechLabel className="right-[6%] bottom-[14%]" label="Node.js" />
      </div>
    </div>
  );
}

const TechLabel = memo(function TechLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="glass rounded-full px-3 py-1.5 text-[11px] tracking-wide text-ink-soft">
        {label}
      </div>
    </div>
  );
});
