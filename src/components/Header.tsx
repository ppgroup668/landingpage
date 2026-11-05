import React, { useState } from 'react';
import { Menu, X, Users, Sparkles } from 'lucide-react';

interface HeaderProps {
  onRegisterClick: () => void;
  onAdminClick: () => void;
  remainingSeats: number;
}

export const Header: React.FC<HeaderProps> = ({
  onRegisterClick,
  onAdminClick,
  remainingSeats,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-bold text-white shadow-md shadow-orange-500/20 text-sm tracking-wider font-display">
            PP
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors font-display">
            PP 彼坡 PASSION
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#speakers" className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0">
            分享嘉賓
          </a>
          <a href="#highlights" className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0">
            渠道亮點
          </a>
          <a href="#agenda" className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0">
            分享日程
          </a>
          <a href="#lucky-draw" className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>iPad 抽獎</span>
          </a>
          <a href="#venue" className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0">
            地點交通
          </a>
          <a href="#faq" className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0">
            常見問題
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onAdminClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="查看已登記名單"
          >
            <Users className="w-3.5 h-3.5" />
            <span>報名名單</span>
          </button>

          <button
            onClick={onRegisterClick}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-lg shadow-md shadow-orange-500/20 transition-all hover:shadow-orange-500/30 whitespace-nowrap shrink-0 active:scale-95"
          >
            立即預留席位
            {remainingSeats > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-black/30 rounded text-[11px] font-mono tabular-nums">
                餘{remainingSeats}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            aria-label="選單開關"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <a
            href="#speakers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-orange-400 py-1"
          >
            分享嘉賓 (Yue Wong & Cecilia Yik)
          </a>
          <a
            href="#highlights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-orange-400 py-1"
          >
            銀保渠道優勢
          </a>
          <a
            href="#agenda"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-orange-400 py-1"
          >
            分享日程安排
          </a>
          <a
            href="#lucky-draw"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-orange-400 py-1"
          >
            iPad WiFi 128GB 抽獎須知
          </a>
          <a
            href="#venue"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-orange-400 py-1"
          >
            尖沙咀港威大廈地點指引
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-orange-400 py-1"
          >
            常見問題 FAQ
          </a>
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAdminClick();
              }}
              className="flex-1 py-2 text-xs font-medium text-slate-300 bg-slate-800 rounded-lg text-center"
            >
              已登記名單管理
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="flex-1 py-2 text-xs font-semibold text-white bg-orange-600 rounded-lg text-center"
            >
              立刻填表報名
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
