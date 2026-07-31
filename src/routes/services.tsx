import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteShell, Section, SectionHeading, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, process, faqs } from "@/lib/content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Web Development, Apps, Design & SEO | Orvix" },
      {
        name: "description",
        content:
          "Website development, web applications, UI UX design, WordPress, e-commerce, SEO, branding, logo and graphic design, software development and maintenance by Orvix.",
      },
      { property: "og:title", content: "Services — Web Development, Apps, Design & SEO | Orvix" },
      {
        property: "og:description",
        content: "Eleven service lines covering design, engineering, growth and ongoing maintenance.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title="Design, engineering and growth under one roof"
        text="Pick a single service or combine several into a roadmap. Every engagement includes discovery, a fixed quote and post-launch support."
      >
        <Button asChild size="lg" className="rounded-full bg-brand px-7 text-brand-foreground hover:bg-brand/90">
          <Link to="/order">Order a service</Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <h2 className="font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              <p className="mt-4 text-sm font-medium text-brand">From {s.from}</p>
            </a>
          ))}
        </div>
      </Section>

      {services.map((s, i) => (
        <Section key={s.slug} id={s.slug} className={i % 2 === 1 ? "bg-secondary/60" : undefined}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading eyebrow={`Service ${String(i + 1).padStart(2, "0")}`} title={s.title} text={s.overview} />
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="font-display text-3xl font-semibold">{s.from}</p>
                <Button asChild className="mt-5 w-full rounded-full">
                  <Link to="/order" search={{ service: s.title }}>
                    Order {s.title} <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow text-brand">Features</h3>
                <ul className="mt-4 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow text-brand">Benefits</h3>
                <ul className="mt-4 space-y-3">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-2">
                <h3 className="eyebrow text-brand">Process</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {process.slice(0, 3).map((p) => (
                    <div key={p.step} className="rounded-xl border border-border p-4">
                      <p className="text-xs font-semibold text-brand">{p.step}</p>
                      <p className="mt-1 text-sm font-medium">{p.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section className="surface-ink">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Service FAQ" title="Common questions" onInk />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`s-${i}`} className="border-ink-border">
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-ink-muted">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </SiteShell>
  );
}
