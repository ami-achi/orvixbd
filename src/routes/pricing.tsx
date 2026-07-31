import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteShell, Section, SectionHeading, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pricing, faqs } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Transparent Project & Retainer Rates | Orvix" },
      {
        name: "description",
        content:
          "Fixed-price project packages and monthly retainers from Orvix. Starter, Growth and Enterprise plans with clear scope and no hidden fees.",
      },
      { property: "og:title", content: "Pricing — Transparent Project & Retainer Rates | Orvix" },
      { property: "og:description", content: "Starter, Growth and Enterprise packages with fixed scope and pricing." },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title="Clear pricing, agreed before we start"
        text="Every quote is fixed after discovery. No hourly surprises, no scope games — and retainers available for ongoing work."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={cn(
                "flex flex-col rounded-3xl border p-8",
                p.featured ? "surface-ink border-transparent shadow-elegant" : "border-border bg-card",
              )}
            >
              <p className={cn("eyebrow", p.featured ? "text-brand" : "text-brand")}>{p.note}</p>
              <h2 className="mt-4 text-xl font-semibold">{p.name}</h2>
              <p className={cn("mt-4 font-display text-4xl font-semibold")}>{p.price}</p>
              <p className={cn("mt-3 text-sm", p.featured ? "text-ink-muted" : "text-muted-foreground")}>{p.for}</p>
              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className={p.featured ? "text-ink-foreground" : undefined}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={cn(
                  "mt-8 rounded-full",
                  p.featured && "bg-brand text-brand-foreground hover:bg-brand/90",
                )}
                variant={p.featured ? "default" : "outline"}
              >
                <Link to="/order">Get started</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prices in USD. Projects start with a 40% deposit. Retainers billed monthly.
        </p>
      </Section>

      <Section className="bg-secondary/60">
        <SectionHeading eyebrow="Retainers" title="Ongoing support plans" center />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { name: "Maintenance", price: "$99/mo", text: "Monitoring, backups, updates and priority fixes." },
            { name: "SEO Growth", price: "$249/mo", text: "Technical SEO, content strategy and monthly reporting." },
            { name: "Design Retainer", price: "$399/mo", text: "Ongoing design output for campaigns and product." },
          ].map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-semibold">{r.name}</h3>
              <p className="mt-3 font-display text-2xl font-semibold">{r.price}</p>
              <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Billing FAQ" title="Pricing questions" />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`p-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-14 text-center">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/order">
              Request a quote <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  );
}
