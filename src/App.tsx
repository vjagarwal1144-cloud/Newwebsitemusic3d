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
import { initAnalytics, trackEvent } from './utils/analytics';
import { useYouTubePlayer } from './hooks/useYouTubePlayer';
import { audioEngine, AmbientMixerState } from './utils/audioEngine';

export function App() {
  const [currentScene, setCurrentScene] = useState<SceneMode>('dusk');
  const [isPouring, setIsPouring] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  // Modals & Panels
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isPlaylistSwitcherOpen, setIsPlaylistSwitcherOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Ambient sound mixer state
  const [mixerState, setMixerState] = useState<AmbientMixerState>(() => audioEngine.getMixerState());
  const [isAmbientActive, setIsAmbientActive] = useState(false);

  // YouTube Music Player hook with guaranteed first-time loading & ad-free stream
  const yt = useYouTubePlayer('PLSW-rtFaY_80');

  useEffect(() => {
    initAnalytics();
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) trackEvent('referral_visit', { ref });
    trackEvent('page_view_custom', { ref: ref || 'direct' });
  }, []);

  // Trigger Traditional Cutting Chai Pour
  const handlePour = useCallback(() => {
    if (isPouring) return;
    setIsPouring(true);
    setBurstTrigger((prev) => prev + 1);

    // Auto-start ambient soundscape on first pour if not already active
    if (!isAmbientActive) {
      audioEngine.startAmbientSoundscape();
      setIsAmbientActive(true);
    }

    audioEngine.playChaiPour(() => {
      setIsPouring(false);
    });
  }, [isPouring, isAmbientActive]);

  // Ambient Mixer Updates
  const handleChangeMixer = (updated: Partial<AmbientMixerState>) => {
    audioEngine.setMixerLevels(updated);
    setMixerState(audioEngine.getMixerState());
  };

  const handleToggleAmbient = () => {
    if (isAmbientActive) {
      audioEngine.stopAmbientSoundscape();
      setIsAmbientActive(false);
    } else {
      audioEngine.startAmbientSoundscape();
      setIsAmbientActive(true);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        yt.togglePlay();
      } else if (e.code === 'KeyP' || e.code === 'KeyC') {
        e.preventDefault();
        handlePour();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        yt.toggleMute();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        yt.next();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        yt.previous();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [yt, handlePour]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#0b0705]">
      {/* Hidden YouTube IFrame Container */}
      <div
        id={yt.containerId}
        className="fixed top-0 -left-[9999px] w-[2px] h-[2px] pointer-events-none opacity-0"
      />

      {/* Atmospheric Visual Backdrop Shell with Authentic Chai Tapri Photo & Scene Mode */}
      <ExperienceShell
        currentScene={currentScene}
        onSceneChange={setCurrentScene}
      >
        {/* Top Navigation Bar with World Clock, "चाय की भाप" Button & Controls */}
        <TopBar
          isPouring={isPouring}
          onPour={handlePour}
          isAdFreeMode={yt.isAdFreeMode}
          onToggleAdFreeMode={yt.toggleAdFreeMode}
          onOpenMixer={() => setIsMixerOpen(true)}
          onOpenTimer={() => setIsTimerOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenShare={() => {
            setIsShareOpen(true);
            trackEvent('share_opened');
          }}
        />

        {/* Center Hero Title */}
        <div className="flex-1 flex flex-col items-center justify-center pointer-events-none px-4">
          <HeroTitle />
        </div>

        {/* Bottom Music Player Bar */}
        <NowPlaying
          isPlaying={yt.isPlaying}
          onTogglePlay={yt.togglePlay}
          onNext={yt.next}
          onPrevious={yt.previous}
          isShuffled={yt.isShuffled}
          onToggleShuffle={yt.toggleShuffle}
          currentTime={yt.currentTime}
          duration={yt.duration}
          onSeek={yt.seekTo}
          volume={yt.volume}
          onChangeVolume={yt.changeVolume}
          isMuted={yt.isMuted}
          onToggleMute={yt.toggleMute}
          currentTrack={yt.currentTrack}
          isQueueOpen={isQueueOpen}
          onToggleQueue={() => setIsQueueOpen(!isQueueOpen)}
          onOpenPlaylistSwitcher={() => setIsPlaylistSwitcherOpen(true)}
          playlistId={yt.playlistId}
          isAdFreeMode={yt.isAdFreeMode}
        />
      </ExperienceShell>

      {/* Interactive Hot Chai Steam Particle Canvas */}
      <SteamCanvas
        burstTrigger={burstTrigger}
        originX={0.5}
        originY={0.65}
      />

      {/* Playlist Track Queue Drawer */}
      <QueuePanel
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        tracks={yt.playlistTracks}
        currentIndex={yt.playlistIndex}
        onSelectTrack={(idx) => {
          yt.playIndex(idx);
          setIsQueueOpen(false);
        }}
        playlistTitle="Old Delhi Tapri Queue"
      />

      {/* Playlist & Station Switcher Modal */}
      <PlaylistSwitcher
        isOpen={isPlaylistSwitcherOpen}
        onClose={() => setIsPlaylistSwitcherOpen(false)}
        activePlaylistId={yt.playlistId}
        onSelectPlaylist={(id) => yt.switchPlaylist(id)}
        isAdFreeMode={yt.isAdFreeMode}
        onToggleAdFreeMode={yt.toggleAdFreeMode}
      />

      {/* Ambient Soundscape Mixer Modal */}
      <SoundMixerModal
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
        mixer={mixerState}
        onChangeMixer={handleChangeMixer}
        isAmbientActive={isAmbientActive}
        onToggleAmbient={handleToggleAmbient}
      />

      {/* Focus & Mindfulness Stillness Timer Modal */}
      <ChaiTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

      {/* World Comfort Drinks & Chai Brewing Recipes Modal */}
      <ChaiMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}

export default App;
