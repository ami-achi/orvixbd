import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell, Section, SectionHeading, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { portfolio, testimonials } from "@/lib/content";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Selected Client Work | Orvix" },
      {
        name: "description",
        content:
          "Websites, web applications, e-commerce stores and brand systems delivered by Orvix, with the measurable results they produced.",
      },
      { property: "og:title", content: "Portfolio — Selected Client Work | Orvix" },
      { property: "og:description", content: "Recent Orvix projects and the results they delivered." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Portfolio"
        title="Work that earns its place in production"
        text="A selection of recent engagements across product, commerce and brand — with the outcomes that mattered to each client."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {portfolio.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-elegant"
            >
              <div className="surface-ink relative flex h-60 items-end overflow-hidden p-8">
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.category} project by Orvix`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-ink/55"
                  aria-hidden
                />
                <div className="relative">
                  <p className="eyebrow text-brand">{p.category}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold">{p.title}</h2>
                </div>
              </div>

              <div className="flex items-center justify-between p-7">
                <div>
                  <p className="text-sm font-medium">{p.result}</p>
                  <p className="text-sm text-muted-foreground">{p.year}</p>
                </div>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/contact">Request case study</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/60">
        <SectionHeading eyebrow="Results" title="Outcomes we optimise for" center />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["180+", "Projects shipped"],
            ["95+", "Average Lighthouse"],
            ["2.1x", "Best revenue lift"],
            ["100%", "Code ownership"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-card p-7 text-center">
              <p className="font-display text-3xl font-semibold">{v}</p>
              <p className="mt-2 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border p-7">
              <blockquote className="text-base leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="block text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/order">
              Start your project <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  );
}
