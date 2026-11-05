import React from 'react';
import { Award, TrendingUp, CheckCircle2, Quote, UserCheck } from 'lucide-react';
import { SPEAKERS } from '../data/initialData';

export const Speakers: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  return (
    <section id="speakers" className="py-16 sm:py-24 bg-slate-900/50 relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase mb-2">
            KEYNOTE SPEAKERS · 特邀分享嘉賓
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            文職轉型巔峰實錄 · 雙嘉賓傾囊相授
          </h2>
          <p className="mt-3 text-base text-slate-300">
            她們不是金融世家，亦無銷售起點；從非牟利機構文員與跨國公司私人助理，一步步邁向國際 TOT / COT 頂峰榮譽。
          </p>

          {/* Industry Benchmark explanation */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-300 font-medium">榮譽解讀：</span>
            <span>MDRT (全球百萬圓桌)</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">COT = 3倍 MDRT 標準</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-orange-400 font-bold">TOT = 6倍 MDRT 最高殿堂</span>
          </div>
        </div>

        {/* 2 Speakers Deep-Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {SPEAKERS.map((speaker, index) => {
            const isCecilia = speaker.id === 'cecilia-yik';

            return (
              <div
                key={speaker.id}
                className="flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-orange-500/40 transition-colors"
              >
                {/* Subtle corner badge */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full pointer-events-none" />

                <div className="space-y-6">
                  {/* Speaker Header Info */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                        {speaker.transitionOrigin}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mt-0.5">
                        {speaker.name}
                      </h3>
                      <div className="text-sm font-medium text-slate-300 mt-1">
                        {speaker.title} <span className="text-slate-500">·</span> {speaker.role}
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-400">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Honors List */}
                  <div className="flex flex-wrap gap-2">
                    {speaker.honors.map((honor, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700/80"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
                        {honor}
                      </span>
                    ))}
                  </div>

                  {/* Speaker Key Quote */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm italic text-slate-300 leading-relaxed relative">
                    <Quote className="w-5 h-5 text-orange-400/40 absolute top-2 right-2" />
                    “{speaker.keyQuote}”
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {speaker.bio}
                  </p>

                  {/* Talk Key Topics */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-orange-400" />
                      <span>本次講座重點傳授內容：</span>
                    </div>
                    <ul className="space-y-2">
                      {speaker.keyTopics.map((topic, tIdx) => (
                        <li key={tIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer action per speaker card */}
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    {isCecilia ? "6年快速升級高級分部經理" : "8年累積深厚高續約率客戶群"}
                  </div>
                  <button
                    onClick={onRegisterClick}
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1"
                  >
                    向 {speaker.englishName} 現場提問 →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
