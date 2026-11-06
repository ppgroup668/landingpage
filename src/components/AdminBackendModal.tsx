import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, Calendar, Users, Edit, Download, Plus, Trash2, CheckCircle2, XCircle, RefreshCw, Save, Archive, History } from 'lucide-react';
import { DinnerEvent, DinnerVote, AttendanceStatus } from '../types';

interface AdminBackendModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEvent: DinnerEvent;
  allEvents: DinnerEvent[];
  votes: DinnerVote[];
  onUpdateEvent: (updatedEvent: DinnerEvent) => void;
  onArchiveAndCreateNew: (newEvent: Omit<DinnerEvent, 'id' | 'createdAt' | 'status'>) => void;
  onDeleteVote: (voteId: string) => void;
  onManualAddVote: (vote: Omit<DinnerVote, 'id' | 'votedAt'>) => void;
  onUpdateVoteStatus: (voteId: string, newStatus: AttendanceStatus) => void;
}

export const AdminBackendModal: React.FC<AdminBackendModalProps> = ({
  isOpen,
  onClose,
  currentEvent,
  allEvents,
  votes,
  onUpdateEvent,
  onArchiveAndCreateNew,
  onDeleteVote,
  onManualAddVote,
  onUpdateVoteStatus
}) => {
  // Authentication state
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Active Tab: 'edit_event' | 'view_records'
  const [activeTab, setActiveTab] = useState<'edit_event' | 'view_records'>('view_records');

  // Selected event for records view
  const [selectedEventId, setSelectedEventId] = useState<string>(currentEvent.id);

  // Edit Event Form state
  const [editTitle, setEditTitle] = useState(currentEvent.title);
  const [editDate, setEditDate] = useState(currentEvent.date);
  const [editTime, setEditTime] = useState(currentEvent.time);
  const [editVenue, setEditVenue] = useState(currentEvent.venue);
  const [editAddress, setEditAddress] = useState(currentEvent.address || '');
  const [editNotes, setEditNotes] = useState(currentEvent.notes || '');
  const [editDeadline, setEditDeadline] = useState(currentEvent.deadline || '');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Records Table filter and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'attending' | 'not_attending'>('all');

  // Manual Add Voter form toggle
  const [isAddingVoter, setIsAddingVoter] = useState(false);
  const [newVoterName, setNewVoterName] = useState('');
  const [newVoterPhone, setNewVoterPhone] = useState('');
  const [newVoterStatus, setNewVoterStatus] = useState<AttendanceStatus>('attending');
  const [newVoterHeadcount, setNewVoterHeadcount] = useState(1);
  const [newVoterNotes, setNewVoterNotes] = useState('');

  if (!isOpen) return null;

  // Handle password submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '668668') {
      setIsAuthenticated(true);
      setErrorMsg('');
      setPassword('');
    } else {
      setErrorMsg('密碼不正確，請重新輸入 (提示：668668)');
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword('');
    setErrorMsg('');
    setSavedSuccessMsg('');
    onClose();
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setPassword('');
    setErrorMsg('');
  };

  // Handle Edit Event Submit
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: DinnerEvent = {
      ...currentEvent,
      title: editTitle.trim(),
      date: editDate,
      time: editTime,
      dateTimeIso: `${editDate}T${editTime}:00`,
      venue: editVenue.trim(),
      address: editAddress.trim(),
      notes: editNotes.trim(),
      deadline: editDeadline
    };

    onUpdateEvent(updated);
    setSavedSuccessMsg('✅ 食飯資料已成功更新並同步！');
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // Handle Manual Add Vote
  const handleAddVoterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoterName.trim() || !newVoterPhone.trim()) return;

    onManualAddVote({
      eventId: selectedEventId,
      name: newVoterName.trim(),
      phonePrefix: '+852',
      phone: newVoterPhone.trim(),
      status: newVoterStatus,
      headcount: newVoterStatus === 'attending' ? newVoterHeadcount : 0,
      notes: newVoterNotes.trim()
    });

    setNewVoterName('');
    setNewVoterPhone('');
    setNewVoterNotes('');
    setIsAddingVoter(false);
  };

  // 1. Password Verification Screen (Password input hidden)
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-center">
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-amber-400 shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            後台管理權限驗證
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            請輸入管理密碼以修改食飯日期或查看完整出席紀錄名單。
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                {/* Masked Password Input */}
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
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border ${
                    errorMsg ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-orange-500'
                  } rounded-2xl text-slate-900 dark:text-white text-center text-sm font-mono tracking-widest focus:outline-none transition-colors placeholder:font-sans placeholder:tracking-normal`}
                />
              </div>

              {errorMsg && (
                <div className="mt-2 text-xs text-red-500 flex items-center justify-center gap-1.5 animate-fadeIn font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                確認解鎖後台
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // 2. Unlocked Admin Workspace
  const currentEventVotes = votes.filter((v) => v.eventId === selectedEventId);
  const attendingVotes = currentEventVotes.filter((v) => v.status === 'attending');
  const notAttendingVotes = currentEventVotes.filter((v) => v.status === 'not_attending');
  const totalHeadcount = attendingVotes.reduce((sum, v) => sum + (v.headcount || 1), 0);

  const filteredVotes = currentEventVotes.filter((v) => {
    const matchesFilter = filterStatus === 'all' || v.status === filterStatus;
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.phone.includes(searchTerm) ||
      (v.notes && v.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const exportToCsv = () => {
    const currentViewEvent = allEvents.find((e) => e.id === selectedEventId) || currentEvent;
    const headers = ['活動名稱', '食飯日期', '名字', '手機前綴', '手機號碼', '出席狀態', '出席人數', '留言備註', '投票時間'];
    const rows = filteredVotes.map((v) => [
      `"${currentViewEvent.title}"`,
      `"${currentViewEvent.date} ${currentViewEvent.time}"`,
      `"${v.name}"`,
      `"${v.phonePrefix}"`,
      `"${v.phone}"`,
      `"${v.status === 'attending' ? '出席' : '不出席'}"`,
      `"${v.headcount}"`,
      `"${(v.notes || '').replace(/"/g, '""')}"`,
      `"${v.votedAt}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `食飯出席紀錄_${currentViewEvent.date}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="px-6 py-4 bg-amber-50/80 dark:bg-slate-950 border-b border-amber-200/80 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              🛠️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                  食飯聚餐後台管理中心
                </h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                  已驗證登入
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                管理食飯日期、地點、備註及完整同仁出席投票紀錄
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLock}
              className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="退出並重新上鎖"
            >
              <Lock className="w-3.5 h-3.5 text-orange-500" />
              <span>重新鎖定</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2 Main Functional Tabs */}
        <div className="px-6 py-2.5 bg-slate-100 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('view_records')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'view_records'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>查看番食飯紀錄 ({currentEventVotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('edit_event')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'edit_event'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Edit className="w-4 h-4" />
            <span>Edit 食飯日期與活動資料</span>
          </button>
        </div>

        {/* Tab 1: EDIT DINNER DATE & INFO */}
        {activeTab === 'edit_event' && (
          <div className="p-6 overflow-y-auto flex-1">
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>自訂聚餐日期與詳情</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    在此修改食飯日期、時間及餐廳，前台將即時更新並重新計算開飯倒計時。
                  </p>
                </div>
              </div>

              {savedSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center animate-fadeIn">
                  {savedSuccessMsg}
                </div>
              )}

              <form onSubmit={handleSaveEvent} className="space-y-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    聚餐活動標題
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="例：🎉 團隊月度歡聚食飯"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 font-semibold"
                  />
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      食飯日期 (Date)
                    </label>
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      食飯時間 (Time)
                    </label>
                    <input
                      type="time"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    餐廳名稱 / 地點
                  </label>
                  <input
                    type="text"
                    value={editVenue}
                    onChange={(e) => setEditVenue(e.target.value)}
                    placeholder="例：尖沙咀港威大廈 八月花中菜館"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    詳細地址 (選填)
                  </label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="例：尖沙咀廣東道15號海港城港威大廈商場3樓"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    投票截止時間提示 (選填)
                  </label>
                  <input
                    type="text"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    placeholder="例：2026-11-18 18:00"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    聚餐溫馨提示 / 備註
                  </label>
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    rows={3}
                    placeholder="例：感謝各位辛勤付出，公司全數贊助包廂！請大家盡快投票以便訂位點菜。"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>儲存並即時更新食飯日期及詳情</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* Tab 2: VIEW DINNER ATTENDANCE RECORDS */}
        {activeTab === 'view_records' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Event Selector & Stats Strip */}
            <div className="p-4 sm:px-6 bg-slate-50/70 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">選擇聚餐活動：</span>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                >
                  {allEvents.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.date}) {ev.status === 'archived' ? '[歷史紀錄]' : '[當前活動]'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  出席：{totalHeadcount} 人 ({attendingVotes.length} 票)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold">
                  不出席：{notAttendingVotes.length} 人
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 font-bold">
                  總回覆：{currentEventVotes.length} 票
                </span>
              </div>

            </div>

            {/* Search, Filter & Actions Toolbar */}
            <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
              
              <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜尋姓名、電話或留言..."
                  className="flex-1 max-w-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                >
                  <option value="all">全部狀態</option>
                  <option value="attending">僅出席</option>
                  <option value="not_attending">僅不出席</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setIsAddingVoter(!isAddingVoter)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-orange-500" />
                  <span>手動新增紀錄</span>
                </button>

                <button
                  onClick={exportToCsv}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>匯出 CSV / Excel</span>
                </button>
              </div>

            </div>

            {/* Manual Add Voter Inline Box */}
            {isAddingVoter && (
              <form onSubmit={handleAddVoterSubmit} className="p-4 bg-amber-50/90 dark:bg-slate-950 border-b border-amber-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end shrink-0 animate-fadeIn">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">同仁姓名</label>
                  <input
                    type="text"
                    value={newVoterName}
                    onChange={(e) => setNewVoterName(e.target.value)}
                    placeholder="姓名"
                    required
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">電話號碼</label>
                  <input
                    type="tel"
                    value={newVoterPhone}
                    onChange={(e) => setNewVoterPhone(e.target.value)}
                    placeholder="91234567"
                    required
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">出席狀態</label>
                  <select
                    value={newVoterStatus}
                    onChange={(e) => setNewVoterStatus(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                  >
                    <option value="attending">出席</option>
                    <option value="not_attending">不出席</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">備註 / 留言</label>
                  <input
                    type="text"
                    value={newVoterNotes}
                    onChange={(e) => setNewVoterNotes(e.target.value)}
                    placeholder="備註"
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold"
                  >
                    新增
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingVoter(false)}
                    className="px-2 py-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs"
                  >
                    取消
                  </button>
                </div>
              </form>
            )}

            {/* Records Table */}
            <div className="flex-1 overflow-auto p-4 sm:px-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase bg-slate-50/50 dark:bg-slate-950/40">
                    <th className="py-2.5 px-3">名字</th>
                    <th className="py-2.5 px-3">手機電話</th>
                    <th className="py-2.5 px-3">出席狀態</th>
                    <th className="py-2.5 px-3">連同人數</th>
                    <th className="py-2.5 px-3">留言備註</th>
                    <th className="py-2.5 px-3">投票時間</th>
                    <th className="py-2.5 px-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {filteredVotes.map((v) => {
                    const isAttending = v.status === 'attending';

                    return (
                      <tr key={v.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          {v.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {v.phonePrefix} {v.phone}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {isAttending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>出席</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              <span>不出席</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-bold whitespace-nowrap">
                          {isAttending ? `${v.headcount}人` : '-'}
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                          {v.notes || '-'}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                          {new Date(v.votedAt).toLocaleDateString()} {new Date(v.votedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            {/* Toggle quick status */}
                            <button
                              onClick={() => onUpdateVoteStatus(v.id, isAttending ? 'not_attending' : 'attending')}
                              className="px-2 py-0.8 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                              title="快速切換出席狀態"
                            >
                              改為{isAttending ? '不出席' : '出席'}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                if (confirm(`確定刪除 ${v.name} 的投票紀錄嗎？`)) {
                                  onDeleteVote(v.id);
                                }
                              }}
                              className="p-1 rounded text-slate-400 hover:text-red-500 cursor-pointer"
                              title="刪除紀錄"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredVotes.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  未有相關投票紀錄
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span>聚餐紀錄資料即時自動保存於系統中</span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
          >
            返回投票首頁
          </button>
        </div>

      </div>
    </div>
  );
};
