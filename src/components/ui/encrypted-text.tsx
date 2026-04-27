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
    // Count non-space characters
    const charCount = text.replace(/ /g, "").length;
    const perChar = duration / charCount;
    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      // How many non-space characters should be resolved
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
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
          count++;
        }
      }

      setDisplayed(result);

      if (resolved >= charCount) {
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
    <span className={cn(className)}>
      {displayed || text}
    </span>
  );
}
