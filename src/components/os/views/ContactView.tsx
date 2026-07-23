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
    toast.success("email copied to clipboard");
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
    <div className="pb-12 w-full">
      <div className="mb-10 font-mono text-sm text-muted-foreground">
        <span className="text-primary font-bold">~/josh</span> ${" "}
        <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      <div
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch fill-mode-both"
        style={{ animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: "both" }}
      >
        {/* LEFT SIDE: Connect Hub */}
        <div className="flex-1 flex flex-col justify-between space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 tracking-tight mb-3">
              Let's build something.
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
              Open to AI engineering roles, internships, freelance projects, and tech discussions.
              Reach out directly using the form or connect through socials below.
            </p>

            {/* Quick Info Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
              <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-panel/70 backdrop-blur-md shadow-sm">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5 font-semibold">
                  // LOCATION
                </div>
                <div className="text-foreground font-bold text-sm sm:text-base">
                  Coimbatore, India (IST +5:30)
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-panel/70 backdrop-blur-md shadow-sm">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5 font-semibold">
                  // RESPONSE TIME
                </div>
                <div className="text-emerald-400 font-bold text-sm sm:text-base flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Within 12 Hours
                </div>
              </div>
            </div>

            {/* Email Copy Card */}
            <div className="mt-5 p-5 rounded-2xl border border-border bg-panel flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <img
                  src="https://cdn.simpleicons.org/gmail/EA4335"
                  alt="Gmail"
                  className="h-6 w-6 shrink-0"
                />
                <span className="font-mono text-sm sm:text-base text-foreground font-semibold truncate">
                  {contact.email}
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-panel-2 hover:bg-background font-mono text-xs sm:text-sm font-bold text-foreground transition-all cursor-pointer active:scale-95"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4 text-primary" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4">
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3.5 font-bold">
              // SOCIAL & NETWORKS
            </div>
            <div className="flex flex-wrap gap-3.5">
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all font-mono text-xs sm:text-sm font-bold text-foreground group"
              >
                <img
                  src="https://cdn.simpleicons.org/github/white"
                  alt="GitHub"
                  className="h-5 w-5 group-hover:scale-110 transition-transform"
                />
                <span>GitHub</span>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all font-mono text-xs sm:text-sm font-bold text-foreground group"
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2] fill-[#0A66C2] group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://instagram.com/sjoshua08"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all font-mono text-xs sm:text-sm font-bold text-foreground group"
              >
                <img
                  src="https://cdn.simpleicons.org/instagram/E4405F"
                  alt="Instagram"
                  className="h-5 w-5 group-hover:scale-110 transition-transform"
                />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Modal */}
        <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 bg-panel/90 backdrop-blur-xl border border-border shadow-2xl shadow-black/40 rounded-2xl p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 font-mono">
              Direct transmission to inbox
            </p>

            <form onSubmit={send} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-semibold text-muted-foreground ml-1 font-mono uppercase tracking-wider"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  maxLength={100}
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-semibold text-muted-foreground ml-1 font-mono uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  type="email"
                  maxLength={320}
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold text-muted-foreground ml-1 font-mono uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can I help you?"
                  rows={4}
                  maxLength={5000}
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full mt-3 flex items-center justify-center gap-2.5 rounded-xl bg-primary text-primary-foreground px-6 py-4 text-base font-bold transition-all hover:bg-primary/90 disabled:opacity-70 shadow-lg shadow-primary/25 cursor-pointer active:scale-95"
              >
                {sending ? (
                  <>
                    <span className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
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
    </div>
  );
}
