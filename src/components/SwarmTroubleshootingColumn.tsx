import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  Wrench,
  ShieldAlert,
  Terminal,
  RefreshCw,
  CheckCircle2,
  Bug,
  Activity,
  Zap,
  Filter,
  Lock,
} from 'lucide-react';
import { AgentNode, TraceEvent } from '../types';

interface SwarmTroubleshootingColumnProps {
  agents: AgentNode[];
  cliEvents: TraceEvent[];
  onRunDebuggerForAgent: (agentId: string) => void;
  onFilterLogsByAgent: (agentId: string) => void;
  onToggleAgentStatus?: (agentId: string) => void;
}

export const SwarmTroubleshootingColumn: React.FC<SwarmTroubleshootingColumnProps> = ({
  agents,
  cliEvents,
  onRunDebuggerForAgent,
  onFilterLogsByAgent,
  onToggleAgentStatus,
}) => {
  const [filter, setFilter] = useState<'all' | 'error' | 'hallucination' | 'drift'>('all');
  const [isolatedAgents, setIsolatedAgents] = useState<Record<string, boolean>>({});

  // Identify troubling agents (error state, or associated with recent error CLI events, or high error count)
  const troublingAgents = agents.map((agent) => {
    const recentAgentEvents = cliEvents.filter((e) => e.agentId === agent.id);
    const hasError = agent.status === 'error' || recentAgentEvents.some((e) => e.severity === 'error');
    const lastErrorEvent = recentAgentEvents.find((e) => e.severity === 'error');
    
    // Simulate or calculate trouble score
    const troubleType =
      agent.status === 'error'
        ? 'DELEGATION_DEADLOCK'
        : agent.role === 'executor'
        ? 'SCHEMA_DRIFT'
        : agent.role === 'evaluator'
        ? 'LOOP_HALLUCINATION'
        : 'LATENCY_SPIKE';

    return {
      ...agent,
      isTroubling: hasError || agent.status === 'error',
      troubleType,
      lastErrorMessage: lastErrorEvent?.message || (hasError ? 'Schema validation failed: unexpected field mapping' : 'Nominal operation'),
      errorCount: recentAgentEvents.filter((e) => e.severity === 'error').length + (agent.status === 'error' ? 2 : 0),
    };
  });

  const filteredTroublingAgents = troublingAgents.filter((agent) => {
    if (filter === 'error') return agent.isTroubling;
    if (filter === 'hallucination') return agent.troubleType === 'LOOP_HALLUCINATION';
    if (filter === 'drift') return agent.troubleType === 'SCHEMA_DRIFT';
    return true; // 'all'
  });

  const handleIsolateToggle = (agentId: string) => {
    setIsolatedAgents((prev) => ({
      ...prev,
      [agentId]: !prev[agentId],
    }));
    if (onToggleAgentStatus) {
      onToggleAgentStatus(agentId);
    }
  };

  return (
    <aside id="swarm-troubleshooting-column" className="flex flex-col h-full bg-[#0b0c10] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden gold-glow">
      {/* Column Header */}
      <div id="troubleshooting-header-bar" className="bg-[#0e1017] border-b border-amber-500/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-950/80 rounded-lg border border-red-500/40 text-red-400 animate-pulse">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm font-bold text-amber-200 uppercase tracking-wider">
                Swarm Agents Troubling Column
              </h2>
              <span className="text-[10px] font-serif text-slate-400 italic">
                Real-time active agent issue isolation & diagnostics
              </span>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-amber-950/80 text-amber-300 rounded-lg border border-amber-500/40">
            {troublingAgents.filter((a) => a.isTroubling).length} Troubling
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-cinzel font-semibold transition ${
              filter === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'text-slate-400 bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            All Agents ({troublingAgents.length})
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-cinzel font-semibold transition ${
              filter === 'error'
                ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                : 'text-slate-400 bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            In Error ({troublingAgents.filter((a) => a.isTroubling).length})
          </button>
          <button
            onClick={() => setFilter('hallucination')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-cinzel font-semibold transition ${
              filter === 'hallucination'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                : 'text-slate-400 bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            Hallucinations
          </button>
          <button
            onClick={() => setFilter('drift')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-cinzel font-semibold transition ${
              filter === 'drift'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'text-slate-400 bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            Drifts
          </button>
        </div>
      </div>

      {/* Agents Trouble List Stream */}
      <div id="troubleshooting-agent-list" className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredTroublingAgents.map((agent) => {
          const isIsolated = isolatedAgents[agent.id];

          return (
            <div
              key={agent.id}
              id={`troubling-agent-card-${agent.id}`}
              className={`p-3.5 rounded-xl border transition-all space-y-3 ${
                agent.isTroubling
                  ? 'bg-slate-900/90 border-red-500/40 shadow-lg shadow-red-950/20'
                  : 'bg-slate-900/50 border-amber-500/20'
              } ${isIsolated ? 'opacity-60 grayscale-[40%]' : ''}`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isIsolated
                        ? 'bg-slate-500'
                        : agent.status === 'error'
                        ? 'bg-red-500 animate-ping'
                        : agent.status === 'active'
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-emerald-400'
                    }`}
                  />
                  <div>
                    <h3 className="font-cinzel text-xs font-bold text-amber-100 flex items-center gap-1.5">
                      {agent.name}
                      {isIsolated && (
                        <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                          ISOLATED
                        </span>
                      )}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Role: {agent.role}
                    </span>
                  </div>
                </div>

                {/* Trouble Type Badge */}
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${
                    agent.isTroubling
                      ? 'bg-red-950 text-red-300 border-red-500/50'
                      : 'bg-amber-950 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {agent.troubleType}
                </span>
              </div>

              {/* Trouble Detail Box */}
              <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Last Trace Exception:</span>
                  <span className="text-red-400 font-bold">{agent.errorCount} Faults</span>
                </div>
                <p className="text-red-300/90 leading-tight truncate" title={agent.lastErrorMessage}>
                  "{agent.lastErrorMessage}"
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                <button
                  onClick={() => onFilterLogsByAgent(agent.id)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] rounded-lg border border-slate-700 transition"
                  title="Filter CLI logs for this agent"
                >
                  <Terminal className="w-3 h-3 text-amber-400" />
                  <span>Trace CLI</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleIsolateToggle(agent.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] rounded-lg border transition ${
                      isIsolated
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                    title={isIsolated ? 'Re-enable agent in swarm' : 'Isolate agent from execution path'}
                  >
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>{isIsolated ? 'Un-Isolate' : 'Isolate'}</span>
                  </button>

                  <button
                    onClick={() => onRunDebuggerForAgent(agent.id)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-cinzel font-bold text-[10px] rounded-lg border border-amber-500/40 transition hover:scale-105"
                    title="Generate AI prompt patch"
                  >
                    <Wrench className="w-3 h-3 text-amber-400" />
                    <span>Auto-Patch</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Column Footer Status */}
      <div className="p-3 bg-[#0e1017] border-t border-amber-500/30 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>SSbow Auto-Isolation Active</span>
        </span>
        <span className="text-amber-300 font-bold">100% Guarded</span>
      </div>
    </aside>
  );
};
