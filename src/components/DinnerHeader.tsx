import React from 'react';
import { Utensils, Lock, Users, Calendar } from 'lucide-react';

interface DinnerHeaderProps {
  onOpenAdmin: () => void;
  attendingCount: number;
}

export const DinnerHeader: React.FC<DinnerHeaderProps> = ({ onOpenAdmin, attendingCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-amber-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200/80 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-lg font-bold">
            🍽️
          </div>
          <div>
            <div className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white font-display flex items-center gap-2">
              <span>歡聚食飯 · 出席投票</span>
            </div>
            <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium hidden sm:block">
              線上聚會出席登記 · 方便訂位點名
            </div>
          </div>
        </div>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-slate-800 border border-amber-300/60 dark:border-slate-700 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <span>🎉 目前已報名出席：</span>
            <span className="font-bold text-orange-600 dark:text-orange-400 font-mono tabular-nums">{attendingCount} 人</span>
          </div>

          {/* Admin / Organizer Button with Lock Icon */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 text-xs sm:text-sm font-bold shadow-md hover:bg-slate-800 dark:hover:bg-amber-400 transition-all cursor-pointer"
            title="管理員進入後台（需輸入密碼 668668）"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400 dark:text-slate-900" />
            <span>後台管理</span>
            <span className="text-[10px] opacity-75 hidden md:inline">(Edit日期/查紀錄)</span>
          </button>
        </div>

      </div>
    </header>
  );
};
