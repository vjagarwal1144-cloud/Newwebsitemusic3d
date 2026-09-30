import React, { useState, useEffect } from 'react';
import { ClockWidget } from './ClockWidget';
import { SteamPill } from './SteamPill';
import { Volume2, Moon, Sliders, Coffee, Maximize2, Minimize2, Timer, Download } from 'lucide-react';
import { SceneMode, SCENES } from './ExperienceShell';

interface TopBarProps {
  isPouring: boolean;
  onPour: () => void;
  currentScene: SceneMode;
  onSelectScene: (scene: SceneMode) => void;
  onOpenMixer: () => void;
  onOpenTimer: () => void;
  onOpenMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isPouring,
  onPour,
  currentScene,
  onSelectScene,
  onOpenMixer,
  onOpenTimer,
  onOpenMenu,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSceneMenu, setShowSceneMenu] = useState(false);

  // Organic live listener count like chaiwala.live
  const [loversCount, setLoversCount] = useState(() => 42 + Math.floor(Math.random() * 28));

  useEffect(() => {
    const interval = setInterval(() => {
      setLoversCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(30, Math.min(85, prev + delta));
      });
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  // Track fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
  };

  return (
    <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 border-b border-[#ffecd6]/[0.08] backdrop-blur-md bg-[#0b0705]/20">
      {/* Zone 1: Live Clock Widget & Brand hint */}
      <div className="flex items-center gap-3">
        <ClockWidget />
      </div>

      {/* Zone 2: Live Tapri Status (~ lovers around) */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffecd6]/[0.05] border border-[#ffecd6]/[0.1] text-xs text-[#f5e9dc]/80 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8934a] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e8934a]" />
        </span>
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#f2b877]"
        >
          <path d="M3 10h14a3 3 0 0 1 0 6H3z" />
          <path d="M17 11.5a1.5 1.5 0 0 1 0 3" />
          <path d="M6 19h8" />
        </svg>
        <span className="font-mono tabular-nums font-semibold text-[#f2b877]">
          ~{loversCount}
        </span>
        <span className="text-[#f5e9dc]/70">chai lovers around</span>
      </div>

      {/* Zone 3: Interactive Affordances */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Signature Steam Pill */}
        <SteamPill isPouring={isPouring} onPour={onPour} />

        {/* Scene Switcher Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSceneMenu(!showSceneMenu)}
            aria-label="Change tapri scene"
            title="Switch Tapri Atmosphere"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-[#f2b877]/40 text-[#f5e9dc] transition-all"
          >
            <Moon className="w-4 h-4 text-[#f2b877]" />
          </button>

          {showSceneMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel-deep p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 border border-[#ffecd6]/20">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-[#f2b877] uppercase tracking-wider">
                Select Atmosphere
              </div>
              {Object.values(SCENES).map((scene) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => {
                    onSelectScene(scene.id);
                    setShowSceneMenu(false);
                  }}
                  className={`w-full flex flex-col text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                    currentScene === scene.id
                      ? 'bg-[#e8934a]/25 text-[#f2b877] font-medium'
                      : 'text-[#f5e9dc]/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="font-medium flex items-center justify-between">
                    <span>{scene.name}</span>
                    <span className="font-devanagari text-[11px] text-[#f2b877]/80">
                      {scene.hindiName}
                    </span>
                  </span>
                  <span className="text-[10px] text-[#f5e9dc]/50 truncate">
                    {scene.tagline}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ambient Sound Mixer Button */}
        <button
          type="button"
          onClick={onOpenMixer}
          aria-label="Open ambient sound mixer"
          title="Ambient Sound Mixer (Rain, Chai Simmer, Street)"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-[#f2b877]/40 text-[#f5e9dc] transition-all"
        >
          <Sliders className="w-4 h-4 text-[#f2b877]" />
        </button>

        {/* Chai Pause / Meditation Timer Button */}
        <button
          type="button"
          onClick={onOpenTimer}
          aria-label="Open chai stillness timer"
          title="Chai Stillness & Mindful Pause Timer"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-[#f2b877]/40 text-[#f5e9dc] transition-all"
        >
          <Timer className="w-4 h-4 text-[#f2b877]" />
        </button>

        {/* Tapri Menu & Recipes Button */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open tapri tea menu and recipes"
          title="The Tapri Menu & Secret Brewing Recipes"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-[#f2b877]/40 text-[#f5e9dc] transition-all"
        >
          <Coffee className="w-4 h-4 text-[#f2b877]" />
        </button>

        {/* Download Source Code Zip */}
        <a
          href="/chaiwala-source-code.zip"
          download="chaiwala-live-source.zip"
          aria-label="Download website source code (.zip)"
          title="Download Complete Source Code (.zip)"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-[#f2b877]/40 text-[#f5e9dc] transition-all group"
        >
          <Download className="w-4 h-4 text-[#f2b877] group-hover:scale-110 transition-transform" />
        </a>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Experience'}
          className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.16] border border-[#ffecd6]/15 hover:border-[#f2b877]/40 text-[#f5e9dc] transition-all"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-[#f2b877]" />
          ) : (
            <Maximize2 className="w-4 h-4 text-[#f2b877]" />
          )}
        </button>
      </div>
    </header>
  );
};
