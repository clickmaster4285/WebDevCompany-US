import Image from "next/image";
import { useEffect, useRef } from "react";
import type * as THREE_TYPE from "three";

const TECH = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "GSAP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Greensock_Logo.png" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Postgres", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" },
  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Svelte", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
];

export function TechSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    let raf = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      
      const w = el.clientWidth;
      const h = el.clientHeight;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.z = 12;
      
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0, 0);
      el.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      // Fibonacci Sphere Distribution for Nodes
      const count = TECH.length;
      const radius = 4.5;
      const positions: THREE_TYPE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        positions.push(new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ));
      }

      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa });
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.2 });
      const nodes: THREE_TYPE.Group[] = [];
      
      positions.forEach((p) => {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), nodeMat));
        g.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), glowMat));
        g.position.copy(p);
        group.add(g);
        nodes.push(g);
      });

      // Connect nearby nodes with lines
      const lineMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.2 });
      const linePos: number[] = [];
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          if (positions[i].distanceTo(positions[j]) < 5.5) {
            linePos.push(
              positions[i].x, positions[i].y, positions[i].z, 
              positions[j].x, positions[j].y, positions[j].z
            );
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      group.add(lines);

      // Background Particles
      const pcount = 600;
      const ppos = new Float32Array(pcount * 3);
      for (let i = 0; i < pcount; i++) {
        ppos[i * 3] = (Math.random() - 0.5) * 18;
        ppos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        ppos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
      const particles = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.02, transparent: true, opacity: 0.4 })
      );
      scene.add(particles);

      // Mouse Interaction
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);
      
      const onResize = () => {
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // Animation Loop
      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime();
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        
        group.rotation.y = t * 0.12 + mouse.x * 0.6;
        group.rotation.x = mouse.y * 0.4;
        particles.rotation.y = t * 0.02;
        particles.rotation.x = t * 0.01;
        
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      // Robust Cleanup Function
      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        
        // Dispose Geometries
        lineGeo.dispose();
        pGeo.dispose();
        nodes.forEach(n => {
           n.children.forEach(child => {
              if (child instanceof THREE.Mesh) child.geometry.dispose();
           });
        });
        
        // Dispose Materials (Crucial for preventing memory leaks)
        nodeMat.dispose();
        glowMat.dispose();
        lineMat.dispose();
        (particles.material as THREE_TYPE.PointsMaterial).dispose();
        
        // Dispose Renderer
        renderer.dispose();
        if (renderer.domElement.parentElement === el) {
          el.removeChild(renderer.domElement);
        }
      };
    })();
    
    return () => cleanup();
  }, []);

  return (
    <section id="stack" className="relative overflow-hidden py-20 md:py-20 bg-background">
      {/* 3D Canvas Background */}
      <div ref={ref} className="absolute inset-0 z-0" />
      
      {/* Gradient overlay to ensure text readability over the 3D scene */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-background/60 to-background pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 layout-container px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] text-ink">
            Powered by a <span className="text-violet-soft">modern stack.</span>
          </h2>
          <p className="mt-4 text-ink-mute text-lg">
            We leverage the best tools in the industry to build scalable, high-performance applications.
          </p>
        </div>

        {/* Tech Logos Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-8 max-w-5xl mx-auto">
          {TECH.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center gap-3 group">
              <div className="relative w-14 h-14 flex items-center justify-center bg-surface/50 rounded-xl border border-border/50 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-violet-soft group-hover:shadow-lg group-hover:shadow-violet-soft/20">
                {/* Note: Using standard <Image> for external SVGs/PNGs to avoid Next.js remotePatterns config issues */}
                               <Image 
                  src={tech.logo} 
                  alt={`${tech.name} logo`} 
                  width={32}
                  height={32}
                  unoptimized
                  className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    // Fallback for broken images
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🔧%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <span className="text-xs text-ink-mute font-medium tracking-wide uppercase">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}