import React from 'react';
import {
  Swords,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
  BookOpen,
  Wrench,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { MainViewMode, PresetScenario, VizPerformanceTier } from '../types';

interface NavbarProps {
  viewMode: MainViewMode;
  setViewMode: (mode: MainViewMode) => void;
  selectedPreset: PresetScenario;
  presets: PresetScenario[];
  onSelectPreset: (preset: PresetScenario) => void;
  vizTier: VizPerformanceTier;
  setVizTier: (tier: VizPerformanceTier) => void;
  fps: number;
  nodeCount: number;
  isAutoTiered: boolean;
  onRunDebugger: () => void;
  isDebugging: boolean;
  onResetTrace: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  selectedPreset,
  presets,
  onSelectPreset,
  vizTier,
  setVizTier,
  fps,
  nodeCount,
  isAutoTiered,
  onRunDebugger,
  isDebugging,
  onResetTrace,
}) => {
  return (
    <header id="main-navbar" className="bg-[#0e1017]/95 border-b border-amber-500/30 text-slate-100 px-4 py-3 backdrop-blur-lg sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
      {/* Brand & Emblematic Regal Logo */}
      <div className="flex items-center gap-3">
        <div id="app-brand-logo" className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 p-0.5 flex items-center justify-center gold-glow">
          <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center text-amber-300">
            <Swords className="w-5 h-5 animate-sword-glint" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-cinzel font-extrabold text-xl tracking-wider text-gold-gradient flex items-center gap-2">
              CLASSICAL VIEWER
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              SSbow Engine
            </span>
          </div>
          <p className="text-[11px] font-serif text-slate-400 hidden sm:block italic">
            High-Classical Multi-Agent Intelligence & Reliability
          </p>
        </div>
      </div>

      {/* Symmetrical Navigation View Selector Tabs */}
      <nav id="view-mode-tabs" className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-amber-500/20 gap-1 overflow-x-auto max-w-full">
        <button
          id="tab-playground"
          onClick={() => setViewMode('playground')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all ${
            viewMode === 'playground'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 gold-glow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>3D Topology</span>
        </button>

        <button
          id="tab-presets"
          onClick={() => setViewMode('presets')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all ${
            viewMode === 'presets'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 gold-glow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Scenarios</span>
        </button>

        <button
          id="tab-builder"
          onClick={() => setViewMode('builder')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all ${
            viewMode === 'builder'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 gold-glow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-amber-400" />
          <span>Swarm Builder</span>
        </button>

        <button
          id="tab-metrics"
          onClick={() => setViewMode('metrics')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all ${
            viewMode === 'metrics'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 gold-glow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          <span>Delegation & Metrics</span>
        </button>

        <button
          id="tab-research"
          onClick={() => setViewMode('research')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all ${
            viewMode === 'research'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 gold-glow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Research Guide</span>
        </button>
      </nav>

      {/* Preset Selector & Performance Controls */}
      <div className="flex items-center gap-2.5">
        {/* Preset Selector Dropdown */}
        <div id="preset-selector-container" className="hidden lg:flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-cinzel">
          <span className="text-amber-400/80 font-bold uppercase text-[10px]">Scenario:</span>
          <select
            id="preset-scenario-dropdown"
            value={selectedPreset.id}
            onChange={(e) => {
              const found = presets.find((p) => p.id === e.target.value);
              if (found) onSelectPreset(found);
            }}
            className="bg-transparent text-amber-200 font-semibold focus:outline-none cursor-pointer pr-1"
          >
            {presets.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0b0c10] text-slate-200">
                {p.title} ({p.agents.length} Agents)
              </option>
            ))}
          </select>
        </div>

        {/* Adaptive Performance Tier Indicator */}
        <div id="adaptive-performance-tier" className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 px-3 py-1 rounded-xl text-xs">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-[11px] text-amber-300">
                {vizTier === 'TIER_1_3D_HYPER' ? '3D Spatial' : vizTier === 'TIER_2_2D_FORCE' ? '2D Topology' : 'Grid Matrix'}
              </span>
              {isAutoTiered && (
                <span className="px-1 text-[9px] bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-mono">
                  Auto-LOD
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
              <span>{fps} FPS</span>
              <span>•</span>
              <span>{nodeCount} Nodes</span>
            </div>
          </div>

          <button
            id="toggle-viz-tier-btn"
            onClick={() => {
              const nextTier =
                vizTier === 'TIER_1_3D_HYPER'
                  ? 'TIER_2_2D_FORCE'
                  : vizTier === 'TIER_2_2D_FORCE'
                  ? 'TIER_3_GRID_PERF'
                  : 'TIER_1_3D_HYPER';
              setVizTier(nextTier);
            }}
            title="Cycle Visualization Tier Mode (3D Spatial -> 2D Force -> Dense Grid)"
            className="ml-1 p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-amber-300 transition"
          >
            <Zap className="w-3 h-3 text-amber-400" />
          </button>
        </div>

        {/* AI Debugger Meta-Agent CTA Button */}
        <button
          id="btn-run-ai-debugger"
          onClick={onRunDebugger}
          disabled={isDebugging}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg gold-glow transition-all hover:scale-105 active:scale-95 disabled:opacity-50 border border-amber-300"
        >
          <Sparkles className={`w-3.5 h-3.5 fill-slate-950 ${isDebugging ? 'animate-spin' : 'animate-bounce'}`} />
          <span>{isDebugging ? 'Analyzing...' : 'Meta-Debugger Engine'}</span>
        </button>

        {/* Reset Trace Button */}
        <button
          id="btn-reset-trace"
          onClick={onResetTrace}
          title="Reset Simulation & Logs"
          className="p-2 bg-slate-900 border border-amber-500/30 text-amber-400 hover:text-amber-200 hover:bg-slate-800 rounded-xl transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

