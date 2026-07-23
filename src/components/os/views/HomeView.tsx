import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { View } from "../Sidebar";
import { PdfWindow } from "../PdfWindow";
import { ProfileAvatar } from "../ProfileAvatar";

const COMMAND = "whoami";
const INTERESTS = ["Agentic Architectures", "LLM Orchestration", "AI Products"];

export function HomeView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const [typed, setTyped] = useState("");
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [interestIndex, setInterestIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setInterestIndex((prev) => (prev + 1) % INTERESTS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 pt-4 lg:pt-10">
      <div className="flex-1 w-full">
        <div className="font-mono text-sm sm:text-base text-muted-foreground">
          <span className="text-primary font-bold">~/josh</span> ${" "}
          <span className="text-foreground">{typed}</span>
          <span className="caret" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground"
        >
          Joshua S
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-4 font-mono text-sm sm:text-base text-primary font-semibold tracking-wide"
        >
          // AI Systems · Full Stack · Ships Real Products
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl lg:text-2xl text-foreground/85 leading-relaxed font-normal"
        >
          Obsessed with building AI systems that solve real problems. Deeply interested in{" "}
          <span className="inline-grid min-w-[240px] text-primary font-mono text-lg sm:text-xl font-bold relative -translate-y-[2px]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={interestIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              >
                {INTERESTS[interestIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-10 flex flex-wrap gap-4 font-mono text-sm sm:text-base"
        >
          <button
            onClick={() => onNavigate("projects")}
            className="rounded-xl border border-border bg-panel px-6 py-3.5 text-foreground font-semibold transition-all duration-200 hover:border-primary/60 hover:bg-panel-2 hover:shadow-lg cursor-pointer active:scale-95"
          >
            <span className="text-primary">$</span> ./view_projects.sh
          </button>
          <button
            onClick={() => setIsPdfOpen(true)}
            className="rounded-xl border border-border bg-panel px-6 py-3.5 text-foreground font-semibold transition-all duration-200 hover:border-primary/60 hover:bg-panel-2 hover:shadow-lg cursor-pointer active:scale-95"
          >
            <span className="text-primary">$</span> cat resume.pdf
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-10 flex flex-wrap gap-3 font-mono text-xs sm:text-sm text-muted-foreground"
        >
          {["Available for freelance", "Open to Full-time Opportunities"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border/80 bg-panel/70 backdrop-blur-md px-4 py-1.5 transition-all duration-200 hover:border-primary/50 hover:bg-panel-2 hover:text-foreground cursor-default"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="shrink-0 self-center lg:self-auto py-4"
      >
        <ProfileAvatar />
      </motion.div>

      <PdfWindow
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl="/Joshua-Resume-2026.pdf"
      />
    </div>
  );
}
