import { Link } from "@tanstack/react-router";
import { Mail, Phone, Globe, Linkedin, Github, Twitter, Facebook } from "lucide-react";
import { company, services } from "@/lib/content";
import logoAsset from "@/assets/orvix-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="surface-ink mt-32">
      <div className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logoAsset.url} alt="Orvix logo" className="size-9 rounded-xl object-cover" />
              <span className="font-display text-lg font-semibold">Orvix</span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              A digital agency engineering websites, applications and brands for companies worldwide. Founded by{" "}
              {company.founder} in {company.country}.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Github, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href={company.website}
                  aria-label="Orvix social profile"
                  className="glass-card flex size-9 items-center justify-center rounded-xl text-ink-foreground transition-colors hover:bg-brand"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Company"
            links={[
              { to: "/about", label: "About" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/pricing", label: "Pricing" },
              { to: "/blog", label: "Blog" },
              { to: "/faq", label: "Support" },
            ]}
          />
          <FooterCol
            title="Services"
            links={services.slice(0, 6).map((s) => ({ to: "/services", label: s.title }))}
          />

          <div>
            <h3 className="eyebrow text-ink-muted">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2.5">
                <Globe className="size-4 shrink-0 text-brand" />
                <a href={company.website} className="hover:text-ink-foreground">
                  orvix.pro.bd
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand" />
                <a href={`mailto:${company.email}`} className="break-all hover:text-ink-foreground">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand" />
                <a href={`mailto:${company.founderEmail}`} className="break-all hover:text-ink-foreground">
                  {company.founderEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand" />
                <a href={`tel:${company.phone}`} className="hover:text-ink-foreground">
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-border pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 Orvix. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-ink-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-ink-foreground">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-ink-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow text-ink-muted">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-ink-muted">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-ink-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
