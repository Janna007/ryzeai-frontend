import { History, RotateCcw } from "lucide-react";
import type { Version } from "@/lib/types";

interface VersionHistoryProps {
  versions: Version[];
  currentVersionId: string;
  onRollback: (versionId: string) => void;
}

export function VersionHistory({ versions, currentVersionId, onRollback }: VersionHistoryProps) {
  if (versions.length === 0) return null;

  return (
    <div className="border-t border-panel-border bg-panel-header">
      <div className="flex items-center gap-2 px-4 py-2">
        <History className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Versions</span>
      </div>
      <div className="flex items-center gap-1 px-4 pb-2 overflow-x-auto scrollbar-thin">
        {versions.map((v, i) => (
          <button
            key={v.id}
            onClick={() => onRollback(v.id)}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs transition group ${
              v.id === currentVersionId
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
            title={v.prompt}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${v.id === currentVersionId ? "bg-primary-foreground" : "bg-version-dot"}`} />
            <span className="max-w-[100px] truncate">v{i + 1}</span>
            {v.id !== currentVersionId && (
              <RotateCcw className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
