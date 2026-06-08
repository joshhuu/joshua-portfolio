import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { View } from "../Sidebar";
import { PdfWindow } from "../PdfWindow";
import { ProfileAvatar } from "../ProfileAvatar";


const COMMAND = "whoami";
const INTERESTS = [
  "Agentic Architectures",
  "LLM Orchestration",
  "AI Products"
];

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
    <div className="max-w-4xl flex flex-col-reverse md:flex-row items-start justify-between gap-10">
      <div className="flex-1">
        <div className="font-mono text-sm text-muted-foreground">
        <span className="text-primary">~/josh</span> $ <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-5xl sm:text-7xl font-bold tracking-tight"
      >
        Joshua S
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-3 font-mono text-sm text-primary"
      >
        // AI Systems · Full Stack · Ships Real Products
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-6 max-w-xl text-lg text-foreground/80 leading-relaxed"
      >
        Obsessed with building AI systems that solve real problems. 
        Deeply interested in{" "}
        <span className="inline-grid min-w-[200px] text-primary font-mono text-base font-semibold relative -translate-y-[2px]">
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
        className="mt-8 flex flex-wrap gap-3 font-mono text-sm"
      >
        <button
          onClick={() => onNavigate("projects")}
          className="rounded-md border border-border bg-panel px-4 py-2 text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-panel-2 cursor-pointer"
        >
          <span className="text-primary">$</span> ./view_projects.sh
        </button>
        <button
          onClick={() => setIsPdfOpen(true)}
          className="rounded-md border border-border bg-panel px-4 py-2 text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-panel-2 cursor-pointer"
        >
          <span className="text-primary">$</span> cat resume.pdf
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="mt-8 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground"
      >
        {["Available for freelance", "Open to internships"].map(
          (chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-panel px-3 py-1 transition-all duration-200 hover:border-primary/40 hover:bg-panel-2 hover:text-foreground cursor-default"
            >
              {chip}
            </span>
          ),
        )}
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="shrink-0 pt-6 md:pt-16 lg:pt-20 self-center md:self-start"
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
