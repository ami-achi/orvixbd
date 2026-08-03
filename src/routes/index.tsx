import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell, Section, SectionHeading, EditorialRow } from "@/components/site/SiteShell";
import { Reveal, Marquee } from "@/components/site/Reveal";
import { BuildTerminal } from "@/components/site/BuildTerminal";
import { TestimonialQuote } from "@/components/site/TestimonialQuote";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, process, reasons, tech, portfolio, posts, faqs } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orvix — Digital Agency for Websites, Apps & Growth" },
      {
        name: "description",
        content:
          "Orvix designs and builds high-performance websites, web applications, brands and SEO programs. Submit your project directly to our senior in-house team.",
      },
      { property: "og:title", content: "Orvix — Digital Agency for Websites, Apps & Growth" },
      {
        property: "og:description",
        content: "Premium websites, web apps, design, branding and SEO delivered end to end by Orvix.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const stats = [
  ["180+", "PROJECTS_DELIVERED"],
  ["9", "COUNTRIES_SERVED"],
  ["95+", "AVG_LIGHTHOUSE"],
  ["4.9", "CLIENT_RATING"],
] as const;

function Home() {
  return (
    <SiteShell>
      {/* ============ Hero ============ */}
      <section className="relative border-b border-border">
        <div className="grid-ink pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="container-page relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-brand">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
              </span>
              Available for Q3 projects
            </p>
            <h1 className="display-tight mt-7 text-[2.5rem] md:text-[4rem]">
              We engineer websites
              <br />
              that are <span className="serif-italic text-brand">quietly relentless</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Orvix is a full-service digital agency for websites, web applications, design, branding and SEO — briefed
              directly to one accountable in-house team.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group rounded-lg bg-brand px-6 text-brand-foreground hover:bg-brand/90"
              >
                <Link to="/order">
                  Start a project
                  <ArrowRight className="ml-1 size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-border bg-transparent px-6 hover:bg-white/[0.03]"
              >
                <Link to="/portfolio">View our work</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <BuildTerminal />
          </Reveal>
        </div>
      </section>

      {/* ============ Stats bar ============ */}
      <div className="border-b border-border">
        <div className="container-page grid grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label], i) => (
            <div
              key={label}
              className={[
                "px-2 py-9 sm:px-6",
                i % 2 === 1 ? "border-l border-border" : "",
                i >= 2 ? "border-t border-border lg:border-t-0" : "",
                i === 2 ? "lg:border-l lg:border-border" : "",
              ].join(" ")}
            >
              <p className="number-plate text-4xl md:text-5xl">{value}</p>
              <p className="mono-label mt-3">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============ Tech marquee ============ */}
      <div className="border-b border-border py-7">
        <p className="mono-label container-page mb-5">The_stack_we_build_and_hand_over</p>
        <Marquee items={tech} />
      </div>

      {/* ============ Services list ============ */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Eleven service lines, one accountable partner"
            text="Combine them into a single roadmap or hire us for a focused engagement."
          />
        </Reveal>
        <div className="mt-12 border-b border-border">
          {services.map((s, i) => (
            <Reveal key={s.slug} y={12}>
              <Link to="/services" hash={s.slug} className="group block">
                <EditorialRow
                  index={String(i + 1).padStart(2, "0")}
                  title={<span className="transition-colors duration-150 group-hover:text-brand">{s.title}</span>}
                  description={s.summary}
                  meta={
                    <>
                      <span className="font-mono text-xs text-brand">from {s.from}</span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-150 group-hover:-translate-y-0.5 group-hover:text-brand" />
                    </>
                  }
                />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="outline" className="rounded-lg border-border bg-transparent hover:bg-white/[0.03]">
            <Link to="/services">All services in detail</Link>
          </Button>
        </div>
      </Section>

      {/* ============ Why Orvix ============ */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading eyebrow="Why Orvix" title="Reasons clients stay with us" />
        </Reveal>
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.06}>
              <div className="border-t border-border pt-6">
                <p className="mono-label">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-xl font-medium">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Process timeline ============ */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="A predictable path from brief to launch"
            text="Six stages, weekly checkpoints and a working demo at every step."
          />
        </Reveal>
        <div className="mt-12 border-l border-border pl-6 md:pl-10">
          {process.map((p, i) => (
            <Reveal key={p.step} y={12}>
              <div className="relative py-7">
                <span className="absolute -left-[27px] top-9 size-1.5 rounded-full bg-brand md:-left-[43px]" />
                <p className="mono-label">
                  STEP_{String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-medium md:text-2xl">{p.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Portfolio ============ */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading eyebrow="Selected work" title="Work that earns its place in production" />
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.slice(0, 3).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <Link to="/portfolio" className="group block">
                <div className="overflow-hidden rounded-xl border border-border">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category} project by Orvix`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium transition-colors duration-150 group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mono-label mt-2">
                  {p.category} · {p.result} · {p.year}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <Button asChild variant="outline" className="rounded-lg border-border bg-transparent hover:bg-white/[0.03]">
            <Link to="/portfolio">See full portfolio</Link>
          </Button>
        </div>
      </Section>

      {/* ============ Testimonials ============ */}
      <Section className="border-t border-border">
        <Reveal>
          <p className="mono-label text-center text-brand">Testimonials</p>
          <div className="mt-10">
            <TestimonialQuote />
          </div>
        </Reveal>
      </Section>

      {/* ============ Blog ============ */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading eyebrow="Insights" title="Notes from the build" />
        </Reveal>
        <div className="mt-12 border-b border-border">
          {posts.map((p) => (
            <Reveal key={p.slug} y={12}>
              <Link to="/blog" className="group block">
                <EditorialRow
                  index={p.tag.toUpperCase()}
                  title={<span className="transition-colors duration-150 group-hover:text-brand">{p.title}</span>}
                  description={p.excerpt}
                  meta={<span className="font-mono text-xs text-muted-foreground">{p.date}</span>}
                  className="sm:grid-cols-[7rem_1fr_auto]"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ FAQ ============ */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Questions, answered" text="Still unsure? Contact us any time." />
            <Button
              asChild
              variant="outline"
              className="mt-8 rounded-lg border-border bg-transparent hover:bg-white/[0.03]"
            >
              <Link to="/faq">Read all FAQs</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.slice(0, 4).map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="gap-4 text-left text-base font-medium hover:no-underline data-[state=open]:text-brand">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="border-l border-brand/60 pl-4 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* ============ Final CTA ============ */}
      <section className="relative border-t border-border">
        <div className="grid-ink pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="container-page relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="eyebrow text-brand">Let’s build</p>
            <h2 className="display-tight mt-5 text-[2.2rem] md:text-[3rem]">
              Ready to build something <span className="serif-italic text-brand">exceptional?</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Send us your project brief and get a scoped proposal within two business days.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-lg bg-brand px-6 text-brand-foreground hover:bg-brand/90">
                <Link to="/order">Submit a project</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-border bg-transparent px-6 hover:bg-white/[0.03]"
              >
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="opacity-60">
            <BuildTerminal
              compact
              title="orvix — proposal.log"
              lines={[
                { label: "orvix quote --brief your-project", kind: "run" },
                { label: "scope review ............ complete", kind: "ok" },
                { label: "estimate ................ complete", kind: "ok" },
                { label: "proposal", value: "ready in 48h", kind: "score" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
