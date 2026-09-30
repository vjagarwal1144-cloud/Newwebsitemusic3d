import React from 'react';
import { ThemeConfig } from '../types/themes';
import { Gauge, Sparkles, Flame, Coffee, Wind, Keyboard, Bell } from 'lucide-react';

interface InteractiveControlWidgetProps {
  theme: ThemeConfig;
  isActiveAction: boolean;
  onTriggerAction: () => void;
}

export const InteractiveControlWidget: React.FC<InteractiveControlWidgetProps> = ({
  theme,
  isActiveAction,
  onTriggerAction,
}) => {
  const { interactiveControl, accentColor, accentSoft } = theme;

  const renderIcon = () => {
    switch (interactiveControl.actionType) {
      case 'wipers':
        return <Gauge className="w-4 h-4" style={{ color: accentSoft }} />;
      case 'keyclick':
        return <Keyboard className="w-4 h-4" style={{ color: accentSoft }} />;
      case 'coffeepour':
        return <Coffee className="w-4 h-4" style={{ color: accentSoft }} />;
      case 'trainwhistle':
        return <Wind className="w-4 h-4" style={{ color: accentSoft }} />;
      case 'stokefire':
        return <Flame className="w-4 h-4" style={{ color: accentSoft }} />;
      case 'chaipour':
      default:
        return <Coffee className="w-4 h-4" style={{ color: accentSoft }} />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* If Car Drive: Show Speedometer telemetry badge */}
      {theme.id === 'cardrive' && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffecd6]/[0.06] border border-[#ffecd6]/10 text-xs font-mono text-[#f5e9dc]/80 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-sky-400">85 KM/H</span>
          <span className="text-[#f5e9dc]/40">·</span>
          <span className="text-[11px] text-[#f5e9dc]/60">2,400 RPM</span>
        </div>
      )}

      {/* Main Interactive Action Pill */}
      <button
        type="button"
        onClick={onTriggerAction}
        disabled={isActiveAction}
        aria-label={interactiveControl.label}
        title={`${interactiveControl.label} (${interactiveControl.sublabel})`}
        className={`group relative flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
          isActiveAction
            ? 'bg-white/20 border-white/40 scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.3)]'
            : 'bg-[#ffecd6]/[0.08] hover:bg-[#ffecd6]/[0.15] border-[#ffecd6]/20 hover:border-white/40 text-[#f5e9dc] hover:scale-[1.02] shadow-md active:scale-[0.98]'
        }`}
        style={{
          borderColor: isActiveAction ? accentColor : undefined,
        }}
      >
        <span className="relative flex items-center justify-center w-5 h-5 shrink-0">
          {renderIcon()}
        </span>

        <div className="flex flex-col text-left leading-tight">
          <span className="font-bold text-xs sm:text-sm tracking-wide text-[#f5e9dc] group-hover:text-white uppercase font-mono">
            {interactiveControl.label}
          </span>
          <span
            className="text-[10px] tracking-wider uppercase font-medium group-hover:brightness-110"
            style={{ color: accentSoft }}
          >
            {isActiveAction ? 'triggering…' : interactiveControl.sublabel}
          </span>
        </div>

        {/* Pulse Ripple */}
        {isActiveAction && (
          <span
            className="absolute inset-0 rounded-full border animate-ping opacity-40 pointer-events-none"
            style={{ borderColor: accentColor }}
          />
        )}
      </button>
    </div>
  );
};
