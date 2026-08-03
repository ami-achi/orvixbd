import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Gauge,
  ShieldCheck,
  Star,
  Quote,
  Mail,
  Handshake,
} from "lucide-react";
import { SiteShell, Section, SectionHeading } from "@/components/site/SiteShell";
import { Reveal, Marquee } from "@/components/site/Reveal";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const stats = [
  ["180+", "Projects delivered"],
  ["9", "Countries served"],
  ["95+", "Avg. Lighthouse"],
  ["4.9/5", "Client rating"],
] as const;

const pillars = [
  { icon: Gauge, title: "Performance first", text: "90+ Lighthouse targets on every launch." },
  { icon: ShieldCheck, title: "Secure by design", text: "Typed code, reviews and hardened defaults." },
  { icon: Star, title: "Senior team", text: "No juniors learning on your budget." },
  { icon: Handshake, title: "Fixed pricing", text: "Agreed scope and cost before we start." },
];

function Home() {
  return (
    <SiteShell>
      {/* ============ Bento hero ============ */}
      <section className="relative isolate overflow-hidden bg-background">
        <div className="grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div
          className="animate-aurora pointer-events-none absolute -left-40 -top-40 size-[38rem] rounded-full blur-3xl"
          style={{ background: "var(--gradient-brand)", opacity: 0.35 }}
          aria-hidden
        />
        <div className="container-page relative py-16 md:py-24">
          <div className="grid gap-4 lg:grid-cols-12">
            {/* headline tile */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bento-ink relative flex flex-col justify-between p-8 md:p-12 lg:col-span-8"
            >
              <div className="grid-ink pointer-events-none absolute inset-0 opacity-60" aria-hidden />
              <div className="relative">
                <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                  </span>
                  Digital agency · {company.country} · Worldwide
                </span>
                <h1 className="display-tight mt-8 max-w-3xl text-[2.4rem] md:text-6xl">
                  Design.
                  <br />
                  Build. <span className="text-gradient-brand">Scale.</span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
                  Orvix is a full-service agency for websites, web applications, design, branding and SEO — briefed
                  directly to one accountable in-house team.
                </p>
              </div>
              <div className="relative mt-10 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-full bg-brand px-7 text-brand-foreground shadow-glow hover:bg-brand/90"
                >
                  <Link to="/order">
                    Start your project
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-ink-border bg-white/5 px-7 text-ink-foreground backdrop-blur hover:bg-white/10 hover:text-ink-foreground"
                >
                  <Link to="/portfolio">View our work</Link>
                </Button>
              </div>
            </motion.div>

            {/* visual tile */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bento relative min-h-[16rem] lg:col-span-4"
            >
              <img
                src={heroImg}
                alt=""
                aria-hidden
                width={1600}
                height={1008}
                className="absolute inset-0 size-full scale-105 object-cover"
              />
              <div className="absolute inset-0 bg-ink/45" aria-hidden />
              <div className="relative flex h-full flex-col justify-end p-7 text-ink-foreground">
                <p className="eyebrow text-brand">Proposal in 48h</p>
                <p className="mt-3 text-lg font-medium leading-snug">
                  Fixed scope, fixed price, weekly working demos.
                </p>
              </div>
            </motion.div>

            {/* stats tiles */}
            {stats.map(([value, label], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bento p-6 hover:-translate-y-1 hover:border-brand/50 hover:shadow-elegant lg:col-span-3"
              >
                <p className="number-plate text-3xl md:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Tech marquee ============ */}
      <div className="border-y border-border bg-secondary/50 py-8">
        <p className="container-page eyebrow mb-6 text-center text-muted-foreground">
          The stack we build and hand over
        </p>
        <Marquee items={tech} />
      </div>

      {/* ============ Intro / pillars bento ============ */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="bento h-full bg-secondary/60 p-8 md:p-10">
              <SectionHeading
                eyebrow="Who we are"
                title="An engineering-led agency, not a marketplace"
                text="Every project is scoped, designed, built and supported in-house — from a five-page site to a production web platform, in weekly increments with clear pricing."
              />
              <div className="mt-8 flex flex-wrap gap-2">
                {["In-house team", "Weekly demos", "Full code ownership", "Post-launch support"].map((t) => (
                  <span key={t} className="rounded-full bg-brand-soft px-4 py-1.5 text-xs font-semibold text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {pillars.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="bento group h-full p-7 hover:-translate-y-1.5 hover:border-brand/50 hover:shadow-elegant">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <c.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>


      {/* ============ Services ============ */}
      <Section className="relative overflow-hidden bg-secondary/50">
        <div className="grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Everything you need to launch and grow"
              text="Eleven service lines, one partner. Combine them into a single roadmap or hire us for a focused engagement."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  to="/services"
                  hash={s.slug}
                  className="card-premium group relative flex h-full flex-col overflow-hidden p-7 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-elegant"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: "var(--gradient-brand)" }}
                    aria-hidden
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="number-plate text-sm font-semibold text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-brand">
                      from {s.from}
                    </span>
                  </div>
                  <h3 className="relative mt-6 text-lg font-semibold">{s.title}</h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                  <span className="relative mt-6 inline-flex items-center text-sm font-medium">
                    Explore
                    <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/services">All 11 services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============ Why Orvix ============ */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Why Orvix" title="Reasons clients stay with us" center />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.06}>
              <div className="group h-full bg-background p-8 transition-colors hover:bg-secondary/60">
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-brand/30 text-brand">
                  <Check className="size-4" />
                </span>
                <h3 className="mt-5 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Process ============ */}
      <Section className="surface-ink relative overflow-hidden">
        <div className="grid-ink pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Process"
              title="A predictable path from brief to launch"
              text="Six stages, weekly checkpoints and a working demo at every step."
              onInk
            />
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={(i % 3) * 0.08}>
                <div className="glass-card group relative h-full overflow-hidden rounded-2xl p-7 transition-colors hover:border-brand/40">
                  <span className="number-plate text-4xl font-semibold text-brand/70 transition-colors group-hover:text-brand">
                    {p.step}
                  </span>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.text}</p>
                  <div className="mt-6 h-px w-full bg-ink-border">
                    <div
                      className="h-px bg-brand transition-all duration-700 group-hover:w-full"
                      style={{ width: `${((i + 1) / process.length) * 100}%` }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ Portfolio ============ */}
      <Section className="bg-secondary/50">
        <Reveal>
          <SectionHeading eyebrow="Portfolio" title="Selected work" text="A snapshot of recent engagements." />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.slice(0, 3).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                to="/portfolio"
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-elegant"
              >
                <div className="surface-ink relative flex h-52 items-end overflow-hidden p-6">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category} project by Orvix`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="absolute inset-0 size-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div
                    className="absolute inset-0 bg-ink/55"
                    aria-hidden
                  />
                  <span className="relative font-display text-xl font-semibold">{p.title}</span>
                </div>

                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="eyebrow text-brand">{p.category}</p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {p.result} · {p.year}
                    </p>
                  </div>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/portfolio">See full portfolio</Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ============ Testimonials ============ */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What clients say" center />
        </Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card-premium flex h-full flex-col p-8 hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="size-6 text-brand/30" />
                </div>
                <blockquote className="mt-5 flex-1 text-base leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5 text-sm">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-soft font-display text-sm font-semibold text-brand">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="font-semibold">{t.name}</span>
                    <span className="block text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ Blog ============ */}
      <Section className="bg-secondary/50">
        <Reveal>
          <SectionHeading eyebrow="Insights" title="Latest articles" />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                to="/blog"
                className="card-premium group flex h-full flex-col p-7 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-elegant"
              >
                <p className="eyebrow text-brand">{p.tag}</p>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <p className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  {p.date}
                  <ArrowUpRight className="size-4 transition-all group-hover:-translate-y-0.5 group-hover:text-brand" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ FAQ ============ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Questions, answered" text="Still unsure? Contact us any time." />
            <Button asChild variant="outline" className="mt-8 rounded-full">
              <Link to="/faq">Read all FAQs</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.slice(0, 4).map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* ============ Newsletter + CTA ============ */}
      <Section className="pb-0">
        <Reveal>
          <div className="surface-ink relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20">
            <div className="grid-ink pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <div
              className="animate-float-slow pointer-events-none absolute -right-24 -top-24 size-96 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--gradient-brand)" }}
              aria-hidden
            />
            <div className="relative grid gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow text-brand">Let’s build</p>
                <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Ready to build something exceptional?</h2>
                <p className="mt-4 max-w-md text-ink-muted">
                  Send us your project brief and get a scoped proposal within two business days.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-brand px-7 text-brand-foreground shadow-glow hover:bg-brand/90"
                  >
                    <Link to="/order">Submit a project</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-ink-border bg-white/5 px-7 text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
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
        </Reveal>
      </Section>
    </SiteShell>
  );
}
