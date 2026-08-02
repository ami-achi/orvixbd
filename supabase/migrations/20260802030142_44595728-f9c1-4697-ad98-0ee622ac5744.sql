CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE TABLE public.founder_page (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  title text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  photo_url text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  biography text NOT NULL DEFAULT '',
  infobox jsonb NOT NULL DEFAULT '[]'::jsonb,
  education jsonb NOT NULL DEFAULT '[]'::jsonb,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.founder_page TO anon;
GRANT SELECT, UPDATE ON public.founder_page TO authenticated;
GRANT ALL ON public.founder_page TO service_role;
ALTER TABLE public.founder_page ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Founder page is publicly readable" ON public.founder_page
FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can update the founder page" ON public.founder_page
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER founder_page_updated_at BEFORE UPDATE ON public.founder_page
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.founder_page (slug, name, title, tagline, photo_url, summary, biography, infobox, education, skills)
VALUES (
  'founder',
  'Robiul Islam Riyan',
  'Founder & Chief Executive Officer, Orvix',
  'Engineer, designer and entrepreneur building digital products from Bangladesh for the world.',
  '',
  'Robiul Islam Riyan is a Bangladeshi entrepreneur, software engineer and designer. He is the founder and Chief Executive Officer of Orvix, a digital agency delivering websites, web applications, branding and growth services to clients across Asia, Europe and North America.',
  E'== Early life ==\nRobiul Islam Riyan was born and raised in Bangladesh, where he developed an early interest in computers, design and the web. He began building websites as a teenager, teaching himself HTML, CSS and JavaScript before moving on to modern application frameworks.\n\n== Career ==\nHe started freelancing while studying, delivering websites and brand identities for local businesses. In 2022 he founded Orvix as a two-person studio with a focus on engineering quality and honest communication rather than volume.\n\nUnder his leadership Orvix grew into a full-service digital agency with dedicated engineering, design and growth practices, delivering more than fifty projects for clients in nine countries by 2023 and expanding into web applications and custom software in 2024.\n\n== Philosophy ==\nRiyan is known for insisting on fixed scope, fixed price engagements, senior-only delivery teams and full client ownership of code and design files. He argues that small, senior teams consistently outperform large agencies on both speed and quality.\n\n== Present day ==\nHe continues to lead Orvix as CEO, working directly with clients on strategy and architecture while mentoring the engineering and design team.',
  '[{"label":"Born","value":"Bangladesh"},{"label":"Nationality","value":"Bangladeshi"},{"label":"Occupation","value":"Entrepreneur, software engineer, designer"},{"label":"Known for","value":"Founder & CEO of Orvix"},{"label":"Years active","value":"2018 - present"},{"label":"Company","value":"Orvix"},{"label":"Website","value":"https://orvix.pro.bd"}]'::jsonb,
  '[{"institution":"Self-taught, web engineering","detail":"HTML, CSS, JavaScript and modern frameworks","year":"2018"},{"institution":"Computer Science studies, Bangladesh","detail":"Focus on software engineering and systems","year":"2020"}]'::jsonb,
  '["React","TypeScript","Next.js","Node.js","PostgreSQL","UI/UX design","Brand strategy","Technical SEO","Team leadership","Product architecture"]'::jsonb
);