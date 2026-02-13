import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodePanelProps {
  code: string;
  onChange: (code: string) => void;
}

export function CodePanel({ code, onChange }: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="flex flex-col h-full bg-code">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-panel-border bg-panel-header shrink-0">
        <span className="text-sm font-medium text-foreground font-mono">generated-ui.tsx</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto scrollbar-thin relative">
        <div className="flex min-h-full">
          {/* Line numbers */}
          <div className="flex flex-col py-3 px-3 text-right select-none shrink-0 border-r border-panel-border bg-code">
            {lines.map((_, i) => (
              <span key={i} className="text-xs leading-5 text-muted-foreground font-mono opacity-50">
                {i + 1}
              </span>
            ))}
          </div>

          {/* Code content */}
          <textarea
            className="flex-1 py-3 px-4 bg-transparent text-sm leading-5 text-foreground font-mono resize-none outline-none min-w-0"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
