import React, { useState } from 'react';
import { Receipt, Wallet, AlertTriangle, Building, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface SmePainPointsProps {
  onOpenHealthCheck: () => void;
}

export const SmePainPoints: React.FC<SmePainPointsProps> = ({ onOpenHealthCheck }) => {
  const { language, t } = useCms();
  const sectionT = t.painPointsSection;
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Receipt':
        return <Receipt className="w-6 h-6 text-red-600" />;
      case 'Wallet':
        return <Wallet className="w-6 h-6 text-amber-600" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'Building':
        return <Building className="w-6 h-6 text-blue-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="masalah-sme" className="py-8 sm:py-12 lg:py-14 bg-slate-50 border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-3">
            {sectionT.badge}
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
            {sectionT.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 break-words">
            {sectionT.subtitle}
          </p>

          {/* Expandable Toggle Control to Save Space */}
          <div className="mt-5 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 hover:border-red-300 text-slate-800 hover:text-red-700 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer min-h-[44px]"
              aria-expanded={isExpanded}
            >
              <span>
                {isExpanded
                  ? (language === 'ms' ? 'Sembunyikan Masalah' : 'Collapse Bottlenecks')
                  : (language === 'ms' ? `Paparkan Masalah (${(sectionT?.items || []).length} Isu Utama)` : `Expand Bottlenecks (${(sectionT?.items || []).length} Key Issues)`)}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-red-600 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              )}
            </button>

            {/* Minimized Space-Saving Summary Badges */}
            {!isExpanded && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-600">
                {(sectionT?.items || []).map((item, idx) => (
                  <span
                    key={idx}
                    onClick={() => setIsExpanded(true)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-red-300 hover:text-red-700 cursor-pointer transition-colors shadow-2xs font-medium"
                  >
                    • {item.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4 Pain Points Grid - Expandable */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {(sectionT?.items || []).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3.5 sm:mb-4 shrink-0">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="font-['Outfit'] text-base sm:text-lg font-bold text-slate-900 mb-2 break-words">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-100">
                    <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md break-words">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Banner Reassurance */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-blue-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="space-y-1.5 text-center sm:text-left min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="break-words">{sectionT.bannerTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl break-words">
                  {sectionT.bannerDesc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={onOpenHealthCheck}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-all min-h-[44px]"
                >
                  <span className="whitespace-nowrap">{sectionT.bannerBtn}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors min-h-[44px]"
                >
                  <ChevronUp className="w-4 h-4 shrink-0" />
                  <span>{language === 'ms' ? 'Tutup' : 'Collapse'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

