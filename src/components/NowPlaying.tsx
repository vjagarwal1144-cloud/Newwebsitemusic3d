import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  VolumeX,
  ListMusic,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { CurrentTrack } from '../hooks/useYouTubePlayer';

interface NowPlayingProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isShuffled: boolean;
  onToggleShuffle: () => void;
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  volume: number;
  onChangeVolume: (volume: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  currentTrack: CurrentTrack;
  isQueueOpen: boolean;
  onToggleQueue: () => void;
  onOpenPlaylistSwitcher: () => void;
  playlistId: string;
}

const formatTime = (secs: number) => {
  if (isNaN(secs) || secs < 0) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const NowPlaying: React.FC<NowPlayingProps> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrevious,
  isShuffled,
  onToggleShuffle,
  currentTime,
  duration,
  onSeek,
  volume,
  onChangeVolume,
  isMuted,
  onToggleMute,
  currentTrack,
  isQueueOpen,
  onToggleQueue,
  onOpenPlaylistSwitcher,
  playlistId,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="relative z-20 flex flex-col items-center w-full px-3 sm:px-6 pb-4 sm:pb-6 pointer-events-auto">
      {/* Container Wrapper */}
      <div className="w-full max-w-2xl flex flex-col gap-2">
        {/* Main Frosted Glass Player Capsule */}
        <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl glass-panel-deep shadow-[0_12px_40px_rgba(0,0,0,0.65)] border border-[#ffecd6]/15 backdrop-blur-2xl">
          {/* Vinyl / Chai Disc Album Art */}
          <div className="relative shrink-0">
            <div
              className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden flex items-center justify-center shadow-lg transition-transform duration-500 border border-[#f2b877]/30 ${
                isPlaying ? 'spin-slow' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #e8934a 0%, #8a3d1e 50%, #2b130e 100%)',
              }}
            >
              {/* Vinyl grooves pattern */}
              <div className="absolute inset-1 rounded-full border border-black/40" />
              <div className="absolute inset-2.5 rounded-full border border-black/30" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#f5e9dc] flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0b0705]" />
              </div>
            </div>

            {/* Glowing amber halo when playing */}
            {isPlaying && (
              <div className="absolute -inset-1 rounded-full bg-[#e8934a]/20 blur-sm pointer-events-none -z-10" />
            )}
          </div>

          {/* Track Details & Scrubber */}
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
            {/* Title & Artist */}
            <div className="flex items-center justify-between gap-2 overflow-hidden">
              <div className="min-w-0 flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-[#f5e9dc] truncate">
                  {currentTrack.title || 'Chai Wala Radio'}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#f5e9dc]/60 truncate">
                  {currentTrack.author || 'Lo-fi Tea Lounge'}
                </span>
              </div>

              {/* Station button */}
              <button
                type="button"
                onClick={onOpenPlaylistSwitcher}
                title="Switch Station or Load Custom Playlist"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.15] text-[10px] font-medium text-[#f2b877] border border-[#ffecd6]/10 shrink-0 transition-colors"
              >
                <Radio className="w-3 h-3" />
                <span>Station</span>
              </button>
            </div>

            {/* Scrubber Seek Bar */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tabular-nums text-[#f5e9dc]/50 shrink-0 w-8 text-right">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1 flex items-center h-4 group">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  className="w-full custom-slider cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f2b877 0%, #f2b877 ${progressPercent}%, rgba(245, 233, 220, 0.15) ${progressPercent}%, rgba(245, 233, 220, 0.15) 100%)`,
                  }}
                  aria-label="Seek track"
                />
              </div>

              <span className="text-[10px] font-mono tabular-nums text-[#f5e9dc]/50 shrink-0 w-8">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Shuffle */}
            <button
              type="button"
              onClick={onToggleShuffle}
              aria-label="Toggle shuffle"
              title={isShuffled ? 'Shuffle enabled' : 'Shuffle disabled'}
              className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                isShuffled
                  ? 'text-[#f2b877] bg-[#e8934a]/20'
                  : 'text-[#f5e9dc]/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous track"
              title="Previous"
              className="flex items-center justify-center w-8 h-8 rounded-full text-[#f5e9dc]/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Play / Pause - Distinctive White Pill Button with elevation */}
            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title={isPlaying ? 'Pause' : 'Play'}
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f5e9dc] hover:bg-white text-[#0b0705] shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={onNext}
              aria-label="Next track"
              title="Next"
              className="flex items-center justify-center w-8 h-8 rounded-full text-[#f5e9dc]/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Queue Toggle */}
            <button
              type="button"
              onClick={onToggleQueue}
              aria-label="Toggle playlist queue"
              title="View Tracklist"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                isQueueOpen
                  ? 'text-[#f2b877] bg-[#e8934a]/25'
                  : 'text-[#f5e9dc]/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ListMusic className="w-4 h-4" />
            </button>

            {/* Volume Popover Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                aria-label="Volume controls"
                title="Volume"
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-[#f5e9dc]/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {showVolumeSlider && (
                <div className="absolute bottom-11 right-0 p-3 rounded-2xl glass-panel-deep shadow-2xl z-50 flex items-center gap-2 w-36 border border-[#ffecd6]/20">
                  <button
                    type="button"
                    onClick={onToggleMute}
                    aria-label="Mute / unmute"
                    className="text-[#f5e9dc]/70 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => onChangeVolume(Number(e.target.value))}
                    className="w-full custom-slider cursor-pointer"
                    aria-label="Music volume"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar: Playlist Switcher on mobile + Floating YouTube Music pill */}
        <div className="flex items-center justify-between px-2 text-xs text-[#f5e9dc]/60">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPlaylistSwitcher}
              className="sm:hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.15] text-[#f2b877] border border-[#ffecd6]/15 transition-colors"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Change Station</span>
            </button>
          </div>

          {/* YouTube Music direct link */}
          <a
            href={`https://music.youtube.com/playlist?list=${playlistId}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open playlist in YouTube Music"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.18] text-[#f5e9dc]/80 hover:text-[#f2b877] border border-[#ffecd6]/15 transition-all group"
          >
            <span className="w-3.5 h-3.5 rounded-full bg-red-600/80 flex items-center justify-center text-white text-[8px] font-bold">
              ▶
            </span>
            <span className="text-[11px] font-medium">YT Music</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </div>
  );
};
