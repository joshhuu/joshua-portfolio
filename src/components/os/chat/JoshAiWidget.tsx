import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  FileText,
  FolderGit2,
  Mail,
  Cpu,
  ExternalLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { soundEngine } from "@/lib/soundEngine";
import type { View } from "../Sidebar";

type Msg = { role: "user" | "assistant"; content: string };

interface JoshAiWidgetProps {
  onNavigate?: (view: View) => void;
  onOpenPdf?: () => void;
}

const SUGGESTIONS = [
  "Show me Josh's resume",
  "What has Josh built?",
  "What's his AI stack?",
  "How can I contact him?",
];

// S2: Client-side blocked phrases — runs BEFORE any API call.
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
  "developer mode",
];

const MAX_INPUT_LENGTH = 500;

function isBlocked(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return BLOCKED_PHRASES.some((phrase) => lower.includes(phrase));
}

function extractAndRunAction(
  rawText: string,
  onNavigate?: (v: View) => void,
  onOpenPdf?: () => void,
): string {
  const match = rawText.match(
    /\[ACTION:(OPEN_RESUME|NAVIGATE:(home|projects|experience|missions|stack|contact))\]/,
  );
  if (!match) return rawText;

  const actionTag = match[0];
  const actionType = match[1];
  const cleaned = rawText.replace(actionTag, "").trim();

  if (actionType === "OPEN_RESUME" && onOpenPdf) {
    onOpenPdf();
    toast.success("Opening Resume PDF viewer...", { id: "action-resume" });
  } else if (actionType.startsWith("NAVIGATE:") && onNavigate) {
    const targetView = actionType.replace("NAVIGATE:", "") as View;
    onNavigate(targetView);
    toast.success(`Navigating to ${targetView.toUpperCase()}...`, { id: "action-nav" });
  }

  return cleaned;
}

export function JoshAiWidget({ onNavigate, onOpenPdf }: JoshAiWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    soundEngine?.playClick();

    // S2: Client-side blocked phrases check — before any API call
    if (isBlocked(text)) {
      toast.error("that kind of message isn't supported");
      setMessages((m) => [
        ...m,
        { role: "user", content: text },
        {
          role: "assistant",
          content:
            "I'm josh.ai — I'm here to tell you about Josh's work and skills. I can't help with that request.",
        },
      ]);
      setInput("");
      return;
    }

    setInput("");
    const newMessages = [...messages, { role: "user" as const, content: text }];

    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!res.ok) {
        let errorMsg = "Something went wrong. Please try again.";

        if (res.status === 429) {
          let errorType = "";
          try {
            const json = (await res.json()) as { error?: string };
            errorType = json.error ?? "";
          } catch {
            /* non-JSON 429 — treat as rate limit */
          }

          if (errorType === "quota") {
            toast.error("daily AI quota exhausted");
            errorMsg =
              "josh.ai has hit its daily AI limit. It resets at midnight — come back tomorrow!";
          } else {
            toast.error("slow down — rate limited");
            errorMsg = "josh.ai is thinking too fast! Wait a moment and try again.";
          }
        } else if (res.status === 400) {
          toast.error("message not supported");
          errorMsg =
            "I'm josh.ai — I'm here to tell you about Josh's work and skills. I can't help with that request.";
        } else {
          toast.error("josh.ai is offline");
          errorMsg = "josh.ai is currently unreachable. Please try again later.";
        }

        setMessages((m) => [...m, { role: "assistant", content: errorMsg }]);
        setLoading(false);
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
                const cleanedText = extractAndRunAction(replyText, onNavigate, onOpenPdf);
                setMessages((m) => {
                  const newM = [...m];
                  newM[newM.length - 1] = { role: "assistant", content: cleanedText };
                  return newM;
                });
              }
            } catch {
              // ignore partial json
            }
          }
        }
      }
    } catch {
      setLoading(false);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error. Please check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const charsLeft = MAX_INPUT_LENGTH - input.length;

  return (
    <>
      <button
        onClick={() => {
          soundEngine?.playClick();
          setOpen((o) => !o);
        }}
        aria-label={open ? "Close josh.ai chat assistant" : "Open josh.ai chat assistant"}
        aria-expanded={open}
        className="fixed bottom-20 md:bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-primary/40 bg-panel/95 px-4 py-2.5 font-mono text-xs text-foreground shadow-lg backdrop-blur hover:bg-panel-2 transition-all hover:scale-105"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 animate-ping opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
        </span>
        ask josh.ai
        {open ? <X className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="josh.ai chat assistant"
            aria-modal="true"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0.1}
            className="fixed bottom-[72px] md:bottom-20 left-4 right-4 md:left-auto md:right-5 z-50 md:w-[400px] rounded-xl border border-primary/30 bg-[#141416]/95 backdrop-blur-2xl shadow-2xl overflow-hidden select-none"
          >
            {/* Header */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="flex items-center justify-between border-b border-white/10 px-4 py-3 cursor-move bg-white/[0.03]"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-primary/20 text-primary">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                    josh.ai{" "}
                    <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                      COPILOT
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-white/40">
                    josh.ai Neural Engine · Active Copilot
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Content */}
            <div
              ref={scrollRef}
              className="max-h-80 min-h-[220px] overflow-y-auto overflow-x-hidden px-4 py-3.5 scrollbar-thin space-y-3"
            >
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Hi! I'm <strong className="text-primary font-semibold">josh.ai</strong>, Josh's
                    OS Copilot. Ask me about his projects, skills, or resume, or click an action
                    below:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[11px] text-white/80 hover:bg-primary/20 hover:text-primary hover:border-primary/40 transition-all text-left"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "space-y-2"}>
                  {m.role === "user" ? (
                    <div className="max-w-[85%] rounded-xl bg-primary/20 border border-primary/40 px-3.5 py-2 text-xs text-white font-sans">
                      {m.content}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/90 break-words space-y-2">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 leading-relaxed font-sans text-xs">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-cyan-300">{children}</strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-white/80">{children}</em>
                          ),
                          ul: ({ children }) => (
                            <ul className="my-1.5 ml-3 list-disc space-y-1 text-xs">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="my-1.5 ml-3 list-decimal space-y-1 text-xs">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-white/85 leading-relaxed">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[10px] text-primary-foreground">
                              {children}
                            </code>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 underline hover:text-cyan-300"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>

                      {/* Copilot Interactive Quick Action Chips */}
                      {m.content && (
                        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                          {onOpenPdf && (
                            <button
                              onClick={() => {
                                soundEngine?.playClick();
                                onOpenPdf();
                              }}
                              className="flex items-center gap-1 rounded bg-white/10 hover:bg-primary/30 px-2 py-1 text-[10px] font-mono text-white/90 hover:text-white transition-colors"
                            >
                              <FileText className="h-3 w-3 text-primary" />
                              <span>Resume PDF</span>
                            </button>
                          )}
                          {onNavigate && (
                            <>
                              <button
                                onClick={() => {
                                  soundEngine?.playClick();
                                  onNavigate("projects");
                                }}
                                className="flex items-center gap-1 rounded bg-white/10 hover:bg-blue-500/30 px-2 py-1 text-[10px] font-mono text-white/90 hover:text-white transition-colors"
                              >
                                <FolderGit2 className="h-3 w-3 text-blue-400" />
                                <span>Projects</span>
                              </button>
                              <button
                                onClick={() => {
                                  soundEngine?.playClick();
                                  onNavigate("contact");
                                }}
                                className="flex items-center gap-1 rounded bg-white/10 hover:bg-purple-500/30 px-2 py-1 text-[10px] font-mono text-white/90 hover:text-white transition-colors"
                              >
                                <Mail className="h-3 w-3 text-purple-400" />
                                <span>Contact</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400/80 bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20">
                  <Sparkles className="h-3.5 w-3.5 animate-spin" />
                  <span>josh.ai copilot is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 p-2.5 space-y-1 bg-black/40"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={MAX_INPUT_LENGTH}
                  aria-label="Message for josh.ai"
                  placeholder="ask copilot or type a command..."
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-white placeholder:text-white/30 focus:border-cyan-500/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="rounded-lg border border-cyan-500/40 bg-cyan-500/20 p-2 text-cyan-300 hover:bg-cyan-500/30 disabled:opacity-50 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              {input.length > 400 && (
                <p
                  className={`text-right font-mono text-[10px] ${charsLeft <= 50 ? "text-destructive" : "text-white/40"}`}
                >
                  {charsLeft} left
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
