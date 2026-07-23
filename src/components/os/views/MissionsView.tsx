import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { missions } from "@/data/portfolio";
import { Terminal, Crosshair, Cpu, ShieldCheck } from "lucide-react";

const COMMAND = "./view_missions.sh";

const getIconData = (index: number) => {
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
      gradient: "from-red-400 via-rose-400 to-orange-400",
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
      gradient: "from-blue-400 via-indigo-400 to-cyan-400",
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
      gradient: "from-emerald-400 via-teal-400 to-green-400",
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
      gradient: "from-purple-400 via-fuchsia-400 to-pink-400",
    },
  ];
  return icons[index % icons.length];
};

export function MissionsView() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pb-12 w-full">
      <div className="mb-10 font-mono text-sm text-muted-foreground">
        <span className="text-primary font-bold">~/josh</span> ${" "}
        <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      <div className="mb-10 flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
          <Crosshair className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 tracking-tight">
            Active Missions & Achievements
          </h2>
          <div className="font-mono text-xs text-muted-foreground mt-1">
            // CLEARANCE_LEVEL: TOP_SECRET · VERIFIED_ACCOMPLISHMENTS
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {missions.map((m, i) => {
          const { Icon, color, bg, border, hoverBg, glow, corner, cardBorder, dotBg, gradient } =
            getIconData(i);
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: (COMMAND.length * 50) / 1000 + i * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className={`group relative overflow-hidden bg-panel/80 backdrop-blur-md border border-border/60 rounded-2xl transition-all duration-300 ${cardBorder} hover:-translate-y-1.5 flex flex-col justify-between h-full shadow-lg`}
            >
              {/* Corner Brackets */}
              <div
                className={`absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 ${corner} transition-colors rounded-tl-2xl`}
              />
              <div
                className={`absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 ${corner} transition-colors rounded-tr-2xl`}
              />
              <div
                className={`absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 ${corner} transition-colors rounded-bl-2xl`}
              />
              <div
                className={`absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 ${corner} transition-colors rounded-br-2xl`}
              />

              {/* Glowing Hover Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glow} via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />
              <div
                className={`absolute -right-20 -top-20 w-48 h-48 bg-gradient-to-br ${gradient} rounded-full blur-[90px] opacity-10 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none`}
              />

              <div className="relative p-6 sm:p-8 lg:p-9 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${bg} ${color} border ${border} ${hoverBg} group-hover:text-white transition-all duration-300 shadow-md`}
                      >
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1 font-semibold">
                          FILE // {m.id}
                        </span>
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full ${bg} border ${border} font-mono text-xs ${color} font-bold w-fit`}
                        >
                          {m.year}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-3 py-1 rounded-lg bg-background/60 backdrop-blur-md border border-border/60 font-mono text-xs ${color} font-bold tracking-widest shadow-sm`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3
                      className={`font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${gradient} mb-2 tracking-tight`}
                    >
                      {m.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                      {m.subtitle}
                    </p>
                  </div>
                </div>

                {/* Decorative data row */}
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 font-mono text-xs text-muted-foreground/60">
                  <div className="flex items-center gap-2 font-medium">
                    <div
                      className={`h-2 w-2 rounded-full bg-border ${dotBg} shadow-[0_0_10px_currentColor] transition-colors duration-300`}
                    />
                    DATA_SECTOR_7
                  </div>
                  <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div
                      className={`h-2 w-2 bg-border ${dotBg} rounded-sm transition-colors duration-300`}
                    />
                    <div
                      className={`h-2 w-4 bg-border ${dotBg} rounded-sm transition-colors duration-300 delay-75`}
                    />
                    <div
                      className={`h-2 w-6 bg-border ${dotBg} rounded-sm transition-colors duration-300 delay-150`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
