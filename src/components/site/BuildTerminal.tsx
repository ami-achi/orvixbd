import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Line = { label: string; value?: string; kind?: "ok" | "run" | "score" | "deploy" };

const defaultLines: Line[] = [
  { label: "orvix build --project client-site", kind: "run" },
  { label: "discovery ................. complete", kind: "ok" },
  { label: "architecture ............. complete", kind: "ok" },
  { label: "design system ........... complete", kind: "ok" },
  { label: "engineering ............. complete", kind: "ok" },
  { label: "lighthouse", value: "98 / 100 / 100 / 100", kind: "score" },
  { label: "Deployed to production", kind: "deploy" },
];

export function BuildTerminal({
  className,
  lines = defaultLines,
  title = "orvix — build.log",
  compact = false,
}: {
  className?: string | undefined;
  lines?: Line[] | undefined;
  title?: string | undefined;
  compact?: boolean | undefined;
}) {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 520);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-elegant",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-muted-foreground">{title}</span>
      </div>
      <div className={cn("font-mono text-[12px] leading-relaxed sm:text-[13px]", compact ? "p-4" : "p-5 sm:p-6")}>
        {lines.slice(0, shown).map((l, i) => (
          <p key={l.label} className="flex flex-wrap items-baseline gap-x-2 py-0.5">
            {l.kind === "run" ? (
              <>
                <span className="text-brand">$</span>
                <span className="text-foreground">{l.label}</span>
              </>
            ) : l.kind === "deploy" ? (
              <>
                <span className="text-brand">✔</span>
                <span className="text-brand">{l.label}</span>
              </>
            ) : l.kind === "score" ? (
              <>
                <span className="text-muted-foreground">{l.label}</span>
                <span className="text-brand">{l.value}</span>
              </>
            ) : (
              <>
                <span className="text-muted-foreground">{i > 0 ? "›" : ""}</span>
                <span className="text-muted-foreground">{l.label}</span>
              </>
            )}
          </p>
        ))}
        <p className="flex items-center gap-2 pt-1">
          <span className="text-brand">$</span>
          <span className="animate-caret inline-block h-4 w-[7px] bg-brand align-middle" aria-hidden />
        </p>
      </div>
    </div>
  );
}
