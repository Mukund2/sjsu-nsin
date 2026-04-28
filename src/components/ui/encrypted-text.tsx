import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export function EncryptedText({ text, className, duration = 800 }: EncryptedTextProps) {
  const words = text.split(" ");
  const stagger = 150; // ms between each word
  const [visible, setVisible] = useState<boolean[]>(words.map(() => false));

  useEffect(() => {
    const timers = words.map((_, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * stagger)
    );
    return () => timers.forEach(clearTimeout);
  }, [text]);

  return (
    <span className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500 ease-out"
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}
