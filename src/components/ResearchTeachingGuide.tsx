import React from 'react';
import {
  BookOpen,
  Cpu,
  ShieldAlert,
  BrainCircuit,
  Activity,
  Download,
  CheckCircle,
  HelpCircle,
  Zap,
  Code,
  Sparkles,
} from 'lucide-react';

interface ResearchTeachingGuideProps {
  onExportTrace: () => void;
}

export const ResearchTeachingGuide: React.FC<ResearchTeachingGuideProps> = ({ onExportTrace }) => {
  return (
    <div id="research-teaching-guide" className="p-6 space-y-6 bg-slate-950 text-slate-100 min-h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-200 to-yellow-300 bg-clip-text text-transparent">
              Multi-Agent AI Research & Teaching Hub
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Educational curricula, architectural concepts, and OpenTelemetry trace dataset export for computer science classrooms and AI labs
          </p>
        </div>

        <button
          id="btn-export-opentelemetry"
          onClick={onExportTrace}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition hover:scale-105 active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Export OpenTelemetry JSON Dataset</span>
        </button>
      </div>

      {/* Core Educational Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Module 1: ReAct Loops & Tool Cascades */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
            <BrainCircuit className="w-5 h-5 text-amber-400" />
            <h3>1. ReAct Loops & Recursive Failure Modes</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Autonomous agents operate in continuous Reason-Act-Observe cycles. When a tool call returns an unhandled schema exception, naive retry loops consume context windows recursively.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-200">
            <code>
              Thought -&gt; Action: exec_tool() -&gt; Error Exception -&gt; Retry Prompt -&gt; Infinite Loop
            </code>
          </div>
        </div>

        {/* Module 2: Delegation Gap & Autonomy Bounds */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <h3>2. Delegation Gap & Autonomy Index</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Delegation Gap measures the disparity between human intent and agent execution. High-risk actions (e.g. cloud deployments or financial transactions) trigger human-in-the-loop gatekeeping.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-200">
            <code>
              Autonomy Score = Autonomous Decisions / (Autonomous Decisions + Human Intercepts)
            </code>
          </div>
        </div>

        {/* Module 3: Swarm Consensus & Deadlocks */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2.5 text-purple-300 font-bold text-sm">
            <Activity className="w-5 h-5 text-purple-400" />
            <h3>3. Swarm Consensus & Arbitration Deadlocks</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-agent systems require consensus protocols (e.g., majority voting, arbiter agents, or cross-validation). Contradictory source data can cause infinite re-query deadlocks.
          </p>
        </div>

        {/* Module 4: Adaptive LOD Scaling */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2.5 text-cyan-300 font-bold text-sm">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3>4. Adaptive Visualization Tiering (LOD)</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rendering large multi-agent topologies (20+ nodes) causes browser GPU/CPU bottlenecks. AgentScope dynamically auto-tiers between 3D Spatial particles, 2D Force graphs, and Dense Grid matrices based on measured FPS.
          </p>
        </div>
      </div>
    </div>
  );
};
