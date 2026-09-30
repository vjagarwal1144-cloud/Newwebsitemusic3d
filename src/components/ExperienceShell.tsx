import React from 'react';

export type SceneMode = 'dusk' | 'monsoon' | 'midnight' | 'pahadi';

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

interface ExperienceShellProps {
  currentScene: SceneMode;
  onSceneChange: (scene: SceneMode) => void;
  children?: React.ReactNode;
}

export const ExperienceShell: React.FC<ExperienceShellProps> = ({
  currentScene,
  children,
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
          backgroundImage: 'url(/background/chaiwala.jpg)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Optional Rain Streaks effect for Monsoon scene */}
      {currentScene === 'monsoon' && (
        <div className="absolute inset-0 pointer-events-none z-[2] opacity-25 overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent animate-pulse" />
        </div>
      )}

      {/* Scrim Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{ background: scene.scrimStyle }}
      />

      {/* Ground Silhouette & Deep Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#0b0705] via-[#0b0705]/80 to-transparent z-[3]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(11,7,5,0.75)_100%)] z-[3]" />

      {/* Shell Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
