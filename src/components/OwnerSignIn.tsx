import { useEffect, useState, type FormEvent } from "react";
import { Lock, LockOpen, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useSiteOwner } from "@/lib/publication-store";

export const adminStorageKey = "shouvik-gallery-admin";
const field = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

/** Single owner sign-in. Signing in as the owner switches on editing across the whole site. */
export function OwnerSignIn({ compact = false }: { compact?: boolean }) {
  const { email: signedInEmail, isOwner } = useSiteOwner();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const was = window.localStorage.getItem(adminStorageKey) === "true";
    if (isOwner === was) return;
    if (isOwner) window.localStorage.setItem(adminStorageKey, "true");
    else window.localStorage.removeItem(adminStorageKey);
    window.dispatchEvent(new Event("shouvik-admin-changed"));
  }, [isOwner]);

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setBusy(true); setMessage("");
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message); else { setOpen(false); setPassword(""); }
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
      setMessage(error ? error.message : "Check your email and click the confirmation link, then sign in here.");
    }
    setBusy(false);
  };

  if (signedInEmail) return <div className="flex items-center gap-2">
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${isOwner ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
      <LockOpen className="size-3.5" aria-hidden="true" />{isOwner ? (compact ? "Owner" : "Owner editing on") : "Not owner"}
    </span>
    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => supabase.auth.signOut()} aria-label="Sign out"><LogOut className="size-3.5" aria-hidden="true" />{!compact && "Sign out"}</Button>
  </div>;

  return <>
    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={() => { setMessage(""); setOpen(true); }} aria-label="Owner sign in">
      <Lock className="size-3.5" aria-hidden="true" />{!compact && "Owner sign in"}
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogTitle className="font-display text-2xl">{mode === "signin" ? "Owner sign in" : "Create owner account"}</DialogTitle>
        <DialogDescription>{mode === "signin" ? "Sign in to add publications, photos and manage the site for every visitor." : "The first account created becomes the site owner."}</DialogDescription>
        <form className="mt-2 space-y-3" onSubmit={submit}>
          <input className={field} type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          <input className={field} type="password" required minLength={8} placeholder="Password (min. 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}</Button>
          <button type="button" className="w-full text-center text-xs text-primary" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>
            {mode === "signin" ? "First time? Create the owner account" : "Already have an account? Sign in"}</button>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}
