import { useState, useRef, type MouseEvent } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface CardSpotlightProps {
  className?: string;
  children: React.ReactNode;
}

export function CardSpotlight({ className, children }: CardSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden bg-white border border-light-gray p-8",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(139,115,85,0.06), transparent 60%)`,
          opacity,
        }}
        transition={{ opacity: { duration: 0.3 }, background: { duration: 0 } }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
