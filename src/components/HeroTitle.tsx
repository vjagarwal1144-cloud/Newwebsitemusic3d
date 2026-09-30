import React from 'react';

export const HeroTitle: React.FC = () => {
  return (
    <div className="relative text-center select-none pointer-events-none px-4 py-8">
      {/* Subtle radial warmth behind title */}
      <div className="absolute inset-0 -top-8 -bottom-8 bg-[radial-gradient(circle_at_center,_rgba(11,7,5,0.7)_0%,_rgba(11,7,5,0.35)_45%,_transparent_75%)] -z-10 blur-xl pointer-events-none" />

      {/* Main Devanagari Title with .live accent */}
      <h1 className="font-devanagari font-extrabold tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)] leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl transition-all">
        चाय वाला
        <span className="font-body text-[#f2b877] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl align-baseline tracking-normal ml-1">
          .live
        </span>
      </h1>

      {/* Poetic Tagline & Subtext */}
      <div className="mt-3 sm:mt-4 flex flex-col items-center gap-1.5">
        <p className="font-display italic text-lg sm:text-2xl text-[#f5e9dc]/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] tracking-wide">
          Steam. Stillness. Chai.
        </p>
        <p className="text-xs sm:text-sm text-[#f5e9dc]/60 max-w-md font-sans tracking-wide">
          A quiet digital tea stall for focus, calmness, and mindful sips.
        </p>
      </div>
    </div>
  );
};
