import React, { useEffect, useMemo, useState } from 'react';
import { X, Play, Pause, RotateCcw, Coffee, Moon, BookOpen, Code2, Sparkles, Save, Trash2 } from 'lucide-react';

type SessionPreset = {
  id: string;
  name: string;
  minutes: number;
  description: string;
  icon: React.ReactNode;
  mixer: {
    master: number;
    chaiSimmer: number;
    monsoonRain: number;
    streetAmbience: number;
    nightCrickets: number;
    kettleWhistle: number;
  };
};

const PRESETS: SessionPreset[] = [
  { id: 'quick-chai', name: 'Quick Chai Break', minutes: 10, description: 'A short reset between tasks.', icon: <Coffee className="w-4 h-4" />, mixer: { master: .65, chaiSimmer: .75, monsoonRain: .2, streetAmbience: .25, nightCrickets: .05, kettleWhistle: .15 } },
  { id: 'study', name: 'Study Flow', minutes: 25, description: 'Classic focused study session.', icon: <BookOpen className="w-4 h-4" />, mixer: { master: .6, chaiSimmer: .45, monsoonRain: .5, streetAmbience: .08, nightCrickets: .15, kettleWhistle: .08 } },
  { id: 'coding', name: 'Coding Deep Flow', minutes: 50, description: 'Long, low-distraction coding block.', icon: <Code2 className="w-4 h-4" />, mixer: { master: .55, chaiSimmer: .35, monsoonRain: .35, streetAmbience: .04, nightCrickets: .25, kettleWhistle: .04 } },
  { id: 'night', name: 'Midnight Stillness', minutes: 90, description: 'Slow ambience for late-night work or reading.', icon: <Moon className="w-4 h-4" />, mixer: { master: .5, chaiSimmer: .25, monsoonRain: .2, streetAmbience: .02, nightCrickets: .45, kettleWhistle: .03 } },
];

const STORAGE_KEY = 'chai-with-music-session-stats-v1';

interface ChaiSessionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSession: (preset: SessionPreset) => void;
}

export const ChaiSessionPanel: React.FC<ChaiSessionPanelProps> = ({ isOpen, onClose, onStartSession }) => {
  const [selected, setSelected] = useState(PRESETS[1]);
  const [timeLeft, setTimeLeft] = useState(PRESETS[1].minutes * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      setCompleted(Number(saved.completed) || 0);
      setFocusMinutes(Number(saved.focusMinutes) || 0);
    } catch {}
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTimeLeft(v => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running && timeLeft === 0) {
      setRunning(false);
      const nextCompleted = completed + 1;
      const nextMinutes = focusMinutes + selected.minutes;
      setCompleted(nextCompleted);
      setFocusMinutes(nextMinutes);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: nextCompleted, focusMinutes: nextMinutes }));
    }
  }, [running, timeLeft, completed, focusMinutes, selected.minutes]);

  const selectPreset = (preset: SessionPreset) => {
    setSelected(preset);
    setTimeLeft(preset.minutes * 60);
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(selected.minutes * 60);
  };

  const start = () => {
    onStartSession(selected);
    setRunning(true);
  };

  const progress = useMemo(() => 1 - timeLeft / (selected.minutes * 60), [timeLeft, selected.minutes]);
  const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const ss = (timeLeft % 60).toString().padStart(2, '0');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl glass-panel-deep border border-white/15 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[.18em] text-[#f2b877]/70">Chai Ritual</p>
            <h2 className="text-lg font-semibold text-white">Choose your focus session</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-white/60 hover:bg-white/10 hover:text-white" aria-label="Close session panel"><X className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {PRESETS.map(preset => (
            <button key={preset.id} onClick={() => selectPreset(preset)} className={`text-left p-3 rounded-2xl border transition-all ${selected.id === preset.id ? 'bg-[#e8934a]/20 border-[#f2b877]/50' : 'bg-white/[.03] border-white/10 hover:bg-white/[.06]'}`}>
              <div className="flex items-center gap-2 text-[#f2b877]">{preset.icon}<span className="text-xs font-semibold text-white">{preset.name}</span></div>
              <p className="text-[10px] text-white/50 mt-1">{preset.minutes} min · {preset.description}</p>
            </button>
          ))}
        </div>

        <div className="rounded-3xl bg-black/20 border border-white/10 p-6 text-center">
          <div className="relative mx-auto w-44 h-44 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="88" cy="88" r="78" fill="none" stroke="currentColor" className="text-white/10" strokeWidth="5" />
              <circle cx="88" cy="88" r="78" fill="none" stroke="currentColor" className="text-[#f2b877]" strokeWidth="5" strokeLinecap="round" strokeDasharray={2*Math.PI*78} strokeDashoffset={2*Math.PI*78*(1-progress)} />
            </svg>
            <div><div className="text-4xl font-mono font-bold text-white tabular-nums">{mm}:{ss}</div><div className="text-[10px] text-[#f2b877] mt-1">{running ? 'Focus in progress' : 'Ready'}</div></div>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            <button onClick={reset} className="p-3 rounded-full bg-white/10 text-white/70 hover:bg-white/15" aria-label="Reset"><RotateCcw className="w-4 h-4" /></button>
            <button onClick={start} className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#e8934a] text-[#0b0705] text-xs font-bold">
              {running ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {running ? 'Session Running' : 'Start Chai Session'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="rounded-2xl bg-white/[.04] border border-white/10 p-3"><p className="text-[9px] uppercase tracking-wider text-white/40">Sessions completed</p><p className="text-xl font-semibold text-white mt-1">{completed}</p></div>
          <div className="rounded-2xl bg-white/[.04] border border-white/10 p-3"><p className="text-[9px] uppercase tracking-wider text-white/40">Focus minutes</p><p className="text-xl font-semibold text-white mt-1">{focusMinutes}</p></div>
        </div>

        <p className="flex items-center gap-2 text-[10px] text-white/40 mt-4"><Sparkles className="w-3 h-3" /> Your session stats stay on this device.</p>
      </div>
    </div>
  );
};

export type { SessionPreset };
