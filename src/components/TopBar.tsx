import React, { useState, useEffect } from 'react';
import { ClockWidget } from './ClockWidget';
import {
  Sliders,
  Coffee,
  Maximize2,
  Minimize2,
  Timer,
  Download,
  ShieldCheck,
  Share2,
} from 'lucide-react';

interface TopBarProps {
  isPouring: boolean;
  onPour: () => void;
  isAdFreeMode: boolean;
  onToggleAdFreeMode: () => void;
  onOpenMixer: () => void;
  onOpenTimer: () => void;
  onOpenMenu: () => void;
  onOpenShare: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isPouring,
  onPour,
  isAdFreeMode,
  onToggleAdFreeMode,
  onOpenMixer,
  onOpenTimer,
  onOpenMenu,
  onOpenShare,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {}
  };

  return (
    <header className="relative z-30 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-[#ffecd6]/[0.08] backdrop-blur-md bg-black/40">
      {/* Zone 1: World Clock Widget */}
      <div className="flex items-center gap-3">
        <ClockWidget />
      </div>

      {/* Zone 2: Real sharing / discovery */}
      <div className="hidden lg:flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenShare}
          aria-label="Share Chai Wala with friends"
          title="Share Chai Wala"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-[#f5e9dc]/80 hover:bg-white/10 hover:border-[#f2b877]/40 transition-all backdrop-blur-md"
        >
          <Share2 className="w-3.5 h-3.5 text-[#f2b877]" />
          <span>Share the chai</span>
        </button>

        {/* Ad-Free Protection Badge */}
        <button
          type="button"
          onClick={onToggleAdFreeMode}
          title="Toggle 100% Ad-Free Audio Stream Mode (No YouTube ads guaranteed)"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
            isAdFreeMode
              ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.35)]'
              : 'bg-white/[0.06] hover:bg-white/10 border-white/10 text-[#f5e9dc]/70 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isAdFreeMode ? '⚡ Zero-Ad Stream Active' : 'Ad Shield Active'}</span>
        </button>
      </div>

      {/* Zone 3: Interactive Affordances */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Signature "चाय की भाप" Button */}
        <button
          type="button"
          onClick={onPour}
          disabled={isPouring}
          aria-label="चाय की भाप - Pour cutting chai"
          title="Pour cutting chai - Hear the kettle stream and glass clink"
          className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
            isPouring
              ? 'bg-[#e8934a]/30 border-[#e8934a] scale-[1.03] shadow-[0_0_24px_rgba(232,147,74,0.4)]'
              : 'bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.15] border-[#ffecd6]/20 hover:border-white/40 text-[#f5e9dc] hover:scale-[1.02] shadow-md active:scale-[0.98]'
          }`}
        >
          {/* Animated Steam Icon */}
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 text-[#f2b877]"
          >
            <path className="steam-wisp-1" d="M8.5 2.5c-.8 1.2.5 1.9-.3 3.1" />
            <path className="steam-wisp-2" d="M13.5 2.5c-.8 1.2.5 1.9-.3 3.1" />
            <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
            <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
            <line x1="3" y1="21.5" x2="18" y2="21.5" />
          </svg>

          <div className="flex flex-col text-left leading-tight">
            <span className="font-devanagari font-bold text-xs sm:text-sm tracking-wide text-[#f5e9dc] group-hover:text-white">
              चाय की भाप
            </span>
            <span className="text-[10px] tracking-wider uppercase font-medium text-[#f2b877]">
              {isPouring ? 'गरम चाय...' : 'pour chai'}
            </span>
          </div>

          {isPouring && (
            <span className="absolute inset-0 rounded-full border border-[#e8934a] animate-ping opacity-40 pointer-events-none" />
          )}
        </button>

        <button
          type="button"
          onClick={onOpenShare}
          aria-label="Share Chai Wala"
          title="Share Chai Wala"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-white/40 text-[#f5e9dc] transition-all"
        >
          <Share2 className="w-4 h-4 text-[#f2b877]" />
        </button>

        {/* Ambient Soundscape Mixer */}
        <button
          type="button"
          onClick={onOpenMixer}
          aria-label="Open ambient sound mixer"
          title="Ambient Soundscape Mixer (Chai Simmer, Monsoon Rain, Hearth Fire, Crickets)"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-white/40 text-[#f5e9dc] transition-all"
        >
          <Sliders className="w-4 h-4 text-[#f2b877]" />
        </button>

        {/* Stillness & Pomodoro Focus Timer */}
        <button
          type="button"
          onClick={onOpenTimer}
          aria-label="Open focus timer"
          title="Mindful Stillness & Chai Pomodoro Timer"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-white/40 text-[#f5e9dc] transition-all"
        >
          <Timer className="w-4 h-4 text-[#f2b877]" />
        </button>

        {/* Traditional Chai Menu & Brewing Recipes */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open chai recipes menu"
          title="Authentic Chai Recipes & Tea Brewing Guides"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-white/40 text-[#f5e9dc] transition-all"
        >
          <Coffee className="w-4 h-4 text-[#f2b877]" />
        </button>

        {/* Direct Source Code Zip Download */}
        <a
          href="./chaiwala-source-code.zip"
          download="chaiwala-source.zip"
          aria-label="Download complete website source code (.zip)"
          title="Download Complete Source Code (.zip)"
          className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-white/40 text-[#f5e9dc] transition-all group"
        >
          <Download className="w-4 h-4 text-[#f2b877] group-hover:scale-110 transition-transform" />
        </a>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-white/40 text-[#f5e9dc] transition-all"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-[#f2b877]" />
          ) : (
            <Maximize2 className="w-4 h-4 text-[#f2b877]" />
          )}
        </button>
      </div>
    </header>
  );
};
