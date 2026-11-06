import React, { useState } from 'react';
import { Lock, Share2, Check } from 'lucide-react';
import { DinnerEvent } from '../types';

interface DinnerFooterProps {
  onOpenAdmin: () => void;
  event: DinnerEvent;
}

export const DinnerFooter: React.FC<DinnerFooterProps> = ({ onOpenAdmin, event }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `📢 【${event.title}】投票出席開始啦！\n📅 日期時間：${event.date} ${event.time}\n📍 地點：${event.venue}\n請大家點擊連結入名字及電話投票出席：${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="bg-amber-100/60 dark:bg-slate-950 border-t border-amber-200/80 dark:border-slate-800 py-8 text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        <div>
          <div className="font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
            <span>🍽️ 歡聚食飯 · 出席投票系統</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            輕鬆統計同仁朋友聚會人數 · 方便餐廳訂座
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-300/80 dark:border-slate-700 hover:bg-amber-50 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-orange-500" />}
            <span>{copied ? '已複製邀請文案！' : '複製 WhatsApp 邀請文案'}</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-amber-300 dark:text-amber-400 text-xs font-bold transition-colors cursor-pointer"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>後台管理</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
