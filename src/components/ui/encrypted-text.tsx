import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function EncryptedText({ text, className, duration = 800 }: EncryptedTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Each character has a random threshold - once progress passes it, it resolves
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else {
          // Use a seeded threshold per character position
          const threshold = (Math.sin(i * 7.3 + 0.5) * 0.5 + 0.5) * 0.7 + 0.15;
          if (progress >= threshold) {
            result += text[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }

      setDisplayed(result);

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayed(text);
        setDone(true);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, duration]);

  return (
    <span className={cn(!done ? "font-mono tracking-normal" : "", className)}>
      {displayed || text}
    </span>
  );
}
