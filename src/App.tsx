import React, { useState, useEffect, useCallback } from 'react';
import { ExperienceShell, SceneMode } from './components/ExperienceShell';
import { SteamCanvas } from './components/SteamCanvas';
import { TopBar } from './components/TopBar';
import { HeroTitle } from './components/HeroTitle';
import { NowPlaying } from './components/NowPlaying';
import { QueuePanel } from './components/QueuePanel';
import { PlaylistSwitcher } from './components/PlaylistSwitcher';
import { SoundMixerModal } from './components/SoundMixerModal';
import { ChaiTimerModal } from './components/ChaiTimerModal';
import { ChaiMenuModal } from './components/ChaiMenuModal';
import { ShareModal } from './components/ShareModal';
import { ChaiSessionPanel, SessionPreset } from './components/ChaiSessionPanel';
import { initAnalytics, trackEvent } from './utils/analytics';
import { useYouTubePlayer } from './hooks/useYouTubePlayer';
import { audioEngine, AmbientMixerState } from './utils/audioEngine';

type AnimationIntensity = 'full' | 'calm' | 'off';

export function App() {
  const [currentScene, setCurrentScene] = useState<SceneMode>(() => {
    try { return (localStorage.getItem('chai-scene') as SceneMode) || 'dusk'; } catch { return 'dusk'; }
  });
  const [animationIntensity, setAnimationIntensity] = useState<AnimationIntensity>(() => {
    try { return (localStorage.getItem('chai-motion') as AnimationIntensity) || 'full'; } catch { return 'full'; }
  });
  const [isPouring, setIsPouring] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isPlaylistSwitcherOpen, setIsPlaylistSwitcherOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [mixerState, setMixerState] = useState<AmbientMixerState>(() => audioEngine.getMixerState());
  const [isAmbientActive, setIsAmbientActive] = useState(false);
  const yt = useYouTubePlayer('PLSW-rtFaY_80');

  useEffect(() => { try { localStorage.setItem('chai-scene', currentScene); } catch {} }, [currentScene]);
  useEffect(() => { try { localStorage.setItem('chai-motion', animationIntensity); } catch {} }, [animationIntensity]);

  useEffect(() => {
    initAnalytics();
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) trackEvent('referral_visit', { ref });
    trackEvent('page_view_custom', { ref: ref || 'direct' });
  }, []);

  const handlePour = useCallback(() => {
    if (isPouring) return;
    setIsPouring(true); setBurstTrigger(v => v + 1);
    if (!isAmbientActive) { audioEngine.startAmbientSoundscape(); setIsAmbientActive(true); }
    audioEngine.playChaiPour(() => setIsPouring(false));
  }, [isPouring, isAmbientActive]);

  const handleChangeMixer = (updated: Partial<AmbientMixerState>) => {
    audioEngine.setMixerLevels(updated); setMixerState(audioEngine.getMixerState());
  };

  const handleToggleAmbient = () => {
    if (isAmbientActive) { audioEngine.stopAmbientSoundscape(); setIsAmbientActive(false); }
    else { audioEngine.startAmbientSoundscape(); setIsAmbientActive(true); }
  };

  const handleStartSession = useCallback((preset: SessionPreset) => {
    audioEngine.setMixerLevels(preset.mixer); setMixerState(audioEngine.getMixerState());
    if (!isAmbientActive) { audioEngine.startAmbientSoundscape(); setIsAmbientActive(true); }
    if (!yt.isPlaying) yt.play();
    trackEvent('chai_session_started', { preset: preset.id, minutes: preset.minutes });
    setIsSessionOpen(false);
  }, [isAmbientActive, yt]);

  const cycleMotion = useCallback(() => {
    setAnimationIntensity(v => v === 'full' ? 'calm' : v === 'calm' ? 'off' : 'full');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.code === 'Space') { e.preventDefault(); yt.togglePlay(); }
      else if (e.code === 'KeyF') { e.preventDefault(); setIsSessionOpen(true); }
      else if (e.code === 'KeyP' || e.code === 'KeyC') { e.preventDefault(); handlePour(); }
      else if (e.code === 'KeyM') { e.preventDefault(); yt.toggleMute(); }
      else if (e.code === 'KeyV') { e.preventDefault(); cycleMotion(); }
      else if (e.code === 'ArrowRight') { e.preventDefault(); yt.next(); }
      else if (e.code === 'ArrowLeft') { e.preventDefault(); yt.previous(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [yt, handlePour, cycleMotion]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#0b0705]">
      <div id={yt.containerId} className="fixed top-0 -left-[9999px] w-[2px] h-[2px] pointer-events-none opacity-0" />
      <ExperienceShell currentScene={currentScene} onSceneChange={setCurrentScene} isPlaying={yt.isPlaying} animationIntensity={animationIntensity}>
        <TopBar
          isPouring={isPouring} onPour={handlePour}
          onOpenMixer={() => setIsMixerOpen(true)}
          onOpenTimer={() => setIsTimerOpen(true)}
          onOpenSession={() => setIsSessionOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenShare={() => { setIsShareOpen(true); trackEvent('share_opened'); }}
          animationIntensity={animationIntensity}
          onCycleMotion={cycleMotion}
        />
        <div className="flex-1 flex flex-col items-center justify-center pointer-events-none px-4"><HeroTitle scene={currentScene} isPlaying={yt.isPlaying} /></div>
        <NowPlaying
          isPlaying={yt.isPlaying} onTogglePlay={yt.togglePlay} onNext={yt.next} onPrevious={yt.previous}
          isShuffled={yt.isShuffled} onToggleShuffle={yt.toggleShuffle} currentTime={yt.currentTime} duration={yt.duration}
          onSeek={yt.seekTo} volume={yt.volume} onChangeVolume={yt.changeVolume} isMuted={yt.isMuted} onToggleMute={yt.toggleMute}
          currentTrack={yt.currentTrack} isQueueOpen={isQueueOpen} onToggleQueue={() => setIsQueueOpen(v => !v)}
          onOpenPlaylistSwitcher={() => setIsPlaylistSwitcherOpen(true)} playlistId={yt.playlistId} isAdFreeMode={yt.isAdFreeMode}
        />
      </ExperienceShell>

      <SteamCanvas burstTrigger={burstTrigger} originX={0.5} originY={0.65} />
      <QueuePanel isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} tracks={yt.playlistTracks} currentIndex={yt.playlistIndex} onSelectTrack={idx => { yt.playIndex(idx); setIsQueueOpen(false); }} playlistTitle="Music Queue" />
      <PlaylistSwitcher isOpen={isPlaylistSwitcherOpen} onClose={() => setIsPlaylistSwitcherOpen(false)} activePlaylistId={yt.playlistId} onSelectPlaylist={yt.switchPlaylist} />
      <SoundMixerModal isOpen={isMixerOpen} onClose={() => setIsMixerOpen(false)} mixer={mixerState} onChangeMixer={handleChangeMixer} isAmbientActive={isAmbientActive} onToggleAmbient={handleToggleAmbient} />
      <ChaiTimerModal isOpen={isTimerOpen} onClose={() => setIsTimerOpen(false)} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <ChaiSessionPanel isOpen={isSessionOpen} onClose={() => setIsSessionOpen(false)} onStartSession={handleStartSession} />
      <ChaiMenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
export default App;
