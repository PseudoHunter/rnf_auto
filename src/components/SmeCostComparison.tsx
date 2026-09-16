import React from 'react';
import { XCircle, CheckCircle2, TrendingDown, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface SmeCostComparisonProps {
  onOpenHealthCheck: () => void;
}

export const SmeCostComparison: React.FC<SmeCostComparisonProps> = ({ onOpenHealthCheck }) => {
  const { content, t } = useCms();
  const { inHouse, rnfManaged } = content.costComparison;
  const costT = t.costComparisonSection;
  const annualSavings = inHouse.annualCost - rnfManaged.annualCost;

  return (
    <section id="bandingkan-kos" className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            {costT.badge}
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
            {costT.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 break-words">
            {costT.subtitle}
          </p>
        </div>

        {/* 2-Column Direct Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch mb-8 sm:mb-10">
          {/* Card 1: Gaji Staf Full Time */}
          <div className="bg-white rounded-2xl border border-red-200 p-5 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-md">
                  {costT.inHouseTag}
                </span>
                <span className="text-xs text-slate-500 font-medium">{costT.inHouseSub}</span>
              </div>

              <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-slate-900 mb-1 break-words">
                {costT.inHouseTitle}
              </h3>
              <p className="text-xs text-slate-500 mb-4 break-words">
                {costT.inHouseDesc}
              </p>

              <div className="p-4 rounded-xl bg-red-50/70 border border-red-100 mb-6">
                <div className="text-xs text-red-700 font-medium">{costT.inHouseEst}</div>
                <div className="text-2xl sm:text-3xl font-black text-red-600 font-['Outfit'] mt-0.5">
                  RM {inHouse.totalMonthly.toLocaleString()} <span className="text-xs font-normal text-slate-500">{costT.perMonth}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {costT.inHouseAnnualPrefix} <strong>RM {inHouse.annualCost.toLocaleString()}</strong> {costT.inHouseAnnualSuffix}
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                {(costT?.inHousePainPoints || []).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="break-words">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              {costT.inHouseFooter}
            </div>
          </div>

          {/* Card 2: Pakej RNF */}
          <div className="bg-gradient-to-b from-blue-900 to-slate-900 text-white rounded-2xl border-2 border-blue-500 p-5 sm:p-8 shadow-xl flex flex-col justify-between relative mt-4 md:mt-0">
            <div className="absolute -top-3.5 right-3 sm:right-6 bg-emerald-500 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full shadow-md flex items-center gap-1 max-w-[92%] truncate">
              <TrendingDown className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{costT.rnfBadgeTag} RM {annualSavings.toLocaleString()}</span>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3 py-1 rounded-md border border-amber-400/30">
                  {costT.rnfTag}
                </span>
                <span className="text-xs text-blue-200 font-medium">{costT.rnfSub}</span>
              </div>

              <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-white mb-1 break-words">
                {costT.rnfTitle}
              </h3>
              <p className="text-xs text-blue-200 mb-4 break-words">
                {costT.rnfDesc}
              </p>

              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/60 mb-6">
                <div className="text-xs text-blue-300 font-medium">{costT.rnfEst}</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit'] mt-0.5">
                  RM {rnfManaged.totalMonthly} <span className="text-xs font-normal text-slate-400">{costT.perMonth}</span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {costT.rnfAnnualPrefix} <strong>RM {rnfManaged.annualCost.toLocaleString()}</strong> {costT.rnfAnnualSuffix}
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                {(costT?.rnfBenefits || []).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="break-words">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onOpenHealthCheck}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[44px]"
              >
                <span>{costT.rnfBtn}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

