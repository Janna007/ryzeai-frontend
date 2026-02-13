import { Shield } from "lucide-react";
import { ALLOWED_COMPONENTS } from "@/lib/types";

interface ComponentWhitelistProps {
  usedComponents: string[];
}

export function ComponentWhitelist({ usedComponents }: ComponentWhitelistProps) {
  return (
    <div className="border-t border-panel-border bg-panel-header px-4 py-2">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">Component Library</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {ALLOWED_COMPONENTS.map((comp) => {
          const isUsed = usedComponents.includes(comp);
          return (
            <span
              key={comp}
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono transition ${
                isUsed
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {comp}
            </span>
          );
        })}
      </div>
    </div>
  );
}
