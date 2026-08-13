import React from 'react';
import {
  Layers,
  ShieldAlert,
  Cpu,
  Brain,
  Activity,
  Maximize2,
  Workflow,
  Lock,
  GitBranch,
} from 'lucide-react';

export const FeaturesShowcase: React.FC = () => {
  const features = [
    {
      id: 'feature-3d-topology',
      icon: Layers,
      title: '3D Spatial Swarm Topology',
      description:
        'Interactive Three.js particle canvas depicting agent communication meshes, real-time message streams, and active call links with golden orbital trajectories.',
      tag: 'Spatial Telemetry',
    },
    {
      id: 'feature-delegation-bounding',
      icon: ShieldAlert,
      title: 'Delegation Gap & Boundary Defense',
      description:
        'Quantifies the delta between intended system prompts and actual child agent outputs, automatically identifying prompt drift and task dropouts.',
      tag: 'Risk Mitigation',
    },
    {
      id: 'feature-react-cascade',
      icon: Workflow,
      title: 'Synchronized ReAct Log Streams',
      description:
        'Unified CLI log engine streaming thought-action-observation cycles across Planner, Coder, Critic, and Governance nodes with sub-millisecond precision.',
      tag: 'CLI Observability',
    },
    {
      id: 'feature-meta-debugger',
      icon: Brain,
      title: 'Sovereign Meta-Debugger',
      description:
        'Autonomous AI auditor analyzing failure stacks, deadlocks, and loop hallucinations to generate precise System Prompt patches automatically.',
      tag: 'AI Self-Correction',
    },
    {
      id: 'feature-human-governance',
      icon: Lock,
      title: 'Human-in-the-Loop Intercepts',
      description:
        'Regal governance gatekeeper allowing human directors to pause agent execution, override parameters, and inspect critical decision states.',
      tag: 'Sovereign Control',
    },
    {
      id: 'feature-opentelemetry',
      icon: Activity,
      title: 'OpenTelemetry Benchmark Audit',
      description:
        'Standards-compliant span tracing and reliability benchmarking for high-throughput enterprise swarm deployments.',
      tag: 'Enterprise Ready',
    },
  ];

  return (
    <section id="features-showcase-section" className="py-12 px-6 bg-[#0e1017] border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Symmetrical Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 font-cinzel text-xs font-bold uppercase tracking-wider">
            <span>Sovereign Capabilities</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-tight">
            High-Classical Multi-Agent Engineering
          </h2>
          <p className="font-playfair text-slate-300 text-sm sm:text-base max-w-2xl mx-auto italic">
            "Designed for rigorous architectural scrutiny, transparent delegation chains, and flawless execution."
          </p>
        </div>

        {/* 3-Column Symmetrical Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="group relative bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-300/80 border border-slate-700">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-cinzel text-amber-400/70 group-hover:text-amber-300">
                  <span>Verify Architecture</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
