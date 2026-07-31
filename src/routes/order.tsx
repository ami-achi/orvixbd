import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Paperclip } from "lucide-react";
import { SiteShell, Section, PageHero } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { services, company } from "@/lib/content";
import { orderSchema, submitOrder, type OrderInput } from "@/lib/orders.functions";

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order a Project — Orvix Project Brief Form" },
      {
        name: "description",
        content:
          "Submit your project brief to Orvix: choose a service, share your budget, deadline and requirements. Orders go straight to our team.",
      },
      { property: "og:title", content: "Order a Project — Orvix Project Brief Form" },
      { property: "og:description", content: "Send Orvix your project brief and get a scoped proposal in two days." },
    ],
  }),
  component: Order,
});

const budgets = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000 – $15,000", "$15,000+"];

function Order() {
  const { service } = Route.useSearch();
  const [reference, setReference] = useState<string | null>(null);
  const send = useServerFn(submitOrder);

  const form = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      service: service ?? services[0]!.title,
      budget: budgets[1]!,
      deadline: "",
      description: "",
      fileName: "",
      notes: "",
    },
  });

  const onSubmit = async (values: OrderInput) => {
    const res = await send({ data: values });
    if (res.ok) {
      setReference(res.reference);
      form.reset();
    }
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Order"
        title="Submit your project brief"
        text={`Fill in the form and our team reviews it the same day. Orders are handled directly by Orvix and sent to ${company.email}.`}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          {reference ? (
            <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-elegant">
              <CheckCircle2 className="mx-auto size-12 text-brand" />
              <h2 className="mt-6 text-2xl font-semibold">Project received</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Your reference is <span className="font-semibold text-foreground">{reference}</span>. We will reply
                within one business day with questions or a scoped proposal.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setReference(null)}>
                  Submit another project
                </Button>
                <Button asChild className="rounded-full">
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-10"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name *" error={form.formState.errors.name?.message}>
                  <Input {...form.register("name")} placeholder="Your name" />
                </Field>
                <Field label="Email *" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="you@company.com" />
                </Field>
                <Field label="Phone *" error={form.formState.errors.phone?.message}>
                  <Input {...form.register("phone")} placeholder="+880 ..." />
                </Field>
                <Field label="Company" error={form.formState.errors.company?.message}>
                  <Input {...form.register("company")} placeholder="Company name" />
                </Field>
                <Field label="Country *" error={form.formState.errors.country?.message}>
                  <Input {...form.register("country")} placeholder="Bangladesh" />
                </Field>
                <Field label="Service *" error={form.formState.errors.service?.message}>
                  <select
                    {...form.register("service")}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Budget *" error={form.formState.errors.budget?.message}>
                  <select
                    {...form.register("budget")}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Deadline *" error={form.formState.errors.deadline?.message}>
                  <Input type="date" {...form.register("deadline")} />
                </Field>
              </div>

              <Field label="Project description *" error={form.formState.errors.description?.message}>
                <Textarea
                  rows={7}
                  {...form.register("description")}
                  placeholder="Goals, pages or features required, references you like, and anything else we should know."
                />
              </Field>

              <div className="space-y-2">
                <Label>Attachment (optional)</Label>
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-input px-4 py-6 text-sm text-muted-foreground">
                  <Paperclip className="size-4" />
                  <span>{form.watch("fileName") || "Attach a brief, spec or design file"}</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => form.setValue("fileName", e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>

              <Field label="Additional notes" error={form.formState.errors.notes?.message}>
                <Textarea rows={3} {...form.register("notes")} placeholder="Anything else?" />
              </Field>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                Submit project
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By submitting you agree to our{" "}
                <Link to="/terms" className="underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}
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
