import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ Reveal */

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
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay: reduce ? 0 : delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its <StaggerItem> children when scrolled into view. */
export function Stagger({
  children,
  className,
  stagger = 0.07,
  delay = 0,
}: {
  children: ReactNode;
  className?: string | undefined;
  stagger?: number | undefined;
  delay?: number | undefined;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string | undefined;
  y?: number | undefined;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------- Headline reveal */

/** Staggered word-by-word headline reveal. Renders plain text when reduced. */
export function WordReveal({
  text,
  className,
  delay = 0,
  highlight,
  highlightClassName = "serif-italic text-brand",
}: {
  text: string;
  className?: string | undefined;
  delay?: number | undefined;
  /** words that should get the highlight style */
  highlight?: string[] | undefined;
  highlightClassName?: string | undefined;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const hi = new Set(highlight ?? []);

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span
            className={cn("inline-block", hi.has(word.replace(/[^\w']/g, "")) && highlightClassName)}
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, y: "0.9em" },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}

/** Simple sequenced fade-up used for hero sub-elements. */
export function HeroFade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number | undefined;
  className?: string | undefined;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: reduce ? 0 : delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- Count up */

export function CountUp({
  value,
  suffix = "",
  decimals = 0,
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string | undefined;
  decimals?: number | undefined;
  duration?: number | undefined;
  className?: string | undefined;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------ Parallax */

/** Translates children on scroll for a subtle depth effect. */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number | undefined;
  className?: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const y = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div {...(reduce ? {} : { style: { y, willChange: "transform" as const } })}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------ Magnetic */

/** Subtle magnetic pull + press feedback for primary CTAs. */
export function Magnetic({
  children,
  strength = 8,
  className,
}: {
  children: ReactNode;
  strength?: number | undefined;
  className?: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18 });
  const y = useSpring(my, { stiffness: 260, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      {...(reduce ? {} : { style: { x, y }, whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } })}
      transition={{ duration: 0.2, ease: EASE }}
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2);
        my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- Marquee */

/** Seamless infinite marquee — duplicated track, pauses smoothly on hover. */
export function Marquee({
  items,
  className,
  speed = 40,
  reverse = false,
}: {
  items: string[];
  className?: string | undefined;
  speed?: number | undefined;
  reverse?: boolean | undefined;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("mask-fade-x group overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max items-center gap-8"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-xs uppercase tracking-widest whitespace-nowrap text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
