import React, { useState } from 'react';
import { Gift, Sparkles, Check, Tablet, RefreshCw, Trophy } from 'lucide-react';

export const LuckyDrawSection: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [simulatedWinner, setSimulatedWinner] = useState<string | null>(null);

  const handleSimulateDraw = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSimulatedWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      const randomCode = `LUCKY-${Math.floor(100 + Math.random() * 900)}`;
      setSimulatedWinner(randomCode);

      if (counter > 15) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <section id="lucky-draw" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Prize Details & Rules */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase">
              EXCLUSIVE PERK · 出席者專享禮遇
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              出席即有機會獲得 <span className="text-orange-400">Apple iPad WiFi 128GB</span> 一部
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              為感謝每一位熱愛生活、積極尋求突破的職場菁英，主辦方「PP 彼坡 PASSION」特別準備全新 Apple iPad WiFi 128GB 作為大會壓軸抽獎禮物！凡在線完成登記並準時出席現場者，均獲專屬幸運抽獎序號。
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">資格一：完成在線登記</div>
                  <div className="text-xs text-slate-400">填寫下方申請表，取得系統自動生成的專屬【電子入場券】與【抽獎序號】。</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">資格二：親臨會場簽到</div>
                  <div className="text-xs text-slate-400">於 2026年11月20日 20:00 前抵達尖沙咀港威大廈5座11樓 BOC Life 會場。</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">資格三：壓軸現場開獎</div>
                  <div className="text-xs text-slate-400">當晚 21:35 現場公開電腦搖號抽出，得獎者本人在場即可即時領走全新 iPad！</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRegisterClick}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold transition-all shadow-lg shadow-orange-500/20 text-sm"
              >
                登記報名·獲取專屬抽獎序號
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Prize Card & Simulated Draw */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-orange-500/40 p-6 sm:p-8 shadow-2xl relative text-center">
              
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-lg shadow-orange-500/30 mb-5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                  <Tablet className="w-10 h-10 text-orange-400" />
                </div>
              </div>

              <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                LUCKY DRAW PRIZE
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                IPAD Wifi 128GB 一部
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                原裝未開封 · 現場即抽即派 · 名額 50 人中抽 1 位幸運兒 (中獎機率高達 1/50！)
              </p>

              {/* Interactive Simulator Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium mb-2 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>現場電子搖號模擬展示</span>
                </div>

                <div className="h-14 flex items-center justify-center">
                  <div className={`font-mono tabular-nums text-2xl font-bold tracking-widest ${isSpinning ? 'text-amber-400 animate-pulse' : simulatedWinner ? 'text-orange-400' : 'text-slate-500'}`}>
                    {simulatedWinner || 'LUCKY-???'}
                  </div>
                </div>

                <button
                  onClick={handleSimulateDraw}
                  disabled={isSpinning}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin text-orange-400' : ''}`} />
                  <span>{isSpinning ? '正在搖號抽獎中...' : '點擊模擬現場開獎效果'}</span>
                </button>
              </div>

              {simulatedWinner && !isSpinning && (
                <div className="mt-3 text-xs text-orange-300 font-medium flex items-center justify-center gap-1.5 animate-fadeIn">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>恭喜！立即在下方報名，獲取您的正式真實抽獎序號！</span>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
