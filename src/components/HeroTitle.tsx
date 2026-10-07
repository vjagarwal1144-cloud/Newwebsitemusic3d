import React from 'react';
import { Coffee, Waves, Trees, Sparkles, Moon, Mountain, CloudRain, Zap, CarFront, Orbit, BookOpen, TrainFront } from 'lucide-react';
import type { SceneMode } from './ExperienceShell';

const COPY: Record<SceneMode, { icon: React.ReactNode; badge: string; title: string; sub: string; line: string }> = {
  dusk: { icon:<Coffee className="w-3 h-3"/>, badge:'Indian Chai Ambience · Lo-fi · Focus', title:'Chai With Music', sub:'Steam. Stillness. Chai.', line:'Warm lo-fi and chai ambience for slow evenings, focus and deep listening.' },
  monsoon: { icon:<CloudRain className="w-3 h-3"/>, badge:'Rain · Lo-fi · Deep Focus', title:'Monsoon With Music', sub:'Rain. Rhythm. Stillness.', line:'Rainy textures and mellow music for studying, coding and quiet work.' },
  midnight: { icon:<Moon className="w-3 h-3"/>, badge:'Midnight · Lo-fi · Focus', title:'Midnight With Music', sub:'Low Light. Deep Flow.', line:'A dark, warm listening room for late-night focus and reflection.' },
  pahadi: { icon:<Mountain className="w-3 h-3"/>, badge:'Mountain · Acoustic · Calm', title:'Pahadi With Music', sub:'Mist. Mountains. Music.', line:'Soft mountain atmosphere and gentle music for reading and creative work.' },
  ocean: { icon:<Waves className="w-3 h-3"/>, badge:'Ocean · Ambient · Relax', title:'Ocean With Music', sub:'Breathe. Drift. Listen.', line:'Slow waves and spacious sound for relaxation, reading and deep listening.' },
  forest: { icon:<Trees className="w-3 h-3"/>, badge:'Forest · Nature · Focus', title:'Forest With Music', sub:'Green. Quiet. Focused.', line:'A calm forest room for concentration, study and uninterrupted work.' },
  aurora: { icon:<Sparkles className="w-3 h-3"/>, badge:'Aurora · Ambient · Creative', title:'Aurora With Music', sub:'Light. Flow. Create.', line:'Moving northern lights and ambient music for creative flow.' },
  neon: { icon:<Zap className="w-3 h-3"/>, badge:'Neon · Electronic · Energy', title:'Neon With Music', sub:'Glow. Pulse. Move.', line:'A cinematic night room for upbeat playlists, coding and momentum.' },
  drive: { icon:<CarFront className="w-3 h-3"/>, badge:'Night Drive · Road · Music', title:'Drive With Music', sub:'Road. Lights. Rhythm.', line:'A moving night highway atmosphere for long drives and late-night playlists.' },
  space: { icon:<Orbit className="w-3 h-3"/>, badge:'Space · Ambient · Dream', title:'Space With Music', sub:'Drift. Orbit. Listen.', line:'A weightless cosmic room for ambient music, imagination and deep listening.' },
  study: { icon:<BookOpen className="w-3 h-3"/>, badge:'Study · Focus · Deep Work', title:'Study With Music', sub:'Desk. Focus. Flow.', line:'A warm digital study room for reading, coding and uninterrupted concentration.' },
  train: { icon:<TrainFront className="w-3 h-3"/>, badge:'Journey · Travel · Lo-fi', title:'Journey With Music', sub:'Window. Miles. Music.', line:'A cinematic train-window journey where landscapes drift while your playlist plays.' },
};

interface HeroTitleProps { scene?: SceneMode; isPlaying?: boolean; }

export const HeroTitle: React.FC<HeroTitleProps> = ({ scene='dusk', isPlaying=false }) => {
  const copy=COPY[scene];
  return (
    <div className={'relative text-center select-none pointer-events-none px-4 py-3 sm:py-6 ' + (isPlaying ? 'hero-playing' : '')}>
      <div className="absolute inset-0 -top-10 -bottom-10 blur-3xl pointer-events-none -z-10 opacity-70 hero-glow" />
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[.06] border border-white/15 text-[11px] text-white/80 backdrop-blur-md mb-2 shadow-sm">
        {copy.icon}<span>{copy.badge}</span>
      </div>
      <h1 className="font-extrabold tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,.85)] leading-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl transition-all flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <span className="font-serif italic text-[#ffecd6]">{copy.title}</span>
      </h1>
      <div className="mt-2 flex flex-col items-center gap-1">
        <p className="font-display italic text-base sm:text-xl md:text-2xl text-white/95 drop-shadow-md tracking-wide">"{copy.sub}"</p>
        <p className="text-xs sm:text-sm text-white/70 max-w-lg font-sans tracking-wide">{copy.line}</p>
        <nav aria-label="Explore music topics" className="pointer-events-auto mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
          <a className="text-[#f2b877]/90 hover:text-white underline underline-offset-4" href="/lofi-music/">Lo-fi</a>
          <a className="text-[#f2b877]/90 hover:text-white underline underline-offset-4" href="/study-music/">Study</a>
          <a className="text-[#f2b877]/90 hover:text-white underline underline-offset-4" href="/focus-music/">Focus</a>
          <a className="text-[#f2b877]/90 hover:text-white underline underline-offset-4" href="/relaxing-music/">Relax</a>
          <a className="text-[#f2b877]/90 hover:text-white underline underline-offset-4" href="/indian-ambience/">Indian ambience</a>
        </nav>
      </div>
    </div>
  );
};
