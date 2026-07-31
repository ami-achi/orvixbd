import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/site/SiteShell";
import { company } from "@/lib/content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Orvix" },
      {
        name: "description",
        content: "How Orvix collects, uses, stores and protects personal information submitted through orvix.pro.bd.",
      },
      { property: "og:title", content: "Privacy Policy | Orvix" },
      { property: "og:description", content: "Orvix privacy practices for data collected via our website and forms." },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    h: "Information we collect",
    p: "We collect the details you submit through our contact and order forms: name, email, phone, company, country, service interest, budget, deadline, project description and any files you attach. We also collect anonymous usage analytics.",
  },
  {
    h: "How we use your information",
    p: "Your information is used only to respond to your enquiry, prepare proposals, deliver contracted work and send service updates. We do not sell or rent personal data to third parties.",
  },
  {
    h: "Legal basis",
    p: "We process data on the basis of your consent when you submit a form, and on the basis of contract performance when we deliver a project.",
  },
  {
    h: "Data retention",
    p: "Enquiry data is retained for up to 24 months. Project records are retained for the duration of the engagement plus any period required by law or accounting rules.",
  },
  {
    h: "Cookies and analytics",
    p: "We use essential cookies for site functionality and privacy-friendly analytics to understand aggregate traffic. You can block cookies in your browser without losing core functionality.",
  },
  {
    h: "Third-party processors",
    p: "We use reputable providers for hosting, email delivery and analytics. Each processor is bound to handle data only on our instructions.",
  },
  {
    h: "Security",
    p: "Data is transmitted over HTTPS and stored with access limited to team members who need it. We review access and dependencies regularly.",
  },
  {
    h: "Your rights",
    p: "You may request access, correction, export or deletion of your personal data, or withdraw consent, at any time by emailing us.",
  },
  { h: "Children", p: "Our services are intended for businesses and are not directed at children under 16." },
  { h: "Changes", p: "We may update this policy. Material changes will be announced on this page with a new date." },
];

function Privacy() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        text="Last updated 1 January 2026. This policy explains how Orvix handles your information."
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
              Privacy questions: <a className="underline" href={`mailto:${company.email}`}>{company.email}</a> · Phone{" "}
              {company.phone} · {company.country}.
            </p>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
