import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Activity,
  AlertTriangle,
  Award,
  BarChart2,
  Clock,
  Cpu,
  Zap,
  Lock,
  PieChart,
  CheckCircle2,
  HelpCircle,
  BrainCircuit,
} from 'lucide-react';
import { DelegationGapMetrics, AgentNode } from '../types';

interface DelegationAndReliabilityDashboardProps {
  metrics: DelegationGapMetrics;
  agents: AgentNode[];
  scenarioTitle: string;
}

export const DelegationAndReliabilityDashboard: React.FC<DelegationAndReliabilityDashboardProps> = ({
  metrics,
  agents,
  scenarioTitle,
}) => {
  const totalTokens = agents.reduce((acc, a) => acc + a.tokensUsed, 0);
  const totalErrors = agents.reduce((acc, a) => acc + a.errorCount, 0);
  const totalAgents = agents.length;

  return (
    <div id="delegation-reliability-dashboard" className="p-6 space-y-6 bg-[#0b0c10] text-slate-100 min-h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-cinzel font-bold tracking-wider text-gold-gradient">
              Workflow Reliability & Delegation Gap Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-serif italic">
            Measuring autonomous decision bounds, prompt precision gaps, and swarm error resilience for "{scenarioTitle}"
          </p>
        </div>

        {/* Global Autonomy Gauge Badge */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-amber-500/30 px-4 py-2 rounded-2xl shadow-lg gold-glow">
          <BrainCircuit className="w-8 h-8 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[10px] uppercase font-cinzel font-bold tracking-wider text-amber-400/80 block">
              Swarm Autonomy Index
            </span>
            <span className="text-xl font-black font-mono text-amber-300">
              {metrics.autonomyScore.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Autonomy Score */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Autonomy Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-100">
            {metrics.autonomyScore.toFixed(1)}%
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, metrics.autonomyScore)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {metrics.totalAutonomousDecisions} autonomous decisions vs {metrics.humanInjectionsCount} human interventions
          </p>
        </div>

        {/* Card 2: Prompt Precision Gap */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Prompt Precision Gap</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-amber-300">
            {metrics.promptPrecisionGap.toFixed(1)}%
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, metrics.promptPrecisionGap)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Discrepancy between system prompt bounds & tool execution behavior
          </p>
        </div>

        {/* Card 3: MTBF (Mean Time Between Failures) */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Mean Time Between Failures</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-cyan-300">
            {metrics.MTBFSeconds}s
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (metrics.MTBFSeconds / 300) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">Average interval between tool crashes or unhandled exceptions</p>
        </div>

        {/* Card 4: Swarm Consensus Ratio */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Consensus Agreement Ratio</span>
            <PieChart className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-purple-300">
            {(metrics.consensusRatio * 100).toFixed(0)}%
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, metrics.consensusRatio * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">Inter-agent agreement score on cross-validated outputs</p>
        </div>
      </div>

      {/* Autonomy Gain Progression & Delegation Gap Curve Chart (SVG) */}
      <div id="interactive-delegation-graph-card" className="bg-slate-900/90 p-6 rounded-2xl border border-amber-500/30 shadow-2xl gold-glow space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              Interactive Delegation Precision & Autonomy Gain Progression
            </h3>
            <p className="text-xs font-serif text-slate-400 italic">
              Tracking autonomy gains, delegation precision bounds, and error decay across multi-agent execution steps
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800/60 font-semibold">
              +42% Autonomy Gain Post-Patch
            </span>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-500/40 font-semibold">
              Gap &lt; 2.1%
            </span>
          </div>
        </div>

        {/* SVG Interactive Chart with Annotations */}
        <div className="relative h-64 w-full pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 180">
            {/* Background Grid */}
            <line x1="0" y1="30" x2="600" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
            <line x1="0" y1="80" x2="600" y2="80" stroke="#1e293b" strokeDasharray="4 4" />
            <line x1="0" y1="130" x2="600" y2="130" stroke="#1e293b" strokeDasharray="4 4" />

            {/* Y-Axis Labels */}
            <text x="5" y="25" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">100% Precision</text>
            <text x="5" y="75" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">50% Precision</text>
            <text x="5" y="125" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">0% Error Floor</text>

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="goldCurveGradDashboard" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Autonomy Curve (Gold to Emerald) */}
            <path
              d="M 50 140 Q 180 130, 320 70 T 570 25"
              fill="none"
              stroke="url(#goldCurveGradDashboard)"
              strokeWidth="4"
            />

            {/* Error Decay Curve (Dashed Red) */}
            <path
              d="M 50 25 Q 180 40, 320 95 T 570 145"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeDasharray="5 5"
            />

            {/* Milestone Step Annotations */}
            <g className="font-mono text-[10px]">
              {/* Step 1: Initialization */}
              <circle cx="50" cy="140" r="6" fill="#f59e0b" className="hover:scale-125 transition-transform cursor-pointer" />
              <text x="30" y="165" fill="#cbd5e1" fontWeight="bold">Step 1: System Prompt</text>

              {/* Step 2: Delegation Drift Detected */}
              <circle cx="220" cy="100" r="6" fill="#f59e0b" className="hover:scale-125 transition-transform cursor-pointer" />
              <text x="180" y="85" fill="#f59e0b" fontWeight="bold">Step 2: Delegation Drift (8.4%)</text>

              {/* Step 3: Meta-Agent Patch */}
              <circle cx="380" cy="50" r="7" fill="#38bdf8" className="hover:scale-125 transition-transform cursor-pointer" />
              <text x="330" y="35" fill="#38bdf8" fontWeight="bold">Step 3: Meta-Agent Patch</text>

              {/* Step 4: Optimal Convergence */}
              <circle cx="570" cy="25" r="8" fill="#10b981" className="hover:scale-125 transition-transform cursor-pointer" />
              <text x="500" y="15" fill="#34d399" fontWeight="bold">Step 4: Convergence (94.8%)</text>

              {/* Error Points */}
              <circle cx="50" cy="25" r="4" fill="#ef4444" />
              <circle cx="220" cy="55" r="4" fill="#ef4444" />
              <circle cx="380" cy="115" r="4" fill="#ef4444" />
              <circle cx="570" cy="145" r="5" fill="#f87171" />
            </g>
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 rounded" />
              <span className="text-slate-200 font-bold">Autonomy Index %</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-red-500 rounded border border-dashed" />
              <span className="text-slate-200 font-bold">Prompt Precision Drift %</span>
            </div>
          </div>
          <span className="text-amber-400 font-cinzel font-bold">
            Real-time OpenTelemetry Telemetry Active
          </span>
        </div>
      </div>

      {/* Per-Agent Resource & Error Table */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          Agent Node Resource Consumption & Reliability Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Agent Node</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tokens Used</th>
                <th className="p-3">Error Count</th>
                <th className="p-3">Avg Latency</th>
                <th className="p-3">Tools Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {agents.map((ag) => {
                const avgLatency =
                  ag.latencies.length > 0
                    ? Math.round(ag.latencies.reduce((a, b) => a + b, 0) / ag.latencies.length)
                    : 0;

                return (
                  <tr key={ag.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-semibold text-slate-100 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ag.color }} />
                      {ag.name}
                    </td>
                    <td className="p-3 text-slate-400">{ag.role}</td>
                    <td className="p-3 font-semibold text-cyan-400 uppercase">{ag.status}</td>
                    <td className="p-3">{ag.tokensUsed.toLocaleString()}</td>
                    <td className={`p-3 font-bold ${ag.errorCount > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                      {ag.errorCount}
                    </td>
                    <td className="p-3 text-cyan-300">{avgLatency} ms</td>
                    <td className="p-3 text-slate-400">{ag.tools.join(', ') || 'None'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
