import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export type TimezoneKey = 'local' | 'delhi' | 'tokyo' | 'paris' | 'london' | 'newyork';

interface TimezoneConfig {
  key: TimezoneKey;
  label: string;
  city: string;
  timeZone?: string;
  flag: string;
}

const TIMEZONES: TimezoneConfig[] = [
  { key: 'local', label: 'Local Time', city: 'Your Location', flag: '📍' },
  { key: 'delhi', label: 'IST', city: 'Old Delhi', timeZone: 'Asia/Kolkata', flag: '🇮🇳' },
  { key: 'tokyo', label: 'JST', city: 'Tokyo', timeZone: 'Asia/Tokyo', flag: '🇯🇵' },
  { key: 'paris', label: 'CET', city: 'Paris', timeZone: 'Europe/Paris', flag: '🇫🇷' },
  { key: 'london', label: 'GMT', city: 'London', timeZone: 'Europe/London', flag: '🇬🇧' },
  { key: 'newyork', label: 'EST', city: 'New York', timeZone: 'America/New_York', flag: '🇺🇸' },
];

export const ClockWidget: React.FC = () => {
  const [selectedTz, setSelectedTz] = useState<TimezoneKey>('local');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showTzPicker, setShowTzPicker] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeConfig = TIMEZONES.find((t) => t.key === selectedTz) || TIMEZONES[0];

  // Format time based on chosen timezone
  const getZonedParts = () => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        ...(activeConfig.timeZone ? { timeZone: activeConfig.timeZone } : {}),
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(currentTime);

      const hour = parts.find((p) => p.type === 'hour')?.value || '12';
      const minute = parts.find((p) => p.type === 'minute')?.value || '00';
      const second = parts.find((p) => p.type === 'second')?.value || '00';
      const dayPeriod = parts.find((p) => p.type === 'dayPeriod')?.value?.toUpperCase() || 'AM';

      // 24hr hour for mood
      const hour24Opt: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        hour12: false,
        ...(activeConfig.timeZone ? { timeZone: activeConfig.timeZone } : {}),
      };
      const hour24 = parseInt(new Intl.DateTimeFormat('en-US', hour24Opt).format(currentTime), 10) || 12;

      return {
        hour: hour.padStart(2, '0'),
        minute,
        second,
        dayPeriod,
        hour24,
      };
    } catch {
      const h = currentTime.getHours();
      return {
        hour: String(h % 12 || 12).padStart(2, '0'),
        minute: String(currentTime.getMinutes()).padStart(2, '0'),
        second: String(currentTime.getSeconds()).padStart(2, '0'),
        dayPeriod: h >= 12 ? 'PM' : 'AM',
        hour24: h,
      };
    }
  };

  const { hour, minute, second, dayPeriod, hour24 } = getZonedParts();

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...(activeConfig.timeZone ? { timeZone: activeConfig.timeZone } : {}),
  });

  const getMood = (h: number) => {
    if (h >= 5 && h < 9) return 'Dawn Brew & Awakening';
    if (h >= 9 && h < 12) return 'Morning Focus & Sunlight';
    if (h >= 12 && h < 16) return 'Afternoon Sips & Clarity';
    if (h >= 16 && h < 19) return 'Dusk Tea & Golden Light';
    if (h >= 19 && h < 23) return 'Evening Calm & Unwinding';
    return 'Midnight Solitude & Deep Flow';
  };

  return (
    <div className="relative flex flex-col select-none">
      <div className="flex items-center gap-2">
        <div className="flex items-baseline gap-1 font-mono tracking-tight text-white drop-shadow-md">
          <span className="text-xl sm:text-2xl font-semibold tabular-nums text-[#f5e9dc]">
            {hour}
            <span className="clock-colon mx-0.5">:</span>
            {minute}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#f2b877]/90 font-medium">
            <span className="tabular-nums text-[10px] text-[#f5e9dc]/60">{second}</span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#f2b877]">
              {dayPeriod}
            </span>
          </span>
        </div>

        {/* Timezone Switcher Pill */}
        <button
          type="button"
          onClick={() => setShowTzPicker(!showTzPicker)}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-[10px] text-[#f5e9dc]/80 border border-[#ffecd6]/10 transition-colors"
          title="Switch Timezone (Delhi, Tokyo, Paris, NY, Local)"
        >
          <span>{activeConfig.flag}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider">{activeConfig.label}</span>
          <Globe className="w-2.5 h-2.5 opacity-60" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-[#f5e9dc]/70 font-sans tracking-wide">
        <span>{dateFormatter.format(currentTime)}</span>
        <span className="text-[#f2b877]/50">·</span>
        <span className="text-[#f2b877]/80 italic text-[10.5px] truncate max-w-[140px]">
          {getMood(hour24)}
        </span>
      </div>

      {/* Timezone Dropdown */}
      {showTzPicker && (
        <div className="absolute top-12 left-0 w-48 rounded-2xl glass-panel-deep p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 border border-[#ffecd6]/20">
          <div className="px-2.5 py-1 text-[10px] font-semibold text-[#f2b877] uppercase tracking-wider">
            Select World Clock
          </div>
          {TIMEZONES.map((tz) => (
            <button
              key={tz.key}
              type="button"
              onClick={() => {
                setSelectedTz(tz.key);
                setShowTzPicker(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors ${
                selectedTz === tz.key
                  ? 'bg-[#e8934a]/25 text-[#f2b877] font-semibold'
                  : 'text-[#f5e9dc]/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tz.flag}</span>
                <span>{tz.city}</span>
              </div>
              <span className="font-mono text-[10px] opacity-60">{tz.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
