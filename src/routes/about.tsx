import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { SiteShell, Section, SectionHeading, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { company, team, timeline, reasons } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Orvix — Our Story, Mission & Team" },
      {
        name: "description",
        content:
          "Orvix is a digital agency founded by Robiul Islam Riyan in Bangladesh. Meet the team, mission and values behind our work.",
      },
      { property: "og:title", content: "About Orvix — Our Story, Mission & Team" },
      {
        property: "og:description",
        content: "The story, mission, values and people behind Orvix.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Orvix"
        title="Built to give companies a serious digital partner"
        text="We started as a two-person studio and grew into a full agency by doing one thing consistently: shipping work that holds up under real traffic and real scrutiny."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyebrow="Our story" title="From a small studio to a global delivery team" />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Orvix was founded in {company.country} by {company.founder} after years of watching businesses pay for
              websites that looked fine and performed badly. The idea was simple: combine design craft with real
              engineering discipline, and stay accountable from brief to launch.
            </p>
            <p>
              Today we deliver websites, web applications, e-commerce stores, brand systems and SEO programs for clients
              across Asia, Europe and North America. Every engagement is handled directly by our team — Orvix is not a
              marketplace, and we never resell your project to third parties.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/60">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Target, title: "Mission", text: "Give every client an engineering partner that treats their product like our own." },
            { icon: Eye, title: "Vision", text: "Become the most trusted digital agency coming out of Bangladesh." },
            { icon: Heart, title: "Core values", text: "Craft, clarity, ownership, honesty and long-term relationships." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
              <c.icon className="size-6 text-brand" />
              <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="surface-ink flex aspect-square items-end rounded-3xl p-10">
            <div>
              <p className="font-display text-6xl font-semibold text-brand">RR</p>
              <p className="mt-4 text-lg font-semibold">{company.founder}</p>
              <p className="text-sm text-ink-muted">Founder & CEO</p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Founder & CEO"
              title={company.founder}
              text="Robiul leads strategy and engineering at Orvix. He works directly with clients during discovery and reviews every project before it ships."
            />
            <p className="mt-6 text-sm text-muted-foreground">
              Reach the founder directly:{" "}
              <a className="font-medium text-foreground underline" href={`mailto:${company.founderEmail}`}>
                {company.founderEmail}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/60">
        <SectionHeading eyebrow="Leadership & team" title="The people doing the work" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-card p-7 text-center">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary font-display text-lg font-semibold text-primary-foreground">
                {m.initials}
              </span>
              <h3 className="mt-5 font-semibold">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Timeline" title="How we got here" />
        <ol className="mt-14 space-y-0 border-l border-border pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.3rem] top-1 flex size-4 items-center justify-center rounded-full bg-brand" />
              <p className="eyebrow text-brand">{t.year}</p>
              <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-secondary/60">
        <SectionHeading eyebrow="Working with us" title="What you can expect" center />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/order">
              Start a project <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  );
}
