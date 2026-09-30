// Audio Engine for Chaiwala.live
// Includes Web Audio API procedural soundscapes (chai pour, boiling simmer, rain, crickets, street ambience),
// fallback ambient lo-fi generator, and YouTube IFrame Player integration.

export interface TrackInfo {
  id: string;
  title: string;
  author: string;
  duration?: number;
  thumbnailUrl?: string;
}

export interface AmbientMixerState {
  master: number;
  chaiSimmer: number;
  monsoonRain: number;
  streetAmbience: number;
  nightCrickets: number;
  kettleWhistle: number;
}

export type ChaiAmbientMixer = AmbientMixerState;

export const DEFAULT_MIXER: AmbientMixerState = {
  master: 0.7,
  chaiSimmer: 0.6,
  monsoonRain: 0.35,
  streetAmbience: 0.25,
  nightCrickets: 0.15,
  kettleWhistle: 0.2,
};

export const DEFAULT_CHAI_MIXER = DEFAULT_MIXER;

export const PRESET_PLAYLISTS = [
  {
    id: 'PLSW-rtFaY_80',
    title: 'Old Delhi Monsoon Lo-fi',
    subtitle: 'Nostalgic sitar, gentle rain & warm lo-fi beats (Original Chaiwala.live)',
    vibe: 'Warm & Melancholic',
  },
  {
    id: 'PLFgquLnL59amZ_42M4i4Y76Yj7R-kL7zK',
    title: 'Kolkata Clay Cup Jazz',
    subtitle: 'Lounge sitar, soft saxophone, brushed drums & tea shop hum',
    vibe: 'Smooth & Reflective',
  },
  {
    id: 'PLofht4PTcKYnaH8w5gkEB2464cub254EE',
    title: 'Midnight Dhaba Beats',
    subtitle: 'Deep nocturnal chillhop, cozy vinyl crackle, quiet Indian flute',
    vibe: 'Deep Focus & Night',
  },
  {
    id: 'PLWvG3o_g49K5Y06y3cTf4G5B9Wd2Xf1qT',
    title: 'Varanasi Ghat Sunrise',
    subtitle: 'Santur drones, morning ragas, temple chimes & dawn breeze',
    vibe: 'Peaceful & Mindful',
  },
  {
    id: 'PLQ_PIlcGJEyW95R2jZp3X1K_K3c7F5O6T',
    title: 'Pahadi Chai & Acoustic Strings',
    subtitle: 'Acoustic guitar, mountain wind, tranquil Himalayan solitude',
    vibe: 'Airy & Grounded',
  },
];

class AudioController {
  private ctx: AudioContext | null = null;
  private ambientAudioEl: HTMLAudioElement | null = null;
  private isAmbientPlaying = false;

  // Ambient nodes
  private masterGain: GainNode | null = null;
  private simmerGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private streetGain: GainNode | null = null;
  private cricketGain: GainNode | null = null;
  private kettleGain: GainNode | null = null;
  private ambientSources: { stop: () => void }[] = [];

  private mixerState: AmbientMixerState = { ...DEFAULT_MIXER };

  constructor() {
    // Ambient mp3 fallback
    if (typeof window !== 'undefined') {
      try {
        this.ambientAudioEl = new Audio(`${import.meta.env.BASE_URL}audio/chai-ambient.mp3`);
        this.ambientAudioEl.loop = true;
        this.ambientAudioEl.volume = 0.4;
      } catch {}
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Realistic tea pour sound synthesis
  public playChaiPour(onComplete?: () => void) {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const duration = 2.4;

      // 1. Water stream noise
      const bufferSize = ctx.sampleRate * duration;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // brown-pink noise
      }

      const streamSource = ctx.createBufferSource();
      streamSource.buffer = noiseBuffer;

      // Resonant bandpass filter that drops slightly in pitch as cup fills up!
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(650, now);
      filter.frequency.exponentialRampToValueAtTime(1100, now + duration * 0.7);
      filter.frequency.exponentialRampToValueAtTime(800, now + duration);
      filter.Q.setValueAtTime(4, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.45, now + 0.15);
      gain.gain.setValueAtTime(0.42, now + duration - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      streamSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      streamSource.start(now);
      streamSource.stop(now + duration);

      // 2. Micro bubbles (gurgles and frothing)
      for (let j = 0; j < 14; j++) {
        const bubbleTime = now + 0.2 + (j / 14) * 1.8 + Math.random() * 0.05;
        const osc = ctx.createOscillator();
        const bGain = ctx.createGain();
        const startFreq = 400 + Math.random() * 500;
        osc.frequency.setValueAtTime(startFreq, bubbleTime);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 1.6, bubbleTime + 0.06);

        bGain.gain.setValueAtTime(0.08, bubbleTime);
        bGain.gain.exponentialRampToValueAtTime(0.001, bubbleTime + 0.06);

        osc.connect(bGain);
        bGain.connect(ctx.destination);

        osc.start(bubbleTime);
        osc.stop(bubbleTime + 0.07);
      }

      // 3. Glass cup tap clink at the end
      const clinkTime = now + duration - 0.2;
      const clinkOsc = ctx.createOscillator();
      const clinkGain = ctx.createGain();
      clinkOsc.type = 'sine';
      clinkOsc.frequency.setValueAtTime(2450, clinkTime);
      clinkGain.gain.setValueAtTime(0.12, clinkTime);
      clinkGain.gain.exponentialRampToValueAtTime(0.001, clinkTime + 0.18);
      clinkOsc.connect(clinkGain);
      clinkGain.connect(ctx.destination);
      clinkOsc.start(clinkTime);
      clinkOsc.stop(clinkTime + 0.2);

      setTimeout(() => {
        onComplete?.();
      }, duration * 1000);
    } catch {
      onComplete?.();
    }
  }

  // Play singing bell for timer / stillness
  public playSingingBell() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const frequencies = [440, 880, 1320, 1760];
      const weights = [0.35, 0.15, 0.08, 0.03];

      frequencies.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(weights[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 3.6);
      });
    } catch {}
  }

  // Start continuous procedural ambient background soundscape
  public startAmbientSoundscape() {
    if (this.isAmbientPlaying) return;
    try {
      const ctx = this.initContext();
      this.isAmbientPlaying = true;

      // Master ambient gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.mixerState.master, ctx.currentTime);
      this.masterGain.connect(ctx.destination);

      // Try playing the authentic recorded ambient mp3 as base
      if (this.ambientAudioEl) {
        this.ambientAudioEl.play().catch(() => {});
      }

      // Synthesize Continuous Chai Simmer (gentle bubbling)
      this.setupSimmerTrack(ctx);

      // Synthesize Continuous Monsoon Rain (warm pink noise)
      this.setupRainTrack(ctx);

      // Synthesize Night Crickets
      this.setupCricketsTrack(ctx);

      // Synthesize Kettle Steam
      this.setupKettleTrack(ctx);
    } catch {}
  }

  private setupSimmerTrack(ctx: AudioContext) {
    this.simmerGain = ctx.createGain();
    this.simmerGain.gain.setValueAtTime(this.mixerState.chaiSimmer * 0.4, ctx.currentTime);
    this.simmerGain.connect(this.masterGain!);

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const out = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      out[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    source.connect(filter);
    filter.connect(this.simmerGain);
    source.start();

    this.ambientSources.push({
      stop: () => {
        try {
          source.stop();
        } catch {}
      },
    });
  }

  private setupRainTrack(ctx: AudioContext) {
    this.rainGain = ctx.createGain();
    this.rainGain.gain.setValueAtTime(this.mixerState.monsoonRain * 0.3, ctx.currentTime);
    this.rainGain.connect(this.masterGain!);

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0,
      b1 = 0,
      b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      data[i] = (b0 + b1 + b2) * 0.25;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, ctx.currentTime);

    source.connect(filter);
    filter.connect(this.rainGain);
    source.start();

    this.ambientSources.push({
      stop: () => {
        try {
          source.stop();
        } catch {}
      },
    });
  }

  private setupCricketsTrack(ctx: AudioContext) {
    this.cricketGain = ctx.createGain();
    this.cricketGain.gain.setValueAtTime(this.mixerState.nightCrickets * 0.15, ctx.currentTime);
    this.cricketGain.connect(this.masterGain!);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(4800, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(12, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.5, ctx.currentTime);
    lfo.connect(lfoGain.gain);

    osc.connect(this.cricketGain);
    osc.start();
    lfo.start();

    this.ambientSources.push({
      stop: () => {
        try {
          osc.stop();
          lfo.stop();
        } catch {}
      },
    });
  }

  private setupKettleTrack(ctx: AudioContext) {
    this.kettleGain = ctx.createGain();
    this.kettleGain.gain.setValueAtTime(this.mixerState.kettleWhistle * 0.12, ctx.currentTime);
    this.kettleGain.connect(this.masterGain!);

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, ctx.currentTime);
    filter.Q.setValueAtTime(12, ctx.currentTime);

    source.connect(filter);
    filter.connect(this.kettleGain);
    source.start();

    this.ambientSources.push({
      stop: () => {
        try {
          source.stop();
        } catch {}
      },
    });
  }

  public stopAmbientSoundscape() {
    this.isAmbientPlaying = false;
    this.ambientSources.forEach((s) => s.stop());
    this.ambientSources = [];
    if (this.ambientAudioEl) {
      this.ambientAudioEl.pause();
    }
  }

  public setMixerLevels(newMixer: Partial<AmbientMixerState>) {
    this.mixerState = { ...this.mixerState, ...newMixer };
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (this.masterGain && newMixer.master !== undefined) {
      this.masterGain.gain.linearRampToValueAtTime(newMixer.master, now + 0.1);
    }
    if (this.simmerGain && newMixer.chaiSimmer !== undefined) {
      this.simmerGain.gain.linearRampToValueAtTime(newMixer.chaiSimmer * 0.4, now + 0.1);
    }
    if (this.rainGain && newMixer.monsoonRain !== undefined) {
      this.rainGain.gain.linearRampToValueAtTime(newMixer.monsoonRain * 0.3, now + 0.1);
    }
    if (this.cricketGain && newMixer.nightCrickets !== undefined) {
      this.cricketGain.gain.linearRampToValueAtTime(newMixer.nightCrickets * 0.15, now + 0.1);
    }
    if (this.kettleGain && newMixer.kettleWhistle !== undefined) {
      this.kettleGain.gain.linearRampToValueAtTime(newMixer.kettleWhistle * 0.12, now + 0.1);
    }
  }

  public getMixerState(): AmbientMixerState {
    return { ...this.mixerState };
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }
}

export const audioEngine = new AudioController();
