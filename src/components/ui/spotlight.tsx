import { useState, useRef, type MouseEvent } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface SpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export function Spotlight({ className, children }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleMouseEnter() {
    setOpacity(1);
  }

  function handleMouseLeave() {
    setOpacity(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        animate={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 60%)`,
          opacity,
        }}
        transition={{ opacity: { duration: 0.3 }, background: { duration: 0 } }}
      />
      {children}
    </div>
  );
}
