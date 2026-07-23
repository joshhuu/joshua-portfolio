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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 w-full">
      <div className="mb-10 font-mono text-sm sm:text-base text-muted-foreground">
        <span className="text-primary font-bold">~/josh</span> ${" "}
        <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: Intro & Info */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight mb-3">
              About Me
            </h2>
            <p className="mt-5 text-lg sm:text-xl text-foreground/90 leading-relaxed font-normal">
              I'm <span className="text-foreground font-bold">Joshua</span> — an AI engineer from
              Coimbatore, India. I build production-grade agentic systems, full-stack AI products,
              and software that actually ships. I focus on real-world impact over raw demos.
            </p>

            <div className="mt-8 space-y-4 font-mono text-sm sm:text-base">
              <Row label="currently" value="B.Tech AI & Data Science @ KAHE (2023–2027)" />
              <Row
                label="interests"
                value="Agentic architectures · LLM orchestration · AI products · Hackathons"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-panel px-4 py-2.5 font-mono text-xs sm:text-sm font-bold hover:bg-panel-2 hover:border-primary/50 transition-all"
            >
              <Github className="h-4 w-4 text-primary" /> {contact.githubHandle}
            </a>
            <a
              href={`https://${contact.portfolio}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-panel px-4 py-2.5 font-mono text-xs sm:text-sm font-bold hover:bg-panel-2 hover:border-primary/50 transition-all"
            >
              <Globe className="h-4 w-4 text-primary" /> {contact.portfolio}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-panel px-4 py-2.5 font-mono text-xs sm:text-sm font-bold hover:bg-panel-2 hover:border-primary/50 transition-all"
            >
              <Mail className="h-4 w-4 text-primary" /> {contact.email}
            </a>
          </div>
        </div>

        {/* Right Column: Terminal Window */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-panel font-mono text-xs sm:text-sm overflow-hidden flex flex-col shadow-lg">
          <div className="flex items-center gap-2 border-b border-border bg-panel-2 px-5 py-3 shrink-0">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-muted-foreground text-xs font-semibold">
              ~/josh/projects
            </span>
          </div>
          <div className="p-6 flex-1 space-y-3 text-muted-foreground overflow-x-auto">
            <div>
              <span className="text-primary font-bold">$</span> ls -la
            </div>
            <Line perm="drwxr-xr-x" name="agentic-company-intel/" accent="#7c6fcd" />
            <Line perm="drwxr-xr-x" name="domainintel/" accent="#1d9e8a" />
            <Line perm="drwxr-xr-x" name="rural-ai-assistant/" accent="#d97706" />
            <Line perm="drwxr-xr-x" name="satellite-air-quality/" accent="#2563eb" />
            <Line perm="-rw-r--r--" name="README.md" accent="#cbd5e1" />
            <Line perm="-rw-r--r--" name="resume.pdf" accent="#cbd5e1" />
            <div className="pt-6">
              <span className="text-primary font-bold">$</span>
              <span className="caret" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-primary w-28 shrink-0 font-bold uppercase tracking-wider text-xs sm:text-sm pt-0.5">
        {label}
      </span>
      <span className="text-foreground/90 font-medium">{value}</span>
    </div>
  );
}

function Line({ perm, name, accent }: { perm: string; name: string; accent: string }) {
  return (
    <div className="flex items-center gap-3.5 whitespace-nowrap">
      <span className="text-muted-foreground/60 text-xs">{perm}</span>
      <span style={{ color: accent }} className="font-bold">
        {name}
      </span>
    </div>
  );
}
