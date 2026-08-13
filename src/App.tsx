import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Layers,
  Sparkles,
  Wrench,
  BarChart3,
  BookOpen,
  UserCheck,
  Zap,
  Activity,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import {
  MainViewMode,
  PresetScenario,
  AgentNode,
  MessageEdge,
  TraceEvent,
  VizPerformanceTier,
  DebuggerAnalysisResult,
  RecommendedPromptPatch,
  DelegationGapMetrics,
  HumanInterceptRequest,
} from './types';
import { PRESET_SCENARIOS } from './data/presets';
import { Navbar } from './components/Navbar';
import { VisualizationCanvas } from './components/VisualizationCanvas';
import { SynchronizedCLILogStream } from './components/SynchronizedCLILogStream';
import { MetaAgentDebuggerPanel } from './components/MetaAgentDebuggerPanel';
import { DelegationAndReliabilityDashboard } from './components/DelegationAndReliabilityDashboard';
import { HumanOversightControlPanel } from './components/HumanOversightControlPanel';
import { CustomSwarmBuilder } from './components/CustomSwarmBuilder';
import { ResearchTeachingGuide } from './components/ResearchTeachingGuide';
import { TimelineController } from './components/TimelineController';

import { HeroBanner } from './components/HeroBanner';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { ImpactHighlights } from './components/ImpactHighlights';
import { GoldenFooter } from './components/GoldenFooter';
import { SwarmTroubleshootingColumn } from './components/SwarmTroubleshootingColumn';

export default function App() {
  const [viewMode, setViewMode] = useState<MainViewMode>('playground');
  const [selectedPreset, setSelectedPreset] = useState<PresetScenario>(PRESET_SCENARIOS[0]);

  // Active Simulation State
  const [agents, setAgents] = useState<AgentNode[]>(PRESET_SCENARIOS[0].agents);
  const [edges, setEdges] = useState<MessageEdge[]>(PRESET_SCENARIOS[0].edges);
  const [traceEvents, setTraceEvents] = useState<TraceEvent[]>(PRESET_SCENARIOS[0].initialTrace);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(PRESET_SCENARIOS[0].initialTrace.length);

  // Playback Timeline
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(false);

  // Performance Tier State
  const [vizTier, setVizTier] = useState<VizPerformanceTier>('TIER_1_3D_HYPER');
  const [isAutoTiered, setIsAutoTiered] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);

  // Selection & Drawers
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isDebuggerOpen, setIsDebuggerOpen] = useState<boolean>(false);
  const [isDebugging, setIsDebugging] = useState<boolean>(false);
  const [debuggerAnalysis, setDebuggerAnalysis] = useState<DebuggerAnalysisResult | null>(null);

  const [isOversightOpen, setIsOversightOpen] = useState<boolean>(false);
  const [humanIntercepts, setHumanIntercepts] = useState<HumanInterceptRequest[]>([
    {
      id: 'int-1',
      agentId: 'agent-devops',
      agentName: 'DevOps Deployer',
      toolName: 'deploy_cloud_run',
      toolArgs: { env: 'staging', revision: 'v2.4.1', rollbackProtection: true },
      riskLevel: 'CRITICAL',
      reasoning: 'Production/staging deployment tool call requires human gatekeeper approval.',
      timestamp: Date.now() - 30000,
    },
  ]);

  // Delegation & Reliability Metrics
  const [delegationMetrics, setDelegationMetrics] = useState<DelegationGapMetrics>({
    humanInjectionsCount: 3,
    totalAutonomousDecisions: 28,
    autonomyScore: 68.5,
    decisionUncertaintyAvg: 0.18,
    promptPrecisionGap: 34.2,
    MTBFSeconds: 140,
    consensusRatio: 0.72,
    fallbackTriggerCount: 4,
    autonomyGainHistory: [
      { step: 1, autonomyScore: 45, errorRate: 28 },
      { step: 2, autonomyScore: 58, errorRate: 18 },
      { step: 3, autonomyScore: 68.5, errorRate: 12 },
    ],
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Ref to 3D demo section
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Adaptive Performance Auto-Tiering based on node count or low FPS
  useEffect(() => {
    if (agents.length > 15 && vizTier !== 'TIER_3_GRID_PERF') {
      setVizTier('TIER_3_GRID_PERF');
      setIsAutoTiered(true);
      showToast('Adaptive Viz Scaling: Auto-switched to High-Performance Matrix Grid (Nodes > 15)');
    }
  }, [agents.length]);

  // FPS Callback
  const handleFpsUpdate = useCallback((currentFps: number) => {
    setFps(currentFps);
    if (currentFps < 25 && vizTier === 'TIER_1_3D_HYPER') {
      setVizTier('TIER_2_2D_FORCE');
      setIsAutoTiered(true);
    }
  }, [vizTier]);

  // Load Scenario Preset
  const handleSelectPreset = (preset: PresetScenario) => {
    setSelectedPreset(preset);
    setAgents(preset.agents);
    setEdges(preset.edges);
    setTraceEvents(preset.initialTrace);
    setActiveStepIndex(preset.initialTrace.length);
    setSelectedAgentId(null);
    setDebuggerAnalysis(null);
    setIsPlaying(false);
    showToast(`Loaded scenario: "${preset.title}"`);
  };

  // Run AI Meta-Debugger
  const handleRunDebugger = async () => {
    setIsDebugging(true);
    setIsDebuggerOpen(true);

    try {
      const response = await fetch('/api/debugger/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTitle: selectedPreset.title,
          agents,
          edges,
          traceEvents,
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setDebuggerAnalysis(data.analysis);
        showToast('Sovereign Meta-Debugger analysis completed!');
      } else {
        showToast('Debugger error: ' + (data.error || 'Failed to analyze trace.'));
      }
    } catch (err: any) {
      console.error(err);
      showToast('Error connecting to Sovereign Meta-Debugger server.');
    } finally {
      setIsDebugging(false);
    }
  };

  // Apply Prompt Patch recommended by SSbow Meta-Engine
  const handleApplyPromptPatch = (patch: RecommendedPromptPatch) => {
    // 1. Update Agent System Prompt
    setAgents((prevAgents) =>
      prevAgents.map((ag) =>
        ag.id === patch.agentId
          ? {
              ...ag,
              systemPrompt: patch.newSystemPrompt,
              status: 'idle',
              errorCount: Math.max(0, ag.errorCount - 1),
            }
          : ag
      )
    );

    // 2. Insert PATCH_APPLIED event into trace
    const newStepIndex = traceEvents.length + 1;
    const patchEvent: TraceEvent = {
      id: `ev-patch-${Date.now()}`,
      timestamp: Date.now(),
      agentId: patch.agentId,
      agentName: patch.agentName,
      eventType: 'PATCH_APPLIED',
      severity: 'success',
      message: `System Prompt Patch Applied by SSbow Meta-Engine: "${patch.explanation}"`,
      stepIndex: newStepIndex,
    };

    setTraceEvents((prev) => [...prev, patchEvent]);
    setActiveStepIndex(newStepIndex);

    // 3. Boost autonomy score
    setDelegationMetrics((prev) => ({
      ...prev,
      autonomyScore: Math.min(98.5, prev.autonomyScore + 18.0),
      promptPrecisionGap: Math.max(4.0, prev.promptPrecisionGap - 15.0),
      MTBFSeconds: prev.MTBFSeconds + 120,
      consensusRatio: Math.min(0.98, prev.consensusRatio + 0.2),
    }));

    showToast(`System Prompt Patch successfully applied to ${patch.agentName}!`);
  };

  // Timeline Auto-Play Timer Effect
  useEffect(() => {
    let timer: any;
    if (isPlaying && activeStepIndex < traceEvents.length) {
      timer = setTimeout(() => {
        setActiveStepIndex((prev) => prev + 1);
      }, 1000 / speedMultiplier);
    } else if (isPlaying && activeStepIndex >= traceEvents.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeStepIndex, traceEvents.length, speedMultiplier]);

  // Live Real-Time Agent Turn Simulation Engine via Gemini endpoint /api/agent/run-step
  useEffect(() => {
    let liveTimer: any;
    if (isLiveSimulating) {
      liveTimer = setInterval(async () => {
        // Pick an agent to execute turn
        const candidateAgents = agents.filter((a) => a.status !== 'waiting_human');
        if (candidateAgents.length === 0) return;

        const randomAgent = candidateAgents[Math.floor(Math.random() * candidateAgents.length)];

        try {
          const res = await fetch('/api/agent/run-step', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              agent: randomAgent,
              incomingMessage: { topic: 'Simulated task turn', step: activeStepIndex },
              conversationHistory: traceEvents.slice(-5),
            }),
          });

          const data = await res.json();
          if (data.success && data.stepResult) {
            const step = data.stepResult;
            const newIndex = traceEvents.length + 1;

            const newEvent: TraceEvent = {
              id: `live-ev-${Date.now()}`,
              timestamp: Date.now(),
              agentId: randomAgent.id,
              agentName: randomAgent.name,
              eventType:
                step.action === 'TOOL_CALL'
                  ? 'TOOL_CALL'
                  : step.action === 'ERROR'
                  ? 'ERROR'
                  : step.action === 'DELEGATE'
                  ? 'DELEGATION'
                  : 'MSG_SENT',
              severity: step.action === 'ERROR' ? 'error' : 'info',
              message: step.statusMessage || step.payload,
              details: {
                toolName: step.toolName,
                toolArgs: step.toolArgs,
              },
              stepIndex: newIndex,
            };

            setTraceEvents((prev) => [...prev, newEvent]);
            setActiveStepIndex(newIndex);

            // Update agent status
            setAgents((prev) =>
              prev.map((a) =>
                a.id === randomAgent.id
                  ? {
                      ...a,
                      status: step.action === 'TOOL_CALL' ? 'executing_tool' : 'thinking',
                      tokensUsed: a.tokensUsed + Math.floor(Math.random() * 200 + 50),
                    }
                  : a
              )
            );
          }
        } catch (err) {
          console.error('Live step simulation error:', err);
        }
      }, 3000 / speedMultiplier);
    }

    return () => clearInterval(liveTimer);
  }, [isLiveSimulating, agents, activeStepIndex, traceEvents, speedMultiplier]);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when user is typing in form inputs, textareas, or editable elements
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.tagName === 'SELECT' ||
          (activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => {
          const next = !prev;
          showToast(next ? 'Simulation Playing [Space]' : 'Simulation Paused [Space]');
          return next;
        });
      } else if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setActiveStepIndex(1);
        setIsPlaying(false);
        showToast('Reset timeline to Step #1 [R]');
      } else if (e.code === 'KeyD' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setIsDebuggerOpen((prev) => {
          const next = !prev;
          if (next && !debuggerAnalysis) {
            handleRunDebugger();
          }
          showToast(next ? 'Opened SSbow Meta-Debugger Drawer [D]' : 'Closed Meta-Debugger Drawer [D]');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [debuggerAnalysis, handleRunDebugger]);

  // Export OpenTelemetry JSON
  const handleExportTelemetry = async () => {
    try {
      const res = await fetch('/api/telemetry/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traceEvents,
          agents,
          scenarioTitle: selectedPreset.title,
        }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `agentscope-telemetry-${Date.now()}.json`;
      a.click();
      showToast('OpenTelemetry JSON Trace downloaded!');
    } catch (err) {
      showToast('Error exporting telemetry.');
    }
  };

  const agentNames = agents.reduce((acc, a) => ({ ...acc, [a.id]: a.name }), {} as any);

  return (
    <div id="agentscope-app-root" className="flex flex-col h-screen w-screen bg-live-motion-wave bg-live-motion-grid text-slate-100 font-sans overflow-hidden select-none">
      {/* Moving Live Motion Floating Ambient Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Top Navbar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedPreset={selectedPreset}
        presets={PRESET_SCENARIOS}
        onSelectPreset={handleSelectPreset}
        vizTier={vizTier}
        setVizTier={setVizTier}
        fps={fps}
        nodeCount={agents.length}
        isAutoTiered={isAutoTiered}
        onRunDebugger={handleRunDebugger}
        isDebugging={isDebugging}
        onResetTrace={() => {
          setActiveStepIndex(1);
          setIsPlaying(false);
          showToast('Reset timeline to Step #1');
        }}
      />

      {/* Main Content Workspace */}
      <main id="app-main-workspace" className="flex-1 overflow-y-auto relative flex flex-col">
        {/* VIEW MODE 1: Interactive Playground & High-Classical Landing Sections */}
        {viewMode === 'playground' && (
          <div className="flex flex-col min-h-full">
            {/* Hero Banner Section */}
            <HeroBanner
              onLaunchDemo={scrollToDemo}
              onRunDebugger={handleRunDebugger}
              autonomyScore={delegationMetrics.autonomyScore}
              delegationGap={delegationMetrics.promptPrecisionGap}
            />

            {/* Features Showcase Section */}
            <FeaturesShowcase />

            {/* Interactive 3D Topology Playground Section */}
            <div ref={demoSectionRef} id="interactive-3d-demo-container" className="p-4 bg-[#0e1017] border-b border-amber-500/20 space-y-3">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-2">
                <div>
                  <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 gold-glow" />
                    Interactive 3D Swarm Topology & CLI Stream
                  </h2>
                  <p className="font-serif text-xs text-slate-400 italic">
                    Real-time spatial node graph and sub-second ReAct log stream
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    Scenario: {selectedPreset.title}
                  </span>
                </div>
              </div>

              {/* 3D Canvas + Troubling Agents Column + CLI Log Stream Grid */}
              <div className="max-w-[1750px] mx-auto h-[640px] grid grid-cols-1 lg:grid-cols-12 gap-3">
                {/* Left 5 Cols: 3D/2D Spatial Visualizer Canvas */}
                <div className="lg:col-span-5 h-full flex flex-col">
                  <VisualizationCanvas
                    agents={agents}
                    edges={edges}
                    vizTier={vizTier}
                    selectedAgentId={selectedAgentId}
                    onSelectAgent={setSelectedAgentId}
                    onFpsUpdate={handleFpsUpdate}
                    stepProgress={activeStepIndex / Math.max(1, traceEvents.length)}
                  />
                </div>

                {/* Center 3.5 Cols: Dedicated Swarm Agents Troubling Column */}
                <div className="lg:col-span-3 h-full flex flex-col">
                  <SwarmTroubleshootingColumn
                    agents={agents}
                    cliEvents={traceEvents}
                    onRunDebuggerForAgent={(agentId) => {
                      setSelectedAgentId(agentId);
                      handleRunDebugger();
                      setIsDebuggerOpen(true);
                    }}
                    onFilterLogsByAgent={(agentId) => {
                      setSelectedAgentId(agentId);
                    }}
                    onToggleAgentStatus={(agentId) => {
                      setAgents((prev) =>
                        prev.map((a) =>
                          a.id === agentId
                            ? { ...a, status: a.status === 'error' ? 'active' : 'error' }
                            : a
                        )
                      );
                    }}
                  />
                </div>

                {/* Right 4 Cols: Synchronized CLI Log Stream */}
                <div className="lg:col-span-4 h-full flex flex-col">
                  <SynchronizedCLILogStream
                    traceEvents={traceEvents}
                    activeStepIndex={activeStepIndex}
                    onSelectTraceEvent={(ev) => {
                      setActiveStepIndex(ev.stepIndex);
                      setSelectedAgentId(ev.agentId);
                    }}
                    selectedAgentId={selectedAgentId}
                    onFilterAgent={setSelectedAgentId}
                    agentNames={agentNames}
                  />
                </div>
              </div>
            </div>

            {/* Risk Management & Impact Highlights Section */}
            <ImpactHighlights
              autonomyScore={delegationMetrics.autonomyScore}
              delegationGap={delegationMetrics.promptPrecisionGap}
              errorRate={12.4}
              consensusRatio={delegationMetrics.consensusRatio * 100}
              onViewFullMetrics={() => setViewMode('metrics')}
            />

            {/* Golden Accented Footer */}
            <GoldenFooter />
          </div>
        )}

        {/* VIEW MODE 2: Presets Selector View */}
        {viewMode === 'presets' && (
          <div className="flex-1 p-6 space-y-6 bg-[#0b0c10] min-h-full">
            <div className="border-b border-amber-500/20 pb-4">
              <h2 className="text-2xl font-cinzel font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                Multi-Agent Benchmark Scenarios
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-serif italic">
                Select pre-configured multi-agent swarms with intentional failure modes (recursive loops, consensus deadlocks, delegation gaps)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRESET_SCENARIOS.map((preset) => (
                <div
                  key={preset.id}
                  id={`preset-card-${preset.id}`}
                  onClick={() => {
                    handleSelectPreset(preset);
                    setViewMode('playground');
                  }}
                  className={`group p-5 rounded-2xl border transition-all cursor-pointer bg-slate-900/90 hover:bg-slate-900 shadow-xl flex flex-col justify-between ${
                    selectedPreset.id === preset.id
                      ? 'border-amber-500 gold-glow'
                      : 'border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 rounded-full uppercase">
                        {preset.category}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-red-950/80 text-red-300 border border-red-800 rounded-full font-bold">
                        {preset.badge}
                      </span>
                    </div>

                    <h3 className="font-cinzel font-bold text-base text-slate-100 group-hover:text-amber-300 transition">
                      {preset.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {preset.description}
                    </p>

                    <div className="bg-[#0b0c10] p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-amber-300">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Known Failure Pattern:</span>
                      {preset.knownBugDescription}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400 mt-4">
                    <span>{preset.agents.length} Agent Nodes</span>
                    <span className="text-amber-400 font-cinzel font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Load & Play →
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <GoldenFooter />
          </div>
        )}

        {/* VIEW MODE 3: Custom Swarm Builder */}
        {viewMode === 'builder' && (
          <div className="flex-1 min-h-full flex flex-col justify-between">
            <CustomSwarmBuilder
              onLaunchCustomSwarm={(customAgents, customEdges, title) => {
                const customPreset: PresetScenario = {
                  id: `custom-${Date.now()}`,
                  title,
                  category: 'Software Engineering',
                  difficulty: 'Intermediate',
                  badge: 'Custom Architecture',
                  description: 'User created multi-agent topology.',
                  knownBugDescription: 'Custom user swarm configuration.',
                  expectedGoal: 'Run execution and test agent inter-communication.',
                  agents: customAgents,
                  edges: customEdges,
                  initialTrace: [
                    {
                      id: 't-init',
                      timestamp: Date.now(),
                      agentId: customAgents[0]?.id || 'a1',
                      agentName: customAgents[0]?.name || 'Agent',
                      eventType: 'STATE_CHANGE',
                      severity: 'info',
                      message: `Custom Swarm "${title}" initialized with ${customAgents.length} agents.`,
                      stepIndex: 1,
                    },
                  ],
                };
                handleSelectPreset(customPreset);
                setViewMode('playground');
              }}
            />
            <GoldenFooter />
          </div>
        )}

        {/* VIEW MODE 4: Delegation & Reliability Metrics Dashboard */}
        {viewMode === 'metrics' && (
          <div className="flex-1 min-h-full flex flex-col justify-between">
            <DelegationAndReliabilityDashboard
              metrics={delegationMetrics}
              agents={agents}
              scenarioTitle={selectedPreset.title}
            />
            <GoldenFooter />
          </div>
        )}

        {/* VIEW MODE 5: Research & Teaching Hub */}
        {viewMode === 'research' && (
          <div className="flex-1 min-h-full flex flex-col justify-between">
            <ResearchTeachingGuide onExportTrace={handleExportTelemetry} />
            <GoldenFooter />
          </div>
        )}
      </main>

      {/* Floating Human Oversight Trigger Button */}
      {humanIntercepts.length > 0 && (
        <button
          id="btn-toggle-oversight-panel"
          onClick={() => setIsOversightOpen(true)}
          className="fixed bottom-16 right-5 z-40 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 text-xs font-cinzel font-bold rounded-2xl shadow-xl gold-glow animate-bounce border border-amber-300"
        >
          <UserCheck className="w-4 h-4 fill-slate-950" />
          <span>{humanIntercepts.length} Human Intercept Pending</span>
        </button>
      )}

      {/* Bottom Timeline Controller (Visible in Playground view) */}
      {viewMode === 'playground' && (
        <TimelineController
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          activeStepIndex={activeStepIndex}
          totalSteps={traceEvents.length}
          onStepChange={setActiveStepIndex}
          speedMultiplier={speedMultiplier}
          onSpeedChange={setSpeedMultiplier}
          isLiveSimulating={isLiveSimulating}
          onToggleLiveSim={() => {
            setIsLiveSimulating(!isLiveSimulating);
            showToast(
              isLiveSimulating
                ? 'Switched to Replay mode'
                : 'Live Sovereign Engine active! Agents generating turns in real time.'
            );
          }}
          onReset={() => {
            setActiveStepIndex(1);
            setIsPlaying(false);
          }}
        />
      )}

      {/* AI Meta-Debugger Side Drawer Panel */}
      <MetaAgentDebuggerPanel
        analysis={debuggerAnalysis}
        isAnalyzing={isDebugging}
        onRunAnalysis={handleRunDebugger}
        onApplyPromptPatch={handleApplyPromptPatch}
        agents={agents}
        isOpen={isDebuggerOpen}
        onClose={() => setIsDebuggerOpen(false)}
      />

      {/* Human Oversight Control Panel Drawer */}
      <HumanOversightControlPanel
        intercepts={humanIntercepts}
        onApproveIntercept={(id) => {
          setHumanIntercepts((prev) => prev.filter((i) => i.id !== id));
          showToast('Human Intercept Approved: Tool call authorized for execution.');
        }}
        onRejectIntercept={(id) => {
          setHumanIntercepts((prev) => prev.filter((i) => i.id !== id));
          showToast('Human Intercept Rejected: Tool call halted.');
        }}
        isOpen={isOversightOpen}
        onClose={() => setIsOversightOpen(false)}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div id="agentscope-toast" className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border border-amber-500/50 text-amber-200 font-mono text-xs px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 gold-glow">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

