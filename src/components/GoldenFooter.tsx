import React from 'react';
import { ShieldCheck, Award, Lock, ExternalLink, Github, Heart, HelpCircle, Keyboard, Swords } from 'lucide-react';

export const GoldenFooter: React.FC = () => {
  return (
    <footer id="golden-accented-footer" className="relative bg-[#08090c] border-t border-amber-500/30 text-slate-300 py-12 px-6">
      {/* Top Metallic Gold Border Accent Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Emblem & Branding */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 p-0.5 flex items-center justify-center gold-glow">
                <div className="w-full h-full bg-[#08090c] rounded-[10px] flex items-center justify-center text-amber-300">
                  <Swords className="w-5 h-5 animate-sword-glint" />
                </div>
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-extrabold text-gold-gradient tracking-wider">
                  CLASSICAL VIEWER
                </h3>
                <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                  SSbow Intelligence Engine
                </span>
              </div>
            </div>
            <p className="font-serif text-xs text-slate-400 leading-relaxed italic">
              "The premier high-classical environment for multi-agent swarm debugging, delegation gap tracking, and 3D topology analysis."
            </p>
          </div>

          {/* Col 2: Architectural Modules */}
          <div className="space-y-2">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              Architectural Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
              <li className="hover:text-amber-300 cursor-pointer transition">3D Spatial Topology Canvas</li>
              <li className="hover:text-amber-300 cursor-pointer transition">Synchronized ReAct CLI Stream</li>
              <li className="hover:text-amber-300 cursor-pointer transition">Delegation Gap & Drift Tracker</li>
              <li className="hover:text-amber-300 cursor-pointer transition">Sovereign Meta-Debugger</li>
              <li className="hover:text-amber-300 cursor-pointer transition">Human Governance Intercepts</li>
            </ul>
          </div>

          {/* Col 3: Benchmark Specifications */}
          <div className="space-y-2">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              Standards & Audits
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
              <li className="hover:text-amber-300 cursor-pointer transition">OpenTelemetry Spans v1.28</li>
              <li className="hover:text-amber-300 cursor-pointer transition">ReAct Reasoning Benchmark</li>
              <li className="hover:text-amber-300 cursor-pointer transition">Zero-Exfiltration Privacy Guarantee</li>
              <li className="hover:text-amber-300 cursor-pointer transition">Zero-Lag Canvas Rendering Engine</li>
            </ul>
          </div>

          {/* Col 4: Sovereign Status Seal */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              System Seal & Status
            </h4>
            <div className="p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-amber-300">
                  Swarm Operational
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Latencies: &lt;14ms | GPU Acceleration: Active
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} SSbow Sovereign Intelligence. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-400 font-cinzel">
              <span className="hover:text-amber-300 cursor-pointer">Terms of Sovereignty</span>
              <span>•</span>
              <span className="hover:text-amber-300 cursor-pointer">Security Audits</span>
              <span>•</span>
              <span className="hover:text-amber-300 cursor-pointer">API Telemetry</span>
            </div>

            {/* Keyboard Shortcuts Hover Help Popover */}
            <div className="relative group">
              <button
                id="footer-keyboard-help-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30 transition text-xs font-mono gold-glow cursor-pointer"
              >
                <Keyboard className="w-3.5 h-3.5 text-amber-400" />
                <span>Shortcuts</span>
                <HelpCircle className="w-3.5 h-3.5 text-amber-400/80 ml-0.5" />
              </button>

              {/* Hover Popover Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 w-72 p-4 bg-slate-900/95 border border-amber-500/40 rounded-2xl shadow-2xl gold-glow opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 backdrop-blur-md">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2 mb-3">
                  <Keyboard className="w-4 h-4 text-amber-400" />
                  <h4 className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider">
                    Classical Keyboard Controls
                  </h4>
                </div>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Play / Pause Simulation</span>
                    <kbd className="px-2 py-0.5 bg-slate-950 text-amber-300 rounded border border-amber-500/40 font-bold text-[11px] shadow-inner">
                      Space
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Reset Trace to Step #1</span>
                    <kbd className="px-2 py-0.5 bg-slate-950 text-amber-300 rounded border border-amber-500/40 font-bold text-[11px] shadow-inner">
                      R
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Toggle Meta-Debugger</span>
                    <kbd className="px-2 py-0.5 bg-slate-950 text-amber-300 rounded border border-amber-500/40 font-bold text-[11px] shadow-inner">
                      D
                    </kbd>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 italic font-serif">
                  *Shortcuts active during playground navigation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
