import type { AgentPlan, AgentExplanation } from "./types";

const TEMPLATES: Record<string, { plan: AgentPlan; code: string; explanation: AgentExplanation }> = {
  dashboard: {
    plan: {
      layout: "sidebar-main with top navbar",
      components: ["Navbar", "Sidebar", "Card", "Chart", "Table", "Badge"],
      reasoning: "A dashboard requires a navigation structure with sidebar for menu items, cards for KPI metrics, a chart for data visualization, and a table for detailed records.",
    },
    code: `function GeneratedUI() {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-2">
        <div className="font-bold text-lg mb-4 text-blue-600">Dashboard</div>
        <button className="text-left px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium">Overview</button>
        <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">Analytics</button>
        <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">Reports</button>
        <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">Settings</button>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
          <h1 className="font-semibold text-gray-800">Overview</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Live</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">U</div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Revenue", value: "$48,200", change: "+12.5%" },
              { label: "Users", value: "2,420", change: "+8.1%" },
              { label: "Orders", value: "845", change: "+23.4%" },
              { label: "Conversion", value: "3.2%", change: "-0.4%" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-sm text-gray-500 mb-1">{kpi.label}</div>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <div className={\`text-xs mt-1 \${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}\`}>{kpi.change}</div>
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue Over Time</h3>
            <div className="h-48 flex items-end gap-2">
              {[40, 65, 50, 80, 55, 90, 75, 95, 85, 70, 88, 92].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{ height: h + '%' }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-600">Name</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 font-medium text-gray-600">Amount</th>
                  <th className="text-left p-3 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Alice Johnson", status: "Completed", amount: "$1,200", date: "Feb 10" },
                  { name: "Bob Smith", status: "Pending", amount: "$850", date: "Feb 9" },
                  { name: "Carol White", status: "Completed", amount: "$2,100", date: "Feb 8" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{row.name}</td>
                    <td className="p-3">
                      <span className={\`text-xs px-2 py-0.5 rounded-full \${row.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}\`}>{row.status}</span>
                    </td>
                    <td className="p-3 text-gray-800">{row.amount}</td>
                    <td className="p-3 text-gray-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}`,
    explanation: {
      summary: "Created a standard analytics dashboard with sidebar navigation, KPI metric cards, a bar chart visualization, and a data table.",
      decisions: [
        { component: "Sidebar", reason: "Provides primary navigation structure for multi-section dashboard" },
        { component: "Navbar", reason: "Shows current section title and user context at the top" },
        { component: "Card", reason: "Used for KPI metrics to display key numbers with change indicators" },
        { component: "Chart", reason: "Bar chart to visualize revenue trends over 12 months" },
        { component: "Table", reason: "Displays detailed transaction records with status badges" },
        { component: "Badge", reason: "Status indicators in table rows and live status in navbar" },
      ],
    },
  },
  landing: {
    plan: {
      layout: "single-column with hero, features grid, and CTA",
      components: ["Navbar", "Button", "Card", "Badge"],
      reasoning: "Landing pages follow a top-down narrative flow: hero section to capture attention, feature cards to communicate value, and a CTA to drive action.",
    },
    code: `function GeneratedUI() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="font-bold text-xl text-blue-600">Acme</div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Docs</a>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-24 px-8">
        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">Now in Beta</span>
        <h1 className="text-5xl font-bold mt-6 mb-4 leading-tight">Build faster with<br/>intelligent tools</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">Ship products 10x faster with AI-powered development tools that understand your codebase.</p>
        <div className="flex gap-3 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition">Start Building</button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition">View Demo</button>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: "AI-Powered", desc: "Intelligent code suggestions that understand context and intent." },
            { title: "Lightning Fast", desc: "Generate complete UIs in seconds, not hours of manual work." },
            { title: "Deterministic", desc: "Same input always produces the same output. Reliable and debuggable." },
          ].map((f) => (
            <div key={f.title} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="w-10 h-10 bg-blue-50 rounded-lg mb-4 flex items-center justify-center text-blue-600 font-bold">✦</div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`,
    explanation: {
      summary: "Built a clean SaaS landing page with a navigation bar, hero section with CTA buttons, and a three-column feature grid.",
      decisions: [
        { component: "Navbar", reason: "Standard top navigation with brand and links" },
        { component: "Button", reason: "Primary and secondary CTA buttons for user engagement" },
        { component: "Card", reason: "Feature cards to showcase product capabilities" },
        { component: "Badge", reason: "Beta badge to indicate product status" },
      ],
    },
  },
  form: {
    plan: {
      layout: "centered card with form inputs",
      components: ["Card", "Input", "Button", "Alert"],
      reasoning: "Contact/settings forms work best as centered cards with clearly labeled inputs and prominent submit actions.",
    },
    code: `function GeneratedUI() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-md shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Contact Us</h2>
        <p className="text-sm text-gray-500 mb-6">We'd love to hear from you. Send us a message.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="How can we help?" />
          </div>
          <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">Send Message</button>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700">
          We typically respond within 24 hours.
        </div>
      </div>
    </div>
  );
}`,
    explanation: {
      summary: "Created a centered contact form with name, email, and message fields, a submit button, and an informational alert.",
      decisions: [
        { component: "Card", reason: "Centers and contains the form with proper visual hierarchy" },
        { component: "Input", reason: "Text and email inputs for user data collection" },
        { component: "Button", reason: "Full-width submit action for clear form completion" },
        { component: "Alert", reason: "Informational message about response time" },
      ],
    },
  },
};

function detectTemplate(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("dashboard") || lower.includes("analytics") || lower.includes("admin") || lower.includes("metrics")) return "dashboard";
  if (lower.includes("landing") || lower.includes("hero") || lower.includes("homepage") || lower.includes("marketing")) return "landing";
  if (lower.includes("form") || lower.includes("contact") || lower.includes("settings") || lower.includes("input")) return "form";
  return "dashboard";
}

function applyModification(currentCode: string, prompt: string): { code: string; explanation: AgentExplanation } {
  const lower = prompt.toLowerCase();
  let modified = currentCode;

  if (lower.includes("minimal") || lower.includes("simpler") || lower.includes("clean")) {
    modified = modified.replace(/shadow-md/g, "shadow-sm").replace(/shadow-lg/g, "shadow-sm");
  }
  if (lower.includes("dark") || lower.includes("dark mode") || lower.includes("dark theme")) {
    modified = modified
      .replace(/bg-white/g, "bg-gray-900")
      .replace(/bg-gray-50/g, "bg-gray-800")
      .replace(/text-gray-900/g, "text-white")
      .replace(/text-gray-800/g, "text-gray-100")
      .replace(/text-gray-700/g, "text-gray-300")
      .replace(/text-gray-600/g, "text-gray-400")
      .replace(/text-gray-500/g, "text-gray-400")
      .replace(/border-gray-200/g, "border-gray-700")
      .replace(/border-gray-100/g, "border-gray-700");
  }
  if (lower.includes("modal") || lower.includes("settings modal")) {
    modified = modified.replace(
      "</div>\n  );\n}",
      `  {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Settings</h3>
            <button className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="email@example.com" />
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}`
    );
  }

  return {
    code: modified !== currentCode ? modified : currentCode,
    explanation: {
      summary: `Applied modifications based on: "${prompt}". Preserved existing component structure and only modified relevant properties.`,
      decisions: [
        { component: "Layout", reason: "Maintained existing layout structure, only modified targeted styles/elements" },
      ],
    },
  };
}

export async function runAgent(
  prompt: string,
  currentCode: string | null,
  onStep: (step: string) => void
): Promise<{ plan: AgentPlan; code: string; explanation: AgentExplanation }> {
  // Step 1: Planning
  onStep("planning");
  await delay(800);

  const isModification = currentCode !== null && currentCode.trim().length > 0;

  if (isModification) {
    const plan: AgentPlan = {
      layout: "modification of existing layout",
      components: ["(preserving existing)"],
      reasoning: `Analyzing modification request: "${prompt}". Will make incremental changes while preserving component structure.`,
    };

    // Step 2: Generating
    onStep("generating");
    await delay(1000);
    const { code, explanation } = applyModification(currentCode!, prompt);

    // Step 3: Explaining
    onStep("explaining");
    await delay(600);

    return { plan, code, explanation };
  }

  // New generation
  const templateKey = detectTemplate(prompt);
  const template = TEMPLATES[templateKey];

  // Step 2: Generating
  onStep("generating");
  await delay(1200);

  // Step 3: Explaining
  onStep("explaining");
  await delay(600);

  return {
    plan: template.plan,
    code: template.code,
    explanation: template.explanation,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
