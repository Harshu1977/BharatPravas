import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { BrandMark } from "./Brand";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Namaste! I'm Pravas Mitra 🌿 Ask me about treks, weekend escapes, women-only tours or custom trips across Maharashtra.",
};

const SUGGESTIONS = [
  "Best monsoon trek?",
  "Women-only tour details",
  "Plan a weekend trip",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const detail = await res.text();
        setMessages([
          ...next,
          { role: "assistant", content: detail || "Something went wrong. Please try again." },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) {
        setMessages([
          ...next,
          {
            role: "assistant",
            content: "I couldn't answer that one — please WhatsApp us at +91 97632 62025.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Network hiccup — please try again in a moment." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with BharatPravas"}
        className="fixed bottom-6 left-5 z-50 grid size-14 place-items-center rounded-full bg-forest text-primary-foreground shadow-card transition-transform hover:scale-110"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      <div
        className={`fixed bottom-24 left-4 right-4 z-50 origin-bottom-left overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 sm:right-auto sm:w-[380px] ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 bg-forest-gradient px-4 py-3 text-primary-foreground">
          <BrandMark className="size-9" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Pravas Mitra</p>
            <p className="text-[11px] text-gold/90">AI travel assistant · replies instantly</p>
          </div>
        </div>

        <div ref={listRef} className="hide-scrollbar h-80 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                    : "max-w-[92%] whitespace-pre-wrap text-sm text-foreground"
                }
              >
                {m.content || (busy ? "Thinking…" : "")}
              </div>
            </div>
          ))}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trips, dates, pricing…"
            className="min-w-0 flex-1 rounded-full bg-muted px-4 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-accent-foreground transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </>
  );
}
