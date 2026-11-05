import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { EVENT_DETAILS } from '../data/initialData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isStarted: boolean;
}

export const CountdownTimer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const targetDate = new Date(EVENT_DETAILS.targetDateIso).getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, isStarted: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, totalMs: diff, isStarted: false };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-200">
        <Clock className="w-4 h-4 text-orange-400 shrink-0" />
        <span className="text-xs uppercase tracking-wider text-orange-300 font-medium">距離大會開始：</span>
        <div className="font-mono tabular-nums font-bold text-sm text-white flex items-center gap-1">
          <span>{String(timeLeft.days).padStart(2, '0')}天</span>
          <span>{String(timeLeft.hours).padStart(2, '0')}時</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}分</span>
          <span className="text-orange-400">{String(timeLeft.seconds).padStart(2, '0')}秒</span>
        </div>
      </div>
    );
  }

  const units = [
    { label: '天 (DAYS)', value: timeLeft.days },
    { label: '小時 (HOURS)', value: timeLeft.hours },
    { label: '分鐘 (MINS)', value: timeLeft.minutes },
    { label: '秒 (SECS)', value: timeLeft.seconds, highlight: true }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-xs tracking-wider text-slate-400 uppercase">
        <div className="flex items-center gap-1.5 text-orange-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>倒計時 · 即將舉行</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{EVENT_DETAILS.dateFormatted} 20:00</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border backdrop-blur-md transition-all ${
              unit.highlight
                ? 'bg-gradient-to-b from-orange-500/20 to-orange-950/40 border-orange-500/40 shadow-lg shadow-orange-500/10'
                : 'bg-slate-900/80 border-slate-800/80 shadow-md'
            }`}
          >
            <div className="font-mono tabular-nums text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-wider text-slate-400 mt-1 font-medium text-center">
              {unit.label}
            </div>
            {unit.highlight && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1 text-orange-300">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          現場設有 iPad WiFi 128GB 大抽獎
        </span>
        <span className="text-slate-400">尖沙咀港威大廈5座11樓 BOC Life</span>
      </div>
    </div>
  );
};
