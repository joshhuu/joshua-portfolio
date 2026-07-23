import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has Josh built?",
  "What's his AI stack?",
  "Is he available for freelance?",
];

// S2: Client-side blocked phrases — runs BEFORE any API call.
// Server-side also checks; this is a first layer to save round-trips.
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

export function JoshAiWidget() {
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
          // Try to parse the structured error body to distinguish rate limit vs quota
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
        return;
      }

      setLoading(false); // remove thinking indicator as stream begins
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
              // ignore partial json
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

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close josh.ai chat assistant" : "Open josh.ai chat assistant"}
        aria-expanded={open}
        className="fixed bottom-20 md:bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-primary/40 bg-panel/95 px-4 py-2.5 font-mono text-xs text-foreground shadow-lg backdrop-blur hover:bg-panel-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-pulse-dot" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
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
            className="fixed bottom-[72px] md:bottom-20 left-4 right-4 md:left-auto md:right-5 z-50 md:w-[380px] rounded-xl border border-border bg-panel shadow-2xl"
          >
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="flex items-center justify-between border-b border-border px-4 py-3 cursor-move select-none"
            >
              <div className="flex items-center gap-2 font-mono text-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground">josh.ai</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="max-h-80 min-h-[200px] overflow-y-auto overflow-x-hidden px-4 py-3 scrollbar-thin"
            >
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Ask anything about Josh — projects, stack, availability.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:bg-panel-2 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                    {m.role === "user" ? (
                      <div className="max-w-[85%] rounded-lg bg-primary/20 border border-primary/30 px-3 py-2 text-sm text-foreground">
                        {m.content}
                      </div>
                    ) : (
                      <div className="text-sm text-foreground/90 break-words">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-foreground">{children}</strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-foreground/80">{children}</em>
                            ),
                            ul: ({ children }) => (
                              <ul className="my-1.5 ml-3 list-disc space-y-0.5">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="my-1.5 ml-3 list-decimal space-y-0.5">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-foreground/85 leading-relaxed">{children}</li>
                            ),
                            code: ({ children }) => (
                              <code className="rounded bg-primary/10 px-1 py-0.5 font-mono text-[11px] text-primary">
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className="my-2 overflow-x-auto rounded-md border border-border bg-background p-3 font-mono text-[11px] text-foreground/90">
                                {children}
                              </pre>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary underline underline-offset-2 hover:text-primary/80"
                              >
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => (
                              <h1 className="mb-1 mt-2 text-base font-bold text-foreground">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="mb-1 mt-2 text-sm font-semibold text-foreground">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="mb-0.5 mt-1.5 text-sm font-semibold text-foreground/90">
                                {children}
                              </h3>
                            ),
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="font-mono text-xs text-muted-foreground">
                    josh.ai is thinking
                    <span className="caret" />
                  </div>
                )}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-border p-2 space-y-1"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={MAX_INPUT_LENGTH}
                  aria-label="Message for josh.ai"
                  placeholder="ask anything about josh..."
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="rounded-md border border-primary/40 bg-primary/15 p-2 text-primary hover:bg-primary/25 disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              {/* S3: Character counter — visible when approaching limit */}
              {input.length > 400 && (
                <p
                  className={`text-right font-mono text-[10px] ${charsLeft <= 50 ? "text-destructive" : "text-muted-foreground"}`}
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
