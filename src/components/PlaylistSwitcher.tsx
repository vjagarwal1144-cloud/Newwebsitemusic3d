import React, { useState } from 'react';
import { X, Radio, ArrowRight, Sparkles } from 'lucide-react';
import { PRESET_PLAYLISTS } from '../utils/audioEngine';

interface PlaylistSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  activePlaylistId: string;
  onSelectPlaylist: (playlistId: string) => void;
}

export const PlaylistSwitcher: React.FC<PlaylistSwitcherProps> = ({
  isOpen,
  onClose,
  activePlaylistId,
  onSelectPlaylist,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = customInput.trim();
    if (!trimmed) return;

    let playlistId = trimmed;

    // Check if it's a URL
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      try {
        const url = new URL(trimmed);
        const listParam = url.searchParams.get('list');
        if (listParam) {
          playlistId = listParam;
        } else {
          setError('Could not find a ?list= playlist parameter in that URL.');
          return;
        }
      } catch {
        setError('Invalid URL format.');
        return;
      }
    }

    if (playlistId.length < 5) {
      setError('Please enter a valid YouTube Playlist ID or URL.');
      return;
    }

    onSelectPlaylist(playlistId);
    setCustomInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl glass-panel-deep shadow-2xl border border-[#ffecd6]/20 p-5 sm:p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ffecd6]/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e8934a]/20 flex items-center justify-center text-[#f2b877]">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#f5e9dc]">
                Chaiwala Radio Stations
              </h2>
              <p className="text-[11px] text-[#f5e9dc]/60">
                Curated lo-fi tea atmospheres or load your own YouTube playlist
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

        {/* Preset Stations */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#f2b877]/80">
            Atmospheric Tapri Stations
          </span>

          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
            {PRESET_PLAYLISTS.map((preset) => {
              const isActive = activePlaylistId === preset.id;
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
                      ? 'bg-[#e8934a]/25 border-[#f2b877]/50 text-[#f2b877] shadow-[0_0_15px_rgba(232,147,74,0.2)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border-[#ffecd6]/10 text-[#f5e9dc]'
                  }`}
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">{preset.title}</span>
                      {isActive && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#f2b877] text-[#0b0705] text-[9px] font-bold uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#f5e9dc]/60 truncate mt-0.5">
                      {preset.subtitle}
                    </span>
                  </div>

                  <span className="text-[10px] text-[#f2b877]/80 shrink-0 font-medium px-2 py-1 rounded-lg bg-[#ffecd6]/[0.06]">
                    {preset.vibe}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom YouTube Playlist Input */}
        <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2 pt-2 border-t border-[#ffecd6]/10">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#f2b877]/80 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#f2b877]" />
            Custom YouTube Playlist
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Paste YouTube playlist link or ID..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white/[0.06] border border-[#ffecd6]/15 text-[#f5e9dc] placeholder-[#f5e9dc]/30 focus:outline-none focus:border-[#f2b877]/60"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e8934a] to-[#d9622f] hover:brightness-110 disabled:opacity-50 text-[#0b0705] font-semibold text-xs transition-all flex items-center gap-1 shrink-0"
            >
              <span>Load</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {error ? (
            <p className="text-[11px] text-red-400 mt-0.5">{error}</p>
          ) : (
            <p className="text-[10px] text-[#f5e9dc]/50">
              Must be a public playlist. Example: <code>PLSW-rtFaY_80</code>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
