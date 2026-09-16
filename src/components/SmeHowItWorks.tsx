import React, { useState } from 'react';
import { Camera, Cpu, CheckCircle, MessageCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const SmeHowItWorks: React.FC = () => {
  const { content, t } = useCms();
  const { companyInfo } = content;
  const howT = t.howItWorksSection;
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400" />;
      case 'CheckCircle':
        return <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />;
      default:
        return <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />;
    }
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      "Hello RNF, I am an SME business owner and would like to know how easily we can send receipts and initiate our accounting package."
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="cara-kerja" className="py-10 sm:py-14 lg:py-16 bg-[#00253c] text-white relative overflow-hidden transition-all duration-300 border-b border-[#003859]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            {howT.badge}
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f4f6fc] tracking-tight break-words">
            {howT.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#bac7db] break-words">
            {howT.subtitle}
          </p>

          {/* Expandable Toggle Control to Save Space */}
          <div className="mt-5 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#001c2d] hover:bg-[#001726] border border-[#004770] hover:border-emerald-400 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer min-h-[44px]"
              aria-expanded={isExpanded}
            >
              <span>
                {isExpanded ? 'Collapse Workflow' : 'Expand 3-Step Onboarding Workflow'}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>

            {/* Minimized Space-Saving Summary Flow */}
            {!isExpanded && (
              <div 
                onClick={() => setIsExpanded(true)}
                className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-[#001c2d]/80 border border-[#003859] cursor-pointer hover:border-emerald-500/60 transition-colors text-xs text-[#bac7db]"
              >
                {(howT?.steps || []).map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <span className="text-[#f4f6fc]">{step.title}</span>
                    </div>
                    {idx < (howT?.steps || []).length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden sm:block shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3 Step Cards - Expandable */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {(howT?.steps || []).map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#002e48] border border-[#004770] rounded-2xl p-5 sm:p-7 relative flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#001c2d] border border-[#003859] flex items-center justify-center shrink-0">
                        {getIcon(step.icon)}
                      </div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-600 font-['Outfit']">
                        0{step.step}
                      </span>
                    </div>

                    <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-[#f4f6fc] mb-2 break-words">
                      Step {step.step}: {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#bac7db] leading-relaxed break-words">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#003d63] text-[11px] sm:text-xs text-emerald-300 font-medium break-words">
                    {step.tag}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTA Box */}
            <div className="bg-gradient-to-r from-[#003352] via-[#002740] to-[#003352] border border-emerald-500/30 rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="text-center sm:text-left min-w-0">
                <h4 className="font-['Outfit'] text-base sm:text-xl font-bold text-white break-words">
                  {howT.bannerTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#bac7db] mt-1 break-words">
                  {howT.bannerDesc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleWhatsAppHelp}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{howT.bannerBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="w-full sm:w-auto px-4 py-3 bg-[#001c2d] hover:bg-[#001522] text-slate-300 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors min-h-[44px] border border-[#003859]"
                >
                  <ChevronUp className="w-4 h-4 shrink-0" />
                  <span>Collapse</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
