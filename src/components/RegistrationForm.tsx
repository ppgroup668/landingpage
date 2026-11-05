import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, Clock, Users, HelpCircle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { RegistrationFormData, RegistrationTicket } from '../types';

interface RegistrationFormProps {
  onSuccess: (ticket: RegistrationTicket) => void;
  remainingSeats: number;
  totalSeats: number;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  remainingSeats,
  totalSeats
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    chineseName: '',
    englishName: '',
    phonePrefix: '+852',
    phone: '',
    email: '',
    currentCareer: 'NGO 文職人員',
    yearsExperience: '3-5年',
    bringingGuest: false,
    guestName: '',
    careerQuestion: '',
    agreedTerms: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const careerOptions = [
    'NGO / 非牟利機構文職人員',
    '行政助理 / 秘書 / 私人助理 (PA)',
    '銀行櫃檯 / 零售門市 / 客戶服務',
    '教育培訓 / 學校行政',
    '應屆大專 / 大學畢業生',
    '其他行業轉職探索者'
  ];

  const experienceOptions = [
    '應屆畢業 / 1年以內',
    '1 - 3 年',
    '4 - 7 年',
    '8 年以上'
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.chineseName.trim()) {
      newErrors.chineseName = '請填寫中文姓名';
    }

    if (!formData.englishName.trim()) {
      newErrors.englishName = '請填寫英文姓名 (與證件相同)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '請填寫流動電話號碼';
    } else if (!/^[0-9]{8,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = '請輸入正確有效的電話號碼 (至少8位數字)';
    }

    if (!formData.email.trim()) {
      newErrors.email = '請填寫電郵地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請填寫有效的電郵格式';
    }

    if (formData.bringingGuest && !formData.guestName?.trim()) {
      newErrors.guestName = '請輸入同行朋友姓名以便預留相鄰席位';
    }

    if (!formData.agreedTerms) {
      newErrors.agreedTerms = '必須同意大會活動聯絡條款';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomSeq = Math.floor(10 + Math.random() * 89);
      const ticketSeq = Math.floor(1000 + Math.random() * 9000);
      const luckyNum = `LUCKY-${Math.floor(100 + Math.random() * 900)}`;
      const seatLetter = String.fromCharCode(65 + Math.floor(Math.random() * 4));
      const seatNo = `${seatLetter}-${String(Math.floor(1 + Math.random() * 20)).padStart(2, '0')}`;

      const newTicket: RegistrationTicket = {
        id: `reg-${Date.now()}`,
        registrationNo: `PP-20261120-0${randomSeq}`,
        ticketCode: `TKT-${ticketSeq}`,
        luckyDrawNumber: luckyNum,
        seatNumber: seatNo,
        createdAt: new Date().toISOString(),
        formData: { ...formData }
      };

      setIsSubmitting(false);
      onSuccess(newTicket);
    }, 600);
  };

  return (
    <section id="register" className="py-16 sm:py-24 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase mb-2">
            ONLINE REGISTRATION · 在線預約席位
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            報名參與 · 即時領取電子入場券
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            名額嚴格限定 50 位，費用全免。提交後系統將即時生成專屬電子門票及【iPad 128GB 抽獎編號】。
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-orange-300 bg-orange-950/40 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            <span className="font-semibold">席位緊缺：</span>
            <span>現僅剩最後 {remainingSeats} / {totalSeats} 個免費出席名額</span>
          </div>
        </div>

        {/* The Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Chinese & English Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  中文全名 <span className="text-orange-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.chineseName}
                    onChange={(e) => setFormData({ ...formData, chineseName: e.target.value })}
                    placeholder="例：陳大文"
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-950 border ${errors.chineseName ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'} rounded-xl text-white text-sm focus:outline-none transition-colors`}
                  />
                </div>
                {errors.chineseName && <p className="text-red-400 text-xs mt-1">{errors.chineseName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  英文全名 (與證件相同) <span className="text-orange-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.englishName}
                    onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                    placeholder="例：CHAN TAI MAN"
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-950 border ${errors.englishName ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'} rounded-xl text-white text-sm focus:outline-none transition-colors`}
                  />
                </div>
                {errors.englishName && <p className="text-red-400 text-xs mt-1">{errors.englishName}</p>}
              </div>
            </div>

            {/* Row 2: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  聯絡電話 (接收確認簡訊/WhatsApp) <span className="text-orange-400">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.phonePrefix}
                    onChange={(e) => setFormData({ ...formData, phonePrefix: e.target.value })}
                    className="w-24 px-2 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="+852">+852 (香港)</option>
                    <option value="+853">+853 (澳門)</option>
                    <option value="+86">+86 (內地)</option>
                    <option value="+886">+886 (台灣)</option>
                  </select>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="例：91234567"
                      className={`w-full pl-9 pr-3 py-2.5 bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'} rounded-xl text-white text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  電子郵件 (發送電子門票與行事曆) <span className="text-orange-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="例：name@example.com"
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'} rounded-xl text-white text-sm focus:outline-none transition-colors`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Row 3: Current Career & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  現時工作領域 / 背景 <span className="text-orange-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.currentCareer}
                    onChange={(e) => setFormData({ ...formData, currentCareer: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    {careerOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  工作年資
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    {experienceOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Row 4: Bring a guest */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.bringingGuest}
                  onChange={(e) => setFormData({ ...formData, bringingGuest: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-slate-200">
                  我想攜帶一位朋友 / 同事共同出席 (預留相鄰席位)
                </span>
              </label>

              {formData.bringingGuest && (
                <div className="mt-3 pl-7">
                  <label className="block text-xs text-slate-400 mb-1">
                    同行朋友全名 <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.guestName || ''}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="請輸入同行朋友中文或英文全名"
                    className="w-full sm:w-80 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                  {errors.guestName && <p className="text-red-400 text-xs mt-1">{errors.guestName}</p>}
                </div>
              )}
            </div>

            {/* Row 5: Career Question for Speakers */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
                <span>您最想向 Yue Wong 或 Cecilia Yik 諮詢的問題 (選填)</span>
              </label>
              <textarea
                value={formData.careerQuestion || ''}
                onChange={(e) => setFormData({ ...formData, careerQuestion: e.target.value })}
                rows={3}
                placeholder="例如：非金融學歷是否容易考取執照？零銷售經驗初期如何克服心理障礙？..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 placeholder-slate-600 transition-colors"
              />
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedTerms}
                  onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs text-slate-400 leading-relaxed">
                  我確認以上資料屬實，並同意主辦方「PP 彼坡 PASSION」透過 WhatsApp 或電子郵件發送電子入場門票、交通指引及 iPad 抽獎資格通知。資料嚴格保密，不作任何無關推廣。
                </span>
              </label>
              {errors.agreedTerms && <p className="text-red-400 text-xs mt-1">{errors.agreedTerms}</p>}
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-99 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>正在生成您的專屬電子門票...</span>
                ) : (
                  <>
                    <span>提交報名 · 即時領取電子入場券 & 抽獎號碼</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>費用全免 · 提交後即時取得正式編號 · 毋須額外審批手續</span>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
