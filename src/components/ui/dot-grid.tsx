import { useRef, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";

interface DotGridProps {
  className?: string;
  color?: string;
  dotSize?: number;
  gap?: number;
  repulsionRadius?: number;
  repulsionStrength?: number;
}

interface Dot {
  homeX: number;
  homeY: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
}

export function DotGrid({
  className,
  color = "rgba(0, 0, 0, 0.15)",
  dotSize = 1.2,
  gap = 24,
  repulsionRadius = 120,
  repulsionStrength = 35,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);

  const SPRING = 0.06;
  const DAMPING = 0.85;

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

    const cols = Math.floor(rect.width / gap);
    const rows = Math.floor(rect.height / gap);
    const startX = (rect.width - (cols - 1) * gap) / 2;
    const startY = (rect.height - (rows - 1) * gap) / 2;

    const dots: Dot[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          homeX: startX + col * gap,
          homeY: startY + row * gap,
          offsetX: 0,
          offsetY: 0,
          vx: 0,
          vy: 0,
        });
      }
    }
    dotsRef.current = dots;
  }, [gap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const radiusSq = repulsionRadius * repulsionRadius;

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
            const force = (1 - dist / repulsionRadius) * repulsionStrength;
            dot.vx += (dx / dist) * force * 0.3;
            dot.vy += (dy / dist) * force * 0.3;
          }
        }

        dot.vx += -SPRING * dot.offsetX;
        dot.vy += -SPRING * dot.offsetY;
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.offsetX += dot.vx;
        dot.offsetY += dot.vy;

        ctx.beginPath();
        ctx.arc(dot.homeX + dot.offsetX, dot.homeY + dot.offsetY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, [color, dotSize, repulsionRadius, repulsionStrength]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top, active: true };
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseenter", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseenter", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
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
    <div ref={wrapperRef} className={cn("absolute inset-0", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
