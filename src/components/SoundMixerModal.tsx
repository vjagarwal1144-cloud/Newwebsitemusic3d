import React from 'react';
import {
  X,
  CloudRain,
  Flame,
  Volume2,
  RotateCcw,
  Sparkles,
  Waves,
  Coffee,
} from 'lucide-react';
import { ChaiAmbientMixer, DEFAULT_CHAI_MIXER } from '../utils/audioEngine';

interface SoundMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mixer: ChaiAmbientMixer;
  onChangeMixer: (updated: Partial<ChaiAmbientMixer>) => void;
  isAmbientActive: boolean;
  onToggleAmbient: () => void;
}

export const SoundMixerModal: React.FC<SoundMixerModalProps> = ({
  isOpen,
  onClose,
  mixer,
  onChangeMixer,
  isAmbientActive,
  onToggleAmbient,
}) => {
  if (!isOpen) return null;

  const channels = [
    {
      key: 'simmer' as const,
      label: 'Spiced Chai Simmer',
      sub: 'Crushed ginger, cardamom & boiling tea leaves',
      icon: Coffee,
      value: mixer.simmer,
      color: '#e8934a',
    },
    {
      key: 'rain' as const,
      label: 'Delhi Monsoon Rain',
      sub: 'Warm rainfall on tin roof & wet pavement',
      icon: CloudRain,
      value: mixer.rain,
      color: '#60a5fa',
    },
    {
      key: 'fire' as const,
      label: 'Coal Stove & Embers',
      sub: 'Soft crackle of clay stove firewood',
      icon: Flame,
      value: mixer.fire,
      color: '#fb923c',
    },
    {
      key: 'crickets' as const,
      label: 'Night Garden Crickets',
      sub: 'Gentle nocturnal peaceful chirping',
      icon: Sparkles,
      value: mixer.crickets,
      color: '#a3e635',
    },
    {
      key: 'alpha' as const,
      label: '432Hz Alpha Focus Waves',
      sub: 'Deep work & flow state meditation frequency',
      icon: Waves,
      value: mixer.alpha,
      color: '#c084fc',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl glass-panel-deep shadow-2xl border border-white/15 p-5 sm:p-6 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e8934a]/20 flex items-center justify-center text-[#f2b877]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Tapri Ambient Soundscape Mixer
              </h2>
              <p className="text-[11px] text-[#f5e9dc]/60">
                Layer chai simmer, monsoon rain, coal embers & 432Hz alpha waves
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Switch & Master Volume */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleAmbient}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isAmbientActive
                  ? 'bg-[#f2b877] text-black shadow-md'
                  : 'bg-white/10 text-white/60 hover:bg-white/15'
              }`}
            >
              {isAmbientActive ? 'Ambient Active' : 'Ambient Muted'}
            </button>
            <span className="text-xs text-[#f5e9dc]/70">Master Volume</span>
          </div>

          <div className="flex items-center gap-2 w-36">
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={mixer.master}
              onChange={(e) => onChangeMixer({ master: Number(e.target.value) })}
              className="w-full custom-slider cursor-pointer"
            />
            <span className="text-[10px] font-mono tabular-nums text-[#f2b877] w-7 text-right">
              {Math.round(mixer.master * 100)}%
            </span>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {channels.map((t) => {
            const Icon = t.icon;
            const percent = Math.round(t.value * 100);
            return (
              <div
                key={t.key}
                className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/10"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${t.color}25`, color: t.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="text-xs font-medium text-white truncate">{t.label}</span>
                    <span className="text-[10px] text-[#f5e9dc]/50 truncate">{t.sub}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-36 sm:w-44">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={t.value}
                    onChange={(e) => onChangeMixer({ [t.key]: Number(e.target.value) })}
                    className="w-full custom-slider cursor-pointer"
                  />
                  <span className="text-[10px] font-mono tabular-nums text-white/70 w-8 text-right">
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Presets */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs shrink-0 flex-wrap gap-2">
          <span className="text-[10px] text-[#f5e9dc]/50 uppercase tracking-wider font-semibold">
            Tapri Presets
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() =>
                onChangeMixer({
                  simmer: 0.8,
                  rain: 0.6,
                  fire: 0.2,
                  crickets: 0.1,
                  alpha: 0.25,
                })
              }
              className="px-2.5 py-1 rounded-xl bg-white/[0.05] hover:bg-white/10 text-[10px] text-white transition-colors"
            >
              🌧️ Monsoon Tapri
            </button>
            <button
              type="button"
              onClick={() =>
                onChangeMixer({
                  simmer: 0.3,
                  rain: 0.2,
                  fire: 0.1,
                  crickets: 0.4,
                  alpha: 0.7,
                })
              }
              className="px-2.5 py-1 rounded-xl bg-white/[0.05] hover:bg-white/10 text-[10px] text-white transition-colors"
            >
              🧘 Deep Stillness
            </button>
            <button
              type="button"
              onClick={() => onChangeMixer(DEFAULT_CHAI_MIXER)}
              title="Reset to default levels"
              className="p-1 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
