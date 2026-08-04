import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageLoader } from "./PageLoader";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col">
      <PageLoader />
      <SiteHeader />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string | undefined;
  id?: string | undefined;
}) {
  return (
    <section id={id} className={cn("py-[72px] md:py-[96px]", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow?: string | undefined;
  title: string;
  text?: string | undefined;
  center?: boolean | undefined;
  onInk?: boolean | undefined;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow text-brand">{eyebrow}</p>}
      <h2 className="mt-5 text-[1.9rem] leading-[1.1] md:text-[2.6rem]">{title}</h2>
      {text && <p className="mt-5 text-base leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode | undefined;
}) {
  return (
    <section className="relative border-b border-border bg-background">
      <div className="grid-ink pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-page relative py-20 md:py-28">
        <p className="eyebrow flex items-center gap-2.5 text-brand">
          <span className="inline-block size-1.5 rounded-full bg-brand" />
          {eyebrow}
        </p>
        <h1 className="display-tight mt-7 max-w-3xl text-4xl md:text-[3.4rem]">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{text}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/** Editorial row: mono index + serif title + muted description + right meta */
export function EditorialRow({
  index,
  title,
  description,
  meta,
  className,
}: {
  index: string;
  title: ReactNode;
  description?: ReactNode | undefined;
  meta?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "row-editorial grid grid-cols-1 gap-2 px-2 py-6 transition-colors hover:bg-white/[0.02] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:px-4",
        className,
      )}
    >
      <span className="font-mono text-xs text-muted-foreground sm:w-10">{index}</span>
      <div>
        <h3 className="font-display text-xl font-medium tracking-tight md:text-2xl">{title}</h3>
        {description && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {meta && <div className="mt-2 flex items-center gap-4 sm:mt-0 sm:justify-end">{meta}</div>}
    </div>
  );
}
