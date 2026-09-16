import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Users, TrendingUp, Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface SmeServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const SmeServices: React.FC<SmeServicesProps> = ({ onSelectService }) => {
  const { language, t } = useCms();
  const servT = t.servicesSection;
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-indigo-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-amber-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="perkhidmatan" className="py-8 sm:py-12 lg:py-14 bg-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            {servT.badge}
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
            {servT.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 break-words">
            {servT.subtitle}
          </p>

          {/* Expandable Toggle Control to Save Space */}
          <div className="mt-5 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 text-blue-900 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer min-h-[44px]"
              aria-expanded={isExpanded}
            >
              <span>
                {isExpanded
                  ? (language === 'ms' ? 'Sembunyikan Skop Perkhidmatan' : 'Collapse Services')
                  : (language === 'ms' ? `Paparkan Servis Lengkap (${(servT?.items || []).length} Modul)` : `Expand Services (${(servT?.items || []).length} Modules)`)}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-blue-700 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
              )}
            </button>

            {/* Minimized Space-Saving Summary Badges */}
            {!isExpanded && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-700">
                {(servT?.items || []).map((service) => (
                  <span
                    key={service.id}
                    onClick={() => setIsExpanded(true)}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:text-blue-700 cursor-pointer transition-colors shadow-2xs font-medium"
                  >
                    • {service.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4 Service Cards - Expandable */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {(servT?.items || []).map((service) => (
                <div
                  key={service.id}
                  className="p-5 sm:p-7 lg:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                        {getIcon(service.icon)}
                      </div>
                      <span className="text-[10.5px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-800 whitespace-nowrap">
                        {service.badge}
                      </span>
                    </div>

                    <div className="text-[11px] sm:text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                      {service.tagline}
                    </div>
                    <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-slate-900 mb-2 break-words">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 sm:mb-6 break-words">
                      {service.desc}
                    </p>

                    <div className="space-y-2 sm:space-y-2.5 pt-3 border-t border-slate-200">
                      {(service?.points || []).map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="break-words">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="w-full py-3 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-slate-800 hover:text-blue-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs min-h-[44px]"
                    >
                      <span className="truncate">{servT.askAboutPrefix} {service.title}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Collapse Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors min-h-[44px]"
              >
                <ChevronUp className="w-4 h-4 shrink-0" />
                <span>{language === 'ms' ? 'Tutup Skop Perkhidmatan' : 'Collapse Services'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

