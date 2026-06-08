import { useState, useEffect } from "react";
import { experience, education } from "@/data/portfolio";
import { Terminal, Briefcase, GraduationCap } from "lucide-react";

const COMMAND = "cat experience.log && cat education.log";

const CARD_COLORS = [
  { text: "text-blue-400", borderHover: "hover:border-blue-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]", topBar: "via-blue-500", glow: "from-blue-500/10 to-transparent", iconBg: "bg-blue-500/10", borderActive: "border-blue-500/20" },
  { text: "text-purple-400", borderHover: "hover:border-purple-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]", topBar: "via-purple-500", glow: "from-purple-500/10 to-transparent", iconBg: "bg-purple-500/10", borderActive: "border-purple-500/20" },
  { text: "text-pink-400", borderHover: "hover:border-pink-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]", topBar: "via-pink-500", glow: "from-pink-500/10 to-transparent", iconBg: "bg-pink-500/10", borderActive: "border-pink-500/20" },
  { text: "text-emerald-400", borderHover: "hover:border-emerald-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]", topBar: "via-emerald-500", glow: "from-emerald-500/10 to-transparent", iconBg: "bg-emerald-500/10", borderActive: "border-emerald-500/20" },
  { text: "text-amber-400", borderHover: "hover:border-amber-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]", topBar: "via-amber-500", glow: "from-amber-500/10 to-transparent", iconBg: "bg-amber-500/10", borderActive: "border-amber-500/20" },
];

export function ExperienceView() {
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
    <div className="pb-12">
      <div className="mb-8 font-mono text-sm text-muted-foreground">
        <span className="text-primary">~/josh</span> $ <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      <div 
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-10 fill-mode-both"
        style={{ animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: 'both' }}
      >
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Briefcase className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight">
                Experience Log
              </h2>
              <div className="font-mono text-xs text-muted-foreground mt-1">// STATUS: ACTIVE_CAREER_PATH</div>
            </div>
          </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {experience.map((e, idx) => {
            const colors = CARD_COLORS[idx % CARD_COLORS.length];
            return (
            <div key={e.id} className={`group relative rounded-xl border border-border/60 bg-panel/80 backdrop-blur-md overflow-hidden transition-all duration-300 ${colors.borderHover} hover:-translate-y-1 ${colors.shadowHover}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${colors.topBar} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative flex items-center border-b border-border/40 bg-background/50 px-4 py-3 backdrop-blur-sm">
                <div className={`flex items-center justify-center p-1.5 rounded-md ${colors.iconBg} ${colors.borderActive} border mr-3`}>
                  <Terminal className={`h-3 w-3 ${colors.text}`} />
                </div>
                <div className={`font-mono text-xs ${colors.text} font-bold tracking-wider`}>
                  {e.id}.exe
                </div>
              </div>
              <div className="relative p-6">
                <div className="mb-5">
                  <div className={`inline-flex px-2 py-0.5 rounded-full ${colors.iconBg} border ${colors.borderActive} font-mono text-[10px] ${colors.text} mb-3`}>
                    {e.range}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">{e.org}</h3>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{e.role}</div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed items-start">
                      <span className={`flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-current ${colors.text} shadow-[0_0_8px_currentColor]`} />
                      <span className="group-hover:text-foreground/90 transition-colors">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )})}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <GraduationCap className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 tracking-tight">
              Education Log
            </h2>
            <div className="font-mono text-xs text-muted-foreground mt-1">// STATUS: KNOWLEDGE_ACQUIRED</div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((edu, idx) => {
            const colors = CARD_COLORS[(idx + experience.length) % CARD_COLORS.length];
            return (
            <div key={edu.id} className={`group relative rounded-xl border border-border/60 bg-panel/80 backdrop-blur-md overflow-hidden transition-all duration-300 ${colors.borderHover} hover:-translate-y-1 ${colors.shadowHover}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${colors.topBar} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative flex items-center border-b border-border/40 bg-background/50 px-4 py-3 backdrop-blur-sm">
                <div className={`flex items-center justify-center p-1.5 rounded-md ${colors.iconBg} ${colors.borderActive} border mr-3`}>
                  <Terminal className={`h-3 w-3 ${colors.text}`} />
                </div>
                <div className={`font-mono text-xs ${colors.text} font-bold tracking-wider`}>
                  {edu.id}.exe
                </div>
              </div>
              <div className="relative p-6">
                <div className="mb-5">
                  <div className={`inline-flex px-2 py-0.5 rounded-full ${colors.iconBg} border ${colors.borderActive} font-mono text-[10px] ${colors.text} mb-3`}>
                    {edu.range}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">{edu.institution}</h3>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{edu.degree}</div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {edu.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed items-start">
                      <span className={`flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-current ${colors.text} shadow-[0_0_8px_currentColor]`} />
                      <span className="group-hover:text-foreground/90 transition-colors">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )})}
        </div>
      </div>
      </div>
    </div>
  );
}
