import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const AUTO_MS = 5000;
const EASE = [0.16, 1, 0.3, 1] as const;

export function TestimonialQuote() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const t = testimonials[i]!;

  const go = useCallback((d: number) => {
    setDir(d);
    setI((v) => (v + d + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, go]);

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[9rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={t.name}
            initial={reduce ? { opacity: 1 } : { opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <blockquote className="font-display text-2xl italic leading-snug md:text-[2.1rem]">
              “{t.quote}”
            </blockquote>
            <p className="mono-label mt-8">
              {t.name} — {t.role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((item, idx) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial ${idx + 1}`}
              aria-current={idx === i}
              onClick={() => {
                setDir(idx > i ? 1 : -1);
                setI(idx);
              }}
              className="group flex h-3 items-center"
            >
              <motion.span
                layout
                transition={{ duration: 0.35, ease: EASE }}
                className={cn(
                  "block h-1.5 rounded-full transition-colors duration-200",
                  idx === i ? "w-6 bg-brand" : "w-1.5 bg-white/20 group-hover:bg-white/40",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
