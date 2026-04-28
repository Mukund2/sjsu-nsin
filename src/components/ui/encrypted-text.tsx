import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export function EncryptedText({ text, className }: EncryptedTextProps) {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCount(0);
    intervalRef.current = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return c;
        }
        return c + 1;
      });
    }, 40);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span className={cn(className)}>
      {text.slice(0, count)}
      {count < text.length && (
        <span className="inline-block w-[3px] h-[0.85em] bg-white/70 align-middle ml-[2px] animate-pulse" />
      )}
    </span>
  );
}
