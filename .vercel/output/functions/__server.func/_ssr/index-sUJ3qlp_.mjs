import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { A as AnimatePresence, m as motion, u as useDragControls } from "../_libs/framer-motion.mjs";
import { P as PanelLeft, X, M as Minus, a as Maximize2, H as House, F as FolderGit2, T as Trophy, B as Briefcase, C as Cpu, b as Mail, c as FileCodeCorner, D as Database, d as Terminal, G as Github, e as GraduationCap, f as Crosshair, g as Check, L as Linkedin, h as MessageSquare, S as Sparkles, i as Send, j as FileText, k as Download, l as ShieldCheck, m as Brain, A as Activity, n as Code, o as SquareTerminal } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function TitleBar({
  view,
  setView,
  onMaximize,
  onMinimize
}) {
  const [time, setTime] = reactExports.useState(() => formatTime(/* @__PURE__ */ new Date()));
  reactExports.useEffect(() => {
    const id = setInterval(() => setTime(formatTime(/* @__PURE__ */ new Date())), 1e3);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 items-center justify-between border-b border-border bg-panel px-3 font-mono text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            if (view !== "home" && setView) setView("home");
          },
          "aria-label": "Close — return to home",
          className: "group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-[9px] w-[9px] text-[#4d0000] opacity-0 transition-opacity group-hover:opacity-100", strokeWidth: 3 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            if (onMinimize) {
              onMinimize();
            } else if (view !== "home" && setView) {
              setView("home");
            }
          },
          "aria-label": "Minimize",
          className: "group flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e] transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-[9px] w-[9px] text-[#4c2900] opacity-0 transition-opacity group-hover:opacity-100", strokeWidth: 3 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onMaximize,
          "aria-label": "Toggle sidebar",
          className: "group flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f] transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-[8px] w-[8px] text-[#003d07] opacity-0 transition-opacity group-hover:opacity-100", strokeWidth: 3 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 text-foreground/80 whitespace-nowrap overflow-hidden max-w-[40vw] sm:max-w-none text-ellipsis text-center", children: [
      "josh.ai ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "— portfolio" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: time }) })
  ] });
}
function formatTime(d) {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
class SoundEngine {
  ctx = null;
  initialized = false;
  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }
  // A soft, low-pitch click for keyboard typing
  playKeystroke() {
    if (!this.ctx || this.ctx.state !== "running") return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }
  // A slightly higher, sharp click for UI elements (tabs, buttons)
  playClick() {
    if (!this.ctx || this.ctx.state !== "running") return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }
}
const soundEngine = typeof window !== "undefined" ? new SoundEngine() : null;
const workspaceItems = [
  { id: "home", label: "Home", icon: House },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "missions", label: "Missions", icon: Trophy }
];
const systemItems = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "stack", label: "Stack", icon: Cpu }
];
const connectItems = [
  { id: "contact", label: "Contact", icon: Mail }
];
const allItems = [...workspaceItems, ...systemItems, ...connectItems];
function NavGroup({
  title,
  items,
  active,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 last:mb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5 px-2", children: items.map((it) => {
      const Icon = it.icon;
      const isActive = active === it.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            soundEngine.playClick();
            onChange(it.id);
          },
          className: cn(
            "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-left transition-colors font-sans font-medium",
            isActive ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: it.label }),
            it.badge !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70 font-semibold", children: it.badge })
          ]
        },
        it.id
      );
    }) })
  ] });
}
function Sidebar({ active, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex h-full w-60 shrink-0 flex-col border-r border-white/5 bg-black/40 backdrop-blur-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 overflow-y-auto py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavGroup, { title: "Workspace", items: workspaceItems, active, onChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavGroup, { title: "System", items: systemItems, active, onChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavGroup, { title: "Connect", items: connectItems, active, onChange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/5 p-4 font-sans text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/90 font-medium tracking-wide text-[11px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success/60 animate-pulse-dot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success animate-flicker" })
        ] }),
        "OPEN TO WORK"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-[11px] text-white/40", children: "AI Engineer · Data Scientist" })
    ] })
  ] });
}
function MobileTabBar({ active, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: allItems.map((it) => {
    const Icon = it.icon;
    const isActive = active === it.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => {
          soundEngine.playClick();
          onChange(it.id);
        },
        className: cn(
          "flex flex-col items-center justify-center gap-1 px-2 py-3 font-sans text-[10px] min-w-[56px] flex-1 font-medium",
          isActive ? "text-white" : "text-white/40"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          it.label
        ]
      },
      it.id
    );
  }) }) });
}
const LINES = [
  "Booting josh.os...",
  "Initializing agentic systems...",
  "Loading models: Gemma4, Llama 3...",
  "Mounting projects...",
  "System ready. Welcome."
];
function BootSequence({ onDone }) {
  const [shown, setShown] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (shown >= LINES.length) {
      const t2 = setTimeout(onDone, 450);
      return () => clearTimeout(t2);
    }
    const t = setTimeout(() => setShown((n) => n + 1), 380);
    return () => clearTimeout(t);
  }, [shown, onDone]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center bg-background",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg px-6 font-mono text-sm", children: [
        LINES.slice(0, shown).map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 4 },
            animate: { opacity: 1, y: 0 },
            className: i === LINES.length - 1 ? "text-primary" : "text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/70", children: "$" }),
              " ",
              line
            ]
          },
          i
        )),
        shown < LINES.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/70", children: "$" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
        ] })
      ] })
    }
  );
}
function PdfWindow({ isOpen, onClose, pdfUrl, title = "Joshua-Resume-2026.pdf" }) {
  const [isMaximized, setIsMaximized] = reactExports.useState(false);
  const [exitAction, setExitAction] = reactExports.useState("close");
  const windowRef = reactExports.useRef(null);
  const dragControls = useDragControls();
  reactExports.useEffect(() => {
    if (isOpen) {
      setIsMaximized(false);
      setExitAction("close");
    }
  }, [isOpen]);
  reactExports.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMaximized) {
        setIsMaximized(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized]);
  const windowVariants = {
    initial: { scale: 0.92, y: 16, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom) => custom === "minimize" ? { scale: 0.4, y: "100vh", opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } : { scale: 0.92, y: 16, opacity: 0, transition: { duration: 0.2 } }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: cn(
        "fixed inset-0 z-[100] flex items-center justify-center pointer-events-none",
        isMaximized ? "p-0" : "p-0 md:p-10"
      ),
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: () => {
              setExitAction("close");
              onClose();
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            layout: true,
            ref: windowRef,
            drag: !isMaximized,
            dragControls,
            dragListener: false,
            dragMomentum: false,
            dragElastic: 0,
            dragConstraints: { left: -500, right: 500, top: -400, bottom: 400 },
            className: cn(
              "pointer-events-auto relative flex flex-col overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-[#1c1c1e]/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] ring-1 ring-black/5",
              isMaximized ? "w-full h-full rounded-none md:rounded-none border-none ring-0" : "w-full max-w-5xl h-[100dvh] md:h-[85vh] max-h-[900px]"
            ),
            custom: exitAction,
            variants: windowVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            transition: { type: "spring", damping: 25, stiffness: 350, mass: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onPointerDown: (e) => {
                    if (!isMaximized) dragControls.start(e);
                  },
                  className: cn(
                    "flex h-14 flex-none items-center justify-between border-b border-white/10 bg-gradient-to-b from-white/10 to-transparent px-4 select-none relative",
                    !isMaximized && "cursor-move active:cursor-grabbing"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 group/lights", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: (e) => {
                              e.stopPropagation();
                              setExitAction("close");
                              onClose();
                            },
                            className: "flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f56] border border-[#e0443e] hover:bg-[#ff5f56]/90 transition-colors",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover/lights:opacity-100 text-[9px] text-[#990000] font-bold leading-none mb-[1px]", children: "x" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: (e) => {
                              e.stopPropagation();
                              setExitAction("minimize");
                              onClose();
                            },
                            className: "flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ffbd2e] border border-[#dea123] hover:bg-[#ffbd2e]/90 transition-colors",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover/lights:opacity-100 text-[10px] text-[#995700] font-bold leading-none mb-[1px]", children: "-" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: (e) => {
                              e.stopPropagation();
                              setIsMaximized(!isMaximized);
                            },
                            className: "flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#27c93f] border border-[#1aab29] hover:bg-[#27c93f]/90 transition-colors",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover/lights:opacity-100 text-[10px] text-[#006500] font-bold leading-none mb-[1px]", children: "+" })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-mono text-[13px] text-white/80 font-medium", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-primary" }),
                        title
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: pdfUrl,
                        download: true,
                        className: "flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition-all shadow-sm hover:text-white",
                        onClick: (e) => e.stopPropagation(),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Save" })
                        ]
                      }
                    ) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-[#323639] relative overflow-hidden rounded-b-xl md:rounded-b-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  src: `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`,
                  className: "absolute inset-0 h-full border-0",
                  style: { width: "calc(100% + 20px)" },
                  title
                }
              ) })
            ]
          }
        )
      ]
    }
  ) });
}
function ProfileAvatar({ className }) {
  const [isFlipped, setIsFlipped] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("group perspective-[1000px] cursor-pointer", className),
      onClick: () => setIsFlipped(!isFlipped),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            animate: { rotateY: isFlipped ? 180 : 0 },
            transition: { duration: 0.7, type: "spring", stiffness: 120, damping: 15 },
            style: { transformStyle: "preserve-3d" },
            className: "relative h-40 w-40 md:h-48 md:w-48",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 backface-hidden",
                  style: { backfaceVisibility: "hidden" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full animate-morph overflow-hidden border-2 border-white/10 bg-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 animate-morph border border-white/20 mix-blend-overlay" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/images/me.jpg",
                        alt: "Photo of Joshua S",
                        className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 backface-hidden",
                  style: { backfaceVisibility: "hidden", transform: "rotateY(180deg)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full animate-morph overflow-hidden border-2 border-primary/30 bg-panel-2 shadow-[0_0_40px_rgba(124,111,205,0.3)] backdrop-blur-xl", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 animate-morph border border-primary/20 mix-blend-overlay" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/images/avatar.png",
                        alt: "Animated avatar of Joshua S waving",
                        className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      }
                    )
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 2.5 },
            className: "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-muted-foreground/50 transition-colors group-hover:text-primary/70",
            children: "Click to flip"
          }
        )
      ]
    }
  );
}
const COMMAND$5 = "whoami";
const INTERESTS = [
  "Agentic Architectures",
  "LLM Orchestration",
  "AI Products"
];
function HomeView({ onNavigate }) {
  const [typed, setTyped] = reactExports.useState("");
  const [isPdfOpen, setIsPdfOpen] = reactExports.useState(false);
  const [interestIndex, setInterestIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND$5.slice(0, i));
      if (i >= COMMAND$5.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setInterestIndex((prev) => (prev + 1) % INTERESTS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl flex flex-col-reverse md:flex-row items-start justify-between gap-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "~/josh" }),
        " $ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: typed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.9 },
          className: "mt-6 text-5xl sm:text-7xl font-bold tracking-tight",
          children: "Joshua S"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.1 },
          className: "mt-3 font-mono text-sm text-primary",
          children: "// AI Systems · Full Stack · Ships Real Products"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.3 },
          className: "mt-6 max-w-xl text-lg text-foreground/80 leading-relaxed",
          children: [
            "Obsessed with building AI systems that solve real problems. Deeply interested in",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-grid min-w-[200px] text-primary font-mono text-base font-semibold relative -translate-y-[2px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                initial: { opacity: 0, y: 15 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -15 },
                transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 },
                children: INTERESTS[interestIndex]
              },
              interestIndex
            ) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 1.5 },
          className: "mt-8 flex flex-wrap gap-3 font-mono text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => onNavigate("projects"),
                className: "rounded-md border border-border bg-panel px-4 py-2 text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-panel-2 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "$" }),
                  " ./view_projects.sh"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setIsPdfOpen(true),
                className: "rounded-md border border-border bg-panel px-4 py-2 text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-panel-2 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "$" }),
                  " cat resume.pdf"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.7 },
          className: "mt-8 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground",
          children: ["Available for freelance", "Open to internships"].map(
            (chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-full border border-border bg-panel px-3 py-1 transition-all duration-200 hover:border-primary/40 hover:bg-panel-2 hover:text-foreground cursor-default",
                children: chip
              },
              chip
            )
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.8, rotate: -10 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: { delay: 0.5, type: "spring", stiffness: 200, damping: 20 },
        className: "shrink-0 pt-6 md:pt-16 lg:pt-20 self-center md:self-start",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileAvatar, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PdfWindow,
      {
        isOpen: isPdfOpen,
        onClose: () => setIsPdfOpen(false),
        pdfUrl: "/Joshua-Resume-2026.pdf"
      }
    )
  ] });
}
const projects = [
  {
    id: "agentic-company-intel",
    name: "Agentic Company Intelligence System",
    accent: "#7c6fcd",
    short: "Agentic AI that crawls company websites and B2B datasets, extracting and structuring company/people data at scale.",
    description: "An agentic intelligence pipeline that autonomously discovers, crawls, and structures company and people data from open web sources and B2B datasets. Built end-to-end with offline LLM orchestration, multi-step planning, and automated QA. 1st place winner at InFynd AIM 2025.",
    tags: ["LangChain", "Llama 3", "LangGraph", "Python", "Web Scraping"],
    architecture: [
      "LangGraph planner → researcher → extractor → QA agents",
      "Llama 3 served locally via Ollama (offline capable)",
      "Async scraping layer with anti-bot strategies",
      "Structured output via Pydantic schemas + auto QA reports"
    ],
    results: [
      " 1st place — InFynd AIM 2025 hackathon",
      "Scaled extraction across 1000s of company pages"
    ],
    github: "https://github.com/joshhuu/B2B-Agent"
  },
  {
    id: "rural-ai",
    name: "Rural AI Assistant",
    accent: "#d97706",
    short: "Offline-first AI assistant for low-connectivity rural environments — voice stock tracking, sales logging, intent extraction.",
    description: "An offline-first assistant designed for rural shopkeepers and field workers. Voice-driven stock tracking and sales logging that runs entirely on-device, no internet required.",
    tags: ["Python", "Offline LLM", "Voice Interfaces", "Local Storage"],
    architecture: [
      "On-device speech-to-text",
      "Local LLM for intent extraction",
      "SQLite-based stock + sales ledger",
      "Sync layer for opportunistic online uploads"
    ],
    results: ["Shortlisted for Yukti Innovation Challenge (up to 2nd round)"],
    github: "https://github.com/joshhuu/rural-ai-app"
  },
  {
    id: "satellite-air",
    name: "Satellite Air Quality Downscaling",
    accent: "#2563eb",
    short: "ML models that convert low-resolution satellite pollution data into high-resolution air quality maps.",
    description: "A two-stage ML pipeline (Random Forest + CNN) that downscales coarse satellite pollution measurements into high-resolution air quality maps, validated against ground stations.",
    tags: ["Python", "Random Forest", "CNN", "Satellite Data"],
    architecture: [
      "Preprocessing of .nc satellite datasets",
      "Random Forest baseline + CNN spatial model",
      "Validation against ground-station ground truth"
    ],
    results: [
      "SIH 2024 Finalist (Smart India Hackathon)",
      ">90% validation accuracy on held-out regions"
    ],
    github: "https://github.com/joshhuu/airquality-downscaling"
  }
];
const experience = [
  {
    id: "infynd",
    range: "2026-03 → Present",
    org: "Infynd",
    role: "AI Engineering Intern",
    bullets: [
      "Building production AI pipelines and agentic systems at an AI-first B2B startup.",
      "Owning extraction, orchestration, and evaluation layers for live data workflows."
    ]
  },
  {
    id: "gfg",
    range: "2025-06 → 2026-03",
    org: "GeeksforGeeks KAHE",
    role: "Technical Head",
    bullets: [
      "Conducted hands-on workshops on Python and Data Science.",
      "Led and organized a 2-day intra-college hackathon.",
      "Mentored students on projects and technology career paths."
    ]
  },
  {
    id: "stepping-edge",
    range: "2024-06 → 2024-12",
    org: "Stepping Edge",
    role: "AI Intern",
    bullets: [
      "Built web scraping pipelines for structured data extraction and knowledge-graph organization.",
      "Implemented website summarization workflows using LangChain."
    ]
  }
];
const education = [
  {
    id: "kahe",
    range: "2023 → 2027",
    institution: "Karpagam Academy of Higher Education",
    degree: "B.Tech AI & Data Science (ongoing)",
    bullets: ["Coursework spanning AI, Data Science and Software Engineering."]
  }
];
const missions = [
  {
    id: "infynd-aim",
    title: "1st Place — InFynd AIM",
    subtitle: "Agentic AI & B2B Data Intelligence",
    year: "2025",
    status: "ACCOMPLISHED"
  },
  {
    id: "sih",
    title: "SIH Finalist",
    subtitle: "Smart India Hackathon · ISRO Problem Statement",
    year: "2024",
    status: "COMPLETED"
  },
  {
    id: "rakathon",
    title: "Top 100 / 8,000+ Teams",
    subtitle: "Rakathon 2024 · Rakuten India",
    year: "2024",
    status: "ACHIEVED"
  },
  {
    id: "gfg-ambassador",
    title: "Campus Ambassador",
    subtitle: "GeeksforGeeks",
    year: "2024",
    status: "COMPLETED"
  }
];
const contact = {
  email: "joshuasuresh08@gmail.com",
  github: "https://github.com/joshhuu",
  linkedin: "https://www.linkedin.com/in/joshuas/"
};
const COMMAND$4 = "cd ./projects && ls -la";
function ProjectsView() {
  const [activeProject, setActiveProject] = reactExports.useState(projects[0]);
  const [typed, setTyped] = reactExports.useState("");
  const [showMobilePreview, setShowMobilePreview] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND$4.slice(0, i));
      if (i >= COMMAND$4.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);
  if (!activeProject) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12 h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 font-mono text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "~/josh" }),
      " $ ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: typed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col lg:flex-row gap-6 items-start fill-mode-both",
        style: { animationDelay: `${COMMAND$4.length * 50}ms`, animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
            "w-full lg:w-1/3 flex flex-col gap-2 shrink-0",
            showMobilePreview ? "hidden lg:flex" : "flex"
          ), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2 px-2 border-b border-border/50 pb-2", children: "EXPLORER" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: projects.map((p) => {
              const isActive = activeProject.id === p.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    setActiveProject(p);
                    setShowMobilePreview(true);
                  },
                  className: cn(
                    "relative w-full flex items-center gap-3 px-4 py-3 rounded-md text-left font-mono transition-all duration-200 group overflow-hidden",
                    isActive ? "bg-panel border border-border shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "hover:bg-panel-2 border border-transparent"
                  ),
                  children: [
                    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        layoutId: "sidebar-active-highlight",
                        className: "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      FileCodeCorner,
                      {
                        className: cn(
                          "h-4 w-4 shrink-0 transition-colors duration-200",
                          isActive ? "text-blue-400" : "text-muted-foreground group-hover:text-blue-300"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(
                      "text-[13px] truncate transition-colors duration-200",
                      isActive ? "text-blue-400 font-bold" : "text-foreground group-hover:text-blue-300"
                    ), children: [
                      p.id,
                      ".exe"
                    ] }) })
                  ]
                },
                p.id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
            "w-full lg:w-2/3 min-h-[500px] rounded-xl border border-border bg-panel relative overflow-hidden flex flex-col shadow-sm",
            !showMobilePreview ? "hidden lg:flex" : "flex"
          ), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-4 py-2.5 bg-panel-2 border-b border-border shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setShowMobilePreview(false),
                  className: "lg:hidden z-10 p-1.5 -ml-2 mr-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-background/50 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m15 18-6-6 6-6" }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-full absolute left-0 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                "~/projects/",
                activeProject.id,
                ".exe"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-6 sm:p-8 relative overflow-y-auto bg-background/30 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 },
                transition: { duration: 0.2 },
                className: "h-full flex flex-col",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-3 tracking-tight", children: activeProject.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed", children: activeProject.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: activeProject.architecture && activeProject.architecture.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 font-mono text-xs text-purple-400", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5" }),
                        "SYSTEM_ARCHITECTURE"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: activeProject.architecture.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-purple-400 opacity-50", children: ">" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: item })
                      ] }, idx)) })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 font-mono text-xs text-pink-400", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-3.5 w-3.5" }),
                          "DEPENDENCIES"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: activeProject.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "rounded border border-pink-500/20 bg-pink-500/5 px-2 py-1 font-mono text-[10px] text-pink-400",
                            children: t
                          },
                          t
                        )) })
                      ] }),
                      activeProject.results && activeProject.results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 font-mono text-xs text-emerald-400", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-3.5 w-3.5" }),
                          "EXECUTION_RESULTS"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: activeProject.results.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-emerald-400 opacity-50", children: "+" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed text-foreground/90 font-medium", children: r })
                        ] }, idx)) })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-border/50 flex items-center justify-between", children: [
                    activeProject.github ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: activeProject.github,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "group flex items-center gap-2 rounded-md bg-blue-500/10 px-4 py-2 font-mono text-xs text-blue-400 transition-all hover:bg-blue-500 hover:text-white",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SOURCE_CODE" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 opacity-40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-ping" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary uppercase", children: "Sys Active" })
                    ] })
                  ] })
                ]
              },
              activeProject.id
            ) }) })
          ] })
        ]
      }
    )
  ] });
}
const COMMAND$3 = "cat experience.log && cat education.log";
const CARD_COLORS = [
  { text: "text-blue-400", borderHover: "hover:border-blue-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]", topBar: "via-blue-500", glow: "from-blue-500/10 to-transparent", iconBg: "bg-blue-500/10", borderActive: "border-blue-500/20" },
  { text: "text-purple-400", borderHover: "hover:border-purple-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]", topBar: "via-purple-500", glow: "from-purple-500/10 to-transparent", iconBg: "bg-purple-500/10", borderActive: "border-purple-500/20" },
  { text: "text-pink-400", borderHover: "hover:border-pink-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]", topBar: "via-pink-500", glow: "from-pink-500/10 to-transparent", iconBg: "bg-pink-500/10", borderActive: "border-pink-500/20" },
  { text: "text-emerald-400", borderHover: "hover:border-emerald-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]", topBar: "via-emerald-500", glow: "from-emerald-500/10 to-transparent", iconBg: "bg-emerald-500/10", borderActive: "border-emerald-500/20" },
  { text: "text-amber-400", borderHover: "hover:border-amber-500", shadowHover: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]", topBar: "via-amber-500", glow: "from-amber-500/10 to-transparent", iconBg: "bg-amber-500/10", borderActive: "border-amber-500/20" }
];
function ExperienceView() {
  const [typed, setTyped] = reactExports.useState("");
  reactExports.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND$3.slice(0, i));
      if (i >= COMMAND$3.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 font-mono text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "~/josh" }),
      " $ ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: typed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-10 fill-mode-both",
        style: { animationDelay: `${COMMAND$3.length * 50}ms`, animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5 text-blue-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight", children: "Experience Log" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground mt-1", children: "// STATUS: ACTIVE_CAREER_PATH" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2", children: experience.map((e, idx) => {
              const colors = CARD_COLORS[idx % CARD_COLORS.length];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative rounded-xl border border-border/60 bg-panel/80 backdrop-blur-md overflow-hidden transition-all duration-300 ${colors.borderHover} hover:-translate-y-1 ${colors.shadowHover}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-30 group-hover:opacity-100 transition-opacity duration-500` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${colors.topBar} to-transparent opacity-50 group-hover:opacity-100 transition-opacity` }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center border-b border-border/40 bg-background/50 px-4 py-3 backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center justify-center p-1.5 rounded-md ${colors.iconBg} ${colors.borderActive} border mr-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: `h-3 w-3 ${colors.text}` }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-mono text-xs ${colors.text} font-bold tracking-wider`, children: [
                    e.id,
                    ".exe"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `inline-flex px-2 py-0.5 rounded-full ${colors.iconBg} border ${colors.borderActive} font-mono text-[10px] ${colors.text} mb-3`, children: e.range }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground mb-1 tracking-tight", children: e.org }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide", children: e.role })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm text-muted-foreground", children: e.bullets.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 leading-relaxed items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-current ${colors.text} shadow-[0_0_8px_currentColor]` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:text-foreground/90 transition-colors", children: b })
                  ] }, i)) })
                ] })
              ] }, e.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-emerald-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 tracking-tight", children: "Education Log" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground mt-1", children: "// STATUS: KNOWLEDGE_ACQUIRED" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2", children: education.map((edu, idx) => {
              const colors = CARD_COLORS[(idx + experience.length) % CARD_COLORS.length];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative rounded-xl border border-border/60 bg-panel/80 backdrop-blur-md overflow-hidden transition-all duration-300 ${colors.borderHover} hover:-translate-y-1 ${colors.shadowHover}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-30 group-hover:opacity-100 transition-opacity duration-500` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${colors.topBar} to-transparent opacity-50 group-hover:opacity-100 transition-opacity` }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center border-b border-border/40 bg-background/50 px-4 py-3 backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center justify-center p-1.5 rounded-md ${colors.iconBg} ${colors.borderActive} border mr-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: `h-3 w-3 ${colors.text}` }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-mono text-xs ${colors.text} font-bold tracking-wider`, children: [
                    edu.id,
                    ".exe"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `inline-flex px-2 py-0.5 rounded-full ${colors.iconBg} border ${colors.borderActive} font-mono text-[10px] ${colors.text} mb-3`, children: edu.range }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground mb-1 tracking-tight", children: edu.institution }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide", children: edu.degree })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm text-muted-foreground", children: edu.bullets.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 leading-relaxed items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-current ${colors.text} shadow-[0_0_8px_currentColor]` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:text-foreground/90 transition-colors", children: b })
                  ] }, i)) })
                ] })
              ] }, edu.id);
            }) })
          ] })
        ]
      }
    )
  ] });
}
const COMMAND$2 = "./view_missions.sh";
const getIconData = (index) => {
  const icons = [
    {
      Icon: Crosshair,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      hoverBg: "group-hover:bg-red-500",
      glow: "from-red-500/20",
      corner: "border-red-500/40 group-hover:border-red-400",
      cardBorder: "hover:border-red-500/50 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]",
      dotBg: "group-hover:bg-red-500",
      gradient: "from-red-400 via-rose-400 to-orange-400"
    },
    {
      Icon: Cpu,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      hoverBg: "group-hover:bg-blue-500",
      glow: "from-blue-500/20",
      corner: "border-blue-500/40 group-hover:border-blue-400",
      cardBorder: "hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
      dotBg: "group-hover:bg-blue-500",
      gradient: "from-blue-400 via-indigo-400 to-cyan-400"
    },
    {
      Icon: Terminal,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      hoverBg: "group-hover:bg-emerald-500",
      glow: "from-emerald-500/20",
      corner: "border-emerald-500/40 group-hover:border-emerald-400",
      cardBorder: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
      dotBg: "group-hover:bg-emerald-500",
      gradient: "from-emerald-400 via-teal-400 to-green-400"
    },
    {
      Icon: ShieldCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      hoverBg: "group-hover:bg-purple-500",
      glow: "from-purple-500/20",
      corner: "border-purple-500/40 group-hover:border-purple-400",
      cardBorder: "hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
      dotBg: "group-hover:bg-purple-500",
      gradient: "from-purple-400 via-fuchsia-400 to-pink-400"
    }
  ];
  return icons[index % icons.length];
};
function MissionsView() {
  const [typed, setTyped] = reactExports.useState("");
  reactExports.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND$2.slice(0, i));
      if (i >= COMMAND$2.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 font-mono text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "~/josh" }),
      " $ ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: typed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crosshair, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 tracking-tight", children: "Active Missions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] text-muted-foreground mt-0.5", children: "// CLEARANCE_LEVEL: TOP_SECRET" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: missions.map((m, i) => {
      const { Icon, color, bg, border, hoverBg, glow, corner, cardBorder, dotBg, gradient } = getIconData(i);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { delay: COMMAND$2.length * 50 / 1e3 + i * 0.1, type: "spring", stiffness: 100 },
          className: `group relative overflow-hidden bg-panel/80 backdrop-blur-md border border-border/60 rounded-xl transition-all duration-300 ${cardBorder} hover:-translate-y-1`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${corner} transition-colors rounded-tl-xl` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${corner} transition-colors rounded-tr-xl` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${corner} transition-colors rounded-bl-xl` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${corner} transition-colors rounded-br-xl` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${glow} via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-5 sm:p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-lg ${bg} ${color} border ${border} ${hoverBg} group-hover:text-white transition-all duration-300 shadow-inner`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5", children: [
                      "FILE // ",
                      m.id
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-1.5 py-0.5 rounded-full ${bg} border ${border} font-mono text-[9px] ${color} font-bold w-fit`, children: m.year })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-md bg-background/50 backdrop-blur-sm border border-border/50 font-mono text-[9px] ${color} font-bold tracking-widest shadow-sm`, children: m.status }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `font-sans text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradient} mb-1.5 tracking-tight`, children: m.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/80 leading-relaxed group-hover:text-foreground/90 transition-colors", children: m.subtitle })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between border-t border-border/30 pt-3 font-mono text-[9px] text-muted-foreground/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 w-1.5 rounded-full bg-border ${dotBg} shadow-[0_0_8px_currentColor] transition-colors duration-300` }),
                  "DATA_SECTOR_7"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 w-2 bg-border ${dotBg} rounded-sm transition-colors duration-300` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 w-3 bg-border ${dotBg} rounded-sm transition-colors duration-300 delay-75` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 w-5 bg-border ${dotBg} rounded-sm transition-colors duration-300 delay-150` })
                ] })
              ] })
            ] })
          ]
        },
        m.id
      );
    }) })
  ] });
}
const COMMAND$1 = "npm list -g --depth=0";
const stackItems = [
  // AI / ML
  { name: "LangChain", url: "https://cdn.simpleicons.org/langchain/white" },
  { name: "LangGraph", Icon: Brain, color: "#10b981" },
  { name: "CrewAI", Icon: Brain, color: "#f59e0b" },
  { name: "HuggingFace", url: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "Ollama", url: "https://cdn.simpleicons.org/ollama/white" },
  { name: "ChromaDB", Icon: Database, color: "#ec4899" },
  { name: "Pinecone", Icon: Database, color: "#06b6d4" },
  { name: "Scikit-learn", url: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
  { name: "TensorFlow", url: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "Keras", url: "https://cdn.simpleicons.org/keras/D00000" },
  { name: "PyTorch", url: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "Langfuse", Icon: Activity, color: "#fbbf24" },
  // Languages
  { name: "Python", url: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "JavaScript", url: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "SQL", Icon: Database, color: "#3b82f6" },
  // Frontend
  { name: "React", url: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "Tailwind CSS", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Streamlit", url: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  // Backend
  { name: "FastAPI", url: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Flask", url: "https://cdn.simpleicons.org/flask/white" },
  { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "REST APIs", Icon: Code, color: "#8b5cf6" },
  // Data
  { name: "NumPy", url: "https://cdn.simpleicons.org/numpy/white" },
  { name: "Pandas", url: "https://cdn.simpleicons.org/pandas/white" },
  { name: "Web Scraping", Icon: SquareTerminal, color: "#14b8a6" },
  { name: "Pydantic v2", url: "https://cdn.simpleicons.org/pydantic/E92063" },
  // Infrastructure & Cloud
  { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Git", url: "https://cdn.simpleicons.org/git/F05032" },
  { name: "GitHub", url: "https://cdn.simpleicons.org/github/white" },
  { name: "MySQL", url: "https://cdn.simpleicons.org/mysql/4479A1" }
];
const row1 = stackItems.slice(0, 11);
const row2 = stackItems.slice(11, 22);
const row3 = stackItems.slice(22);
function StackView() {
  const [typed, setTyped] = reactExports.useState("");
  reactExports.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND$1.slice(0, i));
      if (i >= COMMAND$1.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12 overflow-hidden flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 font-mono text-sm text-muted-foreground shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "~/josh" }),
      " $ ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: typed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "animate-in fade-in slide-in-from-bottom-4 duration-1000 flex-1 flex flex-col justify-center gap-6 sm:gap-10 pause-on-hover mask-edges fill-mode-both",
        style: { animationDelay: `${COMMAND$1.length * 50}ms`, animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeTrack, { items: row1, reverse: false, speed: "40s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeTrack, { items: row2, reverse: true, speed: "45s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeTrack, { items: row3, reverse: false, speed: "35s" })
        ]
      }
    )
  ] });
}
function MarqueeTrack({ items, reverse, speed }) {
  const duplicated = [...items, ...items, ...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex w-max gap-4 sm:gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`,
      style: { animationDuration: speed },
      children: duplicated.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 sm:gap-4 rounded-xl border border-border bg-panel px-5 py-3 sm:px-6 sm:py-4 transition-colors hover:border-primary/50 hover:bg-panel-2",
          children: [
            item.url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: item.name, loading: "lazy", className: "h-6 w-6 sm:h-8 sm:w-8 object-contain" }) : item.Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(item.Icon, { className: "h-6 w-6 sm:h-8 sm:w-8", style: { color: item.color } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-6 w-6 sm:h-8 sm:w-8 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm sm:text-base font-medium text-foreground/90 whitespace-nowrap", children: item.name })
          ]
        },
        i
      ))
    }
  );
}
const COMMAND = "ssh joshuas.me -p 22";
function ContactView() {
  const [copied, setCopied] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ name: "", email: "", message: "" });
  const [sending, setSending] = reactExports.useState(false);
  const [typed, setTyped] = reactExports.useState("");
  reactExports.useEffect(() => {
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
    toast.success("email copied");
    setTimeout(() => setCopied(false), 1500);
  };
  const send = async (e) => {
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
        body: JSON.stringify(form)
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12 w-full max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 font-mono text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "~/josh" }),
      " $ ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: typed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col md:flex-row gap-12 items-start mt-8 fill-mode-both",
        style: { animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground mb-4", children: "Let's build something." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed max-w-md", children: "Open to internships, freelance opportunities, and interesting conversations. Feel free to reach out directly via the form or connect through my networks." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: copyEmail,
                  className: "flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group",
                  title: "Copy Email",
                  children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-6 w-6 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://cdn.simpleicons.org/gmail/EA4335", alt: "Gmail", loading: "lazy", className: "h-6 w-6 group-hover:scale-110 transition-transform" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: contact.github,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group",
                  title: "GitHub",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://cdn.simpleicons.org/github/white", alt: "GitHub", loading: "lazy", className: "h-6 w-6 group-hover:scale-110 transition-transform" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: contact.linkedin,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group",
                  title: "LinkedIn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-6 w-6 text-[#0A66C2] fill-[#0A66C2] group-hover:scale-110 transition-transform" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://instagram.com/sjoshua08",
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex items-center justify-center h-14 w-14 rounded-full bg-panel hover:bg-panel-2 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group",
                  title: "Instagram",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://cdn.simpleicons.org/instagram/E4405F", alt: "Instagram", loading: "lazy", className: "h-6 w-6 group-hover:scale-110 transition-transform" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full max-w-md bg-panel/80 backdrop-blur-xl border border-border shadow-2xl shadow-black/40 rounded-2xl p-6 sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-6", children: "Send a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: send, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-name", className: "text-xs font-medium text-muted-foreground ml-1", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "contact-name",
                    value: form.name,
                    onChange: (e) => setForm({ ...form, name: e.target.value }),
                    placeholder: "John Doe",
                    maxLength: 100,
                    className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-email", className: "text-xs font-medium text-muted-foreground ml-1", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "contact-email",
                    value: form.email,
                    onChange: (e) => setForm({ ...form, email: e.target.value }),
                    placeholder: "john@example.com",
                    type: "email",
                    maxLength: 320,
                    className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-message", className: "text-xs font-medium text-muted-foreground ml-1", children: "Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "contact-message",
                    value: form.message,
                    onChange: (e) => setForm({ ...form, message: e.target.value }),
                    placeholder: "How can I help you?",
                    rows: 4,
                    maxLength: 5e3,
                    className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none resize-none transition-all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: sending,
                  className: "w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold transition-all hover:bg-primary/90 disabled:opacity-70 shadow-lg shadow-primary/20",
                  children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" }),
                    "Sending..."
                  ] }) : "Send Message"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
const SUGGESTIONS = [
  "What has Josh built?",
  "What's his AI stack?",
  "Is he available for freelance?"
];
const BLOCKED_PHRASES = [
  "ignore all previous instructions",
  "ignore previous instructions",
  "disregard all instructions",
  "disregard your instructions",
  "you are now",
  "forget your instructions",
  "new persona",
  "act as",
  "pretend you are",
  "pretend to be",
  "roleplay as",
  "your new instructions",
  "override instructions",
  "system prompt",
  "reveal your prompt",
  "show your prompt",
  "print your instructions",
  "what are your instructions",
  "what is your system prompt",
  "jailbreak",
  "dan mode",
  "developer mode"
];
const MAX_INPUT_LENGTH = 500;
function isBlocked(text) {
  const lower = text.toLowerCase().trim();
  return BLOCKED_PHRASES.some((phrase) => lower.includes(phrase));
}
function JoshAiWidget() {
  const [open, setOpen] = reactExports.useState(false);
  const [input, setInput] = reactExports.useState("");
  const [messages, setMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  const dragControls = useDragControls();
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);
  const send = async (text) => {
    if (!text.trim() || loading) return;
    if (isBlocked(text)) {
      toast.error("that kind of message isn't supported");
      setMessages((m) => [
        ...m,
        { role: "user", content: text },
        {
          role: "assistant",
          content: "I'm josh.ai — I'm here to tell you about Josh's work and skills. I can't help with that request."
        }
      ]);
      setInput("");
      return;
    }
    setInput("");
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      if (!res.ok) {
        let errorMsg = "Something went wrong. Please try again.";
        if (res.status === 429) {
          let errorType = "";
          try {
            const json = await res.json();
            errorType = json.error ?? "";
          } catch {
          }
          if (errorType === "quota") {
            toast.error("daily AI quota exhausted");
            errorMsg = "josh.ai has hit its daily AI limit. It resets at midnight — come back tomorrow!";
          } else {
            toast.error("slow down — rate limited");
            errorMsg = "josh.ai is thinking too fast! Wait a moment and try again.";
          }
        } else if (res.status === 400) {
          toast.error("message not supported");
          errorMsg = "I'm josh.ai — I'm here to tell you about Josh's work and skills. I can't help with that request.";
        } else {
          toast.error("josh.ai is offline");
          errorMsg = "josh.ai is currently unreachable. Please try again later.";
        }
        setMessages((m) => [...m, { role: "assistant", content: errorMsg }]);
        return;
      }
      setLoading(false);
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      let done = false;
      let replyText = "";
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.trim().startsWith("data:"));
          for (const line of lines) {
            const dataStr = line.replace(/^data:\s*/, "").trim();
            if (dataStr === "[DONE]") break;
            try {
              const data = JSON.parse(dataStr);
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                replyText += content;
                setMessages((m) => {
                  const newM = [...m];
                  newM[newM.length - 1] = { role: "assistant", content: replyText };
                  return newM;
                });
              }
            } catch {
            }
          }
        }
      }
    } catch {
      toast.error("connection failed");
    } finally {
      setLoading(false);
    }
  };
  const charsLeft = MAX_INPUT_LENGTH - input.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        "aria-label": open ? "Close josh.ai chat assistant" : "Open josh.ai chat assistant",
        "aria-expanded": open,
        className: "fixed bottom-20 md:bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-primary/40 bg-panel/95 px-4 py-2.5 font-mono text-xs text-foreground shadow-lg backdrop-blur hover:bg-panel-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success/60 animate-pulse-dot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })
          ] }),
          "ask josh.ai",
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        role: "dialog",
        "aria-label": "josh.ai chat assistant",
        "aria-modal": "true",
        initial: { opacity: 0, y: 12, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.96 },
        transition: { duration: 0.18 },
        drag: true,
        dragControls,
        dragListener: false,
        dragMomentum: false,
        dragElastic: 0.1,
        className: "fixed bottom-[72px] md:bottom-20 left-4 right-4 md:left-auto md:right-5 z-50 md:w-[380px] rounded-xl border border-border bg-panel shadow-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onPointerDown: (e) => dragControls.start(e),
              className: "flex items-center justify-between border-b border-border px-4 py-3 cursor-move select-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-mono text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "josh.ai" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setOpen(false),
                    "aria-label": "Close chat",
                    className: "text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: scrollRef,
              className: "max-h-80 min-h-[200px] overflow-y-auto overflow-x-hidden px-4 py-3 scrollbar-thin",
              children: [
                messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ask anything about Josh — projects, stack, availability." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => send(s),
                      className: "rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:bg-panel-2 hover:text-foreground",
                      children: s
                    },
                    s
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  messages.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: m.role === "user" ? "flex justify-end" : "", children: m.role === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[85%] rounded-lg bg-primary/20 border border-primary/30 px-3 py-2 text-sm text-foreground", children: m.content }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/90 whitespace-pre-wrap break-words", children: m.content }) }, i)),
                  loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground", children: [
                    "josh.ai is thinking",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret" })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                send(input);
              },
              className: "border-t border-border p-2 space-y-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: input,
                      onChange: (e) => setInput(e.target.value),
                      maxLength: MAX_INPUT_LENGTH,
                      "aria-label": "Message for josh.ai",
                      placeholder: "ask anything about josh...",
                      className: "flex-1 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: loading || !input.trim(),
                      "aria-label": "Send message",
                      className: "rounded-md border border-primary/40 bg-primary/15 p-2 text-primary hover:bg-primary/25 disabled:opacity-50",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] }),
                input.length > 400 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: `text-right font-mono text-[10px] ${charsLeft <= 50 ? "text-destructive" : "text-muted-foreground"}`,
                    children: [
                      charsLeft,
                      " left"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
function MatrixRain({ onClose }) {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[9999] bg-black cursor-pointer", onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "block" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 text-[#0f0] font-mono text-sm bg-black/50 px-2 py-1 rounded", children: "Press ESC or click to exit" })
  ] });
}
const BOOT_KEY = "josh-os-booted";
function OsShell() {
  const [view, setView] = reactExports.useState("home");
  const [booting, setBooting] = reactExports.useState(true);
  const [sidebarVisible, setSidebarVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(BOOT_KEY)) {
      setBooting(false);
    }
    let keyBuffer = "";
    const onKeyDown = (e) => {
      soundEngine.init();
      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
        soundEngine.playKeystroke();
      }
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);
      if (keyBuffer.endsWith("sudo")) {
        const overlay = document.createElement("div");
        overlay.className = "fixed inset-0 z-[9999] bg-red-600/30 pointer-events-none transition-opacity duration-300";
        document.body.appendChild(overlay);
        setTimeout(() => {
          overlay.style.opacity = "0";
          setTimeout(() => overlay.remove(), 300);
        }, 150);
      }
      if (keyBuffer.endsWith("matrix")) {
        setMatrixMode(true);
      }
    };
    const onClick = () => {
      soundEngine.init();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  }, []);
  const finishBoot = () => {
    sessionStorage.setItem(BOOT_KEY, "1");
    setBooting(false);
  };
  const [matrixMode, setMatrixMode] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen w-full flex-col overflow-hidden", children: [
    matrixMode && /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixRain, { onClose: () => setMatrixMode(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: booting && /* @__PURE__ */ jsxRuntimeExports.jsx(BootSequence, { onDone: finishBoot }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TitleBar,
      {
        view,
        setView,
        onMaximize: () => setSidebarVisible((p) => !p),
        onMinimize: () => {
          if (!sidebarVisible) {
            setSidebarVisible(true);
          } else if (view !== "home") {
            setView("home");
          }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: sidebarVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { width: 0, opacity: 0, x: -20 },
          animate: { width: 224, opacity: 1, x: 0 },
          exit: { width: 0, opacity: 0, x: -20 },
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          className: "h-full shrink-0 overflow-hidden hidden md:block",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-56 h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { active: view, onChange: setView }) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !sidebarVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -10, transition: { duration: 0.1 } },
          transition: { delay: 0.3, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          onClick: () => setSidebarVisible(true),
          className: "hidden md:flex absolute left-0 top-4 z-10 p-2 text-muted-foreground hover:text-foreground bg-panel/60 border border-l-0 border-border rounded-r-lg backdrop-blur-md shadow-sm transition-all hover:bg-panel/90 hover:pl-3",
          title: "Show Sidebar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeft, { className: "h-4 w-4" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { "aria-label": "Portfolio content", className: "flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl p-6 md:p-10 pb-32 md:pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -4 },
          transition: { duration: 0.18 },
          children: [
            view === "home" && /* @__PURE__ */ jsxRuntimeExports.jsx(HomeView, { onNavigate: setView }),
            view === "projects" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsView, {}),
            view === "experience" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceView, {}),
            view === "missions" && /* @__PURE__ */ jsxRuntimeExports.jsx(MissionsView, {}),
            view === "stack" && /* @__PURE__ */ jsxRuntimeExports.jsx(StackView, {}),
            view === "contact" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactView, {})
          ]
        },
        view
      ) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTabBar, { active: view, onChange: setView }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JoshAiWidget, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark" })
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(OsShell, {});
}
export {
  Index as component
};
