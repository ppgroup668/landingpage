import React from 'react';
import { Calendar, MapPin, Gift, ShieldCheck, ArrowRight, Eye, CalendarPlus } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { EVENT_DETAILS } from '../data/initialData';
import { generateGoogleCalendarUrl } from '../utils/calendar';

interface HeroProps {
  onRegisterClick: () => void;
  onOpenPoster: () => void;
  remainingSeats: number;
  totalSeats: number;
}

export const Hero: React.FC<HeroProps> = ({
  onRegisterClick,
  onOpenPoster,
  remainingSeats,
  totalSeats
}) => {
  const percentTaken = Math.round(((totalSeats - remainingSeats) / totalSeats) * 100);

  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background radial glow matching the poster's copper and deep blue hues */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & Countdown */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed clean metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-orange-400 tracking-wider">
              <span>PP 彼坡 PASSION</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>2026 旗艦職涯講座</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">尖沙咀 BOC Life 專場</span>
            </div>

            {/* Display Headline */}
            <div>
              <div className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-none">
                BUSINESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">TALK</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 tracking-tight">
                {EVENT_DETAILS.chineseTitle}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              厭倦了重複文職與受限薪酬？特邀由 <span className="text-white font-medium">NGO 文職轉型 6 年 COT</span> 的 <strong className="text-orange-300 font-semibold">Yue Wong</strong>，以及由 <span className="text-white font-medium">跨國企業 PA 轉型 1 年 TOT</span> 的 <strong className="text-orange-300 font-semibold">Cecilia Yik</strong>，解密如何依托銀行龐大客群資源，零冷敲門起步，開創屬於自己的終身百萬年薪事業！
            </p>

            {/* Event Key Facts Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">日期與時間</div>
                  <div className="text-sm font-semibold text-white">{EVENT_DETAILS.dateFormatted}</div>
                  <div className="text-xs text-orange-400 font-medium">{EVENT_DETAILS.timeFormatted}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">活動地點</div>
                  <div className="text-sm font-semibold text-white">尖沙咀港威大廈5座11樓</div>
                  <div className="text-xs text-slate-400">BOC Life 演講廳 (海港城上蓋)</div>
                </div>
              </div>
            </div>

            {/* Live Countdown Timer Module */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl">
              <CountdownTimer />
            </div>

            {/* Quota Urgency & Progress */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">本次交流席位</span>
                  <span className="text-slate-400">嚴格限定 {totalSeats} 人保證交流品質</span>
                </div>
                <div className="font-mono tabular-nums font-bold text-orange-400">
                  僅餘 {remainingSeats} 席 ({percentTaken}% 已預訂)
                </div>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${percentTaken}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>✓ 審核通過後即時發放專屬電子入場門票</span>
                <span className="text-orange-300 font-medium">出席即獲抽獎券 1 張</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onRegisterClick}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all text-base active:scale-98 cursor-pointer"
              >
                <span>立即填表·鎖定席位</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPoster}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium transition-colors text-sm cursor-pointer"
              >
                <Eye className="w-4 h-4 text-slate-400" />
                <span>預覽官方邀請海報</span>
              </button>

              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium transition-colors text-sm"
                title="加入 Google 日曆提醒"
              >
                <CalendarPlus className="w-4 h-4 text-orange-400" />
                <span>加入行事曆</span>
              </a>
            </div>

            {/* Quiet Trust Signals */}
            <div className="flex items-center gap-6 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                費用全免 · 贊助支持
              </span>
              <span className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-orange-400" />
                現場 iPad 128GB 抽獎機會
              </span>
            </div>

          </div>

          {/* Right Column: Visual Poster Card & Lucky Draw Spotlight */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto group">
              
              {/* Decorative aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none" />

              {/* Poster Container */}
              <div
                onClick={onOpenPoster}
                className="relative cursor-pointer rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              >
                <img
                  src={EVENT_DETAILS.posterPath}
                  alt="PP PASSION Business Talk 2026 活動海報"
                  className="w-full h-auto object-cover block"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-sm backdrop-blur-[2px]">
                  <Eye className="w-5 h-5 text-orange-400" />
                  <span>點擊放大檢視海報</span>
                </div>
              </div>

              {/* Floating Callout: Lucky Draw iPad WiFi 128GB */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-orange-500/30 flex items-center gap-3 shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6 text-orange-400 animate-bounce" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-orange-400 font-semibold">
                    出席專享 · 幸運大抽獎
                  </div>
                  <div className="text-sm font-bold text-white">
                    IPAD Wifi 128GB 一部
                  </div>
                  <div className="text-[11px] text-slate-400">
                    2026年11月20日活動尾聲現場抽出，每位出席者皆獲1張抽獎券
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
