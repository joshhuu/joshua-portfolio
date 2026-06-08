import { useState, useEffect } from "react";
import { Brain, Database, Cloud, Code, TerminalSquare, Layout, Cpu, Activity } from "lucide-react";

const COMMAND = "npm list -g --depth=0";

type StackItem = { name: string; url?: string; Icon?: any; color?: string };

const stackItems: StackItem[] = [
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
  { name: "Web Scraping", Icon: TerminalSquare, color: "#14b8a6" },
  { name: "Pydantic v2", url: "https://cdn.simpleicons.org/pydantic/E92063" },

  // Infrastructure & Cloud
  { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Git", url: "https://cdn.simpleicons.org/git/F05032" },
  { name: "GitHub", url: "https://cdn.simpleicons.org/github/white" },
  { name: "MySQL", url: "https://cdn.simpleicons.org/mysql/4479A1" },
];

// Split into 3 visually appealing rows
const row1 = stackItems.slice(0, 11);
const row2 = stackItems.slice(11, 22);
const row3 = stackItems.slice(22);

export function StackView() {
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
    <div className="pb-12 overflow-hidden flex flex-col h-full">


      <div className="mb-10 font-mono text-sm text-muted-foreground shrink-0">
        <span className="text-primary">~/josh</span> $ <span className="text-foreground">{typed}</span>
        <span className="caret" />
      </div>

      <div 
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex-1 flex flex-col justify-center gap-6 sm:gap-10 pause-on-hover mask-edges fill-mode-both"
        style={{ animationDelay: `${COMMAND.length * 50}ms`, animationFillMode: 'both' }}
      >
        <MarqueeTrack items={row1} reverse={false} speed="40s" />
        <MarqueeTrack items={row2} reverse={true} speed="45s" />
        <MarqueeTrack items={row3} reverse={false} speed="35s" />
      </div>
    </div>
  );
}

function MarqueeTrack({ items, reverse, speed }: { items: StackItem[], reverse: boolean, speed: string }) {
  // Duplicate 4 times so it can seamlessly translate by 25%
  const duplicated = [...items, ...items, ...items, ...items];
  
  return (
    <div 
      className={`flex w-max gap-4 sm:gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      style={{ animationDuration: speed }}
    >
      {duplicated.map((item, i) => (
        <div 
          key={i} 
          className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border bg-panel px-5 py-3 sm:px-6 sm:py-4 transition-colors hover:border-primary/50 hover:bg-panel-2"
        >
          {item.url ? (
          <img src={item.url} alt={item.name} loading="lazy" className="h-6 w-6 sm:h-8 sm:w-8 object-contain" />
          ) : item.Icon ? (
            <item.Icon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: item.color }} />
          ) : (
            <Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          )}
          <span className="font-mono text-sm sm:text-base font-medium text-foreground/90 whitespace-nowrap">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
