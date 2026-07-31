import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/site/SiteShell";
import { company } from "@/lib/content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Orvix" },
      {
        name: "description",
        content: "The terms that govern projects, payments, revisions, ownership and support when you work with Orvix.",
      },
      { property: "og:title", content: "Terms of Service | Orvix" },
      { property: "og:description", content: "Project, payment, ownership and support terms for Orvix engagements." },
    ],
  }),
  component: Terms,
});

const sections = [
  {
    h: "Services",
    p: "Orvix provides design, development, branding, SEO and maintenance services directly to clients. Orvix is an agency, not a marketplace: there are no third-party sellers, bidding or vendor accounts.",
  },
  {
    h: "Orders and scope",
    p: "A project begins when scope, timeline and price are confirmed in writing. Work outside the agreed scope is quoted separately before it starts.",
  },
  {
    h: "Payments",
    p: "Projects require a 40% deposit before work begins, with the balance due on delivery. Retainers are billed monthly in advance. Invoices are payable within 7 days.",
  },
  {
    h: "Revisions",
    p: "Each package includes a defined number of revision rounds. Additional rounds are billed at our standard rate.",
  },
  {
    h: "Client responsibilities",
    p: "You agree to provide content, access and timely feedback. Delays in materials may shift the delivery timeline.",
  },
  {
    h: "Intellectual property",
    p: "On full payment, all deliverables, source code and design files transfer to you. Orvix retains the right to display non-confidential work in its portfolio unless agreed otherwise.",
  },
  {
    h: "Confidentiality",
    p: "Both parties keep commercial and technical information confidential. NDAs are available on request.",
  },
  {
    h: "Warranty and support",
    p: "We fix defects reported within 30 days of delivery at no cost. Ongoing changes and hosting issues fall under a maintenance plan.",
  },
  {
    h: "Limitation of liability",
    p: "Our total liability for any claim is limited to the fees paid for the affected engagement. We are not liable for indirect or consequential losses.",
  },
  {
    h: "Cancellation",
    p: "Either party may cancel with written notice. Work completed up to the cancellation date is billable and deposits are non-refundable.",
  },
  { h: "Governing law", p: "These terms are governed by the laws of Bangladesh." },
];

function Terms() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        text="Last updated 1 January 2026. These terms apply to all Orvix engagements."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <div key={s.h}>
              <h2 className="text-xl font-semibold">
                {i + 1}. {s.h}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          ))}
          <div>
            <h2 className="text-xl font-semibold">{sections.length + 1}. Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Questions about these terms:{" "}
              <a className="underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>{" "}
              · {company.phone}
            </p>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
