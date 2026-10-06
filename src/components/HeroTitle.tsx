import React from 'react';
import { Coffee } from 'lucide-react';

export const HeroTitle: React.FC = () => {
  return (
    <div className="relative text-center select-none pointer-events-none px-4 py-3 sm:py-6">
      {/* Subtle radial warmth behind title */}
      <div
        className="absolute inset-0 -top-10 -bottom-10 blur-3xl pointer-events-none -z-10 opacity-70"
        style={{
          background: 'radial-gradient(circle at center, rgba(232, 147, 74, 0.45) 0%, rgba(11,7,5,0.4) 50%, transparent 75%)',
        }}
      />

      {/* Traditional Tapri Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffecd6]/[0.06] border border-[#ffecd6]/15 text-[11px] text-[#f5e9dc]/80 backdrop-blur-md mb-2 shadow-sm">
        <Coffee className="w-3 h-3 text-[#f2b877]" />
        <span>Indian Chai Ambience · Lo-fi · Focus Music</span>
      </div>

      {/* Devanagari & English Hero Title with .live accent */}
      <h1 className="font-extrabold tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)] leading-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl transition-all flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <span className="font-devanagari text-[#f2b877]">चाय वाला</span>
        <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#ffecd6]">
          Chai With Music
        </span>
      </h1>

      {/* Poetic Tagline & Description */}
      <div className="mt-2 flex flex-col items-center gap-1">
        <p className="font-display italic text-base sm:text-xl md:text-2xl text-[#f5e9dc]/95 drop-shadow-md tracking-wide">
          "Steam. Stillness. Chai."
        </p>
        <p className="text-xs sm:text-sm text-[#f5e9dc]/70 max-w-lg font-sans tracking-wide">
          Relaxing lo-fi music, study music and Indian chai ambience for focus, work, reading and slow moments.
        </p>
        <nav
          aria-label="Explore music topics"
          className="pointer-events-auto mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs"
        >
          <a className="text-[#f2b877]/90 hover:text-[#ffecd6] underline underline-offset-4" href="/lofi-music/">Lo-fi</a>
          <a className="text-[#f2b877]/90 hover:text-[#ffecd6] underline underline-offset-4" href="/study-music/">Study</a>
          <a className="text-[#f2b877]/90 hover:text-[#ffecd6] underline underline-offset-4" href="/focus-music/">Focus</a>
          <a className="text-[#f2b877]/90 hover:text-[#ffecd6] underline underline-offset-4" href="/relaxing-music/">Relax</a>
          <a className="text-[#f2b877]/90 hover:text-[#ffecd6] underline underline-offset-4" href="/indian-ambience/">Indian ambience</a>
        </nav>
      </div>
    </div>
  );
};
