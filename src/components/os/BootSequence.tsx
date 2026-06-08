import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "Booting josh.os...",
  "Initializing agentic systems...",
  "Loading models: Gemma4, Llama 3...",
  "Mounting projects...",
  "System ready. Welcome.",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((n) => n + 1), 380);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="w-full max-w-lg px-6 font-mono text-sm">
        {LINES.slice(0, shown).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={i === LINES.length - 1 ? "text-primary" : "text-muted-foreground"}
          >
            <span className="text-primary/70">$</span> {line}
          </motion.div>
        ))}
        {shown < LINES.length && (
          <div className="mt-1 text-primary">
            <span className="text-primary/70">$</span>
            <span className="caret" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
