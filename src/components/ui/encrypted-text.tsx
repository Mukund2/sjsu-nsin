import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export function EncryptedText({ text, className, duration = 800 }: EncryptedTextProps) {
  const chars = text.split("");
  const stagger = 40; // ms between each letter
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timers = chars.map((_, i) =>
      setTimeout(() => setCount(i + 1), i * stagger)
    );
    return () => timers.forEach(clearTimeout);
  }, [text]);

  return (
    <span className={cn(className)}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-400 ease-out ${char === " " ? "w-[0.3em]" : ""}`}
          style={{
            opacity: i < count ? 1 : 0,
            transform: i < count ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
