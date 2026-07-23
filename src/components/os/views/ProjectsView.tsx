import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, FolderGit2, FileCode2, Terminal, Cpu, Database } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const COMMAND = "cd ./projects && ls -la";

export function ProjectsView() {
  // Default to the first project being selected
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [typed, setTyped] = useState("");
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);

  if (!activeProject) return null; // Safety fallback

  return (
    <div className="pb-12 h-full flex flex-col w-full">
      <div className="mb-6 font-mono text-sm text-muted-foreground">
        <span className="text-primary">~/josh</span> ${" "}
        <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      {/* Split Layout Container */}
      <div
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col lg:flex-row gap-6 items-stretch fill-mode-both flex-1"
        style={{ animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: "both" }}
      >
        {/* LEFT COLUMN: File Explorer */}
        <div
          className={cn(
            "w-full lg:w-80 xl:w-96 flex flex-col gap-3 shrink-0 justify-between",
            showMobilePreview ? "hidden lg:flex" : "flex",
          )}
        >
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3 px-2 border-b border-border/50 pb-2.5 font-semibold">
              PROJECTS EXPLORER
            </div>
            <div className="space-y-2.5">
              {projects.map((p) => {
                const isActive = activeProject.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProject(p);
                      setShowMobilePreview(true);
                    }}
                    className={cn(
                      "relative w-full flex items-center gap-3.5 px-4 py-4 rounded-xl text-left font-mono transition-all duration-200 group overflow-hidden cursor-pointer",
                      isActive
                        ? "bg-panel border border-border shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                        : "hover:bg-panel-2 border border-transparent",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-highlight"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                      />
                    )}
                    <FileCode2
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors duration-200",
                        isActive
                          ? "text-blue-400"
                          : "text-muted-foreground group-hover:text-blue-300",
                      )}
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span
                        className={cn(
                          "text-sm truncate transition-colors duration-200 font-bold",
                          isActive ? "text-blue-400" : "text-foreground group-hover:text-blue-300",
                        )}
                      >
                        {p.id}.exe
                      </span>
                      <span className="text-xs text-muted-foreground/70 truncate mt-0.5">
                        {p.tags.slice(0, 3).join(" · ")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block p-5 rounded-2xl border border-border/60 bg-panel/50 backdrop-blur-sm font-mono text-xs text-muted-foreground">
            <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1.5">
              // SELECTION TIP
            </div>
            Click any executable project file above to inspect system specs, live architecture, and
            github repositories.
          </div>
        </div>

        {/* RIGHT COLUMN: Preview Pane */}
        <div
          className={cn(
            "w-full flex-1 min-h-[580px] lg:min-h-[640px] rounded-2xl border border-border bg-panel relative overflow-hidden flex flex-col shadow-xl",
            !showMobilePreview ? "hidden lg:flex" : "flex",
          )}
        >
          {/* Top Bar */}
          <div className="flex items-center px-5 py-3 bg-panel-2 border-b border-border shrink-0">
            <button
              onClick={() => setShowMobilePreview(false)}
              className="lg:hidden z-10 p-1.5 -ml-2 mr-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-background/50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div className="flex items-center justify-center w-full absolute left-0 pointer-events-none">
              <span className="font-mono text-xs sm:text-sm text-muted-foreground truncate px-8 font-medium">
                ~/projects/{activeProject.id}.exe
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 sm:p-9 lg:p-10 relative overflow-y-auto bg-background/30 backdrop-blur-sm flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-between space-y-8"
              >
                {/* Header & Body */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 mb-3 tracking-tight leading-snug">
                      {activeProject.name}
                    </h2>
                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-normal">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column in Preview */}
                    <div className="space-y-6">
                      {activeProject.architecture && activeProject.architecture.length > 0 && (
                        <div>
                          <div className="mb-4 flex items-center gap-2 font-mono text-xs sm:text-sm text-purple-400 font-bold tracking-wider">
                            <Cpu className="h-4 w-4" />
                            SYSTEM_ARCHITECTURE
                          </div>
                          <ul className="space-y-3">
                            {activeProject.architecture.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                              >
                                <span className="mt-0.5 text-purple-400 opacity-70 font-bold">
                                  &gt;
                                </span>
                                <span className="leading-relaxed text-foreground/90 font-medium">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column in Preview */}
                    <div className="space-y-8">
                      <div>
                        <div className="mb-4 flex items-center gap-2 font-mono text-xs sm:text-sm text-pink-400 font-bold tracking-wider">
                          <Database className="h-4 w-4" />
                          DEPENDENCIES & TECH
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {activeProject.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 font-mono text-xs text-pink-400 font-semibold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {activeProject.results && activeProject.results.length > 0 && (
                        <div>
                          <div className="mb-4 flex items-center gap-2 font-mono text-xs sm:text-sm text-emerald-400 font-bold tracking-wider">
                            <Terminal className="h-4 w-4" />
                            EXECUTION_RESULTS
                          </div>
                          <ul className="space-y-3">
                            {activeProject.results.map((r, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                              >
                                <span className="mt-0.5 text-emerald-400 opacity-70 font-bold">
                                  +
                                </span>
                                <span className="leading-relaxed text-foreground/90 font-semibold">
                                  {r}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                  {activeProject.github ? (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 px-5 py-3 font-mono text-xs sm:text-sm text-blue-400 font-bold transition-all hover:bg-blue-500 hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                      <span>VIEW_SOURCE_CODE</span>
                    </a>
                  ) : (
                    <div />
                  )}
                  <div className="flex items-center gap-2.5 opacity-80">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      Sys Active
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
