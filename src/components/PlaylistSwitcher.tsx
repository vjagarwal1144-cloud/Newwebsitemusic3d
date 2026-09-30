import React, { useState } from 'react';
import { X, Radio, ArrowRight, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { parseYouTubePlaylistId } from '../hooks/useYouTubePlayer';

interface PlaylistSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  activePlaylistId: string;
  onSelectPlaylist: (playlistId: string) => void;
  isAdFreeMode: boolean;
  onToggleAdFreeMode: () => void;
}

const CHAI_STATIONS = [
  {
    id: 'PLSW-rtFaY_80',
    title: 'Old Delhi Monsoon Lo-fi',
    subtitle: 'Warm sitar drones, roadside petrichor & nostalgic tea stall beats',
    vibe: 'Monsoon Chai',
    icon: '🫖',
  },
  {
    id: 'PLozpXmA4eZ6F_384L0b6c6bS-uL-X4p2s',
    title: 'Mumbai Rain & Cutting Chai',
    subtitle: 'Acoustic jazz, gentle monsoon downpours & evening glass clinks',
    vibe: 'Evening Tapri',
    icon: '🌧️',
  },
  {
    id: 'PL6NdkXsTS0hEc_gYwCWfZL5rQ8nUqN48Q',
    title: 'Late Night Study & Chai Chill',
    subtitle: 'Cozy lofi hip hop beats to focus / relax / work to',
    vibe: 'Deep Study',
    icon: '🎧',
  },
  {
    id: 'PLFgquLnL59amZ_42M4i4Y76Yj7R-kL7zK',
    title: 'Himalayan Stillness & Sitar',
    subtitle: 'Meditative mountain acoustic sitar & deep flow state',
    vibe: 'Stillness',
    icon: '🧘',
  },
  {
    id: 'PL4QNnZJr8sRNK43pnJ1y1Ww1m3_S9j88_',
    title: 'Midnight Cardamom Vinyl',
    subtitle: 'Smooth saxophone, mellow piano chords & vintage warmth',
    vibe: 'Warm Vinyl',
    icon: '☕',
  },
];

export const PlaylistSwitcher: React.FC<PlaylistSwitcherProps> = ({
  isOpen,
  onClose,
  activePlaylistId,
  onSelectPlaylist,
  isAdFreeMode,
  onToggleAdFreeMode,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const trimmed = customInput.trim();
    if (!trimmed) return;

    const extractedId = parseYouTubePlaylistId(trimmed);
    if (!extractedId || extractedId.length < 5) {
      setError('Please paste a valid YouTube Playlist URL or ID (e.g. PLxxxx).');
      return;
    }

    onSelectPlaylist(extractedId);
    setSuccessMsg('Playlist loaded instantly! Enjoy your stream.');
    setCustomInput('');

    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl glass-panel-deep shadow-2xl border border-white/15 p-5 sm:p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e8934a]/20 flex items-center justify-center text-[#f2b877]">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Chai Tapri Radio Stations</h2>
              <p className="text-[11px] text-[#f5e9dc]/60">
                Curated Indian lo-fi music stations or paste any custom YouTube playlist
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

        {/* 100% Ad-Free Stream Mode Switch */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/25">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">
                100% Ad-Free Audio Stream
              </span>
              <span className="text-[10px] text-emerald-300/80">
                Guaranteed zero commercial ads during study or chill
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleAdFreeMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isAdFreeMode
                ? 'bg-emerald-400 text-black shadow-md'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            {isAdFreeMode ? 'Enabled' : 'Enable Ad-Free'}
          </button>
        </div>

        {/* Preset Stations */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-white/70">
            Curated Chai Stations
          </span>

          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
            {CHAI_STATIONS.map((preset) => {
              const isActive = !isAdFreeMode && activePlaylistId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onSelectPlaylist(preset.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all border ${
                    isActive
                      ? 'bg-[#e8934a]/20 border-[#f2b877]/50 text-white shadow-md'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-[#f5e9dc]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className="text-xl shrink-0">{preset.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold truncate">{preset.title}</span>
                        {isActive && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#f2b877] text-black text-[9px] font-bold uppercase shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#f5e9dc]/60 truncate mt-0.5">
                        {preset.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#f2b877] shrink-0 font-medium px-2 py-1 rounded-lg bg-white/5">
                    {preset.vibe}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom YouTube Playlist Input (Fixed to work on FIRST attempt) */}
        <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2 pt-2 border-t border-white/10">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-white/80 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#f2b877]" />
            Paste YouTube Playlist URL or ID
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value);
                setError(null);
              }}
              placeholder="e.g. https://www.youtube.com/playlist?list=PL... or PL..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-[#f5e9dc]/30 focus:outline-none focus:border-[#f2b877]"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-4 py-2 rounded-xl bg-[#f2b877] hover:bg-[#e8934a] disabled:opacity-40 text-black font-semibold text-xs transition-all flex items-center gap-1 shrink-0"
            >
              <span>Load</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {error && <p className="text-[11px] text-rose-400 mt-0.5">{error}</p>}
          {successMsg && (
            <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>{successMsg}</span>
            </p>
          )}

          {!error && !successMsg && (
            <p className="text-[10px] text-[#f5e9dc]/50">
              Loads immediately on your first attempt. Compatible with any public YouTube playlist.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
