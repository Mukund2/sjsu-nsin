import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "../../lib/utils";

interface ElevatingGridProps {
  className?: string;
}

const CELL_SIZE = 40;
const RADIUS = 140;

export function ElevatingGrid({ className }: ElevatingGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [grid, setGrid] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });
  const rafRef = useRef<number>(0);
  const pendingPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setGrid({
        cols: Math.ceil(rect.width / CELL_SIZE) + 1,
        rows: Math.ceil(rect.height / CELL_SIZE) + 1,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pendingPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePos(pendingPos.current);
          rafRef.current = 0;
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  const totalCells = grid.rows * grid.cols;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => {
          const col = i % grid.cols;
          const row = Math.floor(i / grid.cols);
          const cx = col * CELL_SIZE + CELL_SIZE / 2;
          const cy = row * CELL_SIZE + CELL_SIZE / 2;

          let intensity = 0;
          if (mousePos) {
            const dx = mousePos.x - cx;
            const dy = mousePos.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            intensity = Math.max(0, 1 - dist / RADIUS);
            intensity = intensity * intensity; // ease curve
          }

          const ty = -intensity * 10;
          const scale = 1 + intensity * 0.06;
          const borderOpacity = 0.06 + intensity * 0.2;
          const shadow = intensity > 0.05
            ? `0 ${intensity * 6}px ${intensity * 16}px rgba(0,0,0,${intensity * 0.08})`
            : "none";
          const bg = intensity > 0.05
            ? `rgba(0,0,0,${intensity * 0.02})`
            : "transparent";

          return (
            <div
              key={i}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                transform: `translateY(${ty}px) scale(${scale})`,
                boxShadow: shadow,
                backgroundColor: bg,
                borderColor: `rgba(0,0,0,${borderOpacity})`,
                transition: mousePos
                  ? "transform 0.12s ease-out, box-shadow 0.12s ease-out, background-color 0.12s ease-out, border-color 0.12s ease-out"
                  : "transform 0.5s ease-out, box-shadow 0.5s ease-out, background-color 0.5s ease-out, border-color 0.5s ease-out",
              }}
              className="border"
            />
          );
        })}
      </div>
    </div>
  );
}
