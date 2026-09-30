export type ThemeId = 'cardrive' | 'study' | 'cafe' | 'train' | 'campfire' | 'tapri';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  category: string;
  tagline: string;
  description: string;
  vibe: string;
  icon: string;
  accentColor: string;
  accentSoft: string;
  glowColor: string;
  bgGradient: string;
  defaultStationId: string;
  stationName: string;
  interactiveControl: {
    label: string;
    sublabel: string;
    actionType: 'wipers' | 'keyclick' | 'coffeepour' | 'trainwhistle' | 'stokefire' | 'chaipour';
  };
  ambientMixer: {
    rain: number;
    engine: number;
    trainTracks: number;
    fire: number;
    keyboard: number;
    cafeChatter: number;
    chaiSimmer: number;
    binauralAlpha: number;
  };
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  cardrive: {
    id: 'cardrive',
    name: 'Night Highway Drive',
    category: 'Motion & Cruise',
    tagline: 'Infinite asphalt, neon streetlights & midnight synthwave.',
    description: 'Cruise down an empty rainy expressway at 2 AM with headlights illuminating the dark road.',
    vibe: 'Neon Cruise · 85 km/h',
    icon: '🚗',
    accentColor: '#38bdf8',
    accentSoft: '#7dd3fc',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    bgGradient: 'linear-gradient(180deg, #030712 0%, #081026 35%, #0d1530 65%, #020617 100%)',
    defaultStationId: 'PLw-VjHDlEOgs658kAcoAEverInBS66487',
    stationName: 'Midnight Drive & Synthwave',
    interactiveControl: {
      label: 'WINDSHIELD WIPERS',
      sublabel: 'tap to wipe rain',
      actionType: 'wipers',
    },
    ambientMixer: {
      rain: 0.65,
      engine: 0.55,
      trainTracks: 0.0,
      fire: 0.0,
      keyboard: 0.0,
      cafeChatter: 0.0,
      chaiSimmer: 0.0,
      binauralAlpha: 0.25,
    },
  },

  study: {
    id: 'study',
    name: 'Deep Study & Code',
    category: 'Productivity & Flow',
    tagline: 'Warm desk lamp, rainy window & mechanical key clicks.',
    description: 'A quiet late-night study desk with textbook pages, warm tea mug, and deep focus flow.',
    vibe: 'Deep Work · 25m Focus',
    icon: '📚',
    accentColor: '#a855f7',
    accentSoft: '#c084fc',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    bgGradient: 'linear-gradient(180deg, #090514 0%, #170d2c 35%, #22123b 65%, #07030e 100%)',
    defaultStationId: 'PL6NdkXsTS0hEc_gYwCWfZL5rQ8nUqN48Q',
    stationName: 'Lofi Study & Coding Chill',
    interactiveControl: {
      label: 'MECHANICAL CLICK',
      sublabel: 'press any key or tap',
      actionType: 'keyclick',
    },
    ambientMixer: {
      rain: 0.5,
      engine: 0.0,
      trainTracks: 0.0,
      fire: 0.0,
      keyboard: 0.45,
      cafeChatter: 0.1,
      chaiSimmer: 0.2,
      binauralAlpha: 0.6,
    },
  },

  cafe: {
    id: 'cafe',
    name: 'Cozy Rain Cafe',
    category: 'Social & Relaxation',
    tagline: 'Porcelain clatter, steamed milk & soft jazz hop.',
    description: 'A warm wooden coffee shop with rainy windowpanes, fairy lights, and freshly pulled espresso.',
    vibe: 'Warm Roast & Soft Jazz',
    icon: '☕',
    accentColor: '#fbbf24',
    accentSoft: '#fde68a',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    bgGradient: 'linear-gradient(180deg, #180d09 0%, #29150e 35%, #3d1e13 65%, #0f0704 100%)',
    defaultStationId: 'PL4QNnZJr8sRNK43pnJ1y1Ww1m3_S9j88_',
    stationName: 'Parisian & Tokyo Cafe Jazz',
    interactiveControl: {
      label: 'POUR ESPRESSO',
      sublabel: 'tap to brew cup',
      actionType: 'coffeepour',
    },
    ambientMixer: {
      rain: 0.4,
      engine: 0.0,
      trainTracks: 0.0,
      fire: 0.0,
      keyboard: 0.0,
      cafeChatter: 0.6,
      chaiSimmer: 0.3,
      binauralAlpha: 0.2,
    },
  },

  train: {
    id: 'train',
    name: 'Midnight Sleeper Train',
    category: 'Travel & Calm',
    tagline: 'Rhythmic rail click-clack & countryside starlight.',
    description: 'Watch dark mountains and distant lights glide by from a warm, swaying sleeper train compartment.',
    vibe: 'Cross-Country Sleeper',
    icon: '🚆',
    accentColor: '#34d399',
    accentSoft: '#6ee7b7',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    bgGradient: 'linear-gradient(180deg, #02120e 0%, #06231b 35%, #0c3327 65%, #010a08 100%)',
    defaultStationId: 'PLozpXmA4eZ6F_384L0b6c6bS-uL-X4p2s',
    stationName: 'Night Train Acoustic Lo-fi',
    interactiveControl: {
      label: 'TRAIN CHIME',
      sublabel: 'distant whistle echo',
      actionType: 'trainwhistle',
    },
    ambientMixer: {
      rain: 0.3,
      engine: 0.15,
      trainTracks: 0.75,
      fire: 0.0,
      keyboard: 0.0,
      cafeChatter: 0.05,
      chaiSimmer: 0.1,
      binauralAlpha: 0.3,
    },
  },

  campfire: {
    id: 'campfire',
    name: 'Wild Forest Campfire',
    category: 'Nature & Wilderness',
    tagline: 'Crackling dry wood, starry sky & mountain pine breeze.',
    description: 'A glowing campfire beside a gentle mountain creek under a blanket of wilderness stars.',
    vibe: 'Pine Breeze & Embers',
    icon: '🔥',
    accentColor: '#f97316',
    accentSoft: '#fdba74',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    bgGradient: 'linear-gradient(180deg, #080504 0%, #1a0e08 35%, #2a150a 65%, #050302 100%)',
    defaultStationId: 'PLofht4PTcKYnaH8w5gkEB2464cub254EE',
    stationName: 'Acoustic Guitar & Campfire',
    interactiveControl: {
      label: 'STOKE THE FIRE',
      sublabel: 'burst of embers',
      actionType: 'stokefire',
    },
    ambientMixer: {
      rain: 0.0,
      engine: 0.0,
      trainTracks: 0.0,
      fire: 0.85,
      keyboard: 0.0,
      cafeChatter: 0.0,
      chaiSimmer: 0.1,
      binauralAlpha: 0.25,
    },
  },

  tapri: {
    id: 'tapri',
    name: 'Roadside Chai Tapri',
    category: 'Cultural & Warmth',
    tagline: 'Golden hour spices, steaming kulhad & street petrichor.',
    description: 'The authentic roadside Indian tea stall with rolling brass handis, crushed cardamom, and monsoon steam.',
    vibe: 'Old Delhi Kadak Brew',
    icon: '🫖',
    accentColor: '#e8934a',
    accentSoft: '#f2b877',
    glowColor: 'rgba(232, 147, 74, 0.45)',
    bgGradient: 'linear-gradient(180deg, #131a35 0%, #3a2354 30%, #6b2c4f 50%, #d9622f 75%, #0b0705 100%)',
    defaultStationId: 'PLSW-rtFaY_80',
    stationName: 'Old Delhi Monsoon Lo-fi',
    interactiveControl: {
      label: 'चाय की भाप',
      sublabel: 'pour kadak chai',
      actionType: 'chaipour',
    },
    ambientMixer: {
      rain: 0.4,
      engine: 0.0,
      trainTracks: 0.0,
      fire: 0.1,
      keyboard: 0.0,
      cafeChatter: 0.15,
      chaiSimmer: 0.8,
      binauralAlpha: 0.2,
    },
  },
};
