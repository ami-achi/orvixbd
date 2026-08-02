import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  getFounderPage,
  getMyEditorAccess,
  updateFounderPage,
  type EducationRow,
  type FounderInput,
  type InfoboxRow,
} from "@/lib/founder.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/founder-edit")({
  head: () => ({
    meta: [
      { title: "Edit founder page — Orvix" },
      { name: "description", content: "Admin editor for the Orvix founder biography page." },
      { property: "og:title", content: "Edit founder page — Orvix" },
      { property: "og:description", content: "Admin editor for the Orvix founder biography page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FounderEditPage,
});

const empty: FounderInput = {
  name: "",
  title: "",
  tagline: "",
  photo_url: "",
  summary: "",
  biography: "",
  infobox: [],
  education: [],
  skills: [],
};

function FounderEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchAccess = useServerFn(getMyEditorAccess);
  const save = useServerFn(updateFounderPage);

  const access = useQuery({ queryKey: ["editor-access"], queryFn: () => fetchAccess() });
  const page = useQuery({ queryKey: ["founder-page"], queryFn: () => getFounderPage() });

  const [form, setForm] = useState<FounderInput | null>(null);
  const [saving, setSaving] = useState(false);

  const value = form ?? (page.data ? { ...empty, ...page.data } : null);

  const patch = (next: Partial<FounderInput>) => {
    if (!value) return;
    setForm({ ...value, ...next });
  };

  if (access.isLoading || page.isLoading) {
    return <div className="container-page py-24 text-muted-foreground">Loading editor…</div>;
  }

  if (access.isError || !access.data?.isAdmin) {
    return (
      <div className="container-page py-24">
        <h1 className="font-display text-3xl font-semibold">Admin access required</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Your account is signed in but does not have the admin role, so it cannot edit the founder page. Ask an
          existing admin to grant you access.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/founder">Back to founder page</Link>
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  if (!value) {
    return <div className="container-page py-24 text-muted-foreground">No founder page found.</div>;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await save({ data: value });
      await queryClient.invalidateQueries({ queryKey: ["founder-page"] });
      toast.success("Founder page updated");
      navigate({ to: "/founder" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-page max-w-4xl py-12">
      <Link
        to="/founder"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to page
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold">Edit founder page</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Use <code className="rounded bg-secondary px-1.5 py-0.5">== Section title ==</code> lines in the biography to
        create wiki-style sections.
      </p>

      <form onSubmit={submit} className="mt-10 space-y-10">
        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Header</h2>
          <Field label="Name" value={value.name} onChange={(v) => patch({ name: v })} />
          <Field label="Title / role" value={value.title} onChange={(v) => patch({ title: v })} />
          <Field label="Tagline" value={value.tagline} onChange={(v) => patch({ tagline: v })} />
          <Field label="Photo URL" value={value.photo_url} onChange={(v) => patch({ photo_url: v })} />
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Content</h2>
          <div className="space-y-2">
            <Label htmlFor="summary">Intro summary</Label>
            <Textarea
              id="summary"
              rows={4}
              value={value.summary}
              onChange={(e) => patch({ summary: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biography">Biography</Label>
            <Textarea
              id="biography"
              rows={16}
              className="font-mono text-sm"
              value={value.biography}
              onChange={(e) => patch({ biography: e.target.value })}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Infobox rows</h2>
            <AddButton onClick={() => patch({ infobox: [...value.infobox, { label: "", value: "" }] })} />
          </div>
          {value.infobox.map((row, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3">
              <div className="w-40 space-y-2">
                <Label>Label</Label>
                <Input value={row.label} onChange={(e) => patch({ infobox: replace(value.infobox, i, { ...row, label: e.target.value }) })} />
              </div>
              <div className="min-w-52 flex-1 space-y-2">
                <Label>Value</Label>
                <Input value={row.value} onChange={(e) => patch({ infobox: replace(value.infobox, i, { ...row, value: e.target.value }) })} />
              </div>
              <RemoveButton onClick={() => patch({ infobox: remove(value.infobox, i) })} />
            </div>
          ))}
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Education</h2>
            <AddButton
              onClick={() => patch({ education: [...value.education, { institution: "", detail: "", year: "" }] })}
            />
          </div>
          {value.education.map((row, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3">
              <div className="w-24 space-y-2">
                <Label>Year</Label>
                <Input value={row.year} onChange={(e) => patch({ education: replace(value.education, i, { ...row, year: e.target.value }) })} />
              </div>
              <div className="min-w-48 flex-1 space-y-2">
                <Label>Institution</Label>
                <Input value={row.institution} onChange={(e) => patch({ education: replace(value.education, i, { ...row, institution: e.target.value }) })} />
              </div>
              <div className="min-w-48 flex-1 space-y-2">
                <Label>Detail</Label>
                <Input value={row.detail} onChange={(e) => patch({ education: replace(value.education, i, { ...row, detail: e.target.value }) })} />
              </div>
              <RemoveButton onClick={() => patch({ education: remove(value.education, i) })} />
            </div>
          ))}
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Skills</h2>
          <div className="space-y-2">
            <Label htmlFor="skills">One per line</Label>
            <Textarea
              id="skills"
              rows={8}
              value={value.skills.join("\n")}
              onChange={(e) =>
                patch({ skills: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
              }
            />
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" className="rounded-full px-6" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={() => setForm(null)}>
            Reset
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Sign out
          </Button>
        </div>
      </form>
    </div>
  );
}

function replace<T>(list: T[], index: number, item: T): T[] {
  return list.map((existing, i) => (i === index ? item : existing));
}

function remove<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" size="sm" variant="outline" className="rounded-full" onClick={onClick}>
      <Plus className="size-4" /> Add
    </Button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" size="icon" variant="ghost" onClick={onClick} aria-label="Remove row">
      <Trash2 className="size-4" />
    </Button>
  );
}

export type { InfoboxRow, EducationRow };
