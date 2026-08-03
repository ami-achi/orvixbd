import { Link } from "@tanstack/react-router";
import { Mail, Phone, Globe, Linkedin, Github, Twitter, Facebook } from "lucide-react";
import { company, services } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="font-display text-xl font-semibold tracking-tight">
              Orvix<span className="text-brand">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A digital agency engineering websites, applications and brands for companies worldwide. Founded by{" "}
              {company.founder} in {company.country}.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Github, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href={company.website}
                  aria-label="Orvix social profile"
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand"
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
            <h3 className="mono-label">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Globe className="size-4 shrink-0 text-brand" />
                <a href={company.website} className="transition-colors duration-150 hover:text-brand">
                  orvix.pro.bd
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand" />
                <a href={`mailto:${company.email}`} className="break-all transition-colors duration-150 hover:text-brand">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand" />
                <a
                  href={`mailto:${company.founderEmail}`}
                  className="break-all transition-colors duration-150 hover:text-brand"
                >
                  {company.founderEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand" />
                <a href={`tel:${company.phone}`} className="transition-colors duration-150 hover:text-brand">
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ORVIX — ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors duration-150 hover:text-brand">
              PRIVACY
            </Link>
            <Link to="/terms" className="transition-colors duration-150 hover:text-brand">
              TERMS
            </Link>
            <Link to="/contact" className="transition-colors duration-150 hover:text-brand">
              CONTACT
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
      <h3 className="mono-label">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="transition-colors duration-150 hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
