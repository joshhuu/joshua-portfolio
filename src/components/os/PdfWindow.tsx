import { motion, AnimatePresence, useDragControls, useMotionValue } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PdfWindowProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export function PdfWindow({
  isOpen,
  onClose,
  pdfUrl,
  title = "Joshua-Resume-2026.pdf",
}: PdfWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [exitAction, setExitAction] = useState<"close" | "minimize">("close");
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reset states and position when reopened or maximized
  useEffect(() => {
    if (isOpen) {
      setIsMaximized(false);
      setExitAction("close");
      x.set(0);
      y.set(0);
    }
  }, [isOpen, x, y]);

  useEffect(() => {
    if (isMaximized) {
      x.set(0);
      y.set(0);
    }
  }, [isMaximized, x, y]);

  // Handle window resize dynamically to ensure it fits mobile screens nicely
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMaximized) {
        setIsMaximized(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // trigger on mount
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized]);

  const windowVariants = {
    initial: { scale: 0.92, y: 16, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom: "close" | "minimize") =>
      custom === "minimize"
        ? {
            scale: 0.4,
            y: "100vh",
            opacity: 0,
            transition: {
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
          }
        : { scale: 0.92, y: 16, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center pointer-events-none",
            isMaximized ? "p-0" : "p-0 md:p-10",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Deep dark glass backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setExitAction("close");
              onClose();
            }}
          />

          <motion.div
            layout
            ref={windowRef}
            style={{ x, y }}
            drag={!isMaximized}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{ left: -500, right: 500, top: -400, bottom: 400 }}
            className={cn(
              "pointer-events-auto relative flex flex-col overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-[#1c1c1e]/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] ring-1 ring-black/5",
              isMaximized
                ? "w-full h-full rounded-none md:rounded-none border-none ring-0"
                : "w-full max-w-5xl h-[100dvh] md:h-[85vh] max-h-[900px]",
            )}
            custom={exitAction}
            variants={windowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.5 }}
          >
            {/* Title Bar (Draggable handle) */}
            <div
              onPointerDown={(e) => {
                if (!isMaximized) dragControls.start(e);
              }}
              className={cn(
                "flex h-14 flex-none items-center justify-between border-b border-white/10 bg-gradient-to-b from-white/10 to-transparent px-4 select-none relative",
                !isMaximized && "cursor-move active:cursor-grabbing",
              )}
            >
              <div className="flex items-center gap-4">
                {/* Authentic macOS Traffic Lights */}
                <div className="flex gap-2 group/lights">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExitAction("close");
                      onClose();
                    }}
                    className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f56] border border-[#e0443e] hover:bg-[#ff5f56]/90 transition-colors"
                  >
                    <span className="opacity-0 group-hover/lights:opacity-100 text-[9px] text-[#990000] font-bold leading-none mb-[1px]">
                      x
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExitAction("minimize");
                      onClose();
                    }}
                    className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ffbd2e] border border-[#dea123] hover:bg-[#ffbd2e]/90 transition-colors"
                  >
                    <span className="opacity-0 group-hover/lights:opacity-100 text-[10px] text-[#995700] font-bold leading-none mb-[1px]">
                      -
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMaximized(!isMaximized);
                      // If they want real fullscreen API, we could do it here.
                      // But filling the browser viewport is standard for web OS.
                    }}
                    className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#27c93f] border border-[#1aab29] hover:bg-[#27c93f]/90 transition-colors"
                  >
                    <span className="opacity-0 group-hover/lights:opacity-100 text-[10px] text-[#006500] font-bold leading-none mb-[1px]">
                      +
                    </span>
                  </button>
                </div>

                {/* Title */}
                <div className="flex items-center gap-2 font-mono text-[13px] text-white/80 font-medium">
                  <FileText className="h-4 w-4 text-primary" />
                  {title}
                </div>
              </div>

              <div className="flex items-center">
                <a
                  href={pdfUrl}
                  download
                  className="flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition-all shadow-sm hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Save</span>
                </a>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 bg-[#323639] relative overflow-hidden rounded-b-xl md:rounded-b-2xl">
              {/* We make the iframe slightly wider to push the ugly native scrollbar out of view */}
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="absolute inset-0 h-full border-0"
                style={{ width: "calc(100% + 20px)" }}
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
