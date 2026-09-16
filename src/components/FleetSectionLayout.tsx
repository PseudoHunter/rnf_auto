import React from 'react';
import { 
  ArrowRight, 
  Check
} from 'lucide-react';
import { SectionBanner } from './SectionBanner';

interface FleetSectionLayoutProps {
  onSelectTier: (tierName: string) => void;
  onOpenHealthCheck: (topic?: string) => void;
}

export const FleetSectionLayout: React.FC<FleetSectionLayoutProps> = ({
  onSelectTier,
}) => {
  const serviceCategories = [
    {
      categoryTitle: 'Corporate Bookkeeping & Management Accounts',
      categorySubtitle: 'Monthly Retainers for Emerging & Growing Enterprises',
      items: [
        {
          id: 'acc-starter',
          mainTitle: 'Starter Accounting Retainer',
          tierBadge: 'Starter',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
          desc: '',
          features: [
            'From RM600/month',
            'For startups & small businesses.',
            'Monthly bookkeeping',
            'Bank reconciliation',
            'General ledger',
            'Basic month-end closing',
            'P&L',
            'Balance Sheet',
            'Accounting checklist',
          ],
        },
        {
          id: 'acc-growing',
          mainTitle: 'Growing Accounting Retainer',
          tierBadge: 'Growing',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          desc: '',
          features: [
            'From RM800/month',
            'For growing SMEs.',
            'Everything in START, plus:',
            'Full month-end closing',
            'AR/AP ageing',
            'Accruals & prepayments',
            'Fixed asset schedule',
            'Payroll accounting',
            'Management accounts',
            'Monthly financial analysis',
            'Basic automation',
          ],
        },
      ],
    },
    {
      categoryTitle: 'High-Volume Corporate Retainers & Staff Payroll',
      categorySubtitle: 'Audit-Ready Workpapers, Group Structures & Statutory Payroll',
      items: [
        {
          id: 'acc-advanced',
          mainTitle: 'Advanced Corporate Retainer',
          tierBadge: 'Advanced',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          desc: '',
          features: [
            'From RM1,200/month',
            'For SMEs requiring stronger finance support.',
            'Everything in GROW, plus:',
            'Full-set accounting',
            'Balance sheet reconciliation',
            'Cash-flow monitoring',
            'Management reporting',
            'Financial dashboard',
            'Advanced automation',
            'Finance process improvement',
            'Monthly finance review',
          ],
        },
        {
          id: 'pay-corporate',
          mainTitle: 'Corporate Payroll, EPF, SOCSO & PCB',
          tierBadge: 'Corporate Payroll',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
          desc: '',
          features: [
            'Monthly payroll processing',
            'EPF, SOCSO, EIS & PCB calculations and submissions',
            'Payslips and statutory reports',
            'Employee annual forms (EA, CP8D, etc.)',
            'Support for new employee setup and changes',
          ],
        },
      ],
    },
  ];

  return (
    <section id="fleet" className="w-full">
      {/* 1. Cinematic Banner */}
      <SectionBanner
        brandText="RNF BUSINESS SOLUTIONS"
        brandSubtext="ACCOUNTING • BOOKKEEPING • PAYROLL • AUTOMATION"
        title="Our packages"
        subtitle="Explore our comprehensive monthly accounting, payroll & corporate compliance tiers tailored for every stage of your business growth."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
        heightClass="min-h-[460px] sm:min-h-[520px] lg:min-h-[600px]"
      />

      {/* 2. Categorized Showcase */}
      <div className="w-full bg-[#003352] text-white py-14 sm:py-20 lg:py-24 border-b border-[#004d7c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {serviceCategories.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-8">
              {/* Category Header with Thin Divider Line */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                  <h3 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-light text-[#f4f6fc] tracking-tight">
                    {cat.categoryTitle}
                  </h3>
                  <span className="text-xs sm:text-sm text-emerald-300 font-medium">
                    {cat.categorySubtitle}
                  </span>
                </div>
                {/* Thin subtle horizontal divider */}
                <div className="w-full h-px bg-white/15" />
              </div>

              {/* 2-Column Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                {cat.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col justify-between group space-y-4"
                  >
                    {/* Visual Card Image */}
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-[#00243b] border border-[#004770] shadow-md">
                      <img
                        src={item.image}
                        alt={item.mainTitle}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#00243b]/90 backdrop-blur-xs text-emerald-300 border border-[#005587] text-xs font-bold shadow">
                        {item.tierBadge}
                      </div>
                    </div>

                    {/* Card Title & Description */}
                    <div className="space-y-2.5 text-left">
                      <div className="space-y-1">
                        <h4 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-[#f4f6fc] tracking-tight">
                          {item.mainTitle}
                        </h4>
                      </div>

                      {item.desc && (
                        <p className="text-sm sm:text-[15px] text-[#d6e2f0] leading-relaxed">
                          {item.desc}
                        </p>
                      )}

                      {/* Feature Items - +25% increased sizing for maximum visibility */}
                      <div className="pt-2 space-y-2 sm:space-y-2.5">
                        {item.features.map((ft, fIdx) => {
                          const isPrice = ft.startsWith('From RM');
                          const isAudience = ft.startsWith('For ');
                          const isHighlightHeader = ft.startsWith('Everything in');

                          if (isPrice) {
                            return (
                              <div 
                                key={fIdx} 
                                className="text-base sm:text-lg font-extrabold text-emerald-400 tracking-tight pb-0.5"
                              >
                                {ft}
                              </div>
                            );
                          }

                          if (isAudience) {
                            return (
                              <div 
                                key={fIdx} 
                                className="text-sm sm:text-[15px] font-medium text-[#bac7db] pb-2 border-b border-white/10 mb-2"
                              >
                                {ft}
                              </div>
                            );
                          }

                          if (isHighlightHeader) {
                            return (
                              <div 
                                key={fIdx} 
                                className="text-sm sm:text-[15px] font-bold text-emerald-300 pt-1 pb-0.5"
                              >
                                {ft}
                              </div>
                            );
                          }

                          return (
                            <div 
                              key={fIdx} 
                              className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#e2ecf8] leading-relaxed"
                            >
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="font-medium">{ft}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onSelectTier(item.mainTitle)}
                        className="w-full py-3 px-4 rounded-xl bg-[#f4f6fc] hover:bg-white text-[#003352] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs min-h-[44px]"
                      >
                        <span>Select This Package</span>
                        <ArrowRight className="w-4 h-4 text-[#003352]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
