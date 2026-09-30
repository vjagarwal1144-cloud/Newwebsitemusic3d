import React from 'react';
import { X, CloudRain, Flame, Bell, Moon, Wind, Volume2, RotateCcw } from 'lucide-react';
import { AmbientMixerState, DEFAULT_MIXER } from '../utils/audioEngine';

interface SoundMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mixer: AmbientMixerState;
  onChangeMixer: (updated: Partial<AmbientMixerState>) => void;
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

  const tracks = [
    {
      key: 'chaiSimmer' as const,
      label: 'Chai Simmer & Bubbling Boil',
      sub: 'Warm milk tea bubbling in brass handi',
      icon: Flame,
      value: mixer.chaiSimmer,
    },
    {
      key: 'monsoonRain' as const,
      label: 'Monsoon Rain on Tin Roof',
      sub: 'Gentle raindrops & damp roadside petrichor',
      icon: CloudRain,
      value: mixer.monsoonRain,
    },
    {
      key: 'streetAmbience' as const,
      label: 'Roadside Ambience & Bells',
      sub: 'Distant cycle rickshaw chimes and gentle street hum',
      icon: Bell,
      value: mixer.streetAmbience,
    },
    {
      key: 'nightCrickets' as const,
      label: 'Night Crickets & Breeze',
      sub: 'Nocturnal rustle in banyan tree leaves',
      icon: Moon,
      value: mixer.nightCrickets,
    },
    {
      key: 'kettleWhistle' as const,
      label: 'Kettle Steam & Whistle',
      sub: 'Soft steam hiss from vintage boiling kettle',
      icon: Wind,
      value: mixer.kettleWhistle,
    },
  ];

  const applyPreset = (preset: Partial<AmbientMixerState>) => {
    onChangeMixer(preset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl glass-panel-deep shadow-2xl border border-[#ffecd6]/20 p-5 sm:p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ffecd6]/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e8934a]/20 flex items-center justify-center text-[#f2b877]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#f5e9dc]">
                Ambient Soundscape Mixer
              </h2>
              <p className="text-[11px] text-[#f5e9dc]/60">
                Layer natural tea stall sounds with your music
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#f5e9dc]/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Switch & Master Volume */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-[#ffecd6]/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleAmbient}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isAmbientActive
                  ? 'bg-[#e8934a] text-[#0b0705]'
                  : 'bg-white/10 text-[#f5e9dc]/60 hover:bg-white/15'
              }`}
            >
              {isAmbientActive ? 'Soundscape Active' : 'Soundscape Muted'}
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

        {/* Sound Channels */}
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
          {tracks.map((t) => {
            const Icon = t.icon;
            const percent = Math.round(t.value * 100);
            return (
              <div
                key={t.key}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#e8934a]/15 flex items-center justify-center text-[#f2b877] shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="text-xs font-medium text-[#f5e9dc] truncate">
                      {t.label}
                    </span>
                    <span className="text-[10px] text-[#f5e9dc]/50 truncate">
                      {t.sub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-36">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={t.value}
                    onChange={(e) =>
                      onChangeMixer({ [t.key]: Number(e.target.value) })
                    }
                    className="w-full custom-slider cursor-pointer"
                  />
                  <span className="text-[10px] font-mono tabular-nums text-[#f5e9dc]/70 w-7 text-right">
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Atmosphere Presets */}
        <div className="flex items-center justify-between pt-2 border-t border-[#ffecd6]/10 text-xs">
          <span className="text-[10px] text-[#f5e9dc]/50 uppercase tracking-wider font-semibold">
            Presets
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  chaiSimmer: 0.8,
                  monsoonRain: 0.65,
                  streetAmbience: 0.15,
                  nightCrickets: 0.05,
                  kettleWhistle: 0.3,
                })
              }
              className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[10px] text-[#f5e9dc] transition-colors"
            >
              🌧️ Monsoon Dhaba
            </button>
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  chaiSimmer: 0.4,
                  monsoonRain: 0.05,
                  streetAmbience: 0.1,
                  nightCrickets: 0.5,
                  kettleWhistle: 0.1,
                })
              }
              className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[10px] text-[#f5e9dc] transition-colors"
            >
              🌙 Midnight Silence
            </button>
            <button
              type="button"
              onClick={() => onChangeMixer(DEFAULT_MIXER)}
              title="Reset to default"
              className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[#f2b877] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
