
-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  plan_expires_at TIMESTAMPTZ,
  onboarded BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users select own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Investor profile
CREATE TABLE public.investor_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  goal TEXT,
  horizon TEXT,
  risk TEXT,
  style TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.investor_profiles TO authenticated;
GRANT ALL ON public.investor_profiles TO service_role;
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own investor profile" ON public.investor_profiles FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Watchlist
CREATE TABLE public.watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, ticker)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.watchlist TO authenticated;
GRANT ALL ON public.watchlist TO service_role;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own watchlist" ON public.watchlist FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Daily verdicts
CREATE TABLE public.daily_verdicts (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  count INT NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, date)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_verdicts TO authenticated;
GRANT ALL ON public.daily_verdicts TO service_role;
ALTER TABLE public.daily_verdicts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own daily verdicts" ON public.daily_verdicts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
