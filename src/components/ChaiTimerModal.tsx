import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Timer, Sparkles, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface ChaiTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChaiTimerModal: React.FC<ChaiTimerModalProps> = ({ isOpen, onClose }) => {
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      audioEngine.playSingingBell();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!isRunning) return;
    const breathTimer = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(breathTimer);
  }, [isRunning]);

  if (!isOpen) return null;

  const handleSelectPreset = (mins: number) => {
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progress = 1 - timeLeft / (selectedMinutes * 60);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-3xl glass-panel-deep shadow-2xl border border-[#ffecd6]/20 p-6 flex flex-col items-center gap-5">
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-[#ffecd6]/10 pb-3">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-[#f2b877]" />
            <span className="text-sm font-semibold text-[#f5e9dc]">
              Mindful Stillness & Focus Timer
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#f5e9dc]/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-[#ffecd6]/10 flex-wrap justify-center">
          {[
            { m: 3, label: '3m Quick Sip' },
            { m: 5, label: '5m Cutting Break' },
            { m: 15, label: '15m Reset' },
            { m: 25, label: '25m Pomodoro' },
            { m: 50, label: '50m Deep Flow' },
          ].map((item) => (
            <button
              key={item.m}
              type="button"
              onClick={() => handleSelectPreset(item.m)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedMinutes === item.m
                  ? 'bg-[#e8934a] text-[#0b0705] shadow-sm font-semibold'
                  : 'text-[#f5e9dc]/70 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Breathing Circle Visualizer */}
        <div className="relative flex items-center justify-center w-52 h-52 my-1">
          <div
            className={`absolute rounded-full transition-all duration-[4000ms] ease-in-out border border-[#f2b877]/30 ${
              isRunning
                ? breathPhase === 'Inhale'
                  ? 'w-48 h-48 bg-[#e8934a]/15 scale-105 shadow-[0_0_40px_rgba(232,147,74,0.3)]'
                  : breathPhase === 'Hold'
                  ? 'w-48 h-48 bg-[#e8934a]/25 scale-100 shadow-[0_0_50px_rgba(232,147,74,0.4)]'
                  : 'w-36 h-36 bg-[#e8934a]/5 scale-90 shadow-none'
                : 'w-44 h-44 bg-white/[0.02]'
            }`}
          />

          <svg className="w-48 h-48 -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="84"
              className="text-white/10"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="84"
              className="text-[#f2b877]"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 84}
              strokeDashoffset={2 * Math.PI * 84 * (1 - progress)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-mono font-bold text-[#f5e9dc] tracking-tight tabular-nums">
              {formattedTime}
            </span>
            <span className="text-xs text-[#f2b877] font-medium tracking-wide mt-1">
              {isRunning ? breathPhase : 'Ready'}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#f5e9dc]/60 text-center max-w-xs italic font-display">
          {isRunning
            ? `Sync your breath with the circle. Inhale presence, release tension.`
            : `Set down your tasks, hold your warm cup, and take a moment of stillness.`}
        </p>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetTimer}
            title="Reset timer"
            className="p-2.5 rounded-full text-[#f5e9dc]/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleRunning}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e8934a] to-[#d9622f] text-[#0b0705] font-semibold text-xs transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Start Stillness</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
