import { cn } from "../../lib/utils";

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}
