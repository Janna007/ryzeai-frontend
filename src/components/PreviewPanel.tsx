import { useMemo, useState } from "react";
import { Eye, AlertTriangle } from "lucide-react";

interface PreviewPanelProps {
  code: string;
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  // console.log("Code:",code)

  const [error, setError] = useState<string | null>(null);

  const html = useMemo(() => {
    try {
      // Transform JSX-like code to renderable HTML
      let processedCode = code;

      // Extract the return content from the function
      const returnMatch = processedCode.match(/return\s*\(\s*([\s\S]*)\s*\);?\s*\}$/);
      if (!returnMatch) {
        setError("Could not parse component code");
        return "";
      }

      let jsx = returnMatch[1];

      // Convert JSX to HTML-like string
      jsx = jsx.replace(/className=/g, "class=");
      jsx = jsx.replace(/\{\/\*[\s\S]*?\*\/\}/g, ""); // Remove JSX comments

      // Remove map expressions and replace with static content
      // This is a simplified preview - in production you'd use a proper JSX renderer

      setError(null);
      return jsx;
    } catch (e) {
      console.log("Preview error",e)
      setError(e instanceof Error ? e.message : "Preview error");
      return "";
    }
  }, [code]);

  // Build a safe preview using srcdoc
  const srcdoc = useMemo(() => {
    // We'll render the code using a simple approach - eval the component in an iframe
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    #root { min-height: 100vh; }
    .error-display { padding: 20px; color: #ef4444; font-family: monospace; font-size: 13px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    try {
      ${code}
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(GeneratedUI));
    } catch(e) {
      document.getElementById('root').innerHTML = '<div class="error-display">Error: ' + e.message + '</div>';
    }
  </script>
</body>
</html>`;
  }, [code]);

  return (
    <div className="flex flex-col h-full bg-panel">
      {/* Header */}
      <div className="h-11 flex items-center px-4 border-b border-panel-border bg-panel-header shrink-0">
        <Eye className="w-4 h-4 text-primary mr-2" />
        <span className="text-sm font-medium text-foreground">Preview</span>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-hidden">
        {code ? (
          <iframe
            srcDoc={srcdoc}
            className="w-full h-full border-0"
            sandbox="allow-scripts"
            title="UI Preview"
          />
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
