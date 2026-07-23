import { useState, useEffect } from "react";
import { experience, education } from "@/data/portfolio";
import { Terminal, Briefcase, GraduationCap } from "lucide-react";

const COMMAND = "cat experience.log && cat education.log";

const CARD_COLORS = [
  {
    text: "text-blue-400",
    borderHover: "hover:border-blue-500",
    shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
    topBar: "via-blue-500",
    glow: "from-blue-500/10 to-transparent",
    iconBg: "bg-blue-500/10",
    borderActive: "border-blue-500/20",
  },
  {
    text: "text-purple-400",
    borderHover: "hover:border-purple-500",
    shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
    topBar: "via-purple-500",
    glow: "from-purple-500/10 to-transparent",
    iconBg: "bg-purple-500/10",
    borderActive: "border-purple-500/20",
  },
  {
    text: "text-pink-400",
    borderHover: "hover:border-pink-500",
    shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]",
    topBar: "via-pink-500",
    glow: "from-pink-500/10 to-transparent",
    iconBg: "bg-pink-500/10",
    borderActive: "border-pink-500/20",
  },
  {
    text: "text-emerald-400",
    borderHover: "hover:border-emerald-500",
    shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
    topBar: "via-emerald-500",
    glow: "from-emerald-500/10 to-transparent",
    iconBg: "bg-emerald-500/10",
    borderActive: "border-emerald-500/20",
  },
  {
    text: "text-amber-400",
    borderHover: "hover:border-amber-500",
    shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
    topBar: "via-amber-500",
    glow: "from-amber-500/10 to-transparent",
    iconBg: "bg-amber-500/10",
    borderActive: "border-amber-500/20",
  },
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

  const [featuredExp, ...otherExp] = experience;

  return (
    <div className="pb-12 w-full">
      <div className="mb-8 font-mono text-sm text-muted-foreground">
        <span className="text-primary">~/josh</span> ${" "}
        <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      <div
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-10 fill-mode-both"
        style={{ animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: "both" }}
      >
        {/* EXPERIENCE SECTION */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Briefcase className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight">
                Experience Log
              </h2>
              <div className="font-mono text-xs text-muted-foreground mt-0.5">
                // STATUS: ACTIVE_CAREER_PATH
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Featured Current Role (Full Width) */}
            {featuredExp &&
              (() => {
                const colors = CARD_COLORS[0];
                return (
                  <div
                    key={featuredExp.id}
                    className={`group relative rounded-xl border border-blue-500/30 bg-panel/90 backdrop-blur-md overflow-hidden transition-all duration-300 ${colors.borderHover} hover:-translate-y-1 ${colors.shadowHover}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity`}
                    />

                    <div className="relative flex items-center justify-between border-b border-border/40 bg-background/50 px-4 sm:px-6 py-3 backdrop-blur-sm">
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center p-1.5 rounded-md ${colors.iconBg} ${colors.borderActive} border mr-3`}
                        >
                          <Terminal className={`h-3.5 w-3.5 ${colors.text}`} />
                        </div>
                        <div
                          className={`font-mono text-xs ${colors.text} font-bold tracking-wider`}
                        >
                          {featuredExp.id}.exe [CURRENT]
                        </div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                        ACTIVE ROLE
                      </span>
                    </div>

                    <div className="relative p-6 sm:p-7 flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="md:w-1/3 shrink-0">
                        <div
                          className={`inline-flex px-2.5 py-1 rounded-full ${colors.iconBg} border ${colors.borderActive} font-mono text-xs ${colors.text} font-semibold mb-3`}
                        >
                          {featuredExp.range}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground tracking-tight">
                          {featuredExp.org}
                        </h3>
                        <div className="text-sm font-semibold text-primary/90 uppercase tracking-wide mt-1">
                          {featuredExp.role}
                        </div>
                      </div>

                      <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-6">
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          {featuredExp.bullets.map((b, i) => (
                            <li key={i} className="flex gap-3 leading-relaxed items-start">
                              <span
                                className={`flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-current ${colors.text} shadow-[0_0_8px_currentColor]`}
                              />
                              <span className="text-foreground/90 font-medium">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}

            {/* Remaining Roles (Even 2-column Grid) */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {otherExp.map((e, idx) => {
                const colors = CARD_COLORS[(idx + 1) % CARD_COLORS.length];
                return (
                  <div
                    key={e.id}
                    className={`group relative rounded-xl border border-border/60 bg-panel/80 backdrop-blur-md overflow-hidden transition-all duration-300 ${colors.borderHover} hover:-translate-y-1 ${colors.shadowHover} flex flex-col justify-between`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${colors.topBar} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}
                    />

                    <div>
                      <div className="relative flex items-center border-b border-border/40 bg-background/50 px-4 py-3 backdrop-blur-sm">
                        <div
                          className={`flex items-center justify-center p-1.5 rounded-md ${colors.iconBg} ${colors.borderActive} border mr-3`}
                        >
                          <Terminal className={`h-3 w-3 ${colors.text}`} />
                        </div>
                        <div
                          className={`font-mono text-xs ${colors.text} font-bold tracking-wider`}
                        >
                          {e.id}.exe
                        </div>
                      </div>

                      <div className="relative p-6">
                        <div className="mb-4">
                          <div
                            className={`inline-flex px-2 py-0.5 rounded-full ${colors.iconBg} border ${colors.borderActive} font-mono text-[10px] ${colors.text} mb-3`}
                          >
                            {e.range}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">
                            {e.org}
                          </h3>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {e.role}
                          </div>
                        </div>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                          {e.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="flex gap-2.5 leading-relaxed items-start text-xs sm:text-sm"
                            >
                              <span
                                className={`flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-current ${colors.text} shadow-[0_0_8px_currentColor]`}
                              />
                              <span className="group-hover:text-foreground/90 transition-colors">
                                {b}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div className="pt-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <GraduationCap className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 tracking-tight">
                Education Log
              </h2>
              <div className="font-mono text-xs text-muted-foreground mt-0.5">
                // STATUS: KNOWLEDGE_ACQUIRED
              </div>
            </div>
          </div>

          <div className="w-full">
            {education.map((edu) => {
              const colors = CARD_COLORS[3];
              return (
                <div
                  key={edu.id}
                  className={`group relative rounded-xl border border-emerald-500/30 bg-panel/80 backdrop-blur-md overflow-hidden transition-all duration-300 ${colors.borderHover} hover:-translate-y-1 ${colors.shadowHover}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500 opacity-60 group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="relative flex items-center justify-between border-b border-border/40 bg-background/50 px-4 sm:px-6 py-3 backdrop-blur-sm">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center p-1.5 rounded-md ${colors.iconBg} ${colors.borderActive} border mr-3`}
                      >
                        <Terminal className={`h-3.5 w-3.5 ${colors.text}`} />
                      </div>
                      <div className={`font-mono text-xs ${colors.text} font-bold tracking-wider`}>
                        {edu.id}.edu
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full ${colors.iconBg} border ${colors.borderActive} font-mono text-[11px] ${colors.text} font-semibold`}
                    >
                      {edu.range}
                    </span>
                  </div>

                  <div className="relative p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 tracking-tight">
                        {edu.institution}
                      </h3>
                      <div className="text-sm font-medium text-emerald-400/90">{edu.degree}</div>
                    </div>
                    <div className="border-t sm:border-t-0 sm:border-l border-border/40 pt-4 sm:pt-0 sm:pl-6">
                      {edu.bullets.map((b, i) => (
                        <p
                          key={i}
                          className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                        >
                          {b}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
