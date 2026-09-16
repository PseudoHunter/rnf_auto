import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle,
  Sparkles,
  FileSpreadsheet,
  Users,
  Info,
  Calculator
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { AccountingPackage, PayrollPackage } from '../types';
import { ACCOUNTING_OVER_LIMIT_NOTE, PAYROLL_OVER_LIMIT_NOTE } from '../data/content';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
  onOpenHealthCheck: (topic?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectTier,
  onOpenHealthCheck,
}) => {
  const { content, language, t } = useCms();
  const { companyInfo, accountingPackages, payrollPackages } = content;
  const priceT = t.pricingSection;

  // Active view: 'accounting' | 'payroll' | 'bundle'
  const [activeCategory, setActiveCategory] = useState<'accounting' | 'payroll' | 'bundle'>('accounting');

  // Interactive combo picker
  const [selectedAccTier, setSelectedAccTier] = useState<string>('acc-basic');
  const [selectedPayTier, setSelectedPayTier] = useState<string>('pay-starter');

  const handleWhatsAppAccounting = (pkg: AccountingPackage) => {
    const text = encodeURIComponent(
      language === 'ms'
        ? `Salam RNF Business Solutions, saya berminat dengan Pakej Perakaunan:\n` +
          `*Pakej:* ${pkg.tier} (RM ${pkg.monthlyPrice}/bulan)\n` +
          `*Volum:* ${pkg.dataRange}\n\n` +
          `Boleh terangkan cara onboarding dan dokumen yang diperlukan?`
        : `Hello RNF Business Solutions, I am interested in your Accounting Package:\n` +
          `*Package:* ${pkg.tier} (RM ${pkg.monthlyPrice}/month)\n` +
          `*Volume:* ${pkg.dataRange}\n\n` +
          `Could you explain the onboarding procedure and documents needed?`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleWhatsAppPayroll = (pkg: PayrollPackage) => {
    const text = encodeURIComponent(
      language === 'ms'
        ? `Salam RNF Business Solutions, saya berminat dengan Servis Payroll:\n` +
          `*Pakej:* ${pkg.tier} (RM ${pkg.monthlyPrice}/bulan)\n` +
          `*Kapasiti:* ${pkg.staffRange}\n\n` +
          `Boleh terangkan proses pengurusan slip gaji dan caruman KWSP/SOCSO syarikat saya?`
        : `Hello RNF Business Solutions, I am interested in your Payroll Services:\n` +
          `*Package:* ${pkg.tier} (RM ${pkg.monthlyPrice}/month)\n` +
          `*Capacity:* ${pkg.staffRange}\n\n` +
          `Could you advise on the payroll processing flow, pay slips, and EPF/SOCSO submissions?`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleWhatsAppBundle = (accPkg: AccountingPackage, payPkg: PayrollPackage) => {
    const total = accPkg.monthlyPrice + payPkg.monthlyPrice;
    const text = encodeURIComponent(
      language === 'ms'
        ? `Salam RNF Business Solutions, saya berminat dengan Pakej Kombo Lengkap (Akaun + Payroll):\n` +
          `• *Perakaunan:* ${accPkg.tier} (RM ${accPkg.monthlyPrice}/bln - ${accPkg.dataRange})\n` +
          `• *Payroll:* ${payPkg.tier} (RM ${payPkg.monthlyPrice}/bln - ${payPkg.staffRange})\n` +
          `*Jumlah Yuran Bulanan:* RM ${total}/bulan\n\n` +
          `Mohon bantu semak kelayakan dan jadualkan sesi konsultasi percuma.`
        : `Hello RNF Business Solutions, I am interested in the Comprehensive Bundle (Accounting + Payroll):\n` +
          `• *Accounting:* ${accPkg.tier} (RM ${accPkg.monthlyPrice}/mo - ${accPkg.dataRange})\n` +
          `• *Payroll:* ${payPkg.tier} (RM ${payPkg.monthlyPrice}/mo - ${payPkg.staffRange})\n` +
          `*Total Monthly Fee:* RM ${total}/month\n\n` +
          `Please assist with eligibility checking and schedule a complimentary advisory session.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  const currentAcc = (accountingPackages || []).find(a => a.id === selectedAccTier) || (accountingPackages || [])[0] || { id: 'acc-starter', tier: 'Starter', dataRange: '1 - 300 data', monthlyPrice: 600, name: 'Pakej Starter Akaun' };
  const currentPay = (payrollPackages || []).find(p => p.id === selectedPayTier) || (payrollPackages || [])[0] || { id: 'pay-starter', tier: 'Starter', staffRange: '1 - 5 staf', monthlyPrice: 200, name: 'Pakej Starter Payroll' };
  const comboTotal = (currentAcc?.monthlyPrice || 0) + (currentPay?.monthlyPrice || 0);

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{priceT.badge}</span>
          </div>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
            {priceT.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed break-words">
            {priceT.subtitle}
          </p>

          {/* Stacked Selection for Package Categories with Glowing Picked State */}
          <div className="mt-6 sm:mt-8 max-w-3xl mx-auto space-y-3 sm:space-y-3.5 w-full text-left">
            {[
              {
                id: 'accounting' as const,
                title: priceT.tabAccounting,
                subtitle: language === 'ms' 
                  ? 'Pakej akaun bulanan lengkap, P&L, Imbangan Duga & pematuhan e-Invois / LHDN' 
                  : 'Comprehensive monthly bookkeeping, P&L, balance sheets & LHDN compliance',
                priceTag: language === 'ms' ? 'Dari RM600 / bln' : 'From RM600 / mo',
                icon: FileSpreadsheet,
                badge: language === 'ms' ? '4 Pilihan Pakej' : '4 Tier Choices',
              },
              {
                id: 'payroll' as const,
                title: priceT.tabPayroll,
                subtitle: language === 'ms' 
                  ? 'Kiraan gaji pekerja, caruman KWSP, PERKESO, EIS, PCB & slip gaji digital' 
                  : 'Payroll processing, statutory deductions (EPF, SOCSO, EIS, PCB) & digital payslips',
                priceTag: language === 'ms' ? 'Dari RM200 / bln' : 'From RM200 / mo',
                icon: Users,
                badge: language === 'ms' ? 'Ikut Bilangan Staf' : 'Headcount Based',
              },
              {
                id: 'bundle' as const,
                title: priceT.tabBundle,
                subtitle: language === 'ms' 
                  ? 'Gabungan akaun & gaji serentak dengan penjimatan diskaun kombo istimewa' 
                  : 'Synchronized accounting + payroll outsourcing with custom bundled savings',
                priceTag: language === 'ms' ? 'Paling Jimat & Diskaun' : 'Best Value & Savings',
                icon: Calculator,
                badge: language === 'ms' ? 'Kalkulator Kombo' : 'Combo Calculator',
              },
            ].map((cat) => {
              const isSelected = activeCategory === cat.id;
              const IconComp = cat.icon;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={`w-full p-4 sm:p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white border-2 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6),0_0_12px_rgba(96,165,250,0.4)] ring-4 ring-blue-500/25 scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-sm'
                  }`}
                >
                  {/* Left Side Icon + Titles */}
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600/60 border border-blue-300/50 text-white shadow-inner'
                          : 'bg-blue-50 border border-blue-100 text-blue-700'
                      }`}
                    >
                      <IconComp className="w-6 h-6 shrink-0" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-['Outfit'] font-bold text-base sm:text-lg tracking-tight truncate ${
                            isSelected ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {cat.title}
                        </h3>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse shrink-0" />
                        )}
                      </div>
                      <p
                        className={`text-xs sm:text-sm mt-0.5 leading-relaxed line-clamp-2 ${
                          isSelected ? 'text-blue-100/90' : 'text-slate-600'
                        }`}
                      >
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right Side Pricing Tag & Selection Status */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <span
                      className={`text-xs sm:text-sm font-extrabold whitespace-nowrap ${
                        isSelected ? 'text-amber-300' : 'text-blue-700'
                      }`}
                    >
                      {cat.priceTag}
                    </span>

                    {isSelected ? (
                      <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase shadow-xs flex items-center gap-1 border border-blue-300/60 whitespace-nowrap">
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{language === 'ms' ? 'Dipilih' : 'Selected'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 whitespace-nowrap">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: ACCOUNTING PACKAGES (STARTER, BASIC, ADVANCE, PREMIUM) */}
        {/* ========================================================================= */}
        {activeCategory === 'accounting' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch mb-8">
              {(accountingPackages || []).map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.isPopular
                      ? 'bg-slate-900 text-white border-2 border-blue-500 shadow-xl lg:-translate-y-1.5 ring-4 ring-blue-500/10'
                      : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'
                  } p-5 sm:p-6`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                      <span>{priceT.popularBadge}</span>
                    </div>
                  )}

                  <div>
                    {/* Tier Name & Badge */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-md ${
                          pkg.isPopular
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {pkg.tier}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{priceT.monthlyPlan}</span>
                      </div>
                      <h3 className={`font-['Outfit'] text-lg sm:text-xl font-bold mt-2 break-words ${
                        pkg.isPopular ? 'text-white' : 'text-slate-900'
                      }`}>
                        {pkg.name}
                      </h3>
                      {pkg.badge && (
                        <p className={`text-xs mt-1 font-medium break-words ${pkg.isPopular ? 'text-blue-300' : 'text-blue-600'}`}>
                          {pkg.badge}
                        </p>
                      )}
                    </div>

                    {/* Price and Transaction Limit Tag */}
                    <div className={`py-4 border-y my-4 ${
                      pkg.isPopular ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-slate-400">{priceT.monthly}</span>
                        <span className="text-sm font-extrabold text-blue-600">RM</span>
                        <span className={`font-['Outfit'] text-3xl sm:text-4xl font-black tracking-tight ${
                          pkg.isPopular ? 'text-white' : 'text-slate-900'
                        }`}>
                          {pkg.monthlyPrice}
                        </span>
                      </div>

                      {/* Explicit Requested Data Range */}
                      <div className="mt-2.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                          pkg.isPopular 
                            ? 'bg-blue-900/90 text-amber-300 border border-blue-700' 
                            : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                          <span className="break-words">({pkg.dataRange})</span>
                        </span>
                      </div>
                    </div>

                    {/* Features Deliverables List */}
                    <div className="space-y-2 mb-6">
                      <div className={`text-[11px] font-bold uppercase tracking-wider ${
                        pkg.isPopular ? 'text-blue-400' : 'text-slate-500'
                      }`}>
                        {priceT.includedHeading}
                      </div>
                      <ul className="space-y-2">
                        {(pkg?.features || []).map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs">
                            <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              pkg.isPopular ? 'text-emerald-400' : 'text-emerald-600'
                            }`} />
                            <span className={`break-words ${pkg.isPopular ? 'text-slate-200' : 'text-slate-600'}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-3 border-t border-slate-100/10">
                    <button
                      type="button"
                      onClick={() => onSelectTier(`Accounting ${pkg.tier} (RM ${pkg.monthlyPrice})`)}
                      className={`w-full py-3 px-3 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px] ${
                        pkg.isPopular
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>{priceT.selectBtnPrefix} {pkg.tier}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWhatsAppAccounting(pkg)}
                      className={`w-full py-2.5 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px] ${
                        pkg.isPopular
                          ? 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800'
                          : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{priceT.waBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Over-Limit Adjustment Notice for Accounting */}
            <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 text-amber-950">
              <div className="flex items-start sm:items-center gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs sm:text-sm break-words">
                  <strong>{language === 'ms' ? ACCOUNTING_OVER_LIMIT_NOTE : 'Data exceeding 1,100 transactions'}</strong>
                  <span className="text-amber-800 block sm:inline sm:ml-1">
                    ({priceT.accountingOverLimit})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenHealthCheck('Kutipan Volum Lebih 1,100 Data')}
                className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center min-h-[44px] flex items-center justify-center"
              >
                {priceT.accountingCustomQuote}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: PAYROLL SERVICES (STARTER, BASIC, ADVANCE, PREMIUM) */}
        {/* ========================================================================= */}
        {activeCategory === 'payroll' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch mb-8">
              {(payrollPackages || []).map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.isPopular
                      ? 'bg-slate-900 text-white border-2 border-emerald-500 shadow-xl lg:-translate-y-1.5 ring-4 ring-emerald-500/10'
                      : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'
                  } p-5 sm:p-6`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                      <span>{language === 'ms' ? 'Pilihan Majikan SME' : 'Top SME Choice'}</span>
                    </div>
                  )}

                  <div>
                    {/* Tier Name & Badge */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-md ${
                          pkg.isPopular
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {pkg.tier}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{priceT.monthlyPlan}</span>
                      </div>
                      <h3 className={`font-['Outfit'] text-lg sm:text-xl font-bold mt-2 break-words ${
                        pkg.isPopular ? 'text-white' : 'text-slate-900'
                      }`}>
                        {pkg.name}
                      </h3>
                      {pkg.badge && (
                        <p className={`text-xs mt-1 font-medium break-words ${pkg.isPopular ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          {pkg.badge}
                        </p>
                      )}
                    </div>

                    {/* Price and Staff Limit Tag */}
                    <div className={`py-4 border-y my-4 ${
                      pkg.isPopular ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-slate-400">{priceT.monthly}</span>
                        <span className="text-sm font-extrabold text-emerald-600">RM</span>
                        <span className={`font-['Outfit'] text-3xl sm:text-4xl font-black tracking-tight ${
                          pkg.isPopular ? 'text-white' : 'text-slate-900'
                        }`}>
                          {pkg.monthlyPrice}
                        </span>
                      </div>

                      {/* Explicit Requested Staff Range */}
                      <div className="mt-2.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                          pkg.isPopular 
                            ? 'bg-emerald-900/90 text-amber-300 border border-emerald-700' 
                            : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        }`}>
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span className="break-words">({pkg.staffRange})</span>
                        </span>
                      </div>
                    </div>

                    {/* Features Deliverables List */}
                    <div className="space-y-2 mb-6">
                      <div className={`text-[11px] font-bold uppercase tracking-wider ${
                        pkg.isPopular ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {priceT.payrollScopeHeading}
                      </div>
                      <ul className="space-y-2">
                        {(pkg?.features || []).map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs">
                            <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              pkg.isPopular ? 'text-emerald-400' : 'text-emerald-600'
                            }`} />
                            <span className={`break-words ${pkg.isPopular ? 'text-slate-200' : 'text-slate-600'}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-3 border-t border-slate-100/10">
                    <button
                      type="button"
                      onClick={() => onSelectTier(`Payroll ${pkg.tier} (RM ${pkg.monthlyPrice})`)}
                      className={`w-full py-3 px-3 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px] ${
                        pkg.isPopular
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>{priceT.selectBtnPrefix} Payroll {pkg.tier}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWhatsAppPayroll(pkg)}
                      className={`w-full py-2.5 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px] ${
                        pkg.isPopular
                          ? 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800'
                          : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{priceT.waBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Over-Limit Adjustment Notice for Payroll */}
            <div className="bg-emerald-50 border border-emerald-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 text-emerald-950">
              <div className="flex items-start sm:items-center gap-3">
                <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs sm:text-sm break-words">
                  <strong>{language === 'ms' ? PAYROLL_OVER_LIMIT_NOTE : 'Staff capacity exceeding 20 employees'}</strong>
                  <span className="text-emerald-800 block sm:inline sm:ml-1">
                    ({priceT.payrollOverLimit})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenHealthCheck('Kutipan Payroll Melebihi 20 Staf')}
                className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-emerald-200 hover:bg-emerald-300 text-emerald-950 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center min-h-[44px] flex items-center justify-center"
              >
                {priceT.payrollCustomQuote}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: BUNDLE / COMBO CALCULATOR (ACCOUNTING + PAYROLL) */}
        {/* ========================================================================= */}
        {activeCategory === 'bundle' && (
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200 shadow-md">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
                {priceT.comboTag}
              </span>
              <h3 className="font-['Outfit'] text-xl sm:text-3xl font-bold text-slate-900 mt-2 break-words">
                {priceT.comboTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 break-words">
                {priceT.comboDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start mb-8">
              {/* Left Selector: Accounting */}
              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{priceT.comboStep1}</span>
                </div>
                <div className="space-y-2 sm:space-y-2.5">
                  {(accountingPackages || []).map((a) => (
                    <label
                      key={a.id}
                      className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all gap-2 ${
                        selectedAccTier === a.id
                          ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <input
                          type="radio"
                          name="accPackageRadio"
                          checked={selectedAccTier === a.id}
                          onChange={() => setSelectedAccTier(a.id)}
                          className="text-blue-600 focus:ring-blue-500 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {a.tier} ({a.dataRange})
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {a.name}
                          </div>
                        </div>
                      </div>
                      <div className="font-extrabold text-xs sm:text-sm text-blue-700 shrink-0 whitespace-nowrap">
                        RM {a.monthlyPrice}{priceT.perMonth}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Right Selector: Payroll */}
              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                  <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{priceT.comboStep2}</span>
                </div>
                <div className="space-y-2 sm:space-y-2.5">
                  {(payrollPackages || []).map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all gap-2 ${
                        selectedPayTier === p.id
                          ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <input
                          type="radio"
                          name="payPackageRadio"
                          checked={selectedPayTier === p.id}
                          onChange={() => setSelectedPayTier(p.id)}
                          className="text-emerald-600 focus:ring-emerald-500 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {p.tier} ({p.staffRange})
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {p.name}
                          </div>
                        </div>
                      </div>
                      <div className="font-extrabold text-xs sm:text-sm text-emerald-700 shrink-0 whitespace-nowrap">
                        RM {p.monthlyPrice}{priceT.perMonth}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Combo Summary Bar */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="w-full md:w-auto min-w-0 text-center md:text-left">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {priceT.comboSummaryTag}
                </span>
                <div className="text-xs sm:text-base font-semibold text-slate-200 mt-1 break-words">
                  {language === 'ms' ? 'Akaun:' : 'Accounting:'} <span className="text-white font-bold">{currentAcc.tier}</span> ({currentAcc.dataRange}) + 
                  Payroll: <span className="text-white font-bold">{currentPay.tier}</span> ({currentPay.staffRange})
                </div>
                <div className="text-xs text-slate-400 mt-1 break-words">
                  {priceT.comboInHouseCompare} <strong className="text-emerald-400">RM {3600 - comboTotal}{priceT.perMonth}</strong>!
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto justify-end">
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">{priceT.comboTotalFee}</div>
                  <div className="font-['Outfit'] text-3xl sm:text-4xl font-black text-amber-300">
                    RM {comboTotal} <span className="text-xs font-normal text-slate-400">{priceT.perMonth}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onSelectTier(`Kombo Akaun ${currentAcc.tier} + Payroll ${currentPay.tier} (RM ${comboTotal}/bln)`)}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
                  >
                    {priceT.comboBookBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWhatsAppBundle(currentAcc, currentPay)}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{priceT.comboWaBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backlog Clearance Banner */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-sm">
          <div className="min-w-0 text-center md:text-left">
            <h3 className="font-['Outfit'] text-base sm:text-xl font-bold text-slate-900 break-words">
              {priceT.backlogTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl break-words">
              {priceT.backlogDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenHealthCheck('Sebut Harga Backlog Clearance')}
            className="w-full md:w-auto shrink-0 px-5 sm:px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            {priceT.backlogBtn}
          </button>
        </div>
      </div>
    </section>
  );
};

