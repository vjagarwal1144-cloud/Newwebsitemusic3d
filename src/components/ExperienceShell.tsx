import React from 'react';

export type SceneMode = 'dusk' | 'monsoon' | 'midnight' | 'pahadi' | 'ocean' | 'forest' | 'aurora' | 'neon';

export interface SceneConfig {
  id: SceneMode;
  name: string;
  hindiName: string;
  tagline: string;
  skyGradient: string;
  sunColor: string;
  sunPosition: { bottom: string; left: string; size: string };
  scrimStyle: string;
}

export const SCENES: Record<SceneMode, SceneConfig> = {
  dusk: {
    id: 'dusk',
    name: 'Dusk Tapri',
    hindiName: 'शाम की टपरी',
    tagline: 'Warm sunset glow as the evening chai brews',
    skyGradient: 'linear-gradient(180deg, #131a35 0%, #1c1f42 14%, #3a2354 30%, #6b2c4f 46%, #a63a3f 60%, #d9622f 74%, #7a2a1c 88%, #0b0705 100%)',
    sunColor: 'radial-gradient(circle, rgba(255, 186, 120, 0.85) 0%, rgba(255, 140, 80, 0.35) 45%, rgba(0, 0, 0, 0) 75%)',
    sunPosition: { bottom: '22%', left: '26%', size: 'min(38vw, 420px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(11, 7, 5, 0.5) 0%, rgba(11, 7, 5, 0.18) 26%, rgba(11, 7, 5, 0.32) 62%, rgba(11, 7, 5, 0.85) 100%)',
  },
  monsoon: {
    id: 'monsoon',
    name: 'Monsoon Dhaba',
    hindiName: 'बारिश और चाय',
    tagline: 'Rain hammering the tin roof, piping hot kadak cup',
    skyGradient: 'linear-gradient(180deg, #050b14 0%, #0d1b2a 20%, #1b263b 45%, #2a3d54 65%, #182836 85%, #080f14 100%)',
    sunColor: 'radial-gradient(circle, rgba(242, 184, 119, 0.5) 0%, rgba(140, 180, 210, 0.2) 45%, rgba(0, 0, 0, 0) 75%)',
    sunPosition: { bottom: '28%', left: '30%', size: 'min(32vw, 360px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(5, 11, 20, 0.6) 0%, rgba(5, 11, 20, 0.25) 30%, rgba(5, 11, 20, 0.4) 65%, rgba(5, 11, 20, 0.88) 100%)',
  },
  midnight: {
    id: 'midnight',
    name: 'Old Delhi Midnight',
    hindiName: 'आधी रात की चाय',
    tagline: 'Silent streets, glowing charcoal coals & nocturnal peace',
    skyGradient: 'linear-gradient(180deg, #040203 0%, #0c0809 25%, #190f0f 50%, #2b130e 75%, #100604 100%)',
    sunColor: 'radial-gradient(circle, rgba(255, 150, 70, 0.65) 0%, rgba(200, 80, 30, 0.25) 50%, rgba(0, 0, 0, 0) 80%)',
    sunPosition: { bottom: '18%', left: '22%', size: 'min(30vw, 320px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(4, 2, 3, 0.65) 0%, rgba(4, 2, 3, 0.25) 25%, rgba(4, 2, 3, 0.45) 60%, rgba(4, 2, 3, 0.92) 100%)',
  },
  pahadi: {
    id: 'pahadi',
    name: 'Pahadi Sunrise',
    hindiName: 'पहाड़ी सुबह',
    tagline: 'Crisp mountain mist, pine aroma & morning ginger tea',
    skyGradient: 'linear-gradient(180deg, #120e24 0%, #291e3e 20%, #522d4f 42%, #8e4450 62%, #d67145 80%, #150a08 100%)',
    sunColor: 'radial-gradient(circle, rgba(255, 205, 130, 0.9) 0%, rgba(245, 130, 70, 0.4) 45%, rgba(0, 0, 0, 0) 75%)',
    sunPosition: { bottom: '24%', left: '35%', size: 'min(36vw, 400px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(14, 8, 12, 0.45) 0%, rgba(14, 8, 12, 0.15) 30%, rgba(14, 8, 12, 0.3) 65%, rgba(14, 8, 12, 0.82) 100%)',
  },
};

  ocean: {
    id: 'ocean', name: 'Ocean Drift', hindiName: 'समंदर की शांति',
    tagline: 'Slow waves, soft light and deep listening',
    skyGradient: 'linear-gradient(180deg, #06141c 0%, #0a2632 35%, #0b4a58 65%, #03161c 100%)',
    sunColor: 'radial-gradient(circle, rgba(102, 226, 220, 0.45) 0%, rgba(40, 170, 190, 0.18) 45%, transparent 75%)',
    sunPosition: { bottom: '30%', left: '62%', size: 'min(40vw, 460px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(2,12,18,.45), rgba(2,12,18,.1) 45%, rgba(2,12,18,.88))',
  },
  forest: {
    id: 'forest', name: 'Forest Focus', hindiName: 'जंगल की शांति',
    tagline: 'Deep green stillness for reading and concentration',
    skyGradient: 'linear-gradient(180deg, #07120d 0%, #0d2b1b 38%, #17452a 68%, #040b08 100%)',
    sunColor: 'radial-gradient(circle, rgba(157, 210, 139, 0.4) 0%, rgba(80, 150, 95, .16) 45%, transparent 75%)',
    sunPosition: { bottom: '35%', left: '25%', size: 'min(36vw, 420px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(3,12,7,.5), rgba(3,12,7,.08) 45%, rgba(3,12,7,.9))',
  },
  aurora: {
    id: 'aurora', name: 'Aurora Dream', hindiName: 'ऑरोरा',
    tagline: 'Moving light for creative flow and late-night listening',
    skyGradient: 'linear-gradient(135deg, #080617 0%, #14234a 40%, #173f45 67%, #070914 100%)',
    sunColor: 'radial-gradient(circle, rgba(91, 227, 196, .35) 0%, rgba(111, 111, 255, .2) 42%, transparent 75%)',
    sunPosition: { bottom: '40%', left: '50%', size: 'min(48vw, 520px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(4,5,18,.35), rgba(4,5,18,.12) 45%, rgba(4,5,18,.88))',
  },
  neon: {
    id: 'neon', name: 'Neon Night', hindiName: 'नियॉन नाइट',
    tagline: 'A cinematic night mode for electronic and upbeat playlists',
    skyGradient: 'linear-gradient(135deg, #090414 0%, #24103d 45%, #35122d 70%, #07030b 100%)',
    sunColor: 'radial-gradient(circle, rgba(236, 92, 190, .42) 0%, rgba(88, 94, 255, .2) 48%, transparent 75%)',
    sunPosition: { bottom: '25%', left: '70%', size: 'min(38vw, 430px)' },
    scrimStyle: 'linear-gradient(180deg, rgba(6,3,13,.5), rgba(6,3,13,.12) 42%, rgba(6,3,13,.92))',
  },
};

interface ExperienceShellProps {
  currentScene: SceneMode;
  onSceneChange: (scene: SceneMode) => void;
  children?: React.ReactNode;
  isPlaying?: boolean;
}

export const ExperienceShell: React.FC<ExperienceShellProps> = ({
  currentScene,
  children,
  isPlaying = false,
}) => {
  const scene = SCENES[currentScene] || SCENES.dusk;

  return (
    <div className="fixed inset-0 overflow-hidden select-none bg-[#0b0705]">
      {/* Sky Gradient Layer */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{ background: scene.skyGradient }}
      />

      {/* Atmospheric Blurred Glowing Sun */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          width: scene.sunPosition.size,
          height: scene.sunPosition.size,
          bottom: scene.sunPosition.bottom,
          left: scene.sunPosition.left,
          background: scene.sunColor,
          filter: 'blur(45px)',
          opacity: 0.9,
        }}
      />

      {/* Chaiwala Authentic Photographic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out opacity-85"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}background/chaiwala.jpg)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Optional Rain Streaks effect for Monsoon scene */}
      {currentScene === 'monsoon' && (
        <div className="absolute inset-0 pointer-events-none z-[2] opacity-25 overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent animate-pulse" />
        </div>
      )}

      {/* Living atmosphere: slow parallax light ribbons react visually to music playback */}
      <div className={`absolute inset-[-15%] pointer-events-none z-[2] transition-opacity duration-700 ${isPlaying ? 'opacity-70 animate-[atmosphere-drift_18s_ease-in-out_infinite]' : 'opacity-30'}`}>
        <div className="absolute w-[55vw] h-[20vw] rounded-full bg-white/[0.035] blur-3xl -rotate-12 left-[8%] top-[24%]" />
        <div className="absolute w-[45vw] h-[18vw] rounded-full bg-white/[0.025] blur-3xl rotate-12 right-[2%] top-[48%]" />
      </div>

      {/* Song-playing visualizer field */}
      <div className={`absolute inset-x-0 bottom-[14%] h-28 pointer-events-none z-[4] flex items-end justify-center gap-[3px] transition-opacity duration-500 ${isPlaying ? 'opacity-45' : 'opacity-0'}`} aria-hidden="true">
        {Array.from({ length: 48 }, (_, i) => <span key={i} className="w-[2px] rounded-full bg-white/70 animate-[music-pulse_1.1s_ease-in-out_infinite]" style={{ height: `${10 + ((i * 17) % 42)}px`, animationDelay: `${(i % 9) * -0.12}s` }} />)}
      </div>

      {/* Scrim Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{ background: scene.scrimStyle }}
      />

      {/* Ground Silhouette & Deep Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#0b0705] via-[#0b0705]/80 to-transparent z-[3]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(11,7,5,0.75)_100%)] z-[3]" />

      {/* Theme selector — Chai is optional, not the identity of the whole experience */}
      <div className="absolute z-20 top-16 left-3 sm:left-6 flex gap-1.5 overflow-x-auto max-w-[calc(100vw-24px)] pb-1 pointer-events-auto">
        {(Object.values(SCENES) as SceneConfig[]).map(s => (
          <button key={s.id} type="button" title={s.tagline} onClick={() => onSceneChange(s.id)} className={`shrink-0 px-2.5 py-1.5 rounded-full text-[9px] uppercase tracking-wider border backdrop-blur-xl transition-all ${currentScene === s.id ? 'bg-white/15 border-white/30 text-white scale-105' : 'bg-black/20 border-white/10 text-white/55 hover:text-white hover:bg-white/10'}`}>{s.name}</button>
        ))}
      </div>

      {/* Shell Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
