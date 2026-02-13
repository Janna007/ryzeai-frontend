export type AgentStep = "planning" | "generating" | "explaining" | "idle" | "done";

export interface AgentPlan {
  layout: string;
  components: string[];
  reasoning: string;
}

export interface existingCode {
   fileName:string,
   filePath:string
   code:string
}

export interface AgentExplanation {
  summary: string;
  decisions: { component: string; reason: string }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  agentSteps?: {
    plan?: AgentPlan;
    explanation?: AgentExplanation;
  };
}

export interface Version {
  id: string;
  label: string;
  code: string;
  plan:AgentPlan;
  timestamp: Date;
  prompt: string;
}

export type Result= {
  code:string,
  plan:AgentPlan,
  explanation: AgentExplanation;
}

export const ALLOWED_COMPONENTS = [
  "Button",
  "Card",
  "Input",
  "Table",
  "Modal",
  "Sidebar",
  "Navbar",
  "Chart",
  "Badge",
  "Avatar",
  "Tabs",
  "Alert",
] as const;


export type sendData= {
  userInput:string,
  existingPlan?:AgentPlan,
  existingCode?:string

}

export type AllowedComponent = (typeof ALLOWED_COMPONENTS)[number];
