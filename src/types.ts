export type AgentStatus =
  | 'idle'
  | 'thinking'
  | 'executing_tool'
  | 'sending_msg'
  | 'errored'
  | 'paused'
  | 'waiting_human';

export type AgentRole =
  | 'architect'
  | 'coder'
  | 'tester'
  | 'devops'
  | 'crawler'
  | 'summarizer'
  | 'fact_checker'
  | 'arbiter'
  | 'editor'
  | 'l1_support'
  | 'specialist'
  | 'supervisor'
  | 'drone_lead'
  | 'mapper'
  | 'path_planner'
  | 'safety'
  | 'custom';

export interface AgentNode {
  id: string;
  name: string;
  role: AgentRole;
  systemPrompt: string;
  temperature: number;
  model: string;
  status: AgentStatus;
  position: { x: number; y: number; z: number };
  activeTool?: string;
  errorCount: number;
  tokensUsed: number;
  latencies: number[]; // ms history
  tools: string[];
  color: string;
  iconName?: string;
  subAgents?: string[];
}

export type MessageType = 'task' | 'query' | 'data' | 'tool_output' | 'error' | 'patch';

export interface MessageEdge {
  id: string;
  sourceAgentId: string;
  targetAgentId: string;
  messageType: MessageType;
  payload: string;
  timestamp: number;
  status: 'active' | 'completed' | 'failed';
  latencyMs: number;
  bytesTransferred: number;
  progress?: number; // 0 to 1 for animated packets
}

export type EventSeverity = 'info' | 'warn' | 'error' | 'success';

export type TraceEventType =
  | 'STATE_CHANGE'
  | 'MSG_SENT'
  | 'MSG_RECEIVED'
  | 'TOOL_CALL'
  | 'TOOL_RETURN'
  | 'ERROR'
  | 'RETRY'
  | 'DELEGATION'
  | 'HUMAN_INTERCEPT'
  | 'PATCH_APPLIED';

export interface TraceEvent {
  id: string;
  timestamp: number;
  agentId: string;
  agentName: string;
  eventType: TraceEventType;
  severity: EventSeverity;
  message: string;
  details?: {
    toolName?: string;
    toolArgs?: any;
    errorStack?: string;
    targetAgentId?: string;
    promptPatch?: string;
    tokens?: number;
    latencyMs?: number;
  };
  stepIndex: number;
}

export interface RecommendedPromptPatch {
  agentId: string;
  agentName: string;
  newSystemPrompt: string;
  explanation: string;
}

export interface DebuggerAnalysisResult {
  rootCauseSummary: string;
  issueType: 'RECURSIVE_LOOP' | 'SCHEMA_DRIFT' | 'DELEGATION_DEADLOCK' | 'LATENCY_SPIKE' | 'PROMPT_AMBIGUITY' | 'NONE';
  impactedAgentIds: string[];
  explanation: string;
  recommendedPrompts: RecommendedPromptPatch[];
  confidenceScore: number;
}

export interface DelegationGapMetrics {
  humanInjectionsCount: number;
  totalAutonomousDecisions: number;
  autonomyScore: number; // 0 to 100
  decisionUncertaintyAvg: number; // 0 to 1
  promptPrecisionGap: number; // 0 to 100
  MTBFSeconds: number;
  consensusRatio: number; // 0 to 1
  fallbackTriggerCount: number;
  autonomyGainHistory: { step: number; autonomyScore: number; errorRate: number }[];
}

export type VizPerformanceTier = 'TIER_1_3D_HYPER' | 'TIER_2_2D_FORCE' | 'TIER_3_GRID_PERF';

export type MainViewMode = 'playground' | 'presets' | 'builder' | 'metrics' | 'research';

export interface PresetScenario {
  id: string;
  title: string;
  category: 'Software Engineering' | 'Deep Research' | 'Customer Escalation' | 'Robotics Swarm';
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Swarm Scale';
  badge: string;
  agents: AgentNode[];
  edges: MessageEdge[];
  initialTrace: TraceEvent[];
  knownBugDescription: string;
  expectedGoal: string;
}

export interface HumanInterceptRequest {
  id: string;
  agentId: string;
  agentName: string;
  toolName: string;
  toolArgs: any;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reasoning: string;
  timestamp: number;
}
