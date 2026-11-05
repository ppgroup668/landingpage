import React from 'react';
import { Calendar, MapPin, Gift, Shield } from 'lucide-react';
import { EVENT_DETAILS } from '../data/initialData';

export const Footer: React.FC<{
  onRegisterClick: () => void;
  onOpenPoster: () => void;
  onAdminClick: () => void;
}> = ({ onRegisterClick, onOpenPoster, onAdminClick }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand Wordmark & Event summary */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-bold text-white text-xs">
                PP
              </div>
              <span className="text-base font-bold text-white tracking-tight font-display">
                PP 彼坡 PASSION
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              2026 BUSINESS TALK · 銀保渠道 事業發展分享會。匯聚跨界菁英，打破文職薪資瓶頸，攜手中銀人壽夥伴平台共創百萬年薪新藍圖。
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              尖沙咀廣東道15號港威大廈5座11樓 BOC Life
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              活動快速導航
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#speakers" className="hover:text-orange-400 transition-colors">
                  特邀嘉賓 · Yue Wong & Cecilia Yik
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-orange-400 transition-colors">
                  為什麼選擇銀保渠道 (Bancassurance)
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-orange-400 transition-colors">
                  2026年11月20日 流程日程安排
                </a>
              </li>
              <li>
                <a href="#lucky-draw" className="hover:text-orange-400 transition-colors">
                  Apple iPad WiFi 128GB 抽獎須知
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-orange-400 transition-colors">
                  交通導航與海港城港威大廈泊車
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Actions & Security */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              活動管理與預約
            </div>
            <div className="space-y-2">
              <button
                onClick={onRegisterClick}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors text-xs text-center cursor-pointer"
              >
                即刻在線預留 50 個免費席位
              </button>

              <button
                onClick={onOpenPoster}
                className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-xs text-center cursor-pointer"
              >
                檢視官方大會海報
              </button>

              <button
                onClick={onAdminClick}
                className="w-full py-1.5 px-4 rounded-xl text-slate-400 hover:text-slate-300 text-[11px] text-center"
              >
                工作人員 · 登記名錄查詢
              </button>
            </div>
          </div>

        </div>

        {/* Quiet copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 PP 彼坡 PASSION. 版權所有。
          </div>
          <div className="flex items-center gap-4">
            <span>主辦：PP 彼坡 PASSION</span>
            <span aria-hidden="true">·</span>
            <span>地點：尖沙咀港威大廈 BOC Life</span>
            <span aria-hidden="true">·</span>
            <span>出席享 iPad 128GB 抽獎</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
