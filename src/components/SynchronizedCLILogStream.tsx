import React, { useState } from 'react';
import {
  Terminal,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  AlertTriangle,
  Info,
  Bug,
  Wrench,
  ArrowRightLeft,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { TraceEvent, EventSeverity, TraceEventType } from '../types';

interface SynchronizedCLILogStreamProps {
  traceEvents: TraceEvent[];
  activeStepIndex: number;
  onSelectTraceEvent: (event: TraceEvent) => void;
  selectedAgentId: string | null;
  onFilterAgent: (agentId: string | null) => void;
  agentNames: { [id: string]: string };
}

export const SynchronizedCLILogStream: React.FC<SynchronizedCLILogStreamProps> = ({
  traceEvents,
  activeStepIndex,
  onSelectTraceEvent,
  selectedAgentId,
  onFilterAgent,
  agentNames,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  // Filtered log items
  const filteredEvents = traceEvents.filter((ev) => {
    if (selectedAgentId && ev.agentId !== selectedAgentId) return false;
    if (severityFilter !== 'ALL' && ev.severity !== severityFilter.toLowerCase()) return false;
    if (typeFilter !== 'ALL' && ev.eventType !== typeFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        ev.message.toLowerCase().includes(q) ||
        ev.agentName.toLowerCase().includes(q) ||
        (ev.details?.toolName && ev.details.toolName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCopyLogs = () => {
    const textLogs = filteredEvents
      .map(
        (ev) =>
          `[${new Date(ev.timestamp).toISOString()}] [${ev.severity.toUpperCase()}] [${ev.agentName}] [${ev.eventType}]: ${ev.message}`
      )
      .join('\n');
    navigator.clipboard.writeText(textLogs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts);
    return `${date.getUTCHours().toString().padStart(2, '0')}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}.${date
      .getUTCMilliseconds()
      .toString()
      .padStart(3, '0')}`;
  };

  const getSeverityBadge = (sev: EventSeverity) => {
    switch (sev) {
      case 'error':
        return <span className="px-1.5 py-0.2 text-[10px] bg-red-950 text-red-400 border border-red-800 rounded font-mono font-bold">ERR</span>;
      case 'warn':
        return <span className="px-1.5 py-0.2 text-[10px] bg-amber-950 text-amber-400 border border-amber-800 rounded font-mono font-bold">WRN</span>;
      case 'success':
        return <span className="px-1.5 py-0.2 text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-mono font-bold">OK</span>;
      default:
        return <span className="px-1.5 py-0.2 text-[10px] bg-slate-800 text-slate-300 border border-slate-700 rounded font-mono">INF</span>;
    }
  };

  return (
    <div id="cli-log-stream-container" className="flex flex-col h-full bg-slate-950 rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden">
      {/* CLI Header & Controls */}
      <div id="cli-header-bar" className="bg-[#0e1017] border-b border-amber-500/30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <h2 className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider">
            Synchronized CLI ReAct Stream
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-amber-300/80 rounded-full border border-amber-500/30">
            {filteredEvents.length} Events
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
            <input
              id="cli-search-input"
              type="text"
              placeholder="Search logs or tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs pl-8 pr-3 py-1 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 font-mono w-44"
            />
          </div>

          {/* Severity Select */}
          <select
            id="cli-severity-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs px-2 py-1 rounded-lg border border-slate-800 focus:outline-none cursor-pointer font-mono"
          >
            <option value="ALL">All Severity</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </select>

          {/* Event Type Select */}
          <select
            id="cli-event-type-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs px-2 py-1 rounded-lg border border-slate-800 focus:outline-none cursor-pointer font-mono"
          >
            <option value="ALL">All Event Types</option>
            <option value="TOOL_CALL">TOOL_CALL</option>
            <option value="ERROR">ERROR</option>
            <option value="MSG_SENT">MSG_SENT</option>
            <option value="DELEGATION">DELEGATION</option>
            <option value="HUMAN_INTERCEPT">HUMAN_INTERCEPT</option>
            <option value="PATCH_APPLIED">PATCH_APPLIED</option>
          </select>

          {/* Agent Filter Chip */}
          {selectedAgentId && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-lg text-[11px] font-mono">
              <span>Agent: {agentNames[selectedAgentId] || selectedAgentId}</span>
              <button
                id="clear-agent-filter-btn"
                onClick={() => onFilterAgent(null)}
                className="hover:text-cyan-100 font-bold ml-1"
              >
                ×
              </button>
            </div>
          )}

          {/* Copy Logs Button */}
          <button
            id="copy-logs-btn"
            onClick={handleCopyLogs}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition text-xs font-mono"
            title="Copy Logs to Clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Log Output Window */}
      <div id="cli-terminal-window" className="flex-1 overflow-y-auto p-3 font-mono text-[11px] space-y-1 bg-slate-950/90 selection:bg-cyan-900/50">
        {filteredEvents.length === 0 ? (
          <div className="text-slate-500 text-center py-10 italic">
            No trace log events match the selected filters.
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const isActive = ev.stepIndex === activeStepIndex;
            const isError = ev.severity === 'error';
            const isWarn = ev.severity === 'warn';

            return (
              <div
                key={ev.id}
                id={`cli-log-row-${ev.id}`}
                onClick={() => onSelectTraceEvent(ev)}
                className={`group flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950/60 border-cyan-500/60 text-slate-100 shadow-sm'
                    : isError
                    ? 'bg-red-950/20 border-red-900/40 text-red-200 hover:bg-red-950/40'
                    : isWarn
                    ? 'bg-amber-950/20 border-amber-900/30 text-amber-200 hover:bg-amber-950/30'
                    : 'border-transparent text-slate-300 hover:bg-slate-900/80 hover:border-slate-800'
                }`}
              >
                {/* Step indicator arrow */}
                <div className="pt-0.5 text-slate-500 group-hover:text-cyan-400">
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                </div>

                {/* Step Index Badge */}
                <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1 rounded min-w-[24px] text-center">
                  #{ev.stepIndex}
                </span>

                {/* Timestamp */}
                <span className="text-slate-500 shrink-0 select-none">
                  {formatTimestamp(ev.timestamp)}
                </span>

                {/* Severity Badge */}
                {getSeverityBadge(ev.severity)}

                {/* Agent Name Tag */}
                <span className="font-semibold text-cyan-300 shrink-0">
                  [{ev.agentName}]
                </span>

                {/* Event Type */}
                <span className="text-slate-400 shrink-0">
                  [{ev.eventType}]
                </span>

                {/* Message Body */}
                <span className="flex-1 break-words">
                  {ev.message}
                </span>

                {/* Tool Details / Extra info */}
                {ev.details?.toolName && (
                  <span className="px-1.5 py-0.5 bg-amber-950/60 text-amber-300 border border-amber-800/60 rounded text-[10px] shrink-0">
                    🔧 {ev.details.toolName}()
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
