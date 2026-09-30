import React, { useState, useEffect } from 'react';

export const ClockWidget: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const rawHours12 = hours % 12 || 12;
  const hoursFormatted = String(rawHours12).padStart(2, '0');
  const minutesFormatted = String(time.getMinutes()).padStart(2, '0');
  const secondsFormatted = String(time.getSeconds()).padStart(2, '0');
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  // Poetic time-of-day tapri mood
  const getTapriMood = () => {
    if (hours >= 5 && hours < 9) return 'Morning Kadak Brew';
    if (hours >= 9 && hours < 12) return 'Breakfast Bun Maska';
    if (hours >= 12 && hours < 16) return 'Afternoon Cutting Chai';
    if (hours >= 16 && hours < 19) return 'Evening Tapri Rush';
    if (hours >= 19 && hours < 23) return 'Post-Dinner Sips';
    return 'Midnight Dhaba Chai';
  };

  return (
    <div className="flex flex-col select-none">
      <div className="flex items-baseline gap-1 font-mono tracking-tight text-white drop-shadow-md">
        <span className="text-xl sm:text-2xl font-semibold tabular-nums text-[#f5e9dc]">
          {hoursFormatted}
          <span className="clock-colon mx-0.5">:</span>
          {minutesFormatted}
        </span>
        <span className="flex items-center gap-1 text-xs text-[#f2b877]/90 font-medium">
          <span className="tabular-nums text-[10px] text-[#f5e9dc]/60">{secondsFormatted}</span>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-[#f2b877]">
            {meridiem}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-[#f5e9dc]/70 font-sans tracking-wide">
        <span>{dateFormatter.format(time)}</span>
        <span className="text-[#f2b877]/50">·</span>
        <span className="text-[#f2b877]/80 italic text-[10.5px] truncate max-w-[130px]">
          {getTapriMood()}
        </span>
      </div>
    </div>
  );
};
