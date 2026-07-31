import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Web Performance, Design & SEO Notes | Orvix" },
      {
        name: "description",
        content:
          "Practical articles from the Orvix team on web performance, design systems, technical SEO and building products that scale.",
      },
      { property: "og:title", content: "Blog — Web Performance, Design & SEO Notes | Orvix" },
      { property: "og:description", content: "Articles from the Orvix team on performance, design and SEO." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Insights"
        title="Notes from the build"
        text="What we learn shipping websites and applications — written for the people who have to maintain them."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="flex flex-col rounded-3xl border border-border bg-card p-8">
              <p className="eyebrow text-brand">{p.tag}</p>
              <h2 className="mt-4 text-xl font-semibold leading-snug">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <p className="mt-6 text-xs text-muted-foreground">{p.date}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/60">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold">Want this level of detail on your project?</h2>
          <p className="mt-4 text-muted-foreground">Tell us what you are building and we will send a scoped plan.</p>
          <Button asChild size="lg" className="mt-8 rounded-full px-7">
            <Link to="/order">Start a project</Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  );
}
