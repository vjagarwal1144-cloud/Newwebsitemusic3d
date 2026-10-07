import React from 'react';
import { AmbientEffects } from './AmbientEffects';

export type SceneMode = 'dusk' | 'monsoon' | 'midnight' | 'pahadi' | 'ocean' | 'forest' | 'aurora' | 'neon' | 'drive' | 'space' | 'study' | 'train';

export interface SceneConfig {
  id: SceneMode; name: string; hindiName: string; tagline: string;
  skyGradient: string; sunColor: string;
  sunPosition: { bottom: string; left: string; size: string };
  scrimStyle: string;
}

export const SCENES: Record<SceneMode, SceneConfig> = {
  dusk: {
    id: 'dusk', name: 'Dusk Tapri', hindiName: 'शाम की टपरी',
    tagline: 'Warm sunset glow as the evening chai brews',
    skyGradient: 'linear-gradient(180deg,#131a35 0%,#1c1f42 14%,#3a2354 30%,#6b2c4f 46%,#a63a3f 60%,#d9622f 74%,#7a2a1c 88%,#0b0705 100%)',
    sunColor: 'radial-gradient(circle,rgba(255,186,120,.85),rgba(255,140,80,.35) 45%,transparent 75%)',
    sunPosition: { bottom: '22%', left: '26%', size: 'min(38vw,420px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(11,7,5,.5),rgba(11,7,5,.18) 26%,rgba(11,7,5,.32) 62%,rgba(11,7,5,.85))',
  },
  monsoon: {
    id: 'monsoon', name: 'Monsoon Dhaba', hindiName: 'बारिश और चाय',
    tagline: 'Rain hammering the tin roof, piping hot kadak cup',
    skyGradient: 'linear-gradient(180deg,#050b14,#0d1b2a 20%,#1b263b 45%,#2a3d54 65%,#182836 85%,#080f14)',
    sunColor: 'radial-gradient(circle,rgba(242,184,119,.5),rgba(140,180,210,.2) 45%,transparent 75%)',
    sunPosition: { bottom: '28%', left: '30%', size: 'min(32vw,360px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(5,11,20,.6),rgba(5,11,20,.25) 30%,rgba(5,11,20,.4) 65%,rgba(5,11,20,.88))',
  },
  midnight: {
    id: 'midnight', name: 'Old Delhi Midnight', hindiName: 'आधी रात की चाय',
    tagline: 'Silent streets, glowing charcoal coals & nocturnal peace',
    skyGradient: 'linear-gradient(180deg,#040203,#0c0809 25%,#190f0f 50%,#2b130e 75%,#100604)',
    sunColor: 'radial-gradient(circle,rgba(255,150,70,.65),rgba(200,80,30,.25) 50%,transparent 80%)',
    sunPosition: { bottom: '18%', left: '22%', size: 'min(30vw,320px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(4,2,3,.65),rgba(4,2,3,.25) 25%,rgba(4,2,3,.45) 60%,rgba(4,2,3,.92))',
  },
  pahadi: {
    id: 'pahadi', name: 'Pahadi Sunrise', hindiName: 'पहाड़ी सुबह',
    tagline: 'Crisp mountain mist, pine aroma & morning ginger tea',
    skyGradient: 'linear-gradient(180deg,#120e24,#291e3e 20%,#522d4f 42%,#8e4450 62%,#d67145 80%,#150a08)',
    sunColor: 'radial-gradient(circle,rgba(255,205,130,.9),rgba(245,130,70,.4) 45%,transparent 75%)',
    sunPosition: { bottom: '24%', left: '35%', size: 'min(36vw,400px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(14,8,12,.45),rgba(14,8,12,.15) 30%,rgba(14,8,12,.3) 65%,rgba(14,8,12,.82))',
  },
  ocean: {
    id: 'ocean', name: 'Ocean Drift', hindiName: 'समंदर की शांति',
    tagline: 'Slow waves, soft light and deep listening',
    skyGradient: 'linear-gradient(180deg,#06141c,#0a2632 35%,#0b4a58 65%,#03161c)',
    sunColor: 'radial-gradient(circle,rgba(102,226,220,.45),rgba(40,170,190,.18) 45%,transparent 75%)',
    sunPosition: { bottom: '30%', left: '62%', size: 'min(40vw,460px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(2,12,18,.45),rgba(2,12,18,.1) 45%,rgba(2,12,18,.88))',
  },
  forest: {
    id: 'forest', name: 'Forest Focus', hindiName: 'जंगल की शांति',
    tagline: 'Deep green stillness for reading and concentration',
    skyGradient: 'linear-gradient(180deg,#07120d,#0d2b1b 38%,#17452a 68%,#040b08)',
    sunColor: 'radial-gradient(circle,rgba(157,210,139,.4),rgba(80,150,95,.16) 45%,transparent 75%)',
    sunPosition: { bottom: '35%', left: '25%', size: 'min(36vw,420px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(3,12,7,.5),rgba(3,12,7,.08) 45%,rgba(3,12,7,.9))',
  },
  aurora: {
    id: 'aurora', name: 'Aurora Dream', hindiName: 'ऑरोरा',
    tagline: 'Moving light for creative flow and late-night listening',
    skyGradient: 'linear-gradient(135deg,#080617,#14234a 40%,#173f45 67%,#070914)',
    sunColor: 'radial-gradient(circle,rgba(91,227,196,.35),rgba(111,111,255,.2) 42%,transparent 75%)',
    sunPosition: { bottom: '40%', left: '50%', size: 'min(48vw,520px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(4,5,18,.35),rgba(4,5,18,.12) 45%,rgba(4,5,18,.88))',
  },
  neon: {
    id: 'neon', name: 'Neon Night', hindiName: 'नियॉन नाइट',
    tagline: 'A cinematic night mode for electronic and upbeat playlists',
    skyGradient: 'linear-gradient(135deg,#090414,#24103d 45%,#35122d 70%,#07030b)',
    sunColor: 'radial-gradient(circle,rgba(236,92,190,.42),rgba(88,94,255,.2) 48%,transparent 75%)',
    sunPosition: { bottom: '25%', left: '70%', size: 'min(38vw,430px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(6,3,13,.5),rgba(6,3,13,.12) 42%,rgba(6,3,13,.92))',
  },

  drive: {
    id: 'drive', name: 'Night Drive', hindiName: 'रात की ड्राइव',
    tagline: 'Open highway, dashboard glow and music after dark',
    skyGradient: 'linear-gradient(180deg,#02040b 0%,#081226 38%,#151b2f 62%,#080b12 100%)',
    sunColor: 'radial-gradient(circle,rgba(94,150,255,.35),rgba(60,90,190,.12) 45%,transparent 75%)',
    sunPosition: { bottom: '42%', left: '70%', size: 'min(42vw,480px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(2,4,11,.38),rgba(2,4,11,.05) 42%,rgba(2,4,11,.88))',
  },
  space: {
    id: 'space', name: 'Deep Space', hindiName: 'अंतरिक्ष',
    tagline: 'Nebula light, distant stars and endless listening',
    skyGradient: 'radial-gradient(circle at 55% 35%,#26345f 0%,#111630 32%,#050713 72%,#010207 100%)',
    sunColor: 'radial-gradient(circle,rgba(150,120,255,.35),rgba(70,180,255,.12) 48%,transparent 78%)',
    sunPosition: { bottom: '38%', left: '48%', size: 'min(50vw,560px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(1,2,8,.18),rgba(1,2,8,.05) 48%,rgba(1,2,8,.9))',
  },
  study: {
    id: 'study', name: 'Study Room', hindiName: 'स्टडी रूम',
    tagline: 'A quiet desk, warm lamp and deep-focus atmosphere',
    skyGradient: 'linear-gradient(180deg,#18151a 0%,#302620 42%,#4a3425 70%,#100b09 100%)',
    sunColor: 'radial-gradient(circle,rgba(255,197,112,.5),rgba(235,140,65,.12) 48%,transparent 75%)',
    sunPosition: { bottom: '42%', left: '72%', size: 'min(40vw,460px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(16,11,10,.3),rgba(16,11,10,.05) 45%,rgba(16,11,10,.9))',
  },
  train: {
    id: 'train', name: 'Train Journey', hindiName: 'सफ़र',
    tagline: 'Window-side music with landscapes flowing past',
    skyGradient: 'linear-gradient(180deg,#111b32 0%,#38516d 40%,#c47b55 66%,#15100e 100%)',
    sunColor: 'radial-gradient(circle,rgba(255,205,140,.7),rgba(240,130,75,.18) 48%,transparent 75%)',
    sunPosition: { bottom: '35%', left: '22%', size: 'min(38vw,430px)' },
    scrimStyle: 'linear-gradient(180deg,rgba(8,12,24,.35),rgba(8,12,24,.08) 42%,rgba(8,12,24,.9))',
  },
};

interface ExperienceShellProps {
  currentScene: SceneMode;
  onSceneChange: (scene: SceneMode) => void;
  children?: React.ReactNode;
  isPlaying?: boolean;
  animationIntensity?: 'full' | 'calm' | 'off';
}

export const ExperienceShell: React.FC<ExperienceShellProps> = ({
  currentScene, onSceneChange, children, isPlaying = false, animationIntensity = 'full',
}) => {
  const scene = SCENES[currentScene] || SCENES.dusk;

  return (
    <div className="fixed inset-0 overflow-hidden select-none bg-[#0b0705]">
      <div className="absolute inset-0 transition-all duration-1000 ease-out" style={{ background: scene.skyGradient }} />
      <div className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-out" style={{
        width: scene.sunPosition.size, height: scene.sunPosition.size,
        bottom: scene.sunPosition.bottom, left: scene.sunPosition.left,
        background: scene.sunColor, filter: 'blur(45px)', opacity: isPlaying ? .95 : .72,
      }} />
      <div className={"world-background world-" + currentScene} aria-hidden="true">
        <div className="world-sky" />
        <div className="world-mountains" />
        <div className="world-clouds" />
        <div className="world-road" />
        <div className="world-road-lights" />
        <div className="world-stars" />
        <div className="world-window" />
        <div className="world-desk" />
        <div className="world-glow" />
      </div>

      <AmbientEffects scene={currentScene} isPlaying={isPlaying} intensity={animationIntensity} />

      <div className={'absolute inset-[-15%] pointer-events-none z-[3] transition-opacity duration-700 ' + (isPlaying ? 'opacity-70 animate-[atmosphere-drift_18s_ease-in-out_infinite]' : 'opacity-25')}>
        <div className="absolute w-[55vw] h-[20vw] rounded-full bg-white/[0.035] blur-3xl -rotate-12 left-[8%] top-[24%]" />
        <div className="absolute w-[45vw] h-[18vw] rounded-full bg-white/[0.025] blur-3xl rotate-12 right-[2%] top-[48%]" />
      </div>

      <div className={'absolute inset-x-0 bottom-[14%] h-28 pointer-events-none z-[4] flex items-end justify-center gap-[3px] transition-opacity duration-500 ' + (isPlaying && animationIntensity !== 'off' ? 'opacity-45' : 'opacity-0')} aria-hidden="true">
        {Array.from({ length: 48 }, (_, i) => (
          <span key={i} className="w-[2px] rounded-full bg-white/70 animate-[music-pulse_1.1s_ease-in-out_infinite]"
            style={{ height: (10 + ((i * 17) % 42)) + 'px', animationDelay: ((i % 9) * -.12) + 's' }} />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out" style={{ background: scene.scrimStyle }} />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#0b0705] via-[#0b0705]/80 to-transparent z-[5]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(11,7,5,0.75)_100%)] z-[5]" />

      <div className="absolute z-20 top-16 left-3 sm:left-6 right-3 flex gap-2 overflow-x-auto pb-2 pointer-events-auto no-scrollbar world-selector">
        {(Object.values(SCENES) as SceneConfig[]).map(s => (
          <button key={s.id} type="button" title={s.tagline} onClick={() => onSceneChange(s.id)}
            className={'world-chip shrink-0 px-3 py-2 rounded-2xl text-[10px] font-medium tracking-wide border backdrop-blur-2xl transition-all ' +
              (currentScene === s.id ? 'world-chip-active text-white scale-[1.04]' : 'text-white/65 hover:text-white')}>
            <span className="block text-[13px]">{({dusk:'☕',monsoon:'🌧️',midnight:'🌙',pahadi:'🏔️',ocean:'🌊',forest:'🌲',aurora:'🌌',neon:'💜',drive:'🚗',space:'🪐',study:'📚',train:'🚆'} as Record<SceneMode,string>)[s.id]}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between">{children}</div>
    </div>
  );
};
