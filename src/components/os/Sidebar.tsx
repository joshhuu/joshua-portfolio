import { Home, FolderGit2, Briefcase, Trophy, Cpu, Mail } from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { soundEngine } from "@/lib/soundEngine";

export type View = "home" | "projects" | "experience" | "missions" | "stack" | "contact";

type NavItem = { id: View; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number };

const workspaceItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "missions", label: "Missions", icon: Trophy },
];

const systemItems: NavItem[] = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "stack", label: "Stack", icon: Cpu },
];

const connectItems: NavItem[] = [
  { id: "contact", label: "Contact", icon: Mail },
];

const allItems = [...workspaceItems, ...systemItems, ...connectItems];

function NavGroup({ 
  title, 
  items, 
  active, 
  onChange 
}: { 
  title: string; 
  items: NavItem[]; 
  active: View; 
  onChange: (v: View) => void 
}) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25">
        {title}
      </h3>
      <div className="space-y-0.5 px-2">
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
                "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-left transition-colors font-sans font-medium",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{it.label}</span>
              {it.badge !== undefined && (
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70 font-semibold">
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

export function Sidebar({ active, onChange }: { active: View; onChange: (v: View) => void }) {
  return (
    <aside className="hidden md:flex h-full w-60 shrink-0 flex-col border-r border-white/5 bg-black/40 backdrop-blur-2xl">
      <nav className="flex-1 overflow-y-auto py-4">
        <NavGroup title="Workspace" items={workspaceItems} active={active} onChange={onChange} />
        <NavGroup title="System" items={systemItems} active={active} onChange={onChange} />
        <NavGroup title="Connect" items={connectItems} active={active} onChange={onChange} />
      </nav>

      <div className="border-t border-white/5 p-4 font-sans text-xs">
        <div className="flex items-center gap-2 text-white/90 font-medium tracking-wide text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success animate-flicker" />
          </span>
          OPEN TO WORK
        </div>
        <div className="mt-1.5 text-[11px] text-white/40">AI Engineer · Data Scientist</div>
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
