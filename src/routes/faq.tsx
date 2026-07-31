import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — How Working With Orvix Works" },
      {
        name: "description",
        content:
          "Answers about Orvix timelines, pricing, ownership, payments and post-launch support. Orvix is an agency — you order directly from our team.",
      },
      { property: "og:title", content: "FAQ — How Working With Orvix Works" },
      { property: "og:description", content: "Timelines, pricing, ownership, payments and support answered." },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="FAQ"
        title="Everything you need to know"
        text="If your question is not covered here, our team replies to every enquiry within one business day."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-14 rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="text-xl font-semibold">Still have questions?</h2>
            <p className="mt-3 text-sm text-muted-foreground">Talk to the team directly.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full px-6">
                <Link to="/contact">Contact us</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link to="/order">Submit a project</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
