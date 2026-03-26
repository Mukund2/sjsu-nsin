import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export function EncryptedText({ text, className, speed = 30 }: EncryptedTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [resolved, setResolved] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let tick = 0;
    const totalTicks = text.length * 3;

    intervalRef.current = setInterval(() => {
      tick++;
      const charsResolved = Math.floor((tick / totalTicks) * text.length);

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < charsResolved) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayed(result);
      setResolved(charsResolved);

      if (charsResolved >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayed(text);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return (
    <span className={cn(resolved < text.length ? "font-mono tracking-normal" : "", className)}>
      {displayed || text}
    </span>
  );
}
