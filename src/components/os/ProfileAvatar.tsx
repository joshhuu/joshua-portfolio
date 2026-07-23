import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  className?: string;
}

export function ProfileAvatar({ className }: ProfileAvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("group perspective-[1000px] cursor-pointer", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-72 lg:w-72 xl:h-80 xl:w-80 shrink-0"
      >
        {/* Front Side: Photo */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <div className="relative h-full w-full animate-morph overflow-hidden border-2 border-white/15 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <img
              src="/images/me.jpg"
              alt="Photo of Joshua S"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Back Side: Avatar */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative h-full w-full animate-morph overflow-hidden border-2 border-primary/40 bg-panel-2 shadow-[0_0_40px_rgba(124,111,205,0.4)] backdrop-blur-xl">
            <img
              src="/images/avatar.png"
              alt="Animated avatar of Joshua S waving"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.div>

      {/* Small floating tooltip-like hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-muted-foreground/50 transition-colors group-hover:text-primary/70 font-mono"
      >
        Click to flip
      </motion.div>
    </div>
  );
}
