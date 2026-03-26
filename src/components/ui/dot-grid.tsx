import { useRef, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";

interface DotGridProps {
  className?: string;
}

interface Dot {
  homeX: number;
  homeY: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
}

export function DotGrid({ className }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);

  const GAP = 24;
  const DOT_SIZE = 1.2;
  const RADIUS = 80;
  const STRENGTH = 18;
  const SPRING = 0.03;
  const DAMPING = 0.92;

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const cols = Math.floor(rect.width / GAP);
    const rows = Math.floor(rect.height / GAP);
    const startX = (rect.width - (cols - 1) * GAP) / 2;
    const startY = (rect.height - (rows - 1) * GAP) / 2;

    const dots: Dot[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          homeX: startX + col * GAP,
          homeY: startY + row * GAP,
          offsetX: 0, offsetY: 0, vx: 0, vy: 0,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const radiusSq = RADIUS * RADIUS;

    const tick = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my, active } = mouseRef.current;
      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (active) {
          const dx = dot.homeX - mx;
          const dy = dot.homeY - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / RADIUS;
            const force = t * t * STRENGTH; // quadratic falloff for wave feel
            dot.vx += (dx / dist) * force * 0.15;
            dot.vy += (dy / dist) * force * 0.15;
          }
        }

        dot.vx += -SPRING * dot.offsetX;
        dot.vy += -SPRING * dot.offsetY;
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.offsetX += dot.vx;
        dot.offsetY += dot.vy;

        ctx.beginPath();
        ctx.arc(dot.homeX + dot.offsetX, dot.homeY + dot.offsetY, DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Listen on wrapper (covers entire hero including text) instead of canvas
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        const rect = wrapper.getBoundingClientRect();
        mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top, active: true };
      }
    };

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseenter", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    wrapper.addEventListener("touchmove", onTouch, { passive: true });
    wrapper.addEventListener("touchend", onLeave);

    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseenter", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
      wrapper.removeEventListener("touchmove", onTouch);
      wrapper.removeEventListener("touchend", onLeave);
    };
  }, []);

  useEffect(() => {
    buildGrid();
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(() => buildGrid());
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [buildGrid]);

  return (
    <div ref={wrapperRef} className={cn("absolute inset-0 z-0", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
