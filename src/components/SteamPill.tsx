import React from 'react';
import { UniverseConfig } from '../types/universe';
import { Sparkles, Flame, Coffee, Wind } from 'lucide-react';

interface RitualPillProps {
  universe: UniverseConfig;
  isPouring: boolean;
  onPour: () => void;
}

export const SteamPill: React.FC<RitualPillProps> = ({
  universe,
  isPouring,
  onPour,
}) => {
  const { ritual, theme } = universe;

  // Icon based on universe ritual
  const renderIcon = () => {
    if (universe.id === 'nordic') {
      return <Flame className="w-4 h-4 text-[#fb923c] animate-pulse" />;
    }
    if (universe.id === 'orbit') {
      return <Sparkles className="w-4 h-4 text-[#a78bfa] animate-spin" style={{ animationDuration: '6s' }} />;
    }
    if (universe.id === 'tokyo' || universe.id === 'bistro') {
      return <Coffee className="w-4 h-4" style={{ color: theme.accentSoft }} />;
    }

    // Default Tea Cup with animated steam wisps
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ color: theme.accentSoft }}
      >
        <path className="steam-wisp-1" d="M8.5 2.5c-.8 1.2.5 1.9-.3 3.1" />
        <path className="steam-wisp-2" d="M13.5 2.5c-.8 1.2.5 1.9-.3 3.1" />
        <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
        <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
        <line x1="3" y1="21.5" x2="18" y2="21.5" />
      </svg>
    );
  };

  return (
    <button
      type="button"
      onClick={onPour}
      disabled={isPouring}
      aria-label={ritual.actionText}
      title={`${ritual.actionText} - Experience the signature aroma and sound ritual`}
      className={`group relative flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
        isPouring
          ? 'bg-white/[0.18] border-white/40 scale-[1.03] shadow-[0_0_24px_rgba(255,255,255,0.25)]'
          : 'bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.15] border-[#ffecd6]/20 hover:border-white/40 text-[#f5e9dc] hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.35)] active:scale-[0.98]'
      }`}
      style={{
        borderColor: isPouring ? theme.accentColor : undefined,
      }}
    >
      {/* Icon */}
      <span className="relative flex items-center justify-center w-5 h-5 shrink-0">
        {renderIcon()}
      </span>

      {/* Primary & secondary labels */}
      <div className="flex flex-col text-left leading-tight">
        <span className="font-devanagari font-bold text-xs sm:text-sm tracking-wide text-[#f5e9dc] group-hover:text-white">
          {ritual.label}
        </span>
        <span
          className="text-[10px] tracking-wider uppercase font-medium group-hover:brightness-110"
          style={{ color: theme.accentSoft }}
        >
          {isPouring ? ritual.pouringText : ritual.sublabel}
        </span>
      </div>

      {/* Ripple ring effect while pouring */}
      {isPouring && (
        <span
          className="absolute inset-0 rounded-full border animate-ping opacity-35 pointer-events-none"
          style={{ borderColor: theme.accentColor }}
        />
      )}
    </button>
  );
};
