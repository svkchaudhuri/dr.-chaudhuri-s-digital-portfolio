CREATE TABLE public.scholar_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scholar_author_id text NOT NULL DEFAULT 'sXYaj-AAAAAJ',
  h_index integer NOT NULL DEFAULT 0,
  citations integer NOT NULL DEFAULT 0,
  publications integer NOT NULL DEFAULT 0,
  i10_index integer,
  last_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX scholar_metrics_author_id_key ON public.scholar_metrics (scholar_author_id);

GRANT SELECT ON public.scholar_metrics TO anon;
GRANT SELECT ON public.scholar_metrics TO authenticated;
GRANT ALL ON public.scholar_metrics TO service_role;

ALTER TABLE public.scholar_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Scholar metrics are publicly readable"
  ON public.scholar_metrics FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.scholar_metrics (scholar_author_id, h_index, citations, publications)
VALUES ('sXYaj-AAAAAJ', 7, 170, 28);