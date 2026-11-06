import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, XCircle, Users, Edit3, ArrowDown } from 'lucide-react';
import { DinnerEvent } from '../types';

interface DinnerHeroProps {
  event: DinnerEvent;
  attendingHeadcount: number;
  attendingVotesCount: number;
  notAttendingCount: number;
  onOpenAdmin: () => void;
  onScrollToVote: () => void;
}

export const DinnerHero: React.FC<DinnerHeroProps> = ({
  event,
  attendingHeadcount,
  attendingVotesCount,
  notAttendingCount,
  onOpenAdmin,
  onScrollToVote
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number; isPassed: boolean }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date(`${event.date}T${event.time}:00`).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (isNaN(targetTime) || diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.date, event.time]);

  // Format date display (e.g. 2026年11月20日 星期五)
  const formatFriendlyDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();
      const dayName = days[d.getDay()];
      return `${year}年${month}月${date}日 (${dayName})`;
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-14 overflow-hidden">
      {/* Warm sunny ambient background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-300/25 via-orange-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        
        {/* Main Event Card */}
        <div className="rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-amber-200/90 dark:border-slate-800 shadow-xl shadow-orange-500/5 p-6 sm:p-9 relative backdrop-blur-sm">
          
          {/* Top Pill & Admin edit hint */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/50">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>現正開放投票出席</span>
            </span>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>點擊在後台修改日期/地點</span>
            </button>
          </div>

          {/* Dinner Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display leading-tight">
            {event.title}
          </h1>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
            
            {/* Date & Time */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  食飯日期與時間
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {formatFriendlyDate(event.date)}
                </div>
                <div className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1 mt-0.5 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>

            {/* Venue & Location */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  聚餐地點 / 餐廳
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {event.venue}
                </div>
                {event.address && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {event.address}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Dinner Notes */}
          {event.notes && (
            <div className="mt-4 p-4 rounded-2xl bg-orange-50/60 dark:bg-slate-800/40 border border-orange-200/70 dark:border-slate-700/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
              <span className="text-base shrink-0">📢</span>
              <div>
                <strong className="font-semibold text-slate-900 dark:text-white">聚會提示：</strong>
                <span>{event.notes}</span>
              </div>
            </div>
          )}

          {/* Live Countdown Timer */}
          <div className="mt-6 pt-6 border-t border-amber-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
              <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>距離聚餐開飯還有：</span>
              </div>
              {event.deadline && (
                <span>建議截止：{event.deadline.replace('T', ' ')}</span>
              )}
            </div>

            {timeLeft.isPassed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-center font-bold text-sm">
                🍽️ 食飯活動已到期或正在進行中！
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200/70 dark:border-slate-700">
                  <div className="font-mono tabular-nums text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">天</div>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200/70 dark:border-slate-700">
                  <div className="font-mono tabular-nums text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">小時</div>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200/70 dark:border-slate-700">
                  <div className="font-mono tabular-nums text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">分鐘</div>
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-b from-orange-50 to-amber-100 dark:from-slate-800 dark:to-orange-950/40 border border-orange-300 dark:border-orange-500/40">
                  <div className="font-mono tabular-nums text-xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-orange-700 dark:text-orange-300 font-semibold mt-0.5">秒</div>
                </div>
              </div>
            )}
          </div>

          {/* Attendance Stats Cards */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-6 pt-6 border-t border-amber-100 dark:border-slate-800 text-center">
            
            <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
              <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>確認出席</span>
              </div>
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                {attendingHeadcount}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                共 {attendingVotesCount} 票回覆
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40">
              <div className="flex items-center justify-center gap-1 text-rose-700 dark:text-rose-400 text-xs font-bold mb-1">
                <XCircle className="w-3.5 h-3.5" />
                <span>不出席</span>
              </div>
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-rose-600 dark:text-rose-400">
                {notAttendingCount}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                未能前往
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700">
              <div className="flex items-center justify-center gap-1 text-amber-800 dark:text-amber-400 text-xs font-bold mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>總回覆人數</span>
              </div>
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {attendingVotesCount + notAttendingCount}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                已表態同仁
              </div>
            </div>

          </div>

          {/* Quick CTA to Scroll Down and Vote */}
          <div className="mt-6 pt-2">
            <button
              onClick={onScrollToVote}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>立即填寫我的出席投票 (名字+電話)</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
