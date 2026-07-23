import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TitleBar } from "./TitleBar";
import { Sidebar, MobileTabBar, type View } from "./Sidebar";
import { BootSequence } from "./BootSequence";
import { PanelLeft } from "lucide-react";
import { HomeView } from "./views/HomeView";
import { ProjectsView } from "./views/ProjectsView";
import { ExperienceView } from "./views/ExperienceView";
import { MissionsView } from "./views/MissionsView";
import { StackView } from "./views/StackView";
import { ContactView } from "./views/ContactView";
import { JoshAiWidget } from "./chat/JoshAiWidget";
import { PdfWindow } from "./PdfWindow";
import { MatrixRain } from "./MatrixRain";
import { soundEngine } from "@/lib/soundEngine";

const BOOT_KEY = "josh-os-booted";

export function OsShell() {
  const [view, setView] = useState<View>("home");
  const [booting, setBooting] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [pdfOpen, setPdfOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(BOOT_KEY)) {
      setBooting(false);
    }

    let keyBuffer = "";
    const onKeyDown = (e: KeyboardEvent) => {
      soundEngine.init();
      // Only play keystroke if it's a standard key
      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
        soundEngine.playKeystroke();
      }

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);

      if (keyBuffer.endsWith("sudo")) {
        const overlay = document.createElement("div");
        overlay.className =
          "fixed inset-0 z-[9999] bg-red-600/30 pointer-events-none transition-opacity duration-300";
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

  const [matrixMode, setMatrixMode] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      {matrixMode && <MatrixRain onClose={() => setMatrixMode(false)} />}
      <AnimatePresence>{booting && <BootSequence onDone={finishBoot} />}</AnimatePresence>

      <TitleBar
        view={view}
        setView={setView}
        onMaximize={() => setSidebarVisible((p) => !p)}
        onMinimize={() => {
          if (!sidebarVisible) {
            setSidebarVisible(true);
          } else if (view !== "home") {
            setView("home");
          }
        }}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <AnimatePresence initial={false}>
          {sidebarVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: -20 }}
              animate={{ width: 256, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full shrink-0 overflow-hidden hidden md:block"
            >
              {/* Force w-64 on the inner component so its layout doesn't break during animation */}
              <div className="w-64 h-full">
                <Sidebar active={view} onChange={setView} onOpenPdf={() => setPdfOpen(true)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!sidebarVisible && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
              transition={{ delay: 0.3, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSidebarVisible(true)}
              className="hidden md:flex absolute left-0 top-4 z-10 p-2 text-muted-foreground hover:text-foreground bg-panel/60 border border-l-0 border-border rounded-r-lg backdrop-blur-md shadow-sm transition-all hover:bg-panel/90 hover:pl-3"
              title="Show Sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <main
          aria-label="Portfolio content"
          className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin flex flex-col items-center"
        >
          <div className="mx-auto w-full max-w-7xl xl:max-w-[1440px] px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10 pb-32 md:pb-12 flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {view === "home" && <HomeView onNavigate={setView} />}
                {view === "projects" && <ProjectsView />}
                {view === "experience" && <ExperienceView />}
                {view === "missions" && <MissionsView />}
                {view === "stack" && <StackView />}
                {view === "contact" && <ContactView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      <MobileTabBar active={view} onChange={setView} />
      <JoshAiWidget />
      <PdfWindow isOpen={pdfOpen} onClose={() => setPdfOpen(false)} pdfUrl="/Joshua-Resume.pdf" />
      <Toaster theme="dark" />
    </div>
  );
}
