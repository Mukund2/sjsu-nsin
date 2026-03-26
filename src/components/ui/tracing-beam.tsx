import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "../../lib/utils";

interface TracingBeamProps {
  className?: string;
  children: React.ReactNode;
}

export function TracingBeam({ className, children }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Beam track */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-light-gray hidden md:block">
        {/* Beam fill */}
        <motion.div
          className="w-full bg-accent origin-top"
          style={{ height }}
        />
      </div>

      {/* Content */}
      <div className="md:pl-10">{children}</div>
    </div>
  );
}
