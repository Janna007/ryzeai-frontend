import { useState, useCallback } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { CodePanel } from "@/components/CodePanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { VersionHistory } from "@/components/VersionHistory";
import { ComponentWhitelist } from "@/components/ComponentWhitelist";
import { runAgent } from "@/lib/mock-agent";
import type { ChatMessage, AgentStep, AgentPlan, Version, Result, sendData, existingCode } from "@/lib/types";
import { GripVertical, Zap } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { sendProject } from "@/http/mutation";

type GeneratePayload = sendData;
export default function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [code, setCode] = useState("")
  const [plan,setPlan]=useState<AgentPlan | null>(null)
  const [agentStep, setAgentStep] = useState<AgentStep>("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState("");
  const [usedComponents, setUsedComponents] = useState<string[]>([]);

  
  const generateMutation = useMutation<Result,Error,GeneratePayload>({
    mutationKey: ["generate-ui"],
    mutationFn: sendProject,
  });

  const handleSend = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);
    setAgentStep("planning");

    //server call

    const currentVersion = versions.find(
      (v) => v.id === currentVersionId
    );

    
    
    try {
      const result = await generateMutation.mutateAsync({
        userInput: content,
        existingPlan: currentVersion?.plan ?? null,
        existingCode: currentVersion?.code ?? null,
      });

      console.log("Result:" ,result)
      // const result = await runAgent(
        //   content,
      //   code || null,
      //   (step) => setAgentStep(step as AgentStep)
      // );

      const newCode = result.code;
      setCode(newCode);

      const newPlan = result.plan;
      setPlan(newPlan);

      const versionId = crypto.randomUUID();
      const newVersion: Version = {
        id: versionId,
        label: `v${versions.length + 1}`,
        code: newCode,
        plan:newPlan,
        timestamp: new Date(),
        prompt: content,
      };
      setVersions((prev) => [...prev, newVersion]);
      setCurrentVersionId(versionId);

      // Detect used components
      const detected = ["Button", "Card", "Input", "Table", "Modal", "Sidebar", "Navbar", "Chart", "Badge", "Avatar", "Tabs", "Alert"]
        .filter((c) => newCode.toLowerCase().includes(c.toLowerCase()));
      setUsedComponents(detected);

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.explanation.summary,
        timestamp: new Date(),
        agentSteps: {
          plan: result.plan,
          explanation: result.explanation,
        },
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const errMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "An error occurred while generating the UI. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setAgentStep("done");
      setIsProcessing(false);
    }
  }, [code, versions.length]);

  const handleRollback = useCallback((versionId: string) => {
    const version = versions.find((v) => v.id === versionId);
    if (version) {
      setCode(version.code);
      setCurrentVersionId(versionId);

      const detected = ["Button", "Card", "Input", "Table", "Modal", "Sidebar", "Navbar", "Chart", "Badge", "Avatar", "Tabs", "Alert"]
        .filter((c) => version.code.toLowerCase().includes(c.toLowerCase()));
      setUsedComponents(detected);

      const rollbackMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Rolled back to ${version.label}. Original prompt: "${version.prompt}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, rollbackMsg]);
    }
  }, [versions]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-11 flex items-center justify-between px-4 border-b border-panel-border bg-panel-header shrink-0">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-foreground tracking-tight">UI Agent</span>
          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-medium">v1.0</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
            Deterministic Mode
          </span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Chat Panel */}
        <div className="w-[320px] shrink-0 border-r border-panel-border flex flex-col">
          <div className="flex-1 min-h-0">
            <ChatPanel
              messages={messages}
              onSend={handleSend}
              agentStep={agentStep}
              isProcessing={isProcessing}
            />
          </div>
          <ComponentWhitelist usedComponents={usedComponents} />
        </div>

        {/* Resize Handle */}
        <div className="w-1 bg-panel-border flex items-center justify-center cursor-col-resize hover:bg-primary/30 transition">
          <GripVertical className="w-3 h-3 text-muted-foreground opacity-0 hover:opacity-100" />
        </div>

        {/* Code Panel */}
        <div className="flex-1 min-w-0 border-r border-panel-border flex flex-col">
          <div className="flex-1 min-h-0">
            <CodePanel code={code} onChange={setCode} />
          </div>
          <VersionHistory
            versions={versions}
            currentVersionId={currentVersionId}
            onRollback={handleRollback}
          />
        </div>

        {/* Resize Handle */}
        <div className="w-1 bg-panel-border flex items-center justify-center cursor-col-resize hover:bg-primary/30 transition">
          <GripVertical className="w-3 h-3 text-muted-foreground opacity-0 hover:opacity-100" />
        </div>

        {/* Preview Panel */}
        <div className="flex-1 min-w-0">
          <PreviewPanel code={code} />
        </div>
      </div>
    </div>
  );
}
