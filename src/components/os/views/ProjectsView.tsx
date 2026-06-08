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
    <div className="pb-12 h-full flex flex-col">
      <div className="mb-6 font-mono text-sm text-muted-foreground">
        <span className="text-primary">~/josh</span> $ <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      {/* Split Layout Container */}
      <div 
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col lg:flex-row gap-6 items-start fill-mode-both"
        style={{ animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: 'both' }}
      >
        
        {/* LEFT COLUMN: File Explorer */}
        <div className={cn(
          "w-full lg:w-1/3 flex flex-col gap-2 shrink-0",
          showMobilePreview ? "hidden lg:flex" : "flex"
        )}>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2 px-2 border-b border-border/50 pb-2">
            EXPLORER
          </div>
          <div className="space-y-1">
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
                    "relative w-full flex items-center gap-3 px-4 py-3 rounded-md text-left font-mono transition-all duration-200 group overflow-hidden",
                    isActive ? "bg-panel border border-border shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "hover:bg-panel-2 border border-transparent"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-highlight"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                    />
                  )}
                  <FileCode2 
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors duration-200", 
                      isActive ? "text-blue-400" : "text-muted-foreground group-hover:text-blue-300"
                    )} 
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className={cn(
                      "text-[13px] truncate transition-colors duration-200",
                      isActive ? "text-blue-400 font-bold" : "text-foreground group-hover:text-blue-300"
                    )}>
                      {p.id}.exe
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Preview Pane */}
        <div className={cn(
          "w-full lg:w-2/3 min-h-[500px] rounded-xl border border-border bg-panel relative overflow-hidden flex flex-col shadow-sm",
          !showMobilePreview ? "hidden lg:flex" : "flex"
        )}>
          {/* Top Bar */}
          <div className="flex items-center px-4 py-2.5 bg-panel-2 border-b border-border shrink-0">
            <button 
              onClick={() => setShowMobilePreview(false)}
              className="lg:hidden z-10 p-1.5 -ml-2 mr-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-background/50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="flex items-center justify-center w-full absolute left-0 pointer-events-none">
               <span className="font-mono text-xs text-muted-foreground">
                ~/projects/{activeProject.id}.exe
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 sm:p-8 relative overflow-y-auto bg-background/30 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-3 tracking-tight">
                    {activeProject.name}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                  {/* Left Column in Preview */}
                  <div className="space-y-6">
                    {activeProject.architecture && activeProject.architecture.length > 0 && (
                      <div>
                        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-purple-400">
                          <Cpu className="h-3.5 w-3.5" />
                          SYSTEM_ARCHITECTURE
                        </div>
                        <ul className="space-y-3">
                          {activeProject.architecture.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="mt-0.5 text-purple-400 opacity-50">&gt;</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column in Preview */}
                  <div className="space-y-8">
                    <div>
                      <div className="mb-3 flex items-center gap-2 font-mono text-xs text-pink-400">
                        <Database className="h-3.5 w-3.5" />
                        DEPENDENCIES
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-pink-500/20 bg-pink-500/5 px-2 py-1 font-mono text-[10px] text-pink-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {activeProject.results && activeProject.results.length > 0 && (
                      <div>
                        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-emerald-400">
                          <Terminal className="h-3.5 w-3.5" />
                          EXECUTION_RESULTS
                        </div>
                        <ul className="space-y-3">
                          {activeProject.results.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="mt-0.5 text-emerald-400 opacity-50">+</span>
                              <span className="leading-relaxed text-foreground/90 font-medium">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
                  {activeProject.github ? (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 rounded-md bg-blue-500/10 px-4 py-2 font-mono text-xs text-blue-400 transition-all hover:bg-blue-500 hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                      <span>SOURCE_CODE</span>
                    </a>
                  ) : (
                    <div />
                  )}
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    <span className="font-mono text-[10px] text-primary uppercase">Sys Active</span>
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
