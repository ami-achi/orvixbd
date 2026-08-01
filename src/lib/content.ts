import workNorthwind from "@/assets/work-northwind.jpg";
import workAurora from "@/assets/work-aurora.jpg";
import workMeridian from "@/assets/work-meridian.jpg";
import workFieldwork from "@/assets/work-fieldwork.jpg";
import workLumen from "@/assets/work-lumen.jpg";
import workCadence from "@/assets/work-cadence.jpg";

export const company = {
  name: "Orvix",
  tagline: "Digital products engineered for growth",
  website: "https://orvix.pro.bd",
  email: "info.orvix.official@gmail.com",
  founderEmail: "founder.orvix@gmail.com",
  phone: "+8801743872072",
  country: "Bangladesh",
  founder: "Robiul Islam Riyan",
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  features: string[];
  benefits: string[];
  from: string;
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    summary: "Fast, accessible marketing sites built on modern frameworks.",
    overview:
      "We design and build high-performance websites that load instantly, rank well and convert visitors into customers.",
    features: ["Custom design system", "CMS integration", "Core Web Vitals tuning", "Analytics setup"],
    benefits: ["Higher conversion rates", "Lower bounce rate", "Easy content updates"],
    from: "$499",
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    summary: "Dashboards, portals and SaaS platforms with reliable architecture.",
    overview:
      "From authentication to billing, we engineer scalable web applications with clean architecture and typed code.",
    features: ["Role based access", "REST & realtime APIs", "Database design", "Automated testing"],
    benefits: ["Scales with your users", "Secure by default", "Maintainable codebase"],
    from: "$1,900",
  },
  {
    slug: "ui-ux-design",
    title: "UI UX Design",
    summary: "Research-led interface design that feels effortless.",
    overview:
      "User flows, wireframes, prototypes and polished interfaces delivered as a reusable design system.",
    features: ["User research", "Wireframes & prototypes", "Design system", "Usability testing"],
    benefits: ["Clearer user journeys", "Faster development", "Consistent brand"],
    from: "$399",
  },
  {
    slug: "wordpress",
    title: "WordPress",
    summary: "Custom themes, plugins and migrations without the bloat.",
    overview: "Lightweight WordPress builds with hardened security and editor-friendly content blocks.",
    features: ["Custom theme", "Elementor / Gutenberg", "Speed optimisation", "Security hardening"],
    benefits: ["Full content control", "Low maintenance cost", "SEO ready"],
    from: "$299",
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    summary: "Storefronts engineered to sell, from checkout to fulfilment.",
    overview: "Conversion-focused stores with payment gateways, inventory sync and analytics.",
    features: ["Payment gateways", "Inventory management", "Abandoned cart flows", "Multi-currency"],
    benefits: ["More completed checkouts", "Operational efficiency", "Reliable scaling"],
    from: "$899",
  },
  {
    slug: "seo",
    title: "SEO",
    summary: "Technical and content SEO that compounds over time.",
    overview: "Audits, on-page fixes, schema and content strategy mapped to real search demand.",
    features: ["Technical audit", "Keyword strategy", "Schema markup", "Monthly reporting"],
    benefits: ["Sustainable traffic", "Better rankings", "Qualified leads"],
    from: "$249/mo",
  },
  {
    slug: "branding",
    title: "Branding",
    summary: "Positioning, voice and visual identity systems.",
    overview: "We define how your company looks, sounds and is remembered across every touchpoint.",
    features: ["Brand strategy", "Visual identity", "Guidelines", "Collateral"],
    benefits: ["Instant recognition", "Premium perception", "Consistent marketing"],
    from: "$599",
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    summary: "Distinctive marks delivered in every format you need.",
    overview: "Concept exploration, refinement and a complete delivery pack of vector assets.",
    features: ["3 concepts", "Unlimited refinements", "Vector files", "Usage guide"],
    benefits: ["Memorable identity", "Print & digital ready", "Full ownership"],
    from: "$149",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    summary: "Campaign, social and print design on a reliable cadence.",
    overview: "Ongoing creative support for launches, ads and social channels.",
    features: ["Social kits", "Ad creatives", "Print ready files", "Fast turnaround"],
    benefits: ["Always-on creative", "On-brand output", "Predictable cost"],
    from: "$199",
  },
  {
    slug: "software-development",
    title: "Software Development",
    summary: "Custom internal tools and automation built around your process.",
    overview: "We map your workflow and ship software that removes manual work.",
    features: ["Process mapping", "API integrations", "Automation", "Documentation"],
    benefits: ["Hours saved weekly", "Fewer errors", "Owned IP"],
    from: "$2,400",
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    summary: "Monitoring, updates and support with clear SLAs.",
    overview: "Proactive care so your product stays fast, secure and online.",
    features: ["Uptime monitoring", "Security patches", "Backups", "Priority support"],
    benefits: ["Peace of mind", "No surprise downtime", "Fixed monthly cost"],
    from: "$99/mo",
  },
];

export const process = [
  { step: "01", title: "Discovery", text: "We map goals, users and constraints in a focused kickoff." },
  { step: "02", title: "Strategy", text: "Scope, architecture and timeline agreed before a line of code." },
  { step: "03", title: "Design", text: "Prototypes and a design system you sign off on." },
  { step: "04", title: "Build", text: "Typed, reviewed code shipped in weekly increments." },
  { step: "05", title: "Launch", text: "Performance, SEO and accessibility checks before go-live." },
  { step: "06", title: "Grow", text: "Monitoring, iteration and reporting after launch." },
];

export const reasons = [
  { title: "Senior team only", text: "Every project is delivered by experienced engineers and designers." },
  { title: "Fixed scope, fixed price", text: "Clear estimates with no hidden change requests." },
  { title: "Performance obsessed", text: "We target 90+ Lighthouse scores on every build." },
  { title: "Direct communication", text: "You talk to the people building your product." },
  { title: "Full ownership", text: "Code, design files and accounts are always yours." },
  { title: "Support after launch", text: "Maintenance plans keep your product healthy." },
];

export const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Figma",
  "WordPress",
  "Shopify",
  "Vercel",
  "Cloudflare",
];

export const portfolio = [
  {
    title: "Northwind Analytics",
    category: "Web Application",
    result: "+38% activation",
    year: "2026",
    image: workNorthwind,
  },
  { title: "Aurora Commerce", category: "E-commerce", result: "2.1x revenue", year: "2025", image: workAurora },
  { title: "Meridian Capital", category: "Website", result: "0.9s load time", year: "2025", image: workMeridian },
  { title: "Fieldwork CRM", category: "Software", result: "12h saved weekly", year: "2025", image: workFieldwork },
  { title: "Lumen Studio", category: "Branding", result: "Full rebrand", year: "2024", image: workLumen },
  { title: "Cadence Health", category: "UI UX Design", result: "+52% task success", year: "2024", image: workCadence },
];


export const testimonials = [
  {
    quote: "Orvix delivered ahead of schedule and the site outperforms everything we had before.",
    name: "Sarah Whitman",
    role: "Marketing Director, Meridian",
  },
  {
    quote: "The clearest engineering partner we have worked with. Scope, cost and quality all held.",
    name: "Daniel Okafor",
    role: "Founder, Fieldwork",
  },
  {
    quote: "Our checkout conversion doubled within two months of the rebuild.",
    name: "Mei Tanaka",
    role: "Head of Growth, Aurora",
  },
];

export const posts = [
  {
    slug: "core-web-vitals-2026",
    title: "Core Web Vitals in 2026: what actually moves the needle",
    excerpt: "A practical checklist we run on every launch to keep scores above 90.",
    date: "12 Jul 2026",
    tag: "Performance",
  },
  {
    slug: "design-systems-small-teams",
    title: "Design systems for small teams",
    excerpt: "How to get consistency without building an enterprise component library.",
    date: "28 Jun 2026",
    tag: "Design",
  },
  {
    slug: "technical-seo-audit",
    title: "The technical SEO audit we run before any redesign",
    excerpt: "Protect your rankings when you change your site structure.",
    date: "09 Jun 2026",
    tag: "SEO",
  },
];

export const faqs = [
  {
    q: "How does Orvix work?",
    a: "Orvix is a digital agency. You submit your project directly to our team and we deliver it end to end. There are no freelancers, bidding or third-party sellers involved.",
  },
  {
    q: "How long does a project take?",
    a: "A marketing website typically takes 2–4 weeks. Web applications and custom software usually run 6–12 weeks depending on scope.",
  },
  {
    q: "How is pricing calculated?",
    a: "We quote a fixed price after discovery based on scope and complexity. Retainers are available for SEO, design and maintenance.",
  },
  { q: "Do I own the code and design files?", a: "Yes. Full ownership of code, design files and accounts transfers to you at delivery." },
  { q: "Which payment methods do you accept?", a: "Bank transfer, Wise, Payoneer and major cards. Projects start with a 40% deposit." },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Every project includes 30 days of post-launch support, and monthly maintenance plans are available.",
  },
];

export const pricing = [
  {
    name: "Starter",
    price: "$499",
    note: "One-off project",
    for: "Landing pages and small business sites",
    features: ["Up to 5 pages", "Responsive design", "Basic SEO setup", "2 revision rounds", "30 days support"],
  },
  {
    name: "Growth",
    price: "$1,900",
    note: "Most popular",
    for: "Growing companies and product teams",
    features: [
      "Up to 15 pages or app screens",
      "Custom design system",
      "CMS integration",
      "Advanced SEO & schema",
      "Unlimited revisions in sprint",
      "90 days support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "Dedicated team",
    for: "Complex platforms and long roadmaps",
    features: [
      "Custom web application",
      "Architecture & security review",
      "Dedicated project manager",
      "Integrations & automation",
      "SLA-backed maintenance",
    ],
  },
];

export const team = [
  { name: "Robiul Islam Riyan", role: "Founder & CEO", initials: "RR" },
  { name: "Nafis Ahmed", role: "Lead Engineer", initials: "NA" },
  { name: "Tanjila Rahman", role: "Design Lead", initials: "TR" },
  { name: "Imran Hossain", role: "SEO Strategist", initials: "IH" },
];

export const timeline = [
  { year: "2022", title: "Founded", text: "Orvix starts in Bangladesh with a two-person studio." },
  { year: "2023", title: "First 50 projects", text: "Websites and stores delivered for clients across 9 countries." },
  { year: "2024", title: "Engineering team", text: "Dedicated web application and software practice launched." },
  { year: "2025", title: "Growth services", text: "SEO, branding and maintenance retainers added." },
  { year: "2026", title: "Global delivery", text: "Serving clients across Asia, Europe and North America." },
];
