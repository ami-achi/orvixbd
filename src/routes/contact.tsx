import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Mail, Phone, Globe, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SiteShell, Section, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { company } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Orvix — Talk to Our Team" },
      {
        name: "description",
        content:
          "Contact Orvix by email at info.orvix.official@gmail.com or phone +8801743872072, or send a message through our contact form.",
      },
      { property: "og:title", content: "Contact Orvix — Talk to Our Team" },
      { property: "og:description", content: "Email, phone and contact form for the Orvix team in Bangladesh." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Add a subject"),
  message: z.string().min(10, "Tell us a little more"),
});
type FormValues = z.infer<typeof schema>;

function Contact() {
  const [sent, setSent] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (values: FormValues) => {
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(values.subject)}&body=${body}`;
    setSent(true);
    form.reset();
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        text="Email, call, or send us a message. We reply to every enquiry within one business day."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="space-y-4">
            {[
              { icon: Globe, label: "Website", value: "orvix.pro.bd", href: company.website },
              { icon: Mail, label: "Official email", value: company.email, href: `mailto:${company.email}` },
              {
                icon: Mail,
                label: "Founder email",
                value: company.founderEmail,
                href: `mailto:${company.founderEmail}`,
              },
              { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone}` },
              { icon: MapPin, label: "Location", value: company.country, href: company.website },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-elegant"
              >
                <c.icon className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="mt-1 block break-all text-sm font-medium">{c.value}</span>
                </span>
              </a>
            ))}
            <div className="flex h-56 items-center justify-center rounded-2xl border border-border bg-secondary text-sm text-muted-foreground">
              Google Maps embed placeholder — {company.country}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
            {sent ? (
              <div className="flex flex-col items-center py-16 text-center">
                <CheckCircle2 className="size-10 text-brand" />
                <h2 className="mt-5 text-xl font-semibold">Message ready to send</h2>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Your email client has been opened with your message. You can also write to us directly at{" "}
                  {company.email}.
                </p>
                <Button className="mt-7 rounded-full" variant="outline" onClick={() => setSent(false)}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <h2 className="text-xl font-semibold">Send a message</h2>
                <Field label="Full name" error={form.formState.errors.name?.message}>
                  <Input {...form.register("name")} placeholder="Your name" />
                </Field>
                <Field label="Email" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="you@company.com" />
                </Field>
                <Field label="Subject" error={form.formState.errors.subject?.message}>
                  <Input {...form.register("subject")} placeholder="How can we help?" />
                </Field>
                <Field label="Message" error={form.formState.errors.message?.message}>
                  <Textarea rows={6} {...form.register("message")} placeholder="Tell us about your project" />
                </Field>
                <Button type="submit" size="lg" className="w-full rounded-full">
                  <Send className="mr-1 size-4" /> Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
