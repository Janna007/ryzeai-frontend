import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Cpu, Sparkles, BookOpen } from "lucide-react";
import type { ChatMessage, AgentStep } from "@/lib/types";

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  agentStep: AgentStep;
  isProcessing: boolean;
}

const STEP_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  planning: { label: "Planning", icon: Cpu, color: "text-agent-plan" },
  generating: { label: "Generating", icon: Sparkles, color: "text-agent-generate" },
  explaining: { label: "Explaining", icon: BookOpen, color: "text-agent-explain" },
};

export function ChatPanel({ messages, onSend, agentStep, isProcessing }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, agentStep]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isProcessing) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-panel">
      {/* Header */}
      <div className="h-11 flex items-center px-4 border-b border-panel-border bg-panel-header shrink-0">
        <Bot className="w-4 h-4 text-primary mr-2" />
        <span className="text-sm font-medium text-foreground">AI Chat</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Bot className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">Describe a UI to generate</p>
            <p className="text-xs mt-1 opacity-60">e.g. "Create a dashboard with charts and a table"</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`animate-slide-in ${msg.role === "user" ? "flex justify-end" : ""}`}>
            <div
              className={`max-w-[90%] rounded-lg px-3 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-chat-user text-foreground"
                  : "bg-chat-ai text-foreground border border-border"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {msg.role === "user" ? (
                  <User className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <Bot className="w-3 h-3 text-primary" />
                )}
                <span className="text-xs text-muted-foreground font-medium">
                  {msg.role === "user" ? "You" : "Agent"}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{msg.content}</p>

              {/* Agent steps detail */}
              {msg.agentSteps?.plan && (
                <div className="mt-3 space-y-2 border-t border-border pt-2">
                  <div className="text-xs text-agent-plan font-medium flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Plan
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.agentSteps.plan.reasoning}</p>
                  <div className="flex flex-wrap gap-1">
                    {msg.agentSteps.plan.components.map((c) => (
                      <span key={c} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {msg.agentSteps?.explanation && (
                <div className="mt-2 border-t border-border pt-2">
                  <div className="text-xs text-agent-explain font-medium flex items-center gap-1 mb-1">
                    <BookOpen className="w-3 h-3" /> Explanation
                  </div>
                  {msg.agentSteps.explanation.decisions.map((d, i) => (
                    <p key={i} className="text-xs text-muted-foreground">
                      <span className="text-secondary-foreground font-medium">{d.component}:</span> {d.reason}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Agent step indicator */}
        {isProcessing && agentStep !== "idle" && agentStep !== "done" && STEP_CONFIG[agentStep] && (
          <div className="animate-fade-in flex items-center gap-2 px-3 py-2 bg-chat-ai border border-border rounded-lg">
            {(() => {
              const cfg = STEP_CONFIG[agentStep];
              const Icon = cfg.icon;
              return (
                <>
                  <Icon className={`w-4 h-4 ${cfg.color} animate-pulse-soft`} />
                  <span className={`text-sm font-medium ${cfg.color}`}>{cfg.label}...</span>
                </>
              );
            })()}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-panel-border bg-panel-header shrink-0">
        <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2 border border-border focus-within:ring-1 focus-within:ring-primary">
          <input
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            placeholder="Describe a UI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            disabled={isProcessing}
          />
          <button
            onClick={handleSend}
            disabled={isProcessing || !input.trim()}
            className="p-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-30 transition"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
