import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Trash2,
  Play,
  Bot,
  Sliders,
  Cpu,
  Sparkles,
  Layers,
  ArrowRight,
  Code,
} from 'lucide-react';
import { AgentNode, MessageEdge, AgentRole } from '../types';

interface CustomSwarmBuilderProps {
  onLaunchCustomSwarm: (agents: AgentNode[], edges: MessageEdge[], title: string) => void;
}

export const CustomSwarmBuilder: React.FC<CustomSwarmBuilderProps> = ({ onLaunchCustomSwarm }) => {
  const [swarmTitle, setSwarmTitle] = useState('My Custom AI Swarm');
  const [agents, setAgents] = useState<AgentNode[]>([
    {
      id: 'agent-1',
      name: 'Orchestrator Agent',
      role: 'architect',
      systemPrompt: 'You coordinate tasks and decompose goals into sub-tasks for worker agents.',
      temperature: 0.3,
      model: 'gemini-3.6-flash',
      status: 'idle',
      position: { x: 0, y: 120, z: 0 },
      tokensUsed: 0,
      errorCount: 0,
      latencies: [],
      tools: ['decompose_task', 'synthesize_results'],
      color: '#3b82f6',
    },
    {
      id: 'agent-2',
      name: 'Executor Agent',
      role: 'coder',
      systemPrompt: 'You execute assigned sub-tasks and invoke available tool APIs.',
      temperature: 0.7,
      model: 'gemini-3.6-flash',
      status: 'idle',
      position: { x: -160, y: -80, z: 0 },
      tokensUsed: 0,
      errorCount: 0,
      latencies: [],
      tools: ['exec_tool_api', 'query_database'],
      color: '#10b981',
    },
  ]);

  const [edges, setEdges] = useState<MessageEdge[]>([
    {
      id: 'edge-1',
      sourceAgentId: 'agent-1',
      targetAgentId: 'agent-2',
      messageType: 'task',
      payload: 'Execute sub-task pipeline',
      timestamp: Date.now(),
      status: 'completed',
      latencyMs: 120,
      bytesTransferred: 1024,
    },
  ]);

  const handleAddAgent = () => {
    const newId = `agent-${agents.length + 1}`;
    const newAgent: AgentNode = {
      id: newId,
      name: `Agent-${agents.length + 1}`,
      role: 'custom',
      systemPrompt: 'You are a custom AI agent assisting in the swarm.',
      temperature: 0.5,
      model: 'gemini-3.6-flash',
      status: 'idle',
      position: {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        z: 0,
      },
      tokensUsed: 0,
      errorCount: 0,
      latencies: [],
      tools: ['custom_tool_api'],
      color: '#8b5cf6',
    };
    setAgents([...agents, newAgent]);

    // Auto-connect to first agent if exists
    if (agents.length > 0) {
      setEdges([
        ...edges,
        {
          id: `edge-${edges.length + 1}`,
          sourceAgentId: agents[0].id,
          targetAgentId: newId,
          messageType: 'task',
          payload: 'Initial handshake',
          timestamp: Date.now(),
          status: 'completed',
          latencyMs: 100,
          bytesTransferred: 512,
        },
      ]);
    }
  };

  const handleRemoveAgent = (id: string) => {
    setAgents(agents.filter((a) => a.id !== id));
    setEdges(edges.filter((e) => e.sourceAgentId !== id && e.targetAgentId !== id));
  };

  const handleUpdateAgent = (id: string, field: keyof AgentNode, value: any) => {
    setAgents(agents.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const handleLaunch = () => {
    onLaunchCustomSwarm(agents, edges, swarmTitle);
  };

  return (
    <div id="custom-swarm-builder" className="p-6 space-y-6 bg-slate-950 text-slate-100 min-h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
              Custom Multi-Agent Swarm Architect
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure agent node parameters, system prompt policies, tools, and directed communication edges
          </p>
        </div>

        <button
          id="btn-launch-custom-swarm"
          onClick={handleLaunch}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch Swarm into AgentScope</span>
        </button>
      </div>

      {/* Swarm Metadata Config */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase">Swarm Title:</span>
        <input
          id="custom-swarm-title-input"
          type="text"
          value={swarmTitle}
          onChange={(e) => setSwarmTitle(e.target.value)}
          className="flex-1 bg-slate-950 text-slate-100 text-sm px-3 py-1.5 rounded-xl border border-slate-800 font-semibold focus:outline-none focus:border-purple-500"
        />
        <button
          id="btn-add-agent-node"
          onClick={handleAddAgent}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Agent Node</span>
        </button>
      </div>

      {/* Agent Nodes Editor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((ag, index) => (
          <div
            key={ag.id}
            id={`builder-agent-card-${ag.id}`}
            className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl relative group hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs font-bold text-slate-400">#Node {index + 1}</span>
              </div>
              <button
                id={`btn-remove-agent-${ag.id}`}
                onClick={() => handleRemoveAgent(ag.id)}
                className="text-slate-500 hover:text-red-400 p-1 rounded transition"
                title="Remove Agent"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Agent Name & Role Inputs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={ag.name}
                  onChange={(e) => handleUpdateAgent(ag.id, 'name', e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 px-2.5 py-1.5 rounded-xl border border-slate-800 focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Role</label>
                <select
                  value={ag.role}
                  onChange={(e) => handleUpdateAgent(ag.id, 'role', e.target.value as AgentRole)}
                  className="w-full bg-slate-950 text-slate-200 px-2.5 py-1.5 rounded-xl border border-slate-800 focus:outline-none font-mono"
                >
                  <option value="architect">architect</option>
                  <option value="coder">coder</option>
                  <option value="tester">tester</option>
                  <option value="devops">devops</option>
                  <option value="crawler">crawler</option>
                  <option value="summarizer">summarizer</option>
                  <option value="fact_checker">fact_checker</option>
                  <option value="custom">custom</option>
                </select>
              </div>
            </div>

            {/* System Prompt Input */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                System Prompt Instructions
              </label>
              <textarea
                value={ag.systemPrompt}
                onChange={(e) => handleUpdateAgent(ag.id, 'systemPrompt', e.target.value)}
                rows={3}
                className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-xl border border-slate-800 text-xs font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Temperature & Model */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">
                  Temp: {ag.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={ag.temperature}
                  onChange={(e) => handleUpdateAgent(ag.id, 'temperature', parseFloat(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Model</label>
                <span className="text-cyan-300 font-semibold block pt-1">gemini-3.6-flash</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
