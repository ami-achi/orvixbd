import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
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
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
  onInk,
}: {
  eyebrow?: string | undefined;
  title: string;
  text?: string | undefined;
  center?: boolean | undefined;
  onInk?: boolean | undefined;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", onInk ? "text-brand" : "text-brand")}>{eyebrow}</p>}
      <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
      {text && (
        <p className={cn("mt-4 text-base leading-relaxed", onInk ? "text-ink-muted" : "text-muted-foreground")}>
          {text}
        </p>
      )}
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
    <section className="surface-ink relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 right-0 size-[36rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
        aria-hidden
      />
      <div className="container-page relative py-24 md:py-32">
        <p className="eyebrow text-brand">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{text}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
