import { useState, type FormEvent } from "react";
import { LockOpen, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { addCustomPublication, deleteCustomPublication, useSitePublications } from "@/lib/publication-store";

const categories = ["Journals", "Conference Proceedings", "Books", "Book Chapters", "Posters"];
const field = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

export function OwnerPanel({ isOwner }: { isOwner: boolean }) {
  const [addOpen, setAddOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const { all } = useSitePublications();
  const custom = all.filter((p) => p.customId);

  if (!isOwner) return null;

  const submitPublication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setBusy(true); setMessage("");
    const f = new FormData(e.currentTarget);
    try {
      await addCustomPublication({
        category: String(f.get("category")), authors: String(f.get("authors")).trim(), title: String(f.get("title")).trim(),
        venue: String(f.get("venue")).trim(), year: Number(f.get("year")), details: String(f.get("details")).trim(),
        doi: String(f.get("doi")).trim().replace(/^https?:\/\/(dx\.)?doi\.org\//, ""), url: String(f.get("url")).trim(),
      });
      setAddOpen(false);
    } catch (err) { setMessage(err instanceof Error ? err.message : "Could not save."); }
    setBusy(false);
  };

  return <div className="mb-6 rounded-md border-2 border-primary/40 bg-primary/5 p-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><LockOpen className="size-4" aria-hidden="true" />Owner editing: changes are saved for all visitors.</p>
      <Button size="sm" onClick={() => { setMessage(""); setAddOpen(true); }}><Plus className="size-4" aria-hidden="true" />Add publication</Button>
    </div>
    {isOwner && custom.length > 0 && <ul className="mt-4 space-y-2">{custom.map((p) => <li key={p.key} className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm">
      <span className="min-w-0 truncate"><span className="font-mono text-xs text-primary">{p.year}</span> {p.title}</span>
      <Button size="sm" variant="ghost" className="text-destructive" aria-label={`Remove ${p.title}`} onClick={() => { if (window.confirm(`Remove "${p.title}"?`)) deleteCustomPublication(p.customId!); }}><Trash2 className="size-4" aria-hidden="true" /></Button>
    </li>)}</ul>}

    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogTitle className="font-display text-2xl">Add publication</DialogTitle>
        <DialogDescription>It appears in Publications straight away, and you can then pick it for any Research Interest.</DialogDescription>
        <form className="mt-2 space-y-3" onSubmit={submitPublication}>
          <select name="category" className={field} aria-label="Category">{categories.map((c) => <option key={c}>{c}</option>)}</select>
          <input name="title" required className={field} placeholder="Title" aria-label="Title" />
          <input name="authors" required className={field} placeholder="Authors, e.g. S. Chaudhuri, H. Ramezani" aria-label="Authors" />
          <input name="venue" required className={field} placeholder="Journal / conference / publisher" aria-label="Venue" />
          <input name="year" required type="number" min={1990} max={2100} defaultValue={new Date().getFullYear()} className={field} aria-label="Year" />
          <input name="details" className={field} placeholder="Details (volume, pages, month), optional" aria-label="Details" />
          <input name="doi" className={field} placeholder="DOI, optional" aria-label="DOI" />
          <input name="url" type="url" className={field} placeholder="Link, optional (used if no DOI)" aria-label="Link" />
          {message && <p className="text-sm font-semibold text-destructive">{message}</p>}
          <Button type="submit" className="w-full" disabled={busy}>{busy ? "Saving..." : "Save publication"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  </div>;
}
