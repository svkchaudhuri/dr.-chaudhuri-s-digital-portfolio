ALTER TABLE public.work_videos
  ADD COLUMN sort_order integer NOT NULL DEFAULT 1;

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC, id) AS position
  FROM public.work_videos
)
UPDATE public.work_videos AS video
SET sort_order = ranked.position
FROM ranked
WHERE video.id = ranked.id;

CREATE INDEX work_videos_display_order_idx
  ON public.work_videos (sort_order, created_at);