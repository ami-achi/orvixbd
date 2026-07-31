import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Sparkles,
  Gauge,
  ShieldCheck,
  Star,
  Quote,
  Mail,
} from "lucide-react";
import { SiteShell, Section, SectionHeading } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/hero.jpg";
import { company, services, process, reasons, tech, portfolio, testimonials, posts, faqs } from "@/lib/content";

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
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="surface-ink relative overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1600}
          height={1008}
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg, oklch(0.16 0.04 264 / 0.95), oklch(0.16 0.04 264 / 0.55))" }}
          aria-hidden
        />
        <div className="container-page relative py-28 md:py-40">
          <div className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-foreground">
            <Sparkles className="size-3.5 text-brand" />
            Digital agency · {company.country} · Serving clients worldwide
          </div>
          <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.03] md:text-7xl">
            We build digital products that{" "}
            <span className="text-gradient-brand">look premium and perform</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            Orvix is a full-service agency for websites, web applications, design, branding and SEO. You brief us
            directly — no marketplaces, no middlemen, one accountable team.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-brand px-7 text-brand-foreground hover:bg-brand/90">
              <Link to="/order">
                Start your project <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-ink-border bg-transparent px-7 text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
            >
              <Link to="/portfolio">View our work</Link>
            </Button>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-ink-border pt-10 md:grid-cols-4">
            {[
              ["180+", "Projects delivered"],
              ["9", "Countries served"],
              ["95+", "Avg. Lighthouse"],
              ["4.9/5", "Client rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl font-semibold">{value}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Intro */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Who we are"
            title="An engineering-led agency, not a marketplace"
            text="Orvix is a single accountable team. Every project is scoped, designed, built and supported in-house — from a five-page site to a production web platform. We work in weekly increments with clear pricing and a direct line to the people writing the code."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Gauge, title: "Performance first", text: "90+ Lighthouse targets on every launch." },
              { icon: ShieldCheck, title: "Secure by design", text: "Typed code, reviews and hardened defaults." },
              { icon: Star, title: "Senior team", text: "No juniors learning on your budget." },
              { icon: Check, title: "Fixed pricing", text: "Agreed scope and cost before we start." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                <c.icon className="size-5 text-brand" />
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-secondary/60">
        <SectionHeading
          eyebrow="Services"
          title="Everything you need to launch and grow"
          text="Eleven service lines, one partner. Combine them into a single roadmap or hire us for a focused engagement."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <Link
              key={s.slug}
              to="/services"
              hash={s.slug}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <p className="eyebrow text-brand">{s.from}</p>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <span className="mt-5 inline-flex items-center text-sm font-medium text-foreground">
                Explore <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/services">All services</Link>
          </Button>
        </div>
      </Section>

      {/* Why Orvix */}
      <Section>
        <SectionHeading eyebrow="Why Orvix" title="Reasons clients stay with us" center />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-border p-7">
              <Check className="size-5 text-brand" />
              <h3 className="mt-4 font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="surface-ink">
        <SectionHeading eyebrow="Process" title="A predictable path from brief to launch" onInk />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {process.map((p) => (
            <div key={p.step} className="glass-card rounded-2xl p-7">
              <span className="font-display text-sm font-semibold text-brand">{p.step}</span>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tech */}
      <Section>
        <SectionHeading
          eyebrow="Technology"
          title="A modern, boring-on-purpose stack"
          text="We choose tools that are fast, well supported and easy to hand over."
          center
        />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {tech.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium">
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Portfolio */}
      <Section className="bg-secondary/60">
        <SectionHeading eyebrow="Portfolio" title="Selected work" text="A snapshot of recent engagements." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.slice(0, 3).map((p) => (
            <article key={p.title} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="surface-ink flex h-44 items-end p-6">
                <span className="font-display text-xl font-semibold">{p.title}</span>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">{p.category}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {p.result} · {p.year}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/portfolio">See full portfolio</Link>
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading eyebrow="Testimonials" title="What clients say" center />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-elegant">
              <Quote className="size-5 text-brand" />
              <blockquote className="mt-4 text-base leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="block text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Blog */}
      <Section className="bg-secondary/60">
        <SectionHeading eyebrow="Insights" title="Latest articles" />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog"
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <p className="eyebrow text-brand">{p.tag}</p>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <p className="mt-5 text-xs text-muted-foreground">{p.date}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ preview */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" text="Still unsure? Contact us any time." />
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, 4).map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Newsletter + CTA */}
      <Section className="pb-0">
        <div className="surface-ink relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden
          />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">Ready to build something exceptional?</h2>
              <p className="mt-4 max-w-md text-ink-muted">
                Send us your project brief and get a scoped proposal within two business days.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-brand px-7 text-brand-foreground hover:bg-brand/90">
                  <Link to="/order">Submit a project</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-ink-border bg-transparent px-7 text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
                >
                  <Link to="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-7">
              <p className="eyebrow text-brand">Newsletter</p>
              <h3 className="mt-3 text-xl font-semibold">Monthly notes on web performance & design</h3>
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  (e.currentTarget as HTMLFormElement).reset();
                }}
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="border-ink-border bg-white/5 text-ink-foreground placeholder:text-ink-muted"
                />
                <Button type="submit" className="rounded-md bg-brand text-brand-foreground hover:bg-brand/90">
                  <Mail className="mr-1 size-4" /> Subscribe
                </Button>
              </form>
              <p className="mt-3 text-xs text-ink-muted">No spam. Unsubscribe any time.</p>
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
