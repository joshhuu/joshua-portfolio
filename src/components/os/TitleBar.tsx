import { useEffect, useState } from "react";
import { X, Minus, Maximize2 } from "lucide-react";

export function TitleBar({ 
  view, 
  setView, 
  onMaximize,
  onMinimize
}: { 
  view?: string; 
  setView?: (v: any) => void; 
  onMaximize?: () => void; 
  onMinimize?: () => void;
}) {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-9 items-center justify-between border-b border-border bg-panel px-3 font-mono text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => { if (view !== "home" && setView) setView("home"); }}
          aria-label="Close — return to home"
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] transition-colors"
        >
          <X className="h-[9px] w-[9px] text-[#4d0000] opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={3} />
        </button>
        <button 
          onClick={() => {
            if (onMinimize) {
              onMinimize();
            } else if (view !== "home" && setView) {
              setView("home");
            }
          }}
          aria-label="Minimize"
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e] transition-colors"
        >
          <Minus className="h-[9px] w-[9px] text-[#4c2900] opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={3} />
        </button>
        <button 
          onClick={onMaximize}
          aria-label="Toggle sidebar"
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f] transition-colors"
        >
          <Maximize2 className="h-[8px] w-[8px] text-[#003d07] opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={3} />
        </button>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 text-foreground/80 whitespace-nowrap overflow-hidden max-w-[40vw] sm:max-w-none text-ellipsis text-center">
        josh.ai <span className="hidden sm:inline">— portfolio</span>
      </div>
      <div className="flex items-center">
        <span>{time}</span>
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
