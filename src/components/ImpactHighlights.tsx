import React from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  BarChart,
  Activity,
  Zap,
  TrendingUp,
} from 'lucide-react';

interface ImpactHighlightsProps {
  autonomyScore: number;
  delegationGap: number;
  errorRate: number;
  consensusRatio: number;
  onViewFullMetrics?: () => void;
}

export const ImpactHighlights: React.FC<ImpactHighlightsProps> = ({
  autonomyScore,
  delegationGap,
  errorRate,
  consensusRatio,
  onViewFullMetrics,
}) => {
  return (
    <section id="impact-highlights-section" className="py-12 px-6 bg-[#0b0c10] border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Symmetrical Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 font-cinzel text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Risk Management & Governance Dashboard</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Reliability Metrics & Delegation Gap Tracker
          </h2>
          <p className="font-playfair text-slate-300 text-sm sm:text-base max-w-2xl mx-auto italic">
            "Real-time monitoring of swarm stability, delegation drifts, error overlays, and consensus compliance."
          </p>
        </div>

        {/* Live Interactive Graph View Card */}
        <div id="delegation-metrics-graph-card" className="p-6 bg-slate-900/90 border border-amber-500/40 rounded-2xl gold-glow space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <h3 className="font-cinzel text-lg font-bold text-white">
                  Delegation Precision & Autonomy Gain Graph
                </h3>
              </div>
              <p className="font-serif text-xs text-slate-400 italic">
                Step-by-step curve measuring system prompt alignment, tool precision, and error decay
              </p>
            </div>

            {onViewFullMetrics && (
              <button
                id="btn-view-full-metrics-dashboard"
                onClick={onViewFullMetrics}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-cinzel text-xs font-bold uppercase tracking-wider rounded-xl border border-amber-500/40 transition hover:scale-105"
              >
                <BarChart className="w-4 h-4 text-amber-400" />
                <span>Open Full Analytics View</span>
              </button>
            )}
          </div>

          {/* Graph Visualization */}
          <div className="h-56 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="#1e293b" strokeDasharray="4 4" />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="goldCurveGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Autonomy Gain Curve */}
              <path
                d="M 10 130 Q 140 120, 250 70 T 490 25"
                fill="none"
                stroke="url(#goldCurveGradient)"
                strokeWidth="4"
              />

              {/* Delegation Drift Error Curve */}
              <path
                d="M 10 30 Q 140 45, 250 95 T 490 145"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />

              {/* Nodes / Data Points with Gold Glow */}
              <g>
                <circle cx="10" cy="130" r="5" fill="#f59e0b" className="animate-pulse" />
                <circle cx="250" cy="70" r="6" fill="#eab308" />
                <circle cx="490" cy="25" r="7" fill="#10b981" />
                <text x="440" y="20" fill="#34d399" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">94.8% Autonomy</text>

                <circle cx="10" cy="30" r="4" fill="#ef4444" />
                <circle cx="250" cy="95" r="4" fill="#ef4444" />
                <circle cx="490" cy="145" r="4" fill="#f87171" />
                <text x="430" y="155" fill="#f87171" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">2.1% Drift Error</text>
              </g>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-gradient-to-r from-amber-500 to-emerald-400 rounded" />
                <span className="text-slate-300 font-bold">Autonomy Score % (Ascending)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-red-500 rounded border border-dashed" />
                <span className="text-slate-300 font-bold">Prompt Drift Error % (Decaying)</span>
              </div>
            </div>
            <span className="text-amber-300 font-bold">OpenTelemetry Span Traced</span>
          </div>
        </div>

        {/* Risk & Reliability Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Delegation Gap & Drift Tracker */}
          <div id="card-delegation-gap-tracker" className="p-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl space-y-4 gold-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">
                    Delegation Gap & Prompt Drift Tracker
                  </h3>
                  <p className="text-xs text-slate-400">
                    System prompt specification vs. execution behavior
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
                {delegationGap < 10 ? 'OPTIMAL' : 'MONITORING'}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Delegation Precision Deviation</span>
                <span className="text-amber-300 font-bold">{delegationGap.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 transition-all duration-500"
                  style={{ width: `${Math.min(100, delegationGap * 4)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Planner Alignment</div>
                <div className="text-emerald-400 font-bold text-sm">98.4%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Critic Discrepancy</div>
                <div className="text-amber-300 font-bold text-sm">{(100 - consensusRatio).toFixed(1)}%</div>
              </div>
            </div>
          </div>

          {/* Card 2: Swarm Consensus & Error Overlays */}
          <div id="card-error-overlays-dashboard" className="p-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl space-y-4 gold-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">
                    Consensus & Reliability Overlays
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cross-agent verification agreement & fault recovery
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                STABLE
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Swarm Agreement Ratio</span>
                <span className="text-emerald-400 font-bold">{consensusRatio.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${consensusRatio}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Failure Frequency</div>
                <div className="text-cyan-300 font-bold text-sm">{errorRate.toFixed(2)} / min</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Autonomy Index</div>
                <div className="text-amber-300 font-bold text-sm">{autonomyScore.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
