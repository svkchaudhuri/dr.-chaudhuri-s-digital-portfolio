import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ChevronDown, Film, Plus, Sparkles, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useSiteOwner } from "@/lib/publication-store";
import { getPublishedWorkVideoUrl } from "@/lib/work-video.functions";

const bucket = "work-videos";
const maxFileSize = 100 * 1024 * 1024;
const acceptedTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];
const field = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

type VideoRow = {
  id: string;
  title: string;
  description: string;
  storage_path: string;
  mime_type: string;
  created_at: string;
};

type VideoItem = VideoRow & { url: string };

export function VideoArchive() {
  const { isOwner } = useSiteOwner();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError("");
    const { data, error: readError } = await supabase
      .from("work_videos")
      .select("id, title, description, storage_path, mime_type, created_at")
      .order("created_at", { ascending: false });

    if (readError) {
      setError(readError.message);
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as VideoRow[];
    const withUrls = await Promise.all(rows.map(async (row): Promise<VideoItem | null> => {
      if (isOwner) {
        const { data: signed, error: signError } = await supabase.storage
          .from(bucket)
          .createSignedUrl(row.storage_path, 60 * 60 * 24 * 365);
        if (!signError && signed?.signedUrl) return { ...row, url: signed.signedUrl };
      }

      const { url } = await getPublishedWorkVideoUrl({ data: { path: row.storage_path } });
      return url ? { ...row, url } : null;
    }));

    setVideos(withUrls.filter((video): video is VideoItem => video !== null));
    if (withUrls.some((video) => video === null)) setError("Some videos could not be loaded. Please refresh to try again.");
    setLoading(false);
  }, [isOwner]);

  useEffect(() => {
    void load();
  }, [load]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!file || !title.trim()) return;
    if (file.size > maxFileSize) {
      setMessage("Please choose a video smaller than 100 MB.");
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "mp4";
    const contentType = file.type || (extension === "mov" ? "video/quicktime" : extension === "webm" ? "video/webm" : extension === "m4v" ? "video/x-m4v" : "video/mp4");
    if (!acceptedTypes.includes(contentType)) {
      setMessage("Please choose an MP4, WebM, MOV, or M4V video.");
      return;
    }

    setBusy(true);
    setMessage("");
    const path = `${crypto.randomUUID()}.${extension}`;
    try {
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { contentType });
      if (uploadError) throw new Error(uploadError.message);

      const { error: insertError } = await supabase.from("work_videos").insert({
        title: title.trim(),
        description: description.trim(),
        storage_path: path,
        mime_type: contentType,
        is_public: true,
      });
      if (insertError) {
        await supabase.storage.from(bucket).remove([path]);
        throw new Error(insertError.message);
      }

      form.reset();
      setFile(null);
      setTitle("");
      setDescription("");
      setOpen(false);
      setExpanded(true);
      await load();
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "The video could not be uploaded.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (video: VideoItem) => {
    if (!window.confirm(`Remove "${video.title}" from the video archive?`)) return;
    setDeletingId(video.id);
    setError("");
    const { error: deleteError } = await supabase.from("work_videos").delete().eq("id", video.id);
    if (deleteError) {
      setError(deleteError.message);
    } else {
      setVideos((current) => current.filter((item) => item.id !== video.id));
      const { error: storageError } = await supabase.storage.from(bucket).remove([video.storage_path]);
      if (storageError) setError("The video was removed from the archive, but its stored file could not be cleaned up.");
    }
    setDeletingId(null);
  };

  return <section id="videos" className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-portrait">
    <button
      type="button"
      className="group grid w-full grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3 p-4 text-left sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-x-4"
      aria-expanded={expanded}
      aria-controls="featured-research-videos"
      onClick={() => setExpanded((current) => !current)}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Film className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-primary"><Sparkles className="size-3.5 shrink-0" aria-hidden="true" />Research video archive</span>
        <span className="mt-1 block text-lg font-bold leading-snug">Featured Research Videos</span>
        <span className="mt-1.5 block text-sm leading-6 text-muted-foreground">Short videos documenting experiments, demonstrations, and engineering projects from simulation to real-world validation.</span>
      </span>
      <span className="col-span-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 py-2.5 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:col-span-1 sm:w-auto sm:shrink-0 sm:text-xs">
        {expanded ? "Hide videos" : "View the videos"}<ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
      </span>
    </button>

    {expanded && <div id="featured-research-videos" className="border-t border-border bg-muted/30 p-4 sm:p-5">
      {isOwner && <div className="mb-4 flex justify-end"><Button size="sm" onClick={() => { setMessage(""); setOpen(true); }}><Plus className="size-4" aria-hidden="true" />Add video</Button></div>}
      {loading ? <div className="rounded-md border border-border bg-card p-8 text-center text-sm text-muted-foreground" role="status">Loading videos...</div> : videos.length > 0 ? <div className="grid gap-5 lg:grid-cols-2">
        {videos.map((video) => <article key={video.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-portrait">
          <video className="aspect-video w-full bg-muted object-contain" controls playsInline preload="metadata" src={video.url} aria-label={video.title}>
            Your browser does not support this video.
          </video>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-xl leading-snug">{video.title}</h3>
                {video.description && <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">{video.description}</p>}
              </div>
              {isOwner && <Button variant="ghost" size="icon" className="shrink-0 text-destructive" disabled={deletingId === video.id} onClick={() => void remove(video)} aria-label={`Remove ${video.title}`}><Trash2 className="size-4" aria-hidden="true" /></Button>}
            </div>
          </div>
        </article>)}
      </div> : <div className="rounded-xl border border-dashed border-border bg-card px-5 py-8 text-center">
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-primary/10 text-primary"><Film className="size-5" aria-hidden="true" /></span>
        <h3 className="mt-3 font-display text-xl">{isOwner ? "Start your video archive" : "Videos are being curated"}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{isOwner ? "Add a short experiment or project video to share it with every visitor." : "New research demonstrations and project videos will appear here."}</p>
        {isOwner && <Button className="mt-4" onClick={() => setOpen(true)}><Upload className="size-4" aria-hidden="true" />Upload the first video</Button>}
      </div>}
      {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}
    </div>}

    <Dialog open={open} onOpenChange={(next) => { if (!busy) { setOpen(next); if (!next) setMessage(""); } }}>
      <DialogContent className="max-w-lg">
        <DialogTitle className="font-display text-2xl">Add a featured research video</DialogTitle>
        <DialogDescription>Upload an MP4, WebM, MOV, or M4V file up to 100 MB. It will be visible to every visitor.</DialogDescription>
        <form className="mt-2 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-semibold" htmlFor="work-video-file">Video file</label>
          <input id="work-video-file" className={field} type="file" required accept={acceptedTypes.join(",")} disabled={busy} onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
          <div>
            <label className="mb-1.5 block text-sm font-semibold" htmlFor="work-video-title">Title</label>
            <input id="work-video-title" className={field} required maxLength={160} disabled={busy} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Canting keel field experiment" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold" htmlFor="work-video-description">Short description <span className="font-normal text-muted-foreground">(optional)</span></label>
            <textarea id="work-video-description" className={`${field} min-h-24 resize-y`} maxLength={500} disabled={busy} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What does this video demonstrate?" />
          </div>
          {message && <p className="text-sm text-destructive" role="alert">{message}</p>}
          {busy && <p className="text-sm text-muted-foreground" role="status">Uploading your video. Please keep this window open.</p>}
          <Button type="submit" className="w-full" disabled={busy || !file || !title.trim()}><Upload className="size-4" aria-hidden="true" />{busy ? "Uploading..." : "Upload video"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  </section>;
}
