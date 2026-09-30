import React from 'react';

interface SteamPillProps {
  isPouring: boolean;
  onPour: () => void;
}

export const SteamPill: React.FC<SteamPillProps> = ({ isPouring, onPour }) => {
  return (
    <button
      type="button"
      onClick={onPour}
      disabled={isPouring}
      aria-label="Play the chai steam sound and pour hot tea"
      title="Tap for a fresh pour of steaming chai"
      className={`group relative flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
        isPouring
          ? 'bg-[#e8934a]/25 border-[#f2b877]/60 text-[#f2b877] shadow-[0_0_20px_rgba(232,147,74,0.35)] scale-[1.02]'
          : 'bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.15] border-[#ffecd6]/20 hover:border-[#f2b877]/50 text-[#f5e9dc] hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.35)] active:scale-[0.98]'
      }`}
    >
      {/* Tea Cup SVG with rising animated wisps */}
      <span className="relative flex items-center justify-center w-5 h-5 text-[#f2b877] shrink-0">
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
        >
          {/* Steam wisps */}
          <path
            className="steam-wisp-1"
            d="M8.5 2.5c-.8 1.2.5 1.9-.3 3.1"
          />
          <path
            className="steam-wisp-2"
            d="M13.5 2.5c-.8 1.2.5 1.9-.3 3.1"
          />
          {/* Cup body */}
          <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
          {/* Cup handle */}
          <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
          {/* Saucer / Tapri base */}
          <line x1="3" y1="21.5" x2="18" y2="21.5" />
        </svg>
      </span>

      {/* Primary & secondary labels */}
      <div className="flex flex-col text-left leading-tight">
        <span className="font-devanagari font-bold text-xs sm:text-sm tracking-wide text-[#f5e9dc] group-hover:text-white">
          चाय की भाप
        </span>
        <span className="text-[10px] tracking-wider uppercase font-medium text-[#f2b877]/90 group-hover:text-[#f2b877]">
          {isPouring ? 'pouring…' : 'tap for a pour'}
        </span>
      </div>

      {/* Ripple ring effect while pouring */}
      {isPouring && (
        <span className="absolute inset-0 rounded-full border border-[#f2b877] animate-ping opacity-30 pointer-events-none" />
      )}
    </button>
  );
};
