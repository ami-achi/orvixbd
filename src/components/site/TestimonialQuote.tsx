import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/content";

export function TestimonialQuote() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;
  const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <blockquote className="font-display text-2xl italic leading-snug md:text-[2.1rem]">“{t.quote}”</blockquote>
      <p className="mono-label mt-8">
        {t.name} — {t.role}
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="font-mono text-xs text-muted-foreground">
          {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
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
