import React from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Activity,
  AlertTriangle,
  Play,
  Cpu,
  Lock,
  Swords,
} from 'lucide-react';

interface HeroBannerProps {
  onLaunchDemo: () => void;
  onRunDebugger: () => void;
  autonomyScore: number;
  delegationGap: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onLaunchDemo,
  onRunDebugger,
  autonomyScore,
  delegationGap,
}) => {
  return (
    <div id="hero-banner-classical" className="relative overflow-hidden bg-gradient-to-b from-[#11131a] via-[#0e1017] to-[#0b0c10] border-b border-amber-500/20 py-12 px-6">
      {/* Symmetrical Ornamental Golden Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/30 via-amber-600/5 to-transparent" />

      {/* Classical Symmetrical Laurel Framing */}
      <div className="relative max-w-6xl mx-auto text-center space-y-6">
        {/* Emblematic Top Seal */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Swords className="w-4 h-4 text-amber-300 animate-sword-glint" />
          <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
            CLASSICAL VIEWER • Sovereign Multi-Agent Governance
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Regal Main Heading */}
        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          High-Precision Multi-Agent <br />
          <span className="text-gold-gradient font-extrabold drop-shadow-sm">
            Swarm Reliability & Topology
          </span>
        </h1>

        {/* Elegant Serif Subtitle */}
        <p className="font-playfair text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto italic leading-relaxed">
          "Mastering autonomous decision boundaries, prompt precision gaps, and swarm error resilience through high-classical engineering and real-time 3D topology telemetry."
        </p>

        {/* Classical Symmetrical Metric Highlights Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4">
          {/* Card 1: Autonomy Index */}
          <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-2xl gold-glow flex flex-col items-center justify-center space-y-1">
            <span className="font-cinzel text-[11px] uppercase tracking-widest text-amber-400/90 font-bold">
              Swarm Autonomy Index
            </span>
            <div className="font-mono text-3xl font-extrabold text-amber-300">
              {autonomyScore.toFixed(1)}%
            </div>
            <span className="text-[11px] text-slate-400 font-serif italic">
              Autonomous Decision Integrity
            </span>
          </div>

          {/* Card 2: Delegation Gap Bounding */}
          <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-2xl gold-glow flex flex-col items-center justify-center space-y-1">
            <span className="font-cinzel text-[11px] uppercase tracking-widest text-amber-400/90 font-bold">
              Prompt Precision Gap
            </span>
            <div className="font-mono text-3xl font-extrabold text-amber-200">
              {delegationGap.toFixed(1)}%
            </div>
            <span className="text-[11px] text-slate-400 font-serif italic">
              System Prompt Boundary Drift
            </span>
          </div>

          {/* Card 3: Governance Compliance */}
          <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-2xl gold-glow flex flex-col items-center justify-center space-y-1">
            <span className="font-cinzel text-[11px] uppercase tracking-widest text-amber-400/90 font-bold">
              OpenTelemetry Compliance
            </span>
            <div className="font-mono text-3xl font-extrabold text-amber-300">
              100%
            </div>
            <span className="text-[11px] text-slate-400 font-serif italic">
              Anonymized Audit Standard
            </span>
          </div>
        </div>

        {/* Symmetrical Regal CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="hero-btn-launch-demo"
            onClick={onLaunchDemo}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-cinzel font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95 border border-amber-300"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Launch Interactive 3D Playground</span>
          </button>

          <button
            id="hero-btn-run-debugger"
            onClick={onRunDebugger}
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-cinzel font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Invoke Sovereign Meta-Debugger</span>
          </button>
        </div>
      </div>
    </div>
  );
};
