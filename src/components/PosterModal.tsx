import React from 'react';
import { X, Download, ZoomIn, Calendar, MapPin, Gift, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS } from '../data/initialData';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  isOpen,
  onClose,
  onRegisterClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white font-display">
              PP PASSION · Business Talk 2026 官方邀請海報
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={EVENT_DETAILS.posterPath}
              download="PP_PASSION_Business_Talk_2026_Poster.jpeg"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors"
              title="下載原圖"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">下載海報</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="關閉海報預覽"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Image Viewport */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-950">
          <img
            src={EVENT_DETAILS.posterPath}
            alt="PP PASSION Business Talk 2026 官方海報高清版"
            className="w-full max-w-lg h-auto rounded-xl shadow-2xl border border-slate-800 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Modal Footer with quick CTA */}
        <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-2 text-center sm:text-left">
            <Gift className="w-4 h-4 text-orange-400 shrink-0" />
            <span>出席者有機會得到 IPAD Wifi 128GB 一部 (限 50 名額)</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              關閉
            </button>
            <button
              onClick={() => {
                onClose();
                onRegisterClick();
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md"
            >
              立即報名預約席位
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
