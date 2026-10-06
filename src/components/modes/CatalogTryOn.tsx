"use client";

import { useRef, useState } from "react";
import { startAssemblyAIStream } from "@/lib/assemblyai";

export function VoiceAssistantUI({
  onTranscript,
  onStatusChange,
  onAgentResponse,
}: {
  onTranscript?: (text: string) => void;
  onStatusChange?: (status: string) => void;
  onAgentResponse?: (response: any) => void;
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [agentReply, setAgentReply] = useState("Ready when you are.");
  const cleanupRef = useRef<(() => void) | null>(null);

  const stopListening = () => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    setIsListening(false);
    onStatusChange?.("idle");
  };

  const startListening = async () => {
    const apiKey = process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY;

    if (!apiKey) {
      setAgentReply("Add NEXT_PUBLIC_ASSEMBLYAI_API_KEY to your .env.local to enable live voice.");
      return;
    }

    setIsListening(true);
    onStatusChange?.("listening");
    setTranscript("");

    const cleanup = startAssemblyAIStream({
      apiKey,
      onPartial: (partial) => {
        setTranscript(partial);
        onTranscript?.(partial);
      },
      onFinal: async (finalText) => {
        const cleaned = finalText.trim();
        setTranscript(cleaned);
        onTranscript?.(cleaned);
        onStatusChange?.("thinking");

        try {
          const response = await fetch("/api/agent-brain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: cleaned }),
          });

          const data = await response.json();
          setAgentReply(data.speech ?? "I can help with that.");
          onAgentResponse?.(data);
        } catch (error) {
          console.error(error);
          setAgentReply("I’m here to help. Try a product or application prompt.");
        }

        stopListening();
      },
      onError: (errorMessage) => {
        setAgentReply(errorMessage);
        stopListening();
      },
    });

    cleanupRef.current = cleanup;
  };

  return (
    <div className="mt-4 space-y-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`flex w-full items-center justify-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
          isListening
            ? "border-rose-400 bg-rose-500/20 text-rose-100"
            : "border-pink-400/40 bg-pink-500/10 text-pink-100 hover:bg-pink-500/20"
        }`}
      >
        <span className={`h-2.5 w-2.5 rounded-full ${isListening ? "bg-rose-400 animate-pulse" : "bg-pink-300"}`} />
        {isListening ? "Listening..." : "Activate voice assistant"}
      </button>

      <div className="rounded-2xl border border-white/10 bg-[#0a1018] p-3">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/50">
          <span>Live</span>
          <span>{isListening ? "ON" : "OFF"}</span>
        </div>
        <div className="mt-3 h-16 rounded-xl bg-gradient-to-r from-pink-500/20 via-violet-500/10 to-cyan-500/10 p-2">
          <div className="flex h-full items-end gap-1">
            {[18, 28, 22, 36, 14, 30, 16, 26, 20, 34, 18, 24].map((height, index) => (
              <span
                key={index}
                className={`w-full rounded-t-md ${isListening ? "bg-pink-400" : "bg-white/20"}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0a1018] p-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">Transcript</p>
        <p className="mt-2 min-h-[48px] text-sm text-white/80">{transcript || "Say: ‘Try a warm blush for my cheeks.’"}</p>
      </div>

      <div className="rounded-2xl border border-pink-400/20 bg-pink-500/10 p-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-pink-200/80">Aura reply</p>
        <p className="mt-2 text-sm leading-relaxed text-pink-100">{agentReply}</p>
      </div>
    </div>
  );
}
