import { useState, useEffect } from "react";
import { Copy, Check, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { contact } from "@/data/portfolio";

const COMMAND = "ssh joshuas.me -p 22";

export function ContactView() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    toast.success("email copied");
    setTimeout(() => setCopied(false), 1500);
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("fill all fields");
      return;
    }
    setSending(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error(errorText || "failed to send message");
        return;
      }

      setForm({ name: "", email: "", message: "" });
      toast.success("message sent — josh will reply soon");
    } catch (err) {
      toast.error("network error — please try again");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pb-12 w-full max-w-5xl">
      <div className="mb-8 font-mono text-sm text-muted-foreground">
        <span className="text-primary">~/josh</span> $ <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      <div 
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col md:flex-row gap-12 items-start mt-8 fill-mode-both"
        style={{ animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: 'both' }}
      >
        
        {/* LEFT SIDE: Connect Hub */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Let's build something.</h2>
            <p className="text-foreground/80 leading-relaxed max-w-md">
              Open to internships, freelance opportunities, and interesting conversations.
              Feel free to reach out directly via the form or connect through my networks.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={copyEmail}
              className="flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group"
              title="Copy Email"
            >
              {copied ? (
                <Check className="h-6 w-6 text-success" />
              ) : (
                <img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Gmail" loading="lazy" className="h-6 w-6 group-hover:scale-110 transition-transform" />
              )}
            </button>

            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group"
              title="GitHub"
            >
              <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" loading="lazy" className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group"
              title="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-[#0A66C2] fill-[#0A66C2] group-hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://instagram.com/sjoshua08"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group"
              title="Instagram"
            >
              <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" loading="lazy" className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Form Modal */}
        <div className="flex-1 w-full max-w-md bg-panel/80 backdrop-blur-xl border border-border shadow-2xl shadow-black/40 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">Send a Message</h3>
          
          <form onSubmit={send} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground ml-1">Name</label>
              <input
                id="contact-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                maxLength={100}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground ml-1">Email</label>
              <input
                id="contact-email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                type="email"
                maxLength={320}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground ml-1">Message</label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can I help you?"
                rows={4}
                maxLength={5000}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none resize-none transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={sending}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold transition-all hover:bg-primary/90 disabled:opacity-70 shadow-lg shadow-primary/20"
            >
              {sending ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
