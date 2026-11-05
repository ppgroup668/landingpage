import React from 'react';
import { MapPin, Navigation, Train, Car, Compass, Building, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS } from '../data/initialData';

export const VenueSection: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("香港九龍尖沙咀廣東道15號港威大廈5座11樓 BOC Life")}`;

  return (
    <section id="venue" className="py-16 sm:py-24 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase mb-2">
            LOCATION & TRANSIT · 活動會場與交通指引
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            尖沙咀核心商圈 · 海港城港威大廈 5 座 11 樓
          </h2>
          <p className="mt-3 text-base text-slate-300">
            地處九龍尖沙咀最繁華廣東道金融核心地段，毗鄰維多利亞港，交通極度便捷。
          </p>
        </div>

        {/* 2-Column Split: Venue Info Cards & Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Transit Directions */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Address Banner */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0 mt-1">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-orange-400 font-semibold uppercase tracking-wider">會場全稱</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {EVENT_DETAILS.venue}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    BOC Life Executive Seminar Hall, 11/F, The Gateway Tower 5, Harbour City, Tsim Sha Tsui
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google 地圖實時導航</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  海港城商場上蓋 · 電梯直達 11 樓
                </span>
              </div>
            </div>

            {/* Public Transit Guide */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">港鐵 (MTR) 前往方式</div>
                  <ul className="text-xs text-slate-300 mt-1.5 space-y-1">
                    <li>• <strong>尖沙咀站 (荃灣綫)</strong>：A1 出口沿海防道直行至廣東道，步行約 5 分鐘。</li>
                    <li>• <strong>尖東站 (屯馬綫)</strong>：L5 出口經北京道步行約 7 分鐘抵達港威大廈。</li>
                    <li>• <strong>柯士甸站 (屯馬綫)</strong>：D2 出口沿廣東道南行約 8 分鐘。</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-3 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">高鐵與跨區客運</div>
                  <div className="text-xs text-slate-300 mt-1">
                    香港西九龍高鐵站步行約 12 分鐘，或搭乘計程車 5 分鐘直達海港城港威大廈落客區。
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-3 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">自駕車位泊車指南</div>
                  <div className="text-xs text-slate-300 mt-1">
                    可直接駛入海港城／港威大廈地下停車場 (廣東道入口)，車位充裕，乘搭專屬寫字樓電梯直達 11 樓。
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Visual Map Viewport */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl h-full flex flex-col justify-between">
              
              {/* Top Banner on Map */}
              <div className="p-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-white">會場周邊地標指示</span>
                <span className="text-slate-400">廣東道 15 號 · 尖沙咀</span>
              </div>

              {/* Graphical Simulated Interactive Map Card */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/30 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <MapPin className="w-8 h-8 text-orange-400 animate-bounce" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">
                    港威大廈 5 座 11 樓 (The Gateway Tower 5)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    進入港威大廈大堂後，告知接待處前往「BOC Life 11樓演講廳 Business Talk」，或出示您的電子入場券即可直接上樓。
                  </p>
                </div>

                <div className="pt-2 w-full max-w-xs">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>在地圖應用程式中打開導航</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

              {/* Bottom Tips */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>建議提前 15-20 分鐘抵達以確保完成簽到</span>
                <span className="text-orange-400 font-medium">19:30 準時開放入場</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
