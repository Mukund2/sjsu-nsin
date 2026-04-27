import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";

interface CharState {
  char: string;
  resolved: boolean;
}

export function EncryptedText({ text, className, duration = 800 }: EncryptedTextProps) {
  const [chars, setChars] = useState<CharState[]>([]);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const charCount = text.replace(/ /g, "").length;
    const perChar = duration / charCount;
    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const resolved = Math.min(Math.floor(elapsed / perChar), charCount);

      const result: CharState[] = [];
      let count = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          result.push({ char: " ", resolved: true });
        } else if (count < resolved) {
          result.push({ char: text[i], resolved: true });
          count++;
        } else {
          const pool = text[i] === text[i].toUpperCase() ? UPPER : LOWER;
          result.push({ char: pool[Math.floor(Math.random() * pool.length)], resolved: false });
          count++;
        }
      }

      setChars(result);

      if (resolved >= charCount) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDone(true);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, duration]);

  if (done) {
    return <span className={cn(className)}>{text}</span>;
  }

  return (
    <span className={cn(className)} aria-label={text}>
      {(chars.length ? chars : text.split("").map(c => ({ char: c, resolved: true }))).map((c, i) =>
        c.char === " " ? (
          <span key={i}>{" "}</span>
        ) : (
          <span
            key={i}
            style={{ display: "inline-block", width: "0.6em", textAlign: "center" }}
          >
            {c.char}
          </span>
        )
      )}
    </span>
  );
}
