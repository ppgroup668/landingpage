import React, { useState } from 'react';
import { X, Download, Search, Users, Eye, Lock, KeyRound, AlertCircle, LogOut } from 'lucide-react';
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
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCareer, setFilterCareer] = useState('all');

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '668668') {
      setIsAuthenticated(true);
      setErrorMsg('');
      setPassword('');
    } else {
      setErrorMsg('密碼不正確，請重新輸入');
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword('');
    setErrorMsg('');
    onClose();
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setPassword('');
    setErrorMsg('');
  };

  // 1. Password Verification Screen (Hidden Password Input)
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-center">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Lock Icon */}
          <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-4 text-orange-400 shadow-lg shadow-orange-500/10">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-white font-display">
            主辦方管理驗證
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            此名冊包含出席嘉賓聯絡電話及個人資料，請輸入管理密碼以解鎖查看名單。
          </p>

          {/* Password Form */}
          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                {/* Password input with type="password" to keep password hidden */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  autoFocus
                  placeholder="請輸入查看密碼"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border ${
                    errorMsg ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-orange-500'
                  } rounded-xl text-white text-center text-sm font-mono tracking-widest focus:outline-none transition-colors placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-500`}
                />
              </div>

              {errorMsg && (
                <div className="mt-2 text-xs text-red-400 flex items-center justify-center gap-1.5 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                確認解鎖
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // 2. Authenticated Roster Screen
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
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  主辦方名冊管理 · BUSINESS TALK 2026
                </h3>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  已解鎖
                </span>
              </div>
              <p className="text-xs text-slate-400">
                已登記嘉賓：{registrations.length} / {totalSeats} 人 · 剩餘席位：{Math.max(0, totalSeats - registrations.length)} 席
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>匯出 CSV / Excel</span>
            </button>

            <button
              onClick={handleLock}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
              title="重新鎖定名單"
            >
              <LogOut className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">鎖定</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="關閉視窗"
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
            <option value="助理">行政秘助 / PA</option>
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
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 hover:text-orange-300 text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
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
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            關閉視窗
          </button>
        </div>

      </div>
    </div>
  );
};
