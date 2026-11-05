import React, { useState } from 'react';
import { X, CheckCircle, Calendar, MapPin, Gift, Download, CalendarPlus, Share2, Printer, Check } from 'lucide-react';
import { RegistrationTicket } from '../types';
import { EVENT_DETAILS } from '../data/initialData';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface TicketModalProps {
  ticket: RegistrationTicket | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!ticket) return null;

  const handleShareWhatsApp = () => {
    const text = `我已報名參加 PP PASSION【2026 BUSINESS TALK 銀保渠道事業發展分享會】！\n入場編號：${ticket.registrationNo}\niPad抽獎編號：${ticket.luckyDrawNumber}\n日期：2026年11月20日 20:00\n地點：尖沙咀港威大廈5座11樓 BOC Life\n你也一起來探索文職轉型TOT/COT的成功經驗吧！`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ticket.registrationNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg my-8 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Celebration Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-center text-white text-xs font-semibold flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>報名成功！專屬席位與 iPad 抽獎資格已鎖定</span>
        </div>

        {/* Ticket Container */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Card Ticket Header */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-orange-500/40 p-5 shadow-xl relative overflow-hidden">
            
            {/* Ticket Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="text-[11px] font-bold text-orange-400 tracking-wider uppercase">
                  OFFICIAL ADMISSION PASS · 電子入場券
                </div>
                <div className="text-xl font-bold text-white font-display mt-0.5">
                  PP PASSION · BUSINESS TALK 2026
                </div>
                <div className="text-xs text-slate-300">
                  銀保渠道 事業發展分享會
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase">編號 NO.</div>
                <div className="font-mono tabular-nums text-sm font-bold text-orange-400">
                  {ticket.registrationNo}
                </div>
              </div>
            </div>

            {/* Attendee Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">出席嘉賓 ATTENDEE</div>
                <div className="font-bold text-white text-sm mt-0.5">
                  {ticket.formData.chineseName}
                </div>
                <div className="text-slate-400 text-[11px]">{ticket.formData.englishName}</div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">預留席號 SEAT</div>
                <div className="font-mono font-bold text-orange-300 text-sm mt-0.5">
                  {ticket.seatNumber}
                </div>
                <div className="text-slate-400 text-[11px]">
                  {ticket.formData.bringingGuest ? `+同行: ${ticket.formData.guestName}` : '單人預約'}
                </div>
              </div>
            </div>

            {/* Lucky Draw Box */}
            <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-500/50 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-orange-300 font-medium">iPad 128GB 幸運抽獎號碼</div>
                  <div className="font-mono text-base font-extrabold text-white tracking-wider">
                    {ticket.luckyDrawNumber}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-orange-300 bg-orange-900/60 px-2 py-1 rounded border border-orange-500/30">
                現場有效
              </span>
            </div>

            {/* Event Time & Venue Info */}
            <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>2026年11月20日 (星期五) 20:00 (19:30開放入場)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>尖沙咀廣東道15號港威大廈5座11樓 BOC Life</span>
              </div>
            </div>

            {/* Barcode Mock Visual */}
            <div className="mt-4 pt-3 border-t border-dashed border-slate-800 flex flex-col items-center justify-center">
              <div className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                ||| | |||| | ||| |||| | ||||| | || |||| | ||| | |||
              </div>
              <div className="font-mono text-[9px] text-slate-400 mt-1">
                AUTH: {ticket.ticketCode} · 憑此碼簽到入場
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => downloadIcsFile(ticket.registrationNo)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-orange-400" />
              <span>下載行事曆 .ICS</span>
            </button>

            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-orange-400" />
              <span>加入 Google 日曆</span>
            </a>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp 分享通知</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Printer className="w-3.5 h-3.5 text-orange-400" />}
              <span>{copied ? '已複製編號！' : '複製入場號碼'}</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
            >
              我已保存，返回活動首頁
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
