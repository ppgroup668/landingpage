import React, { useState } from 'react';
import { User, Phone, CheckCircle2, XCircle, MessageSquare, Check, Sparkles, RefreshCw, Send } from 'lucide-react';
import { AttendanceStatus, DinnerVote } from '../types';

interface DinnerVotingFormProps {
  eventId: string;
  onVoteSubmit: (vote: Omit<DinnerVote, 'id' | 'votedAt'>) => void;
  myPreviousVote?: DinnerVote | null;
}

export const DinnerVotingForm: React.FC<DinnerVotingFormProps> = ({
  eventId,
  onVoteSubmit,
  myPreviousVote
}) => {
  const [name, setName] = useState(myPreviousVote?.name || '');
  const [phonePrefix, setPhonePrefix] = useState(myPreviousVote?.phonePrefix || '+852');
  const [phone, setPhone] = useState(myPreviousVote?.phone || '');
  const [status, setStatus] = useState<AttendanceStatus>(myPreviousVote?.status || 'attending');
  const [headcount, setHeadcount] = useState<number>(myPreviousVote?.headcount || 1);
  const [notes, setNotes] = useState(myPreviousVote?.notes || '');
  
  const [submittedVote, setSubmittedVote] = useState<DinnerVote | null>(myPreviousVote || null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) {
      err.name = '請輸入您的姓名或暱稱';
    }
    if (!phone.trim()) {
      err.phone = '請輸入手機電話號碼';
    } else if (!/^[0-9]{8,15}$/.test(phone.replace(/[\s-]/g, ''))) {
      err.phone = '請輸入有效的手機號碼 (至少8位數字)';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const voteData = {
        eventId,
        name: name.trim(),
        phonePrefix,
        phone: phone.trim(),
        status,
        headcount: status === 'attending' ? headcount : 0,
        notes: notes.trim()
      };

      onVoteSubmit(voteData);

      const savedVote: DinnerVote = {
        id: `vote-${Date.now()}`,
        votedAt: new Date().toISOString(),
        ...voteData
      };
      setSubmittedVote(savedVote);
      setIsSubmitting(false);
    }, 400);
  };

  // If already submitted in this session, show the confirmation card
  if (submittedVote) {
    const isAttending = submittedVote.status === 'attending';

    return (
      <section id="voting-form" className="py-8 sm:py-12 bg-amber-50/40 dark:bg-slate-950/60 border-t border-amber-200/60 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-slate-800 p-6 sm:p-8 shadow-xl text-center">
            
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg ${
              isAttending ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600'
            }`}>
              {isAttending ? '🎉' : '💌'}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 mb-2">
              <Check className="w-3.5 h-3.5" />
              <span>投票成功！已為您記錄回覆</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              多謝回覆，{submittedVote.name}！
            </h3>

            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">出席狀態：</span>
                <span className={`font-bold ${isAttending ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isAttending ? `確認出席 (${submittedVote.headcount}人)` : '遺憾未能出席'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">登記手機：</span>
                <span className="font-mono text-slate-700 dark:text-slate-200">
                  {submittedVote.phonePrefix} {submittedVote.phone}
                </span>
              </div>
              {submittedVote.notes && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block text-xs">您的留言：</span>
                  <span className="text-slate-800 dark:text-slate-200 text-xs italic">
                    "{submittedVote.notes}"
                  </span>
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              如果行程有變，可以隨時點擊下方按鈕更新您的出席意願。
            </p>

            <button
              onClick={() => setSubmittedVote(null)}
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>修改我的出席意願</span>
            </button>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="voting-form" className="py-10 sm:py-16 bg-amber-50/50 dark:bg-slate-950/70 border-t border-amber-200/60 dark:border-slate-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Form Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATTENDANCE RSVP · 出席意願登記</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            每人登記姓名與電話 · 投票出席
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            請選擇出席或不出席，方便發起人統計總人數及向餐廳訂座。
          </p>
        </div>

        {/* The Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-amber-200/90 dark:border-slate-800 shadow-xl p-6 sm:p-9 relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Attend / Not Attend Big Toggle (Crucial!) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                您的出席意願 <span className="text-orange-600">*</span>
              </label>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setStatus('attending')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center ${
                    status === 'attending'
                      ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-md scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-2xl">🎉</div>
                  <div className="text-sm sm:text-base font-bold flex items-center gap-1">
                    <CheckCircle2 className={`w-4 h-4 ${status === 'attending' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                    <span>出席食飯</span>
                  </div>
                  <div className="text-[11px] opacity-80">
                    一定到，預我一份！
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('not_attending')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center ${
                    status === 'not_attending'
                      ? 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 shadow-md scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-rose-300'
                  }`}
                >
                  <div className="text-2xl">😢</div>
                  <div className="text-sm sm:text-base font-bold flex items-center gap-1">
                    <XCircle className={`w-4 h-4 ${status === 'not_attending' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`} />
                    <span>不出席</span>
                  </div>
                  <div className="text-[11px] opacity-80">
                    有事未能前來
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                您的名字 / 稱呼 <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：陳志強 (David) 或 暱稱"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border ${
                    errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-orange-500'
                  } rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none transition-colors`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* 3. Phone Number Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                手機電話號碼 <span className="text-orange-600">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                  className="w-28 px-3 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="+852">+852 (HK)</option>
                  <option value="+853">+853 (MO)</option>
                  <option value="+86">+86 (CN)</option>
                  <option value="+886">+886 (TW)</option>
                </select>

                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="例：91234567"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border ${
                      errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-orange-500'
                    } rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none transition-colors font-mono`}
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              <p className="text-[11px] text-slate-400 mt-1">方便發起人在訂位確認或地點變更時透過 WhatsApp 聯絡您。</p>
            </div>

            {/* 4. Headcount if Attending */}
            {status === 'attending' && (
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800/60 border border-amber-200/80 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  出席人數 (連同自己)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHeadcount(num)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        headcount === num
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {num === 1 ? '1人 (自己)' : `${num}人 (+${num - 1}位同行)`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Notes / Food Preferences (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>留言備註 / 想食咩 / 飲食偏好 (選填)</span>
                <span className="text-[11px] text-slate-400 font-normal">選填</span>
              </label>
              <div className="relative">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder={status === 'attending' ? '例如：唔食牛肉、想試北京烤鴨、可能遲10分鐘到...' : '例如：當日要加班 / 祝大家食得開心...'}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-bold text-base text-white shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                status === 'attending'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-700 hover:to-teal-600 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 shadow-rose-500/20'
              }`}
            >
              {isSubmitting ? (
                <span>正在儲存您的投票...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    確認送出投票：{status === 'attending' ? `【確認出席 (${headcount}人)】` : '【不出席】'}
                  </span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-slate-400">
              ✓ 提交後即時生效 · 可隨時返回此頁修改
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
