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
import { useYouTubePlayer } from './hooks/useYouTubePlayer';
import { audioEngine, AmbientMixerState } from './utils/audioEngine';

export function App() {
  const [currentScene, setCurrentScene] = useState<SceneMode>('dusk');
  const [isPouring, setIsPouring] = useState(false);
  const [steamBurstTrigger, setSteamBurstTrigger] = useState(0);

  // Modals & Drawers
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isPlaylistSwitcherOpen, setIsPlaylistSwitcherOpen] = useState(false);

  // Sound mixer state
  const [mixerState, setMixerState] = useState<AmbientMixerState>(() => audioEngine.getMixerState());
  const [isAmbientActive, setIsAmbientActive] = useState(false);

  // YouTube Music Player hook with original chaiwala.live default playlist
  const yt = useYouTubePlayer('PLSW-rtFaY_80');

  // Handle signature Chai Pour action
  const handlePour = useCallback(() => {
    if (isPouring) return;
    setIsPouring(true);
    setSteamBurstTrigger((prev) => prev + 1);

    // If ambient soundscape is not running yet, start it gently
    if (!isAmbientActive) {
      audioEngine.startAmbientSoundscape();
      setIsAmbientActive(true);
    }

    // Play authentic tea stream audio
    audioEngine.playChaiPour(() => {
      setIsPouring(false);
    });
  }, [isPouring, isAmbientActive]);

  // Ambient mixer update
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

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        yt.togglePlay();
      } else if (e.code === 'KeyP') {
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
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#0b0705]">
      {/* Hidden YouTube IFrame Container */}
      <div
        id={yt.containerId}
        className="fixed top-0 -left-[9999px] w-[2px] h-[2px] pointer-events-none opacity-0"
      />

      {/* Atmospheric Visual Backdrop Shell */}
      <ExperienceShell
        currentScene={currentScene}
        onSceneChange={setCurrentScene}
      >
        {/* Top Navigation Bar with Clock, Status, Steam Pill & Controls */}
        <TopBar
          isPouring={isPouring}
          onPour={handlePour}
          currentScene={currentScene}
          onSelectScene={setCurrentScene}
          onOpenMixer={() => setIsMixerOpen(true)}
          onOpenTimer={() => setIsTimerOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* Center Hero Brand Title */}
        <div className="flex-1 flex items-center justify-center -mt-6 sm:-mt-10 pointer-events-none">
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
        />
      </ExperienceShell>

      {/* Realistic Interactive Steam Simulation Canvas */}
      <SteamCanvas
        burstTrigger={steamBurstTrigger}
        originX={0.5}
        originY={0.62}
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
        playlistTitle={
          yt.playlistId === 'PLSW-rtFaY_80'
            ? 'Old Delhi Monsoon Lo-fi'
            : 'Station Tracklist'
        }
      />

      {/* Playlist & Station Switcher Modal */}
      <PlaylistSwitcher
        isOpen={isPlaylistSwitcherOpen}
        onClose={() => setIsPlaylistSwitcherOpen(false)}
        activePlaylistId={yt.playlistId}
        onSelectPlaylist={(id) => yt.switchPlaylist(id)}
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

      {/* Chai Stillness & Mindfulness Timer Modal */}
      <ChaiTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* The Tapri Menu & Secret Recipes Modal */}
      <ChaiMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}

export default App;
