import React, { useState } from 'react';
import { X, Download, Search, Users, Gift, Ticket, Eye, Trash2 } from 'lucide-react';
import { RegistrationTicket } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: RegistrationTicket[];
  onSelectTicket: (ticket: RegistrationTicket) => void;
  totalSeats: number;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  registrations,
  onSelectTicket,
  totalSeats
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCareer, setFilterCareer] = useState('all');

  if (!isOpen) return null;

  const filtered = registrations.filter((reg) => {
    const matchesSearch =
      reg.formData.chineseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.formData.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.formData.phone.includes(searchTerm) ||
      reg.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.luckyDrawNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCareer =
      filterCareer === 'all' || reg.formData.currentCareer.includes(filterCareer);

    return matchesSearch && matchesCareer;
  });

  const exportToCsv = () => {
    const headers = [
      '報名編號',
      '中文姓名',
      '英文姓名',
      '電話前綴',
      '電話號碼',
      '電郵地址',
      '現時行業',
      '年資',
      '攜帶同行者',
      '同行者姓名',
      '座位號',
      'iPad抽獎編號',
      '向嘉賓提問',
      '登記時間'
    ];

    const rows = registrations.map((r) => [
      `"${r.registrationNo}"`,
      `"${r.formData.chineseName}"`,
      `"${r.formData.englishName}"`,
      `"${r.formData.phonePrefix}"`,
      `"${r.formData.phone}"`,
      `"${r.formData.email}"`,
      `"${r.formData.currentCareer}"`,
      `"${r.formData.yearsExperience}"`,
      `"${r.formData.bringingGuest ? '是' : '否'}"`,
      `"${r.formData.guestName || ''}"`,
      `"${r.seatNumber}"`,
      `"${r.luckyDrawNumber}"`,
      `"${(r.formData.careerQuestion || '').replace(/"/g, '""')}"`,
      `"${r.createdAt}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PP_PASSION_Attendees_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                主辦方名冊管理 · BUSINESS TALK 2026
              </h3>
              <p className="text-xs text-slate-400">
                已登記嘉賓：{registrations.length} / {totalSeats} 人 · 剩餘席位：{Math.max(0, totalSeats - registrations.length)} 席
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>匯出 CSV / Excel</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋姓名、電話、報名編號或抽獎號..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={filterCareer}
            onChange={(e) => setFilterCareer(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
          >
            <option value="all">全部背景類別</option>
            <option value="NGO">NGO 文職</option>
            <option value="助理">行政秘書 / PA</option>
            <option value="銀行">銀行 / 零售服務</option>
            <option value="畢業">應屆畢業生</option>
          </select>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-1 p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold bg-slate-950/60">
                <th className="py-2.5 px-3">門票編號</th>
                <th className="py-2.5 px-3">中文姓名</th>
                <th className="py-2.5 px-3">英文姓名</th>
                <th className="py-2.5 px-3">聯絡電話</th>
                <th className="py-2.5 px-3">現時行業背景</th>
                <th className="py-2.5 px-3">預留席號</th>
                <th className="py-2.5 px-3">iPad 抽獎碼</th>
                <th className="py-2.5 px-3">同行嘉賓</th>
                <th className="py-2.5 px-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-orange-400 whitespace-nowrap">
                    {item.registrationNo}
                  </td>
                  <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                    {item.formData.chineseName}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {item.formData.englishName}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300 whitespace-nowrap">
                    {item.formData.phonePrefix} {item.formData.phone}
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-xs truncate">
                    {item.formData.currentCareer}
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-amber-300 whitespace-nowrap">
                    {item.seatNumber}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      {item.luckyDrawNumber}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {item.formData.bringingGuest ? (
                      <span className="text-slate-200">
                        +1 ({item.formData.guestName})
                      </span>
                    ) : (
                      <span className="text-slate-400">無</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => onSelectTicket(item)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 hover:text-orange-300 text-[11px] font-medium inline-flex items-center gap-1 transition-colors"
                      title="檢視電子門票"
                    >
                      <Eye className="w-3 h-3" />
                      <span>查看門票</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              沒有找到符合條件的登記記錄
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>共顯示 {filtered.length} 筆登記資料</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            關閉視窗
          </button>
        </div>

      </div>
    </div>
  );
};
