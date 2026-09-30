export type UniverseId = 'tapri' | 'tokyo' | 'bistro' | 'nordic' | 'orbit' | 'study';

export interface UniverseConfig {
  id: UniverseId;
  name: string;
  nativeName: string;
  tagline: string;
  subtext: string;
  location: string;
  badge: string;
  ritual: {
    label: string;
    sublabel: string;
    actionText: string;
    pouringText: string;
    beverageName: string;
  };
  theme: {
    accentColor: string;
    accentSoft: string;
    glowColor: string;
    skyGradient: string;
    sunColor: string;
    sunPosition: { bottom: string; left: string; size: string };
    scrimStyle: string;
    particleType: 'steam' | 'rain' | 'embers' | 'stars' | 'study';
    backgroundImage: string;
  };
  defaultStationId: string;
  ambientPreset: {
    chaiSimmer: number;
    monsoonRain: number;
    fireplaceCrackle: number;
    cafeMurmur: number;
    nightCrickets: number;
    cosmicDrone: number;
    binauralAlpha: number;
    kettleWhistle: number;
  };
}

export const UNIVERSES: Record<UniverseId, UniverseConfig> = {
  tapri: {
    id: 'tapri',
    name: 'Chaiwala Tapri',
    nativeName: 'चाय वाला',
    tagline: 'Steam. Stillness. Chai.',
    subtext: 'The iconic Indian roadside tea stall for focus, calmness, and mindful sips.',
    location: 'Old Delhi & Mumbai Tapris',
    badge: '🫖 Tapri Sanctum',
    ritual: {
      label: 'चाय की भाप',
      sublabel: 'tap for a pour',
      actionText: 'Pour Hot Masala Chai',
      pouringText: 'pouring chai…',
      beverageName: 'Kadak Masala Chai',
    },
    theme: {
      accentColor: '#e8934a',
      accentSoft: '#f2b877',
      glowColor: 'rgba(232, 147, 74, 0.4)',
      skyGradient:
        'linear-gradient(180deg, #131a35 0%, #1c1f42 14%, #3a2354 30%, #6b2c4f 46%, #a63a3f 60%, #d9622f 74%, #7a2a1c 88%, #0b0705 100%)',
      sunColor:
        'radial-gradient(circle, rgba(255, 186, 120, 0.85) 0%, rgba(255, 140, 80, 0.35) 45%, rgba(0, 0, 0, 0) 75%)',
      sunPosition: { bottom: '22%', left: '26%', size: 'min(38vw, 420px)' },
      scrimStyle:
        'linear-gradient(180deg, rgba(11, 7, 5, 0.5) 0%, rgba(11, 7, 5, 0.18) 26%, rgba(11, 7, 5, 0.32) 62%, rgba(11, 7, 5, 0.85) 100%)',
      particleType: 'steam',
      backgroundImage: './background/chaiwala.jpg',
    },
    defaultStationId: 'PLSW-rtFaY_80',
    ambientPreset: {
      chaiSimmer: 0.7,
      monsoonRain: 0.35,
      fireplaceCrackle: 0.05,
      cafeMurmur: 0.15,
      nightCrickets: 0.15,
      cosmicDrone: 0.0,
      binauralAlpha: 0.2,
      kettleWhistle: 0.25,
    },
  },

  tokyo: {
    id: 'tokyo',
    name: 'Tokyo Kissaten',
    nativeName: '珈琲時間',
    tagline: 'Rain. Neon. Pour-Over.',
    subtext: 'A quiet vinyl listening bar nestled in a damp, glowing Shinjuku alleyway.',
    location: 'Shinjuku Omoide Yokocho, Tokyo',
    badge: '🌧️ Tokyo Kissaten',
    ritual: {
      label: '珈琲の香り',
      sublabel: 'drip pour-over',
      actionText: 'Drip Single-Origin Coffee',
      pouringText: 'slow dripping…',
      beverageName: 'Hand-Drip Nel Coffee',
    },
    theme: {
      accentColor: '#38bdf8',
      accentSoft: '#7dd3fc',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      skyGradient:
        'linear-gradient(180deg, #050b18 0%, #0d1e38 20%, #152b4a 40%, #18223d 60%, #101626 80%, #070913 100%)',
      sunColor:
        'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(147, 51, 234, 0.3) 45%, rgba(0, 0, 0, 0) 75%)',
      sunPosition: { bottom: '26%', left: '32%', size: 'min(34vw, 380px)' },
      scrimStyle:
        'linear-gradient(180deg, rgba(7, 9, 19, 0.6) 0%, rgba(7, 9, 19, 0.25) 30%, rgba(7, 9, 19, 0.45) 65%, rgba(7, 9, 19, 0.9) 100%)',
      particleType: 'rain',
      backgroundImage: './background/chaiwala.jpg',
    },
    defaultStationId: 'PLozpXmA4eZ6F_384L0b6c6bS-uL-X4p2s',
    ambientPreset: {
      chaiSimmer: 0.2,
      monsoonRain: 0.75,
      fireplaceCrackle: 0.0,
      cafeMurmur: 0.35,
      nightCrickets: 0.05,
      cosmicDrone: 0.1,
      binauralAlpha: 0.3,
      kettleWhistle: 0.1,
    },
  },

  bistro: {
    id: 'bistro',
    name: 'Parisian Bistro',
    nativeName: 'Café Flâneur',
    tagline: 'Accordion. Dusk. Espresso.',
    subtext: 'A vintage zinc counter cafe spilling onto Montmartre cobblestone alleys.',
    location: 'Montmartre, Paris',
    badge: '🥐 Paris Bistro',
    ritual: {
      label: 'Café au Lait',
      sublabel: 'pull espresso',
      actionText: 'Extract Steaming Espresso',
      pouringText: 'pulling shot…',
      beverageName: 'Velvet Cortado & Croissant',
    },
    theme: {
      accentColor: '#fbbf24',
      accentSoft: '#fde68a',
      glowColor: 'rgba(251, 191, 36, 0.35)',
      skyGradient:
        'linear-gradient(180deg, #1f1124 0%, #361730 22%, #57203b 45%, #7e2d3e 68%, #471723 88%, #0d070b 100%)',
      sunColor:
        'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(244, 63, 94, 0.3) 50%, rgba(0, 0, 0, 0) 78%)',
      sunPosition: { bottom: '20%', left: '28%', size: 'min(36vw, 390px)' },
      scrimStyle:
        'linear-gradient(180deg, rgba(13, 7, 11, 0.55) 0%, rgba(13, 7, 11, 0.2) 28%, rgba(13, 7, 11, 0.38) 60%, rgba(13, 7, 11, 0.88) 100%)',
      particleType: 'steam',
      backgroundImage: './background/chaiwala.jpg',
    },
    defaultStationId: 'PL4QNnZJr8sRNK43pnJ1y1Ww1m3_S9j88_',
    ambientPreset: {
      chaiSimmer: 0.15,
      monsoonRain: 0.2,
      fireplaceCrackle: 0.1,
      cafeMurmur: 0.6,
      nightCrickets: 0.05,
      cosmicDrone: 0.0,
      binauralAlpha: 0.2,
      kettleWhistle: 0.2,
    },
  },

  nordic: {
    id: 'nordic',
    name: 'Nordic Hearth',
    nativeName: 'Koselig Peis',
    tagline: 'Hearth. Embers. Pine.',
    subtext: 'A warm timber sanctuary overlooking a snowy Scandinavian mountain fjord.',
    location: 'Lofoten Fjord Cabin, Norway',
    badge: '🪵 Nordic Hearth',
    ritual: {
      label: 'Peisvarme',
      sublabel: 'stoke fire',
      actionText: 'Stoke Hearth & Cocoa',
      pouringText: 'stirring cocoa…',
      beverageName: 'Viennese Spiced Hot Cocoa',
    },
    theme: {
      accentColor: '#fb923c',
      accentSoft: '#fdba74',
      glowColor: 'rgba(251, 146, 60, 0.4)',
      skyGradient:
        'linear-gradient(180deg, #07101c 0%, #0d1f35 22%, #142a42 45%, #2a303c 68%, #1f1b1a 88%, #0b0806 100%)',
      sunColor:
        'radial-gradient(circle, rgba(251, 146, 60, 0.9) 0%, rgba(220, 38, 38, 0.35) 45%, rgba(0, 0, 0, 0) 75%)',
      sunPosition: { bottom: '16%', left: '22%', size: 'min(38vw, 410px)' },
      scrimStyle:
        'linear-gradient(180deg, rgba(11, 8, 6, 0.6) 0%, rgba(11, 8, 6, 0.25) 28%, rgba(11, 8, 6, 0.42) 62%, rgba(11, 8, 6, 0.9) 100%)',
      particleType: 'embers',
      backgroundImage: './background/chaiwala.jpg',
    },
    defaultStationId: 'PLofht4PTcKYnaH8w5gkEB2464cub254EE',
    ambientPreset: {
      chaiSimmer: 0.1,
      monsoonRain: 0.1,
      fireplaceCrackle: 0.8,
      cafeMurmur: 0.05,
      nightCrickets: 0.2,
      cosmicDrone: 0.1,
      binauralAlpha: 0.25,
      kettleWhistle: 0.1,
    },
  },

  orbit: {
    id: 'orbit',
    name: 'Celestial Orbit',
    nativeName: 'Orbital Chill',
    tagline: 'Zero Gravity. Solitude. Stars.',
    subtext: 'A panoramic deep-space glass dome gazing over the curved sapphire horizon of Earth.',
    location: 'Low Earth Orbit Station · 400km',
    badge: '🌌 Celestial Orbit',
    ritual: {
      label: 'Cosmic Breath',
      sublabel: 'resonate chime',
      actionText: 'Resonate Crystal Sound',
      pouringText: 'expanding starlight…',
      beverageName: 'Starlight Herbal Infusion',
    },
    theme: {
      accentColor: '#a78bfa',
      accentSoft: '#c4b5fd',
      glowColor: 'rgba(167, 139, 250, 0.4)',
      skyGradient:
        'linear-gradient(180deg, #020208 0%, #060515 20%, #100b2e 45%, #1d134a 65%, #0e1e3b 85%, #020208 100%)',
      sunColor:
        'radial-gradient(circle, rgba(167, 139, 250, 0.7) 0%, rgba(45, 212, 191, 0.25) 45%, rgba(0, 0, 0, 0) 78%)',
      sunPosition: { bottom: '30%', left: '35%', size: 'min(32vw, 360px)' },
      scrimStyle:
        'linear-gradient(180deg, rgba(2, 2, 8, 0.65) 0%, rgba(2, 2, 8, 0.2) 25%, rgba(2, 2, 8, 0.35) 60%, rgba(2, 2, 8, 0.92) 100%)',
      particleType: 'stars',
      backgroundImage: './background/chaiwala.jpg',
    },
    defaultStationId: 'PLOzDu-MXXL3g_u9lS7GzTzHjF_7rZ1W2k',
    ambientPreset: {
      chaiSimmer: 0.0,
      monsoonRain: 0.0,
      fireplaceCrackle: 0.0,
      cafeMurmur: 0.0,
      nightCrickets: 0.0,
      cosmicDrone: 0.75,
      binauralAlpha: 0.5,
      kettleWhistle: 0.0,
    },
  },

  study: {
    id: 'study',
    name: 'Study Bedroom',
    nativeName: 'Study Sanctum',
    tagline: 'Focus. Warm Light. Lo-Fi.',
    subtext: 'A rainy window desk with cozy wooden shelves, amber lamp, and notebooks.',
    location: 'Late Night Desk Anywhere in the World',
    badge: '🎧 Study Sanctum',
    ritual: {
      label: 'Fresh Brew',
      sublabel: 'warm mug & page',
      actionText: 'Pour Study Brew',
      pouringText: 'brewing focus…',
      beverageName: 'Fresh Brewed Roast',
    },
    theme: {
      accentColor: '#c084fc',
      accentSoft: '#e9d5ff',
      glowColor: 'rgba(192, 132, 252, 0.35)',
      skyGradient:
        'linear-gradient(180deg, #0b0716 0%, #150f28 25%, #24143a 50%, #3a1a36 75%, #0f0714 100%)',
      sunColor:
        'radial-gradient(circle, rgba(250, 204, 21, 0.7) 0%, rgba(236, 72, 153, 0.25) 45%, rgba(0, 0, 0, 0) 75%)',
      sunPosition: { bottom: '24%', left: '30%', size: 'min(35vw, 380px)' },
      scrimStyle:
        'linear-gradient(180deg, rgba(15, 7, 20, 0.6) 0%, rgba(15, 7, 20, 0.22) 28%, rgba(15, 7, 20, 0.4) 62%, rgba(15, 7, 20, 0.9) 100%)',
      particleType: 'study',
      backgroundImage: './background/chaiwala.jpg',
    },
    defaultStationId: 'PL6NdkXsTS0hEc_gYwCWfZL5rQ8nUqN48Q',
    ambientPreset: {
      chaiSimmer: 0.3,
      monsoonRain: 0.5,
      fireplaceCrackle: 0.2,
      cafeMurmur: 0.1,
      nightCrickets: 0.25,
      cosmicDrone: 0.15,
      binauralAlpha: 0.4,
      kettleWhistle: 0.15,
    },
  },
};
