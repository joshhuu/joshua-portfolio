import { useState, useEffect } from "react";
import { Github, Globe, Mail } from "lucide-react";
import { contact } from "@/data/portfolio";

const COMMAND = "cat README.md";

export function AboutView() {
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8 font-mono text-sm text-muted-foreground">
        <span className="text-primary">~/josh</span> $ <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <p className="mt-4 text-lg text-foreground/90">
          I'm <span className="text-foreground font-semibold">Joshua</span> — an AI engineer
          from Coimbatore, India. I build production-grade agentic systems, full-stack AI
          products, and things that actually ship. I'm not interested in demos.
        </p>

        <div className="mt-6 space-y-3 font-mono text-sm">
          <Row label="currently" value="B.Tech AI & Data Science @ KAHE (2023–2027)" />
          <Row
            label="interests"
            value="Agentic architectures · LLM orchestration · AI products · Hackathons"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 font-mono text-xs hover:bg-panel-2"
          >
            <Github className="h-3.5 w-3.5" /> {contact.githubHandle}
          </a>
          <a
            href={`https://${contact.portfolio}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 font-mono text-xs hover:bg-panel-2"
          >
            <Globe className="h-3.5 w-3.5" /> {contact.portfolio}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 font-mono text-xs hover:bg-panel-2"
          >
            <Mail className="h-3.5 w-3.5" /> {contact.email}
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-panel font-mono text-xs overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border bg-panel-2 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-muted-foreground">~/josh/projects</span>
        </div>
        <div className="p-4 space-y-1 text-muted-foreground">
          <div><span className="text-primary">$</span> ls -la</div>
          <Line perm="drwxr-xr-x" name="agentic-company-intel/" accent="#7c6fcd" />
          <Line perm="drwxr-xr-x" name="domainintel/" accent="#1d9e8a" />
          <Line perm="drwxr-xr-x" name="rural-ai-assistant/" accent="#d97706" />
          <Line perm="drwxr-xr-x" name="satellite-air-quality/" accent="#2563eb" />
          <Line perm="-rw-r--r--" name="README.md" accent="#cbd5e1" />
          <Line perm="-rw-r--r--" name="resume.pdf" accent="#cbd5e1" />
          <div className="pt-2"><span className="text-primary">$</span><span className="caret" /></div>
        </div>
      </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-primary w-20 shrink-0">{label}</span>
      <span className="text-foreground/80">{value}</span>
    </div>
  );
}

function Line({ perm, name, accent }: { perm: string; name: string; accent: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-muted-foreground/60">{perm}</span>
      <span style={{ color: accent }}>{name}</span>
    </div>
  );
}
