import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/initialData';

export const FAQSection: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase mb-2">
            FREQUENTLY ASKED QUESTIONS · 常見問題解惑
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            報名前您可能想了解的細節
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            無論是轉職疑惑、活動費用或抽獎規範，以下為您整理最常見解答。
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-orange-400">
                      0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Inquiries Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-orange-400 text-sm font-semibold">
            <MessageSquare className="w-4 h-4" />
            <span>還有其他疑問？歡迎直接在報名表中留言</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            您在在線報名表格中留下的任何問題，我們的大會策劃導師將在會前主動與您聯絡，或在 21:15 圓桌問答環節由嘉賓直接現場解答。
          </p>
          <div className="pt-1">
            <button
              onClick={onRegisterClick}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors"
            >
              前往登記報名 (限額 50 席)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
