"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, X, Send, Mic, MicOff, CalendarClock, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { startVoice, type VoiceSession } from "@/lib/voice";

type Msg = { role: "twin" | "user"; text: string };
type Status = { live: boolean; voice: boolean };

const GREETING = "Hey, I'm Junaid's digital twin. Tell me one thing you're trying to build.";

// Scripted fallback ladder (used when the live model isn't configured).
const STEPS = [
  GREETING,
  "Love it. Who's it for: you, your business, or a team you're hiring for?",
  "Got it. What's blocking you right now: time, the tech, or just where to start?",
  "That's very doable. Drop your name + email and I'll have Junaid map out exactly how he'd build it.",
];

function newSessionId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}

export function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [messages, setMessages] = useState<Msg[]>([{ role: "twin", text: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  // scripted state
  const [step, setStep] = useState(0);
  const [scriptDone, setScriptDone] = useState(false);
  // voice
  const [voiceState, setVoiceState] = useState<"off" | "connecting" | "live">("off");
  const voiceRef = useRef<VoiceSession | null>(null);

  const sessionId = useRef<string>(newSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setCollapsed(false);
    };
    window.addEventListener("twin:open", handler);
    return () => window.removeEventListener("twin:open", handler);
  }, []);

  // load integration status the first time the panel opens
  useEffect(() => {
    if (open && !status) {
      fetch("/api/twin/status")
        .then((r) => r.json())
        .then(setStatus)
        .catch(() => setStatus({ live: false, voice: false }));
    }
  }, [open, status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, collapsed]);

  const streamLive = useCallback(async (history: Msg[]) => {
    setBusy(true);
    // never send empty-content turns (Anthropic rejects them) and start user-first
    const apiMessages = history
      .filter((m) => m.text.trim())
      .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
    while (apiMessages[0]?.role === "assistant") apiMessages.shift();
    setMessages((m) => [...m, { role: "twin", text: "" }]);

    const setLast = (text: string) =>
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "twin", text };
        return copy;
      });
    const FALLBACK =
      "Sorry, I lost my train of thought there. Mind trying that again? Or grab a time below and I'll pick it up with you directly.";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, sessionId: sessionId.current }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error("no stream");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        if (acc) setLast(acc);
      }
      if (!acc.trim()) setLast(FALLBACK); // empty response → fallback, never a stuck spinner
    } catch {
      setLast(FALLBACK);
    } finally {
      clearTimeout(timeout);
      setBusy(false);
    }
  }, []);

  function scriptedAdvance(history: Msg[]) {
    const next = step + 1;
    setTimeout(() => {
      if (next < STEPS.length) {
        setMessages((m) => [...m, { role: "twin", text: STEPS[next] }]);
        setStep(next);
      } else {
        setScriptDone(true);
        setMessages((m) => [
          ...m,
          { role: "twin", text: "Perfect, got it. Want to grab a time on Junaid's calendar, or talk it through live?" },
        ]);
        const userText = history.filter((h) => h.role === "user").map((h) => h.text);
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionId.current,
            building: userText[0],
            who: userText[1],
            source: "digital-twin-scripted",
          }),
        }).catch(() => {});
      }
    }, 400);
  }

  function send() {
    const text = input.trim();
    if (!text || busy) return;
    const history = [...messages, { role: "user" as const, text }];
    setMessages(history);
    setInput("");
    if (status?.live) streamLive(history);
    else if (!scriptDone) scriptedAdvance(history);
  }

  async function toggleVoice() {
    if (voiceState !== "off") {
      voiceRef.current?.stop();
      voiceRef.current = null;
      setVoiceState("off");
      return;
    }
    try {
      setVoiceState("connecting");
      voiceRef.current = await startVoice((s) => setVoiceState(s === "live" ? "live" : s === "ended" ? "off" : "connecting"));
      setVoiceState("live");
    } catch {
      setVoiceState("off");
      setMessages((m) => [...m, { role: "twin", text: "Couldn't start voice. Mic permission, or it's not configured yet. Let's keep chatting or book a call." }]);
    }
  }

  useEffect(() => () => voiceRef.current?.stop(), []);

  const showActions = status?.live ? !busy && messages.length > 2 : scriptDone;
  const progress = status?.live ? Math.min(messages.filter((m) => m.role === "user").length / 4, 1) : Math.min(step / (STEPS.length - 1), 1);

  return (
    <>
      <button
        onClick={() =>
          setOpen((o) => {
            if (!o) setCollapsed(false);
            return !o;
          })
        }
        aria-label="Chat with my digital twin"
        className="btn-glow fixed bottom-5 right-5 z-[95] flex items-center gap-2 rounded-full px-5 py-3.5 text-sm shadow-lg"
      >
        {open ? <X className="size-4" /> : <MessageSquare className="size-4" />}
        <span className="hidden sm:inline">{open ? "Close" : "Chat with my digital twin"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "glow-violet fixed bottom-24 right-5 z-[94] flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line-bright bg-[#0d0b16] shadow-2xl",
              collapsed ? "h-auto" : "h-[34rem]",
            )}
          >
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand chat" : "Collapse chat"}
              className={cn(
                "flex w-full items-center gap-3 px-5 py-4 text-left",
                !collapsed && "border-b border-line/70",
              )}
            >
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan font-display text-xs font-bold text-void">
                JK
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">Junaid&apos;s digital twin</p>
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-bright">
                  <span className="led size-1.5 rounded-full bg-cyan-bright text-cyan-bright" />
                  {voiceState === "live" ? "on a voice call" : "online"}
                </p>
              </div>
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-text-dim transition-colors hover:bg-line/40 hover:text-text">
                {collapsed ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </span>
            </button>

            {!collapsed && (
              <>
            <div className="px-5 pt-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-text-dim">
                <span>Scoping your project</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-gradient-to-r from-violet to-cyan transition-all duration-500" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user" ? "bg-violet/25 text-text" : "border border-line bg-elevated text-text",
                    )}
                  >
                    {m.text || (busy ? <Loader2 className="size-4 animate-spin text-text-dim" /> : "…")}
                  </div>
                </div>
              ))}

              {showActions && (
                <div className="flex flex-col gap-2 pt-1">
                  <a href="#book" onClick={() => setOpen(false)} className="btn-glow flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm">
                    <CalendarClock className="size-4" /> Book a call
                  </a>
                  {status?.voice && (
                    <button onClick={toggleVoice} className="btn-ghost flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm">
                      {voiceState === "off" ? <Mic className="size-4" /> : voiceState === "connecting" ? <Loader2 className="size-4 animate-spin" /> : <MicOff className="size-4" />}
                      {voiceState === "off" ? "Talk live with Junaid's twin" : voiceState === "connecting" ? "Connecting…" : "End voice call"}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-line/70 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={busy ? "Thinking…" : "Type your answer…"}
                disabled={busy}
                className="flex-1 rounded-full bg-void/60 px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-cyan/60 disabled:opacity-60"
              />
              <button onClick={send} disabled={busy} aria-label="Send" className="btn-glow grid size-10 shrink-0 place-items-center rounded-full disabled:opacity-60">
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </button>
            </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
