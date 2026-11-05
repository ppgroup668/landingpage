import React from 'react';
import { Clock, Calendar, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { AGENDA, EVENT_DETAILS } from '../data/initialData';

export const Agenda: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  return (
    <section id="agenda" className="py-16 sm:py-24 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase mb-2">
            EVENT AGENDA · 活動日程安排
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            2026年11月20日 星期五 · 實戰分享流程
          </h2>
          <p className="mt-3 text-base text-slate-300">
            緊湊充實的 105 分鐘乾貨分享，涵蓋行業趨勢、心路歷程、實戰拆解、現場問答以及萬眾期待的 iPad 幸運抽獎。
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {AGENDA.map((item, idx) => {
            const isLuckyDraw = idx === AGENDA.length - 1;
            const isKeynote = idx === 2 || idx === 3;

            return (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isLuckyDraw
                    ? 'bg-gradient-to-r from-orange-950/60 via-slate-900 to-amber-950/40 border-orange-500/50 shadow-lg shadow-orange-500/10'
                    : isKeynote
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums text-sm font-bold text-orange-400 px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60">
                      {item.time}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  {isLuckyDraw && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400">
                      <Gift className="w-4 h-4 text-orange-400" />
                      <span>送出 iPad WiFi 128GB 一部</span>
                    </div>
                  )}
                </div>

                <h3 className={`text-lg sm:text-xl font-bold mt-2 ${isLuckyDraw ? 'text-orange-300' : 'text-white'}`}>
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Note */}
        <div className="mt-10 max-w-4xl mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span>敬請於 19:30 - 19:50 期間抵達尖沙咀港威大廈5座11樓 BOC Life 會場完成簽到，以免錯過開場及抽獎券發放。</span>
          </div>
          <button
            onClick={onRegisterClick}
            className="text-orange-400 hover:text-orange-300 font-semibold whitespace-nowrap"
          >
            立即預留席位 →
          </button>
        </div>

      </div>
    </section>
  );
};
