import React, { useEffect, useRef, useState } from 'react';
import {
  RotateCcw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Clock,
  Play,
  Cpu,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { AgentNode, MessageEdge, VizPerformanceTier } from '../types';

interface VisualizationCanvasProps {
  agents: AgentNode[];
  edges: MessageEdge[];
  vizTier: VizPerformanceTier;
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string | null) => void;
  onSelectEdge?: (edgeId: string | null) => void;
  onFpsUpdate: (fps: number) => void;
  stepProgress: number; // 0 to 1
}

export const VisualizationCanvas: React.FC<VisualizationCanvasProps> = ({
  agents,
  edges,
  vizTier,
  selectedAgentId,
  onSelectAgent,
  onSelectEdge,
  onFpsUpdate,
  stepProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Orbit camera state for 3D/2D projection
  const [rotation, setRotation] = useState({ x: 0.3, y: 0.4 });
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredAgentId, setHoveredAgentId] = useState<string | null>(null);

  // Performance tracking
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Render loop
  useEffect(() => {
    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (time: number) => {
      frameCountRef.current++;

      // FPS Calculation
      if (time - lastTimeRef.current >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / (time - lastTimeRef.current));
        onFpsUpdate(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = time;
      }

      // Handle DPI Sizing
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + pan.x;
      const centerY = height / 2 + pan.y;

      // Draw Grid Background & Golden Concentric Orbit Rings
      ctx.strokeStyle = vizTier === 'TIER_1_3D_HYPER' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.15)';
      ctx.lineWidth = 1;

      if (vizTier === 'TIER_3_GRID_PERF') {
        // High density grid layout with subtle gold dust intersections
        const gridSize = 40 * zoom;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else {
        // Concentric orbit rings in 3D metallic gold
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 200 * zoom, 120 * zoom * Math.cos(rotation.x), 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 320 * zoom, 180 * zoom * Math.cos(rotation.x), 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Helper function for 3D -> 2D projection
      const project3D = (x: number, y: number, z: number) => {
        if (vizTier === 'TIER_3_GRID_PERF') {
          return { px: centerX + x * zoom * 0.8, py: centerY + y * zoom * 0.8, scale: 1 };
        }

        // Apply rotation matrices
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);

        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;

        // Rotate X
        let y1 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        const distance = 800;
        const scale = (distance / (distance + z2)) * zoom;

        return {
          px: centerX + x1 * scale,
          py: centerY + y1 * scale,
          scale,
        };
      };

      // Map agent coordinates
      const projectedAgents = agents.map((agent) => {
        const { px, py, scale } = project3D(agent.position.x, agent.position.y, agent.position.z);
        return { agent, px, py, scale };
      });

      // 1. Draw Edges / Communication Streams
      edges.forEach((edge) => {
        const source = projectedAgents.find((p) => p.agent.id === edge.sourceAgentId);
        const target = projectedAgents.find((p) => p.agent.id === edge.targetAgentId);

        if (!source || !target) return;

        ctx.beginPath();
        ctx.moveTo(source.px, source.py);

        // Curved bezier connection
        const midX = (source.px + target.px) / 2;
        const midY = (source.py + target.py) / 2 - 30 * source.scale;

        ctx.quadraticCurveTo(midX, midY, target.px, target.py);

        // Edge styling based on message type
        const isErrorEdge = edge.messageType === 'error' || edge.status === 'failed';
        ctx.strokeStyle = isErrorEdge
          ? 'rgba(239, 68, 68, 0.7)'
          : edge.messageType === 'patch'
          ? 'rgba(245, 158, 11, 0.9)'
          : 'rgba(217, 119, 6, 0.5)';

        ctx.lineWidth = isErrorEdge ? 2.5 : 1.5;
        if (isErrorEdge) {
          ctx.setLineDash([6, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated Signal Packets (flowing golden particles along edge)
        if (vizTier !== 'TIER_3_GRID_PERF' || edge.status === 'active') {
          const particleCount = vizTier === 'TIER_1_3D_HYPER' ? 3 : 1;
          for (let p = 0; p < particleCount; p++) {
            const t = (stepProgress + (time / 1500) + p / particleCount) % 1;

            // Quad bezier point
            const px = (1 - t) * (1 - t) * source.px + 2 * (1 - t) * t * midX + t * t * target.px;
            const py = (1 - t) * (1 - t) * source.py + 2 * (1 - t) * t * midY + t * t * target.py;

            ctx.beginPath();
            ctx.arc(px, py, (isErrorEdge ? 4 : 3) * source.scale, 0, Math.PI * 2);
            ctx.fillStyle = isErrorEdge ? '#ef4444' : '#f59e0b';
            ctx.shadowColor = isErrorEdge ? '#ef4444' : '#f59e0b';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 2. Draw Agent Nodes
      projectedAgents.forEach(({ agent, px, py, scale }) => {
        const isSelected = selectedAgentId === agent.id;
        const isHovered = hoveredAgentId === agent.id;
        const radius = (isSelected ? 22 : isHovered ? 20 : 18) * scale;

        // Status Colors
        const baseColor =
          agent.status === 'errored'
            ? '#ef4444'
            : agent.status === 'thinking'
            ? '#06b6d4'
            : agent.status === 'executing_tool'
            ? '#f59e0b'
            : agent.status === 'waiting_human'
            ? '#ec4899'
            : '#3b82f6';

        // Outer Aura Ring / Pulsing Effect for active states
        if (agent.status === 'errored') {
          const pulse = Math.sin(time / 200) * 8 + 12;
          ctx.beginPath();
          ctx.arc(px, py, radius + pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (agent.status === 'thinking' || agent.status === 'executing_tool') {
          const pulse = (time / 1000) % 1;
          ctx.beginPath();
          ctx.arc(px, py, radius + pulse * 14, 0, Math.PI * 2);
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = (1 - pulse) * 2;
          ctx.stroke();
        }

        // Selected Node Highlight Ring
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(px, py, radius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Node Body Fill
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();

        // Inner Role Icon / Dot
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = baseColor;
        ctx.fill();

        // Error Badge Counter Overlay
        if (agent.errorCount > 0) {
          ctx.beginPath();
          ctx.arc(px + radius * 0.7, py - radius * 0.7, 9 * scale, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(9, 10 * scale)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(agent.errorCount), px + radius * 0.7, py - radius * 0.7);
        }

        // Agent Name Label Below
        ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
        ctx.font = `${isSelected ? 'bold' : 'normal'} ${Math.max(10, 11 * scale)}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(agent.name, px, py + radius + 6);

        // Subtitle / Tool active label
        if (agent.activeTool) {
          ctx.fillStyle = '#f59e0b';
          ctx.font = `italic ${Math.max(8, 9 * scale)}px monospace`;
          ctx.fillText(`🔧 ${agent.activeTool}()`, px, py + radius + 20);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [agents, edges, vizTier, selectedAgentId, hoveredAgentId, rotation, zoom, pan, stepProgress, onFpsUpdate]);

  // Mouse Interactivity handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      if (e.shiftKey) {
        // Pan
        setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      } else {
        // Orbit rotation
        setRotation((prev) => ({
          x: Math.max(-1.2, Math.min(1.2, prev.x + dy * 0.005)),
          y: prev.y + dx * 0.005,
        }));
      }

      setDragStart({ x: e.clientX, y: e.clientY });
      return;
    }

    // Hover Detection
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;

    let foundHover: string | null = null;
    agents.forEach((agent) => {
      // Approximate 2D projected distance
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);

      let x1 = agent.position.x * cosY - agent.position.z * sinY;
      let z1 = agent.position.z * cosY + agent.position.x * sinY;
      let y1 = agent.position.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + agent.position.y * sinX;

      const scale = (800 / (800 + z2)) * zoom;
      const px = centerX + x1 * scale;
      const py = centerY + y1 * scale;

      const dist = Math.hypot(mouseX - px, mouseY - py);
      if (dist < 25 * scale) {
        foundHover = agent.id;
      }
    });

    setHoveredAgentId(foundHover);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(0.4, Math.min(2.5, prev + delta)));
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hoveredAgentId) {
      onSelectAgent(hoveredAgentId);
    } else {
      onSelectAgent(null);
    }
  };

  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  return (
    <div id="visualization-canvas-container" className="relative w-full h-full min-h-[440px] bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col">
      {/* Canvas Controls Overlay */}
      <div id="canvas-overlay-header" className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 shadow-md">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200 font-mono">
            {vizTier === 'TIER_1_3D_HYPER'
              ? '3D Spatial Orbit View'
              : vizTier === 'TIER_2_2D_FORCE'
              ? '2D Directed Force Graph'
              : 'High-Density Matrix Grid'}
          </span>
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
            Drag to Orbit • Scroll to Zoom
          </span>
        </div>

        {/* Orbit Control Buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800">
          <button
            id="btn-zoom-in"
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-zoom-out"
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-reset-orbit"
            onClick={() => {
              setRotation({ x: 0.3, y: 0.4 });
              setZoom(1.0);
              setPan({ x: 0, y: 0 });
            }}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg transition"
            title="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main HTML5 Canvas */}
      <canvas
        id="agentscope-canvas-element"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClick}
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/90 via-slate-950 to-slate-950"
      />

      {/* Agent Detail Hover Card Overlay */}
      {hoveredAgentId && !selectedAgentId && (
        <div id="agent-hover-card" className="absolute bottom-4 left-4 z-20 pointer-events-none bg-slate-900/95 border border-cyan-500/30 backdrop-blur-md p-3 rounded-xl shadow-xl max-w-xs text-xs animate-in fade-in duration-150">
          {(() => {
            const ag = agents.find((a) => a.id === hoveredAgentId);
            if (!ag) return null;
            return (
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
                  <span className="font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ag.color }} />
                    {ag.name}
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">
                    {ag.role}
                  </span>
                </div>
                <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-cyan-400">{ag.status.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tokens Used:</span>
                    <span>{ag.tokensUsed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Error Count:</span>
                    <span className={ag.errorCount > 0 ? 'text-red-400 font-bold' : 'text-slate-300'}>
                      {ag.errorCount}
                    </span>
                  </div>
                  {ag.activeTool && (
                    <div className="flex justify-between text-amber-300 pt-0.5">
                      <span className="text-slate-400">Tool:</span>
                      <span>{ag.activeTool}()</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Selected Agent Quick Inspector Panel at bottom right */}
      {selectedAgent && (
        <div id="selected-agent-inspector" className="absolute bottom-4 right-4 z-20 bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md p-4 rounded-2xl shadow-2xl w-80 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedAgent.color }} />
              <h3 className="font-bold text-sm text-slate-100">{selectedAgent.name}</h3>
            </div>
            <button
              id="close-agent-inspector-btn"
              onClick={() => onSelectAgent(null)}
              className="text-slate-400 hover:text-slate-200 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block mb-1">
                System Prompt
              </span>
              <p className="text-[11px] font-mono text-slate-300 line-clamp-3 italic">
                "{selectedAgent.systemPrompt}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Model</span>
                <span className="font-mono text-slate-200 font-semibold">{selectedAgent.model}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Temperature</span>
                <span className="font-mono text-slate-200 font-semibold">{selectedAgent.temperature}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block mb-1">
                Tools Registered ({selectedAgent.tools.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedAgent.tools.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px] text-cyan-300">
                    {t}()
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
