import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { cn } from "../../lib/utils";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative pl-12 md:pl-16 pb-16 last:pb-0">
      {/* Dot */}
      <motion.div
        className="absolute left-0 top-1 w-3 h-3 border-2 border-mid-gray"
        animate={
          isInView
            ? { backgroundColor: "#8B7355", borderColor: "#8B7355" }
            : { backgroundColor: "transparent", borderColor: "#A3A3A3" }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
          {item.date}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-near-black mt-2 mb-3">
          {item.title}
        </h3>
        <p className="text-dark-gray leading-relaxed">{item.description}</p>
      </motion.div>
    </div>
  );
}

export function Timeline({ items, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Background line */}
      <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-light-gray" />

      {/* Animated fill line */}
      <motion.div
        className="absolute left-[5px] top-0 w-[2px] bg-accent"
        style={{ height: lineHeight }}
      />

      {items.map((item, i) => (
        <TimelineEntry key={i} item={item} index={i} />
      ))}
    </div>
  );
}
