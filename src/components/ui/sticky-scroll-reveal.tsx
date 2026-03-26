import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { cn } from "../../lib/utils";

interface ContentItem {
  title: string;
  description: string;
}

interface StickyScrollRevealProps {
  content: ContentItem[];
  className?: string;
}

function ContentCard({ item, index }: { item: ContentItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <div ref={ref} className="min-h-[50vh] flex items-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
          0{index + 1}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-near-black mt-3 mb-4">
          {item.title}
        </h3>
        <p className="text-dark-gray leading-relaxed text-base md:text-lg">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export function StickyScrollReveal({ content, className }: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, content.length - 1]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (v) => {
      setCurrentIndex(Math.round(v));
    });
    return unsubscribe;
  }, [activeIndex]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left sticky side */}
        <div className="hidden lg:flex items-start">
          <div className="sticky top-32 w-full">
            <div className="space-y-6">
              {content.map((item, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: currentIndex === i ? 1 : 0.15,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={cn(
                      "w-8 h-[2px] transition-colors duration-300",
                      currentIndex === i ? "bg-accent" : "bg-mid-gray"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm uppercase tracking-[0.2em] transition-colors duration-300",
                      currentIndex === i ? "text-near-black" : "text-mid-gray"
                    )}
                  >
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right scrolling side */}
        <div>
          {content.map((item, i) => (
            <ContentCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
