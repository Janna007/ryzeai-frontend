import { useMemo, useState, useEffect } from "react";
import { Eye, AlertTriangle } from "lucide-react";
import * as FixedUI from "@/components/ui/fixed";
import * as LucideIcons from "lucide-react";
import React from 'react';

declare global {
  interface Window {
    Babel: any;
  }
}

interface PreviewPanelProps {
  code: string;
}

function ErrorDisplay({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-destructive p-8 bg-destructive/5 rounded-lg border border-destructive/20 border-dashed">
      <AlertTriangle className="w-10 h-10 mb-3" />
      <p className="text-sm font-mono text-center break-all">{error}</p>
    </div>
  );
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: (error: string) => React.ReactNode }, { hasError: boolean, error: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) return this.props.fallback(this.state.error);
    return this.props.children;
  }
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  const [error, setError] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [viewMode, setViewMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // ... preserved transpile logic ...
    if (!code) {
      setComponent(null);
      setError(null);
      return;
    }

    const transpile = () => {
      try {
        if (!window.Babel) {
          setError("Initializing transpiler...");
          return;
        }

        // Preprocess code: remove markdown, imports and handle export
        let processedCode = code
          .replace(/^```[a-z]*\n/i, '') // Remove opening markdown block
          .replace(/\n```$/m, '') // Remove closing markdown block
          .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '') // Remove imports
          .replace(/export\s+default\s+function\s+(\w+)/, 'function GeneratedComponent') // Named function export
          .replace(/export\s+default\s+/, 'const GeneratedComponent = ') // Arrow function or expression export
          .replace(/export\s+function\s+(\w+)/, 'function $1'); // Remove export from named exports

        // Transpile JSX
        const transpiled = window.Babel.transform(processedCode, {
          presets: ['react'],
        }).code;

        // Create a function that returns the component
        // Provide React and FixedUI components as arguments
        const renderFn = new Function(
          'React',
          'useState',
          'useEffect',
          'useMemo',
          'useCallback',
          'useRef',
          ...Object.keys(FixedUI),
          // ...Object.keys(LucideIcons),
          `${transpiled}; return typeof GeneratedComponent !== 'undefined' ? GeneratedComponent : (typeof MyComponent !== 'undefined' ? MyComponent : null);`
        );

        const DynamicComponent = renderFn(
          React,
          React.useState,
          React.useEffect,
          React.useMemo,
          React.useCallback,
          React.useRef,
          ...Object.values(FixedUI),
          // ...Object.values(LucideIcons)
        );

        if (!DynamicComponent) {
          throw new Error("No component found in generated code. Expected 'MyComponent' or 'GeneratedComponent'.");
        }

        setComponent(() => DynamicComponent);
        setError(null);
      } catch (e) {
        console.error("Transpilation error:", e);
        setError(e instanceof Error ? e.message : "Failed to transpile code");
        setComponent(null);
      }
    };

    // Delay transpilation slightly if Babel isn't ready
    if (!window.Babel) {
      const interval = setInterval(() => {
        if (window.Babel) {
          clearInterval(interval);
          transpile();
        }
      }, 500);
      return () => clearInterval(interval);
    } else {
      transpile();
    }
  }, [code]);

  return (
    <div className="flex flex-col h-full bg-panel">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-panel-border bg-panel-header shrink-0">
        <div className="flex items-center">
          <Eye className="w-4 h-4 text-primary mr-2" />
          <span className="text-sm font-medium text-foreground">Live Preview</span>
        </div>
        <div className="flex bg-panel-border/30 rounded-md p-0.5">
          <button
            onClick={() => setViewMode('light')}
            className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded ${viewMode === 'light' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'
              }`}
          >
            Light
          </button>
          <button
            onClick={() => setViewMode('dark')}
            className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded ${viewMode === 'dark' ? 'bg-gray-800 text-primary shadow-sm' : 'text-muted-foreground'
              }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`flex-1 overflow-auto transition-colors duration-300 ${viewMode === 'dark' ? 'bg-gray-950 dark' : 'bg-white'}`}>
        {error ? (
          <div className="p-4 h-full">
            <div className="flex flex-col items-center justify-center h-full text-destructive p-8 bg-destructive/5 rounded-lg border border-destructive/20 border-dashed">
              <AlertTriangle className="w-10 h-10 mb-3" />
              <p className="text-sm font-mono text-center break-all">{error}</p>
            </div>
          </div>
        ) : Component ? (
          <div className="p-4 min-h-full animate-in fade-in duration-300">
            <ErrorBoundary fallback={(err) => <ErrorDisplay error={err} />}>
              <Component />
            </ErrorBoundary>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Eye className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">Preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
