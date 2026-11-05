import React from 'react';
import { Building2, Users2, ShieldAlert, BadgeDollarSign, Compass, Layers } from 'lucide-react';

export const WhyBancassurance: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  const pillars = [
    {
      icon: Building2,
      title: "強大銀行分行體系賦能",
      subtitle: "告別大海撈針與陌生拜訪",
      description: "傳統代理人往往需要四處尋找陌生客戶；而銀保渠道深度對接分行優質高淨值存戶及按揭理財客戶，具備天然品牌背書與高信任基礎。"
    },
    {
      icon: BadgeDollarSign,
      title: "透明高回報與長期被動收益",
      subtitle: "打破文職「年終調薪3%」魔咒",
      description: "除了優渥的首年佣金，更享有穩健的續保服務津貼與管理團隊複利獎勵。只要努力付出，年薪百萬並非遙不可及的口號。"
    },
    {
      icon: Compass,
      title: "專屬導師 1-on-1 孵化體系",
      subtitle: "零金融背景也能快速上手",
      description: "由 Yue Wong 及 Cecilia Yik 團隊親自傳授 IIQE 考牌秘訣、客戶洽談劇本演練與時間管理模型，讓你首月即建立實戰自信心。"
    },
    {
      icon: Users2,
      title: "自主掌控生活與彈性工時",
      subtitle: "掌握人生節奏與陪伴家庭時間",
      description: "打破朝九晚五機械式打卡。在完成業績目標的同時，可自主調配拜訪與進修日程，真正實現生活品質與高收入並存。"
    }
  ];

  return (
    <section id="highlights" className="py-16 sm:py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase mb-2">
            WHY BANCASSURANCE · 為什麼選擇銀保渠道
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            顛覆傳統直銷偏見 · 銀行級專業財富平台
          </h2>
          <p className="mt-3 text-base text-slate-300">
            許多人對理財顧問有「推銷拉人」的刻板印象，但銀保渠道憑藉制度化銀行客群與專業顧問定位，走出了截然不同的菁英成長路徑。
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-14 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 bg-slate-800/60 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-400" />
              <span className="font-semibold text-white text-base">模式深度對比：文職 vs 傳統保險 vs 銀保渠道</span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">2026 最新發展優勢分析</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/90 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800 font-medium">
                <tr>
                  <th className="py-3 px-4 sm:px-6">維度項目</th>
                  <th className="py-3 px-4 sm:px-6 text-slate-400">一般文職 / 秘書助理</th>
                  <th className="py-3 px-4 sm:px-6 text-slate-400">傳統保險陌生代理</th>
                  <th className="py-3 px-4 sm:px-6 text-orange-400 font-bold bg-orange-950/20">PP PASSION 銀保渠道</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">客源渠道</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">無（內部日常支援）</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">自找親友、問卷、冷敲門</td>
                  <td className="py-3.5 px-4 sm:px-6 text-orange-200 font-semibold bg-orange-950/20">
                    銀行分行轉介優質客群、高意向度
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">收入增長速度</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">每年微調 3%-5%，上限極低</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">極度不穩定，起步流失率高</td>
                  <td className="py-3.5 px-4 sm:px-6 text-orange-200 font-semibold bg-orange-950/20">
                    高首年佣金 + 續期年金 + 制度化新人專項津貼
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">社會地位與認同</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">執行底層庶務，易被科技取代</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">常被誤認為產品推銷員</td>
                  <td className="py-3.5 px-4 sm:px-6 text-orange-200 font-semibold bg-orange-950/20">
                    專業銀行財富策劃顧問、高淨值資產配置專家
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">晉升階梯</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">職位蘿蔔坑，排隊多年難升遷</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">單打獨鬥，難建立系統團隊</td>
                  <td className="py-3.5 px-4 sm:px-6 text-orange-200 font-semibold bg-orange-950/20">
                    指標客觀透明，業績達標即晉升分行經理/分部總監
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-orange-500/30 transition-all hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight font-display">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-orange-400 mt-1 mb-3">
                  {item.subtitle}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onRegisterClick}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-lg shadow-orange-500/20 text-sm active:scale-95"
          >
            親身了解銀保轉型機遇 · 預留交流席位
          </button>
        </div>

      </div>
    </section>
  );
};
