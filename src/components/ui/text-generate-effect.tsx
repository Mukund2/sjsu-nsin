import { useEffect } from "react";
import { motion, useAnimate, stagger } from "motion/react";
import { cn } from "../../lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export function TextGenerateEffect({ words, className }: TextGenerateEffectProps) {
  const wordsArray = words.split(" ");
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)" },
      { duration: 0.6, delay: stagger(0.1), ease: "easeOut" }
    );
  }, [animate]);

  return (
    <div ref={scope} className={cn(className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block opacity-0 mr-[0.3em]"
          style={{ filter: "blur(4px)" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
