import React from 'react';
import { X, Play, Music2 } from 'lucide-react';
import { PlaylistTrack } from '../hooks/useYouTubePlayer';

interface QueuePanelProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: PlaylistTrack[];
  currentIndex: number;
  onSelectTrack: (index: number) => void;
  playlistTitle?: string;
}

export const QueuePanel: React.FC<QueuePanelProps> = ({
  isOpen,
  onClose,
  tracks,
  currentIndex,
  onSelectTrack,
  playlistTitle = 'Current Station Queue',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-24 sm:bottom-28 z-40 flex justify-center px-4 pointer-events-auto animate-in slide-in-from-bottom-6 fade-in duration-200">
      <div className="w-full max-w-xl max-h-[50vh] flex flex-col rounded-3xl glass-panel-deep shadow-2xl border border-[#ffecd6]/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#ffecd6]/10 bg-black/20">
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4 text-[#f2b877]" />
            <span className="text-xs sm:text-sm font-semibold text-[#f5e9dc] tracking-wide">
              {playlistTitle}
            </span>
            <span className="text-[10px] text-[#f2b877]/80 px-2 py-0.5 rounded-full bg-[#f2b877]/10 font-mono">
              {tracks.length} tracks
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close track queue"
            className="p-1 rounded-full text-[#f5e9dc]/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Track List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {tracks.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#f5e9dc]/50">
              Loading playlist tracks or press play to sync...
            </div>
          ) : (
            tracks.map((track, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={track.id || idx}
                  type="button"
                  onClick={() => onSelectTrack(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors group ${
                    isActive
                      ? 'bg-[#e8934a]/25 text-[#f2b877] font-medium border border-[#f2b877]/30'
                      : 'text-[#f5e9dc]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[11px] text-[#f5e9dc]/40 w-5 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex flex-col">
                      <span className="truncate text-xs font-medium group-hover:text-[#f2b877]">
                        {track.title}
                      </span>
                      <span className="text-[10px] text-[#f5e9dc]/50 truncate">
                        {track.author}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 ml-3">
                    {isActive ? (
                      <span className="flex items-center gap-1 text-[10px] text-[#f2b877] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f2b877] animate-ping" />
                        Playing
                      </span>
                    ) : (
                      <Play className="w-3.5 h-3.5 opacity-0 group-hover:opacity-80 transition-opacity" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
