GRANT INSERT ON TABLE public.rsvps TO anon, authenticated;
GRANT INSERT ON TABLE public.wishes TO anon, authenticated;
GRANT ALL ON TABLE public.rsvps TO service_role;
GRANT ALL ON TABLE public.wishes TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit an rsvp" ON public.rsvps;
CREATE POLICY "Anyone can submit an rsvp"
ON public.rsvps
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit a wish" ON public.wishes;
CREATE POLICY "Anyone can submit a wish"
ON public.wishes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);