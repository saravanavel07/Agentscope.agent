import React, { useState } from 'react';
import {
  Sparkles,
  AlertOctagon,
  CheckCircle,
  Wrench,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Zap,
  Code,
  FileText,
  Check,
  Brain,
  Lightbulb,
} from 'lucide-react';
import { DebuggerAnalysisResult, RecommendedPromptPatch, AgentNode } from '../types';

interface MetaAgentDebuggerPanelProps {
  analysis: DebuggerAnalysisResult | null;
  isAnalyzing: boolean;
  onRunAnalysis: () => void;
  onApplyPromptPatch: (patch: RecommendedPromptPatch) => void;
  agents: AgentNode[];
  isOpen: boolean;
  onClose: () => void;
}

export const MetaAgentDebuggerPanel: React.FC<MetaAgentDebuggerPanelProps> = ({
  analysis,
  isAnalyzing,
  onRunAnalysis,
  onApplyPromptPatch,
  agents,
  isOpen,
  onClose,
}) => {
  const [appliedPatches, setAppliedPatches] = useState<{ [agentId: string]: boolean }>({});

  if (!isOpen) return null;

  const handleApply = (patch: RecommendedPromptPatch) => {
    onApplyPromptPatch(patch);
    setAppliedPatches((prev) => ({ ...prev, [patch.agentId]: true }));
  };

  const getIssueBadge = (issueType: string) => {
    switch (issueType) {
      case 'RECURSIVE_LOOP':
        return <span className="px-2.5 py-1 text-xs bg-red-950 text-red-300 border border-red-800 rounded-full font-bold flex items-center gap-1">🔄 RECURSIVE LOOP</span>;
      case 'SCHEMA_DRIFT':
        return <span className="px-2.5 py-1 text-xs bg-amber-950 text-amber-300 border border-amber-800 rounded-full font-bold flex items-center gap-1">⚠️ SCHEMA DRIFT</span>;
      case 'DELEGATION_DEADLOCK':
        return <span className="px-2.5 py-1 text-xs bg-purple-950 text-purple-300 border border-purple-800 rounded-full font-bold flex items-center gap-1">🔒 DELEGATION DEADLOCK</span>;
      case 'LATENCY_SPIKE':
        return <span className="px-2.5 py-1 text-xs bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-full font-bold flex items-center gap-1">⚡ LATENCY SPIKE</span>;
      default:
        return <span className="px-2.5 py-1 text-xs bg-slate-800 text-slate-300 border border-slate-700 rounded-full font-bold">INFO</span>;
    }
  };

  return (
    <div id="meta-agent-debugger-drawer" className="fixed inset-y-0 right-0 w-full sm:w-[500px] lg:w-[580px] bg-slate-950 border-l border-slate-800/90 shadow-2xl z-50 flex flex-col backdrop-blur-2xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div id="debugger-drawer-header" className="p-4 bg-slate-900/90 border-b border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-950/80 rounded-xl border border-amber-500/40 text-amber-400 gold-glow">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-bold font-cinzel text-base text-slate-100 flex items-center gap-2">
              SSbow Meta-Debugger
              <span className="text-[10px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40 font-mono">
                Sovereign AI Auditor
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-serif italic">Root-cause diagnosis & automated prompt patching</p>
          </div>
        </div>

        <button
          id="close-debugger-drawer-btn"
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-lg text-lg font-bold transition"
        >
          ✕
        </button>
      </div>

      {/* Main Panel Content */}
      <div id="debugger-drawer-body" className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Run Analysis Trigger Bar */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-200">Inspect Trace History</h3>
            <p className="text-[11px] text-slate-400">Analyze recursive loops, schema drifts, and deadlock root causes.</p>
          </div>
          <button
            id="btn-re-run-ai-diagnosis"
            onClick={onRunAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-cinzel font-bold text-xs uppercase rounded-xl shadow-lg gold-glow transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing...' : 'Run Diagnosis'}</span>
          </button>
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-slate-900/40 rounded-2xl border border-amber-500/20">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono text-amber-300 font-semibold animate-pulse">
              SSbow Meta-Engine analyzing multi-agent trace graph...
            </p>
            <span className="text-[11px] text-slate-500">Evaluating schema drifts & delegation deadlocks</span>
          </div>
        )}

        {/* Diagnosis Results Display */}
        {!isAnalyzing && analysis && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Root Cause Card */}
            <div id="root-cause-card" className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                {getIssueBadge(analysis.issueType)}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <span>Confidence:</span>
                  <span className="font-bold text-amber-300">
                    {Math.round(analysis.confidenceScore * 100)}%
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 mb-1">
                  Root Cause Summary
                </h4>
                <p className="text-sm font-semibold text-slate-100 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {analysis.rootCauseSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 mb-1">
                  Detailed Explanation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
                  {analysis.explanation}
                </p>
              </div>
            </div>

            {/* Impacted Agent Nodes */}
            <div id="impacted-nodes-section" className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                Impacted Agent Nodes ({analysis.impactedAgentIds.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.impactedAgentIds.map((id) => {
                  const ag = agents.find((a) => a.id === id);
                  return (
                    <span
                      key={id}
                      className="px-2.5 py-1 bg-red-950/60 text-red-300 border border-red-800/80 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      {ag ? ag.name : id}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Recommended System Prompt Patches */}
            <div id="prompt-patches-section" className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Recommended System Prompt Patches ({analysis.recommendedPrompts.length})
              </h4>

              {analysis.recommendedPrompts.map((patch) => {
                const targetAgent = agents.find((a) => a.id === patch.agentId);
                const isApplied = appliedPatches[patch.agentId];

                return (
                  <div
                    key={patch.agentId}
                    id={`patch-card-${patch.agentId}`}
                    className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 space-y-3 shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-amber-400" />
                        Target: {patch.agentName || targetAgent?.name || patch.agentId}
                      </span>
                      <button
                        id={`btn-apply-patch-${patch.agentId}`}
                        onClick={() => handleApply(patch)}
                        disabled={isApplied}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs transition-all ${
                          isApplied
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50 cursor-default'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-amber-400" />
                            <span>Patch Applied</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Apply System Prompt Patch</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
                      Rationale: {patch.explanation}
                    </p>

                    {/* Diff View: Original vs Proposed Prompt */}
                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-red-400 font-bold block mb-1">
                          - CURRENT SYSTEM PROMPT (FLAWED)
                        </span>
                        <div className="p-2.5 bg-red-950/30 text-red-200 border border-red-900/40 rounded-xl max-h-24 overflow-y-auto text-[11px]">
                          {targetAgent?.systemPrompt || 'None'}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-amber-300 font-bold block mb-1">
                          + PATCHED SYSTEM PROMPT (RECOMMENDED BY SSBOW META-ENGINE)
                        </span>
                        <div className="p-2.5 bg-amber-950/30 text-amber-200 border border-amber-500/40 rounded-xl max-h-32 overflow-y-auto text-[11px] leading-relaxed">
                          {patch.newSystemPrompt}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
