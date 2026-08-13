import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Clock,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';

interface TimelineControllerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  activeStepIndex: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  speedMultiplier: number;
  onSpeedChange: (speed: number) => void;
  isLiveSimulating: boolean;
  onToggleLiveSim: () => void;
  onReset: () => void;
}

export const TimelineController: React.FC<TimelineControllerProps> = ({
  isPlaying,
  onTogglePlay,
  activeStepIndex,
  totalSteps,
  onStepChange,
  speedMultiplier,
  onSpeedChange,
  isLiveSimulating,
  onToggleLiveSim,
  onReset,
}) => {
  return (
    <div id="timeline-controller-bar" className="bg-slate-950/95 border-t border-slate-800/90 p-3 px-5 text-slate-100 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md shadow-2xl z-40">
      {/* Playback Controls & Step Buttons */}
      <div className="flex items-center gap-2">
        <button
          id="btn-timeline-reset"
          onClick={onReset}
          className="p-2 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-xl transition"
          title="Reset Timeline to Start"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          id="btn-timeline-step-prev"
          onClick={() => onStepChange(Math.max(1, activeStepIndex - 1))}
          disabled={activeStepIndex <= 1}
          className="p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition disabled:opacity-30"
          title="Step Backward"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          id="btn-timeline-play-pause"
          onClick={onTogglePlay}
          className="p-2.5 bg-gradient-to-tr from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 rounded-xl shadow-lg gold-glow transition-all hover:scale-105 active:scale-95"
          title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
        </button>

        <button
          id="btn-timeline-step-next"
          onClick={() => onStepChange(Math.min(totalSteps, activeStepIndex + 1))}
          disabled={activeStepIndex >= totalSteps}
          className="p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition disabled:opacity-30"
          title="Step Forward"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1" />

        {/* Live Simulation Toggle */}
        <button
          id="btn-toggle-live-sim"
          onClick={onToggleLiveSim}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold border transition ${
            isLiveSimulating
              ? 'bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-md gold-glow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Activity className={`w-3.5 h-3.5 ${isLiveSimulating ? 'text-amber-400 animate-pulse' : ''}`} />
          <span>{isLiveSimulating ? 'Live Sovereign Engine ON' : 'Replay Mode'}</span>
        </button>
      </div>

      {/* Scrubbing Range Slider */}
      <div className="flex-1 max-w-xl flex items-center gap-3">
        <span className="font-mono text-xs text-amber-300 font-semibold shrink-0 min-w-[50px] text-right">
          #{activeStepIndex} / {totalSteps}
        </span>

        <input
          id="timeline-scrubber-slider"
          type="range"
          min={1}
          max={Math.max(1, totalSteps)}
          value={activeStepIndex}
          onChange={(e) => onStepChange(parseInt(e.target.value))}
          className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Speed Multiplier Select */}
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl text-xs font-mono">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400 text-[11px]">Speed:</span>
        <select
          id="timeline-speed-select"
          value={speedMultiplier}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
        >
          <option value={0.5} className="bg-slate-900">0.5x</option>
          <option value={1.0} className="bg-slate-900">1.0x</option>
          <option value={2.0} className="bg-slate-900">2.0x</option>
          <option value={5.0} className="bg-slate-900">5.0x</option>
        </select>
      </div>
    </div>
  );
};
