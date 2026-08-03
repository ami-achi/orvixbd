import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number | undefined;
  y?: number | undefined;
  className?: string | undefined;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({ items, className }: { items: string[]; className?: string | undefined }) {
  const row = [...items, ...items];
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div className="animate-marquee flex w-max items-center gap-8">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-xs uppercase tracking-widest whitespace-nowrap text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
