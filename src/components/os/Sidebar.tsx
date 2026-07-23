import { useState, useEffect } from "react";
import {
  Home,
  FolderGit2,
  Briefcase,
  Trophy,
  Cpu,
  Mail,
  Github,
  Linkedin,
  FileText,
  Activity,
  Sparkles,
} from "lucide-react";
import { projects, missions, contact } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { soundEngine } from "@/lib/soundEngine";

export type View = "home" | "projects" | "experience" | "missions" | "stack" | "contact";

type NavItem = {
  id: View;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
};

const workspaceItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2, badge: projects.length },
  { id: "missions", label: "Missions", icon: Trophy, badge: missions.length },
];

const systemItems: NavItem[] = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "stack", label: "Tech Stack", icon: Cpu, badge: "20+" },
];

const connectItems: NavItem[] = [{ id: "contact", label: "Contact", icon: Mail }];

const allItems = [...workspaceItems, ...systemItems, ...connectItems];

function NavGroup({
  title,
  items,
  active,
  onChange,
}: {
  title: string;
  items: NavItem[];
  active: View;
  onChange: (v: View) => void;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="mb-1.5 px-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-white/30">
        {title}
      </h3>
      <div className="space-y-1 px-2">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => {
                soundEngine.playClick();
                onChange(it.id);
              }}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs text-left transition-all font-sans font-medium",
                isActive
                  ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10 font-semibold"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gradient-to-b from-blue-400 to-purple-500" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 transition-transform group-hover:scale-110",
                  isActive ? "text-blue-400" : "text-white/50",
                )}
              />
              <span className="flex-1">{it.label}</span>
              {it.badge !== undefined && (
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold transition-colors",
                    isActive
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-white/5 text-white/40 group-hover:text-white/70",
                  )}
                >
                  {it.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar({
  active,
  onChange,
  onOpenPdf,
}: {
  active: View;
  onChange: (v: View) => void;
  onOpenPdf?: () => void;
}) {
  const [cpuLoad, setCpuLoad] = useState(38);

  // Dynamic live CPU metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(32 + Math.random() * 16));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden md:flex h-full w-64 shrink-0 flex-col border-r border-white/10 bg-[#121214]/90 backdrop-blur-2xl select-none">
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <NavGroup title="Workspace" items={workspaceItems} active={active} onChange={onChange} />
        <NavGroup title="System" items={systemItems} active={active} onChange={onChange} />
        <NavGroup title="Connect" items={connectItems} active={active} onChange={onChange} />

        {/* Live OS Diagnostics Widget */}
        <div className="mx-2 mt-4 mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground mb-2">
            <span className="flex items-center gap-1.5 text-white/80 font-bold uppercase tracking-wider">
              <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
              OS Diagnostics
            </span>
            <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              ONLINE
            </span>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            <div>
              <div className="flex justify-between text-white/60 mb-1 text-[10px]">
                <span>CPU Load</span>
                <span className="text-blue-400 font-bold">{cpuLoad}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${cpuLoad}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-white/50">
              <span>
                Kernel: <strong className="text-white/80 font-normal">v2.4-josh</strong>
              </span>
              <span>
                Latency: <strong className="text-emerald-400 font-normal">14ms</strong>
              </span>
            </div>
          </div>
        </div>

        {/* AI Agent Status Card */}
        <div className="mx-2 mb-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div className="flex items-center justify-between font-mono text-[10px] mb-2">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              AI CORE
            </span>
            <span className="flex items-center gap-1 text-[9px] text-cyan-300 font-extrabold bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30 tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 animate-ping opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              ACTIVE
            </span>
          </div>
          <div className="font-mono text-[10px] text-cyan-200/70 flex items-center justify-between">
            <span>
              Model: <strong className="text-white font-medium">Josh-AI v2</strong>
            </span>
            <span>
              State: <strong className="text-cyan-300 font-semibold">Ready</strong>
            </span>
          </div>
        </div>

        {/* Quick Social & Resume Hub */}
        <div className="mx-2 mb-2 space-y-1.5">
          <h3 className="px-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-white/30 mb-1">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-1.5 font-sans text-xs">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span className="text-[11px] truncate">GitHub</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-[11px] truncate">LinkedIn</span>
            </a>
          </div>

          {onOpenPdf && (
            <button
              onClick={() => {
                soundEngine?.playClick();
                onOpenPdf();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 text-xs text-primary font-medium transition-all shadow-sm group mt-1.5"
            >
              <FileText className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span>View Resume PDF</span>
            </button>
          )}
        </div>
      </nav>

      {/* Audio Engine Controls & Status Footer */}
      <div className="border-t border-white/10 bg-black/40 p-3.5 font-sans text-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/90 font-medium tracking-wide text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-flicker" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-400">
              OPEN TO WORK
            </span>
          </div>

          <span className="font-mono text-[9px] text-white/40 border border-white/10 px-1.5 py-0.5 rounded bg-white/5">
            READY
          </span>
        </div>

        <div className="text-[11px] text-white/50 leading-tight">
          AI Engineer & Full-Stack Developer
        </div>
      </div>
    </aside>
  );
}

export function MobileTabBar({ active, onChange }: { active: View; onChange: (v: View) => void }) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur-2xl">
      <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {allItems.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => {
                soundEngine.playClick();
                onChange(it.id);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-2 py-3 font-sans text-[10px] min-w-[56px] flex-1 font-medium",
                isActive ? "text-white" : "text-white/40",
              )}
            >
              <Icon className="h-4 w-4" />
              {it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
