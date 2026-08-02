import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PencilLine, ExternalLink } from "lucide-react";

import { getFounderPage, type FounderPage } from "@/lib/founder.functions";

const founderQuery = queryOptions({
  queryKey: ["founder-page"],
  queryFn: () => getFounderPage(),
});

export const Route = createFileRoute("/founder")({
  loader: ({ context }) => context.queryClient.ensureQueryData(founderQuery),
  head: () => ({
    meta: [
      { title: "Robiul Islam Riyan — Founder & CEO of Orvix" },
      {
        name: "description",
        content:
          "Biography of Robiul Islam Riyan, Bangladeshi entrepreneur, software engineer and founder of the digital agency Orvix.",
      },
      { property: "og:title", content: "Robiul Islam Riyan — Founder & CEO of Orvix" },
      {
        property: "og:description",
        content: "Biography, education and skills of Orvix founder Robiul Islam Riyan.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <FounderFallback message="This page could not be loaded right now." />,
  notFoundComponent: () => <FounderFallback message="Founder page not found." />,
  component: FounderRoute,
});

function FounderFallback({ message }: { message: string }) {
  return (
    <div className="container-page py-24">
      <h1 className="text-3xl font-semibold">Unavailable</h1>
      <p className="mt-3 text-muted-foreground">{message}</p>
    </div>
  );
}

function FounderRoute() {
  const { data } = useSuspenseQuery(founderQuery);
  if (!data) return <FounderFallback message="Founder page not found." />;
  return <FounderArticle page={data} />;
}

type Block = { heading: string | null; paragraphs: string[] };

function parseBiography(body: string): Block[] {
  const blocks: Block[] = [];
  let current: Block = { heading: null, paragraphs: [] };

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    const match = /^==\s*(.+?)\s*==$/.exec(line);
    if (match) {
      if (current.heading || current.paragraphs.length) blocks.push(current);
      current = { heading: match[1] ?? "", paragraphs: [] };
    } else if (line) {
      current.paragraphs.push(line);
    }
  }
  if (current.heading || current.paragraphs.length) blocks.push(current);
  return blocks;
}

function FounderArticle({ page }: { page: FounderPage }) {
  const blocks = parseBiography(page.biography);
  const initials = page.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="bg-background">
      <div className="border-b border-border bg-secondary/40">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3 text-xs text-muted-foreground">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">
              Orvix
            </Link>
            <span aria-hidden>/</span>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">Founder</span>
          </nav>
          <Link
            to="/founder-edit"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <PencilLine className="size-3.5" />
            Edit this page
          </Link>
        </div>
      </div>

      <div className="container-page py-12 md:py-16">
        <header className="border-b border-border pb-6">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{page.name}</h1>
          <p className="mt-3 text-base text-muted-foreground">{page.title}</p>
          {page.tagline && <p className="mt-2 max-w-3xl text-sm italic text-muted-foreground">{page.tagline}</p>}
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="order-2 max-w-3xl lg:order-1">
            {page.summary && <p className="text-lg leading-relaxed">{page.summary}</p>}

            {blocks.map((block, i) => (
              <section key={`${block.heading ?? "intro"}-${i}`} className="mt-10">
                {block.heading && (
                  <h2 className="border-b border-border pb-2 font-display text-2xl font-semibold">{block.heading}</h2>
                )}
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="mt-4 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {page.education.length > 0 && (
              <section className="mt-10">
                <h2 className="border-b border-border pb-2 font-display text-2xl font-semibold">Education</h2>
                <ul className="mt-4 space-y-4">
                  {page.education.map((row, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="w-16 shrink-0 text-sm font-medium text-brand">{row.year}</span>
                      <span>
                        <span className="block font-medium">{row.institution}</span>
                        <span className="block text-sm text-muted-foreground">{row.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {page.skills.length > 0 && (
              <section className="mt-10">
                <h2 className="border-b border-border pb-2 font-display text-2xl font-semibold">Skills</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {page.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="mt-12 border-t border-border pt-4 text-xs text-muted-foreground">
              Last edited on {new Date(page.updated_at).toLocaleDateString()}
            </p>
          </div>

          <aside className="order-1 lg:order-2">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-secondary">
                {page.photo_url ? (
                  <img
                    src={page.photo_url}
                    alt={`Portrait of ${page.name}`}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-display text-4xl font-semibold text-muted-foreground">{initials}</span>
                )}
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold">{page.name}</h2>
              <dl className="mt-3 divide-y divide-border text-sm">
                {page.infobox.map((row, i) => (
                  <div key={i} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 py-2.5">
                    <dt className="font-medium text-foreground">{row.label}</dt>
                    <dd className="break-words text-muted-foreground">
                      {/^https?:\/\//.test(row.value) ? (
                        <a
                          href={row.value}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-brand hover:underline"
                        >
                          {row.value.replace(/^https?:\/\//, "")}
                          <ExternalLink className="size-3" />
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
