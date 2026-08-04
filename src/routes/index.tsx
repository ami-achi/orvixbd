import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell, Section, SectionHeading, EditorialRow } from "@/components/site/SiteShell";
import {
  Reveal,
  Marquee,
  Stagger,
  StaggerItem,
  WordReveal,
  HeroFade,
  CountUp,
  Parallax,
  Magnetic,
} from "@/components/site/Reveal";
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
  { value: 180, suffix: "+", decimals: 0, label: "PROJECTS_DELIVERED" },
  { value: 9, suffix: "", decimals: 0, label: "COUNTRIES_SERVED" },
  { value: 95, suffix: "+", decimals: 0, label: "AVG_LIGHTHOUSE" },
  { value: 4.9, suffix: "", decimals: 1, label: "CLIENT_RATING" },
] as const;

/** Timeline whose connecting line draws itself as the section scrolls past. */
function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative mt-12 pl-6 md:pl-10">
      <span className="absolute left-0 top-0 h-full w-px bg-border" aria-hidden />
      <motion.span
        className="absolute left-0 top-0 h-full w-px origin-top bg-brand/70"
        style={reduce ? { scaleY: 1 } : { scaleY }}
        aria-hidden
      />
      {process.map((p, i) => (
        <Reveal key={p.step} y={14} delay={i * 0.04}>
          <div className="relative py-7">
            <motion.span
              className="absolute -left-[27px] top-9 size-1.5 rounded-full bg-brand md:-left-[43px]"
              initial={reduce ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="mono-label">STEP_{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-display text-xl font-medium md:text-2xl">{p.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function HeroGlow() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div className="absolute inset-0" {...(reduce ? {} : { style: { y } })}>
        <div className="grid-ink absolute inset-0 opacity-70" />
        <div className="animate-glow-drift absolute -top-40 left-1/4 size-[36rem] rounded-full bg-brand/10 blur-[120px]" />
        <div className="animate-glow-drift absolute -bottom-52 right-0 size-[28rem] rounded-full bg-brand/[0.07] blur-[110px] [animation-delay:-6s]" />
      </motion.div>
    </div>
  );
}

function Home() {
  return (
    <SiteShell>
      {/* ============ Hero ============ */}
      <section className="relative border-b border-border">
        <HeroGlow />
        <div className="container-page relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <HeroFade delay={0.05}>
              <p className="eyebrow flex items-center gap-2.5 text-brand">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                </span>
                Available for Q3 projects
              </p>
            </HeroFade>

            <h1 className="display-tight mt-7 text-[2.5rem] md:text-[4rem]">
              <WordReveal text="We engineer websites" delay={0.18} />
              <br />
              <WordReveal
                text="that are quietly relentless"
                delay={0.42}
                highlight={["quietly", "relentless"]}
              />
            </h1>

            <HeroFade delay={0.85}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                Orvix is a full-service digital agency for websites, web applications, design, branding and SEO —
                briefed directly to one accountable in-house team.
              </p>
            </HeroFade>

            <HeroFade delay={1} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="group btn-shine rounded-lg bg-brand px-6 text-brand-foreground hover:bg-brand/90"
                >
                  <Link to="/order">
                    Start a project
                    <ArrowRight className="ml-1 size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-shine rounded-lg border-border bg-transparent px-6 hover:bg-white/[0.03]"
                >
                  <Link to="/portfolio">View our work</Link>
                </Button>
              </Magnetic>
            </HeroFade>
          </div>

          <HeroFade delay={0.5}>
            <Parallax distance={54} className="animate-float-slow">
              <BuildTerminal />
            </Parallax>
          </HeroFade>
        </div>
      </section>

      {/* ============ Stats bar ============ */}
      <div className="border-b border-border">
        <Stagger className="container-page grid grid-cols-2 lg:grid-cols-4" stagger={0.09}>
          {stats.map((s, i) => (
            <StaggerItem
              key={s.label}
              className={[
                "px-2 py-9 sm:px-6",
                i % 2 === 1 ? "border-l border-border" : "",
                i >= 2 ? "border-t border-border lg:border-t-0" : "",
                i === 2 ? "lg:border-l lg:border-border" : "",
              ].join(" ")}
            >
              <p className="number-plate text-4xl md:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mono-label mt-3">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* ============ Tech marquee ============ */}
      <div className="border-b border-border py-7">
        <p className="mono-label container-page mb-5">The_stack_we_build_and_hand_over</p>
        <Marquee items={tech} speed={38} />
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
        <Stagger className="mt-12 border-b border-border" stagger={0.05}>
          {services.map((s, i) => (
            <StaggerItem key={s.slug} y={16}>
              <Link to="/services" hash={s.slug} className="group block">
                <motion.div
                  whileHover={{ scale: 1.006 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-lg transition-shadow duration-300 group-hover:shadow-[0_18px_50px_-30px_rgba(74,222,128,0.45)] group-hover:ring-1 group-hover:ring-brand/25"
                >
                  <EditorialRow
                    index={String(i + 1).padStart(2, "0")}
                    title={<span className="transition-colors duration-150 group-hover:text-brand">{s.title}</span>}
                    description={s.summary}
                    meta={
                      <>
                        <span className="font-mono text-xs text-brand opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                          from {s.from}
                        </span>
                        <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                      </>
                    }
                  />
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10">
          <Magnetic>
            <Button
              asChild
              variant="outline"
              className="btn-shine rounded-lg border-border bg-transparent hover:bg-white/[0.03]"
            >
              <Link to="/services">All services in detail</Link>
            </Button>
          </Magnetic>
        </div>
      </Section>

      {/* ============ Why Orvix ============ */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading eyebrow="Why Orvix" title="Reasons clients stay with us" />
        </Reveal>
        <Stagger className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {reasons.map((r, i) => (
            <StaggerItem key={r.title}>
              <div className="border-t border-border pt-6">
                <p className="mono-label">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-xl font-medium">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
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
        <ProcessTimeline />
      </Section>

      {/* ============ Portfolio ============ */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading eyebrow="Selected work" title="Work that earns its place in production" />
        </Reveal>
        <Stagger className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {portfolio.slice(0, 3).map((p) => (
            <StaggerItem key={p.title}>
              <Link to="/portfolio" className="group block">
                <div className="relative overflow-hidden rounded-xl border border-border">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category} project by Orvix`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-display text-lg font-medium">{p.title}</p>
                    <p className="mono-label mt-1 text-brand">{p.result}</p>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-xl font-medium transition-colors duration-150 group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mono-label mt-2">
                  {p.category} · {p.result} · {p.year}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-12">
          <Magnetic>
            <Button
              asChild
              variant="outline"
              className="btn-shine rounded-lg border-border bg-transparent hover:bg-white/[0.03]"
            >
              <Link to="/portfolio">See full portfolio</Link>
            </Button>
          </Magnetic>
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
        <Stagger className="mt-12 border-b border-border" stagger={0.06}>
          {posts.map((p) => (
            <StaggerItem key={p.slug} y={16}>
              <Link to="/blog" className="group block">
                <EditorialRow
                  index={p.tag.toUpperCase()}
                  title={<span className="transition-colors duration-150 group-hover:text-brand">{p.title}</span>}
                  description={p.excerpt}
                  meta={<span className="font-mono text-xs text-muted-foreground">{p.date}</span>}
                  className="sm:grid-cols-[7rem_1fr_auto]"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============ FAQ ============ */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Questions, answered" text="Still unsure? Contact us any time." />
            <Magnetic className="mt-8">
              <Button
                asChild
                variant="outline"
                className="btn-shine rounded-lg border-border bg-transparent hover:bg-white/[0.03]"
              >
                <Link to="/faq">Read all FAQs</Link>
              </Button>
            </Magnetic>
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
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="btn-shine rounded-lg bg-brand px-6 text-brand-foreground hover:bg-brand/90"
                >
                  <Link to="/order">Submit a project</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-shine rounded-lg border-border bg-transparent px-6 hover:bg-white/[0.03]"
                >
                  <Link to="/contact">Talk to us</Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="opacity-60">
            <Parallax distance={40}>
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
            </Parallax>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
