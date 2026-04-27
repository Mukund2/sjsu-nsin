import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";

export function EncryptedText({ text, className, duration = 800 }: EncryptedTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const charCount = text.replace(/ /g, "").length;
    const perChar = duration / charCount;
    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const resolved = Math.min(Math.floor(elapsed / perChar), charCount);

      let result = "";
      let count = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (count < resolved) {
          result += text[i];
          count++;
        } else {
          const pool = text[i] === text[i].toUpperCase() ? UPPER : LOWER;
          result += pool[Math.floor(Math.random() * pool.length)];
          count++;
        }
      }

      setDisplayed(result);

      if (resolved >= charCount) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayed(text);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, duration]);

  return (
    <span className={cn(className)}>
      {displayed}
    </span>
  );
}
