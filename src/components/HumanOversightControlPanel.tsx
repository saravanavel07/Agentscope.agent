import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Edit3,
  Lock,
  FileCheck,
  AlertTriangle,
  UserCheck,
  Cpu,
  Terminal,
  ShieldCheck,
  Code,
} from 'lucide-react';
import { HumanInterceptRequest } from '../types';

interface HumanOversightControlPanelProps {
  intercepts: HumanInterceptRequest[];
  onApproveIntercept: (id: string) => void;
  onRejectIntercept: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const HumanOversightControlPanel: React.FC<HumanOversightControlPanelProps> = ({
  intercepts,
  onApproveIntercept,
  onRejectIntercept,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'intercepts' | 'governance'>('intercepts');

  if (!isOpen) return null;

  return (
    <div id="human-oversight-drawer" className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div id="oversight-drawer-header" className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-pink-950/80 rounded-xl border border-pink-700/60 text-pink-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-100 flex items-center gap-2">
              Human Oversight & Governance
            </h2>
            <p className="text-xs text-slate-400">Human-in-the-Loop Interceptor & Open-Source Policy</p>
          </div>
        </div>

        <button
          id="close-oversight-drawer-btn"
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-lg text-lg font-bold transition"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950 px-4 pt-2 gap-2 text-xs font-medium">
        <button
          id="tab-pending-intercepts"
          onClick={() => setActiveTab('intercepts')}
          className={`pb-2 border-b-2 px-3 transition ${
            activeTab === 'intercepts'
              ? 'border-pink-500 text-pink-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Pending Intercepts ({intercepts.length})
        </button>
        <button
          id="tab-governance-policy"
          onClick={() => setActiveTab('governance')}
          className={`pb-2 border-b-2 px-3 transition ${
            activeTab === 'governance'
              ? 'border-cyan-500 text-cyan-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Open-Source Governance & Telemetry
        </button>
      </div>

      {/* Body Content */}
      <div id="oversight-drawer-body" className="flex-1 overflow-y-auto p-5 space-y-4">
        {activeTab === 'intercepts' ? (
          <div className="space-y-4">
            {intercepts.length === 0 ? (
              <div className="text-center py-12 space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-200">No Pending Intercept Gatekeepers</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  All automated agent tool calls are operating within designated autonomy threshold rules.
                </p>
              </div>
            ) : (
              intercepts.map((req) => (
                <div
                  key={req.id}
                  id={`intercept-card-${req.id}`}
                  className="bg-slate-900 border border-pink-900/60 p-4 rounded-2xl space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-pink-950 text-pink-300 border border-pink-800 rounded-full font-mono text-[10px] font-bold">
                      {req.riskLevel} RISK INTERCEPT
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(req.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-100">
                      Agent: <span className="text-pink-400">{req.agentName}</span>
                    </h4>
                    <p className="text-xs text-slate-300 font-mono mt-1">
                      Tool Target: <span className="text-amber-300 font-bold">{req.toolName}()</span>
                    </p>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-[10px] text-slate-500 block uppercase">Requested Arguments:</span>
                    <pre className="text-[11px] text-cyan-300 overflow-x-auto mt-1">
                      {JSON.stringify(req.toolArgs || {}, null, 2)}
                    </pre>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    Reasoning: {req.reasoning}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      id={`btn-approve-intercept-${req.id}`}
                      onClick={() => onApproveIntercept(req.id)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve Tool Call</span>
                    </button>
                    <button
                      id={`btn-reject-intercept-${req.id}`}
                      onClick={() => onRejectIntercept(req.id)}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject & Halt</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            {/* Open-Source Governance Policy Card */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                Open-Source Telemetry & Compliance Inspector
              </h3>
              <p className="text-slate-400 leading-relaxed">
                AgentScope enforces strict OpenTelemetry data anonymization and Apache 2.0 / MIT license telemetry standards.
              </p>

              <div className="space-y-2 font-mono text-[11px] pt-1">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span>OpenTelemetry Trace Compliance:</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT (v1.2)</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span>Secret & API Key Anonymization:</span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span>Human Oversight Gatekeeper:</span>
                  <span className="text-pink-400 font-bold">ENFORCED</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
