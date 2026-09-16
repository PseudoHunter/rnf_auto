import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Clock, 
  Building, 
  Users, 
  Lock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { useCms } from '../context/CmsContext';

interface QuickEligibilityCardProps {
  onSuccessOpenBooking?: (data: { entity: string; currentSetup: string; savings: number; tier: string }) => void;
}

export const QuickEligibilityCard: React.FC<QuickEligibilityCardProps> = ({
  onSuccessOpenBooking,
}) => {
  const { addLead, t } = useCms();
  const calcT = t.calculator;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [entityType, setEntityType] = useState<'Sdn Bhd' | 'Enterprise' | 'LLP'>('Sdn Bhd');
  const [currentSetup, setCurrentSetup] = useState<'in_house' | 'diy' | 'backlog' | 'loan'>('in_house');
  
  // Lead submission state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Dynamic calculations based on package tier guidelines: Starter RM600, Growing RM800, Advanced RM1200
  const calculateResult = () => {
    let monthlyInHouseCost = 3600; // Salary + EPF/SOCSO for clerk
    let rnfFee = 800;
    let tierName = 'Growing Accounting Retainer';

    if (entityType === 'Enterprise') {
      rnfFee = 600;
      monthlyInHouseCost = 3200;
      tierName = 'Starter Accounting Retainer';
    } else if (currentSetup === 'in_house' || currentSetup === 'loan') {
      rnfFee = 800;
      monthlyInHouseCost = 3800;
      tierName = 'Growing Accounting Retainer';
    } else if (currentSetup === 'backlog') {
      rnfFee = 1200;
      monthlyInHouseCost = 4200;
      tierName = 'Advanced Corporate Retainer';
    }

    const monthlySavings = monthlyInHouseCost - rnfFee;
    const annualSavings = monthlySavings * 12;
    const percentSaved = Math.round((monthlySavings / monthlyInHouseCost) * 100);

    return {
      monthlySavings,
      annualSavings,
      percentSaved,
      rnfFee,
      recommendedTier: tierName,
    };
  };

  const result = calculateResult();

  const handleNextToLead = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addLead({
        fullName: applicantName || 'Diagnostic Applicant',
        companyName: `${applicantName} (${entityType})`,
        entityType: entityType,
        phone: applicantPhone,
        email: applicantEmail || 'lead@sme.com.my',
        serviceCategory: 'accounting',
        selectedPackage: result.recommendedTier,
        dataVolumeOrStaffCount: entityType,
        estimatedMonthlyValue: result.rnfFee,
        status: 'baru',
        assignedTo: 'Muhammad Alif Hakimi',
        source: 'Widget Saringan 1 Minit',
        notes: [`Est. Savings: RM ${result.monthlySavings}/mo (${result.percentSaved}%)`, `Current setup: ${currentSetup}`],
      });
    } catch (err) {
      console.error('Lead capture error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      if (onSuccessOpenBooking) {
        onSuccessOpenBooking({
          entity: entityType,
          currentSetup,
          savings: result.monthlySavings,
          tier: result.recommendedTier,
        });
      }
    }, 600);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `*SME Eligibility Assessment (RNF Business Solutions)*\n\n` +
      `*Name:* ${applicantName || 'Business Owner'}\n` +
      `*Entity:* ${entityType}\n` +
      `*Current Setup:* ${currentSetup}\n` +
      `*Est. Savings:* RM ${result.monthlySavings.toLocaleString()}/month (${result.percentSaved}%)\n` +
      `*Recommended Package:* ${result.recommendedTier}\n` +
      `*Phone:* ${applicantPhone}\n` +
      (applicantEmail ? `*Email:* ${applicantEmail}\n` : '') +
      `\nPlease confirm our Complimentary 30-Min Financial Health Check slot and setup fee waiver.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div id="quick-checker" className="w-full bg-white text-slate-900 rounded-3xl shadow-2xl border border-[#003352]/20 overflow-hidden">
      {/* Header with High-Attention Tag */}
      <div className="bg-[#00243b] p-4 sm:p-5 text-white border-b border-[#003859]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{calcT.badge}</span>
            </span>
          </div>
          <div className="text-[10.5px] sm:text-[11px] text-[#bac7db] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{calcT.quota}</span>
          </div>
        </div>
        
        <h3 className="font-['Outfit'] text-base sm:text-xl font-extrabold text-[#f4f6fc] mt-2 leading-snug">
          {calcT.title}
        </h3>
        <p className="text-[11.5px] sm:text-xs text-[#bac7db] mt-1 leading-relaxed">
          {calcT.description}
        </p>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-white/10 text-[10.5px] sm:text-[11px]">
          <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-emerald-300' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-[#001c2d] border border-white/15 flex items-center justify-center text-[10px] shrink-0">1</span>
            <span className="truncate">{calcT.step1Title}</span>
          </div>
          <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-emerald-300' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-[#001c2d] border border-white/15 flex items-center justify-center text-[10px] shrink-0">2</span>
            <span className="truncate">{calcT.step2Title}</span>
          </div>
          <div className={`flex items-center gap-1.5 font-bold ${isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-[#001c2d] border border-white/15 flex items-center justify-center text-[10px] shrink-0">3</span>
            <span className="truncate">{calcT.step3Title}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-6">
        {isDone ? (
          /* Step 3: Success & WhatsApp Direct Lock */
          <div className="text-center py-3 sm:py-4 space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shrink-0">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-bold text-slate-900">
                {calcT.successTitle}
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{applicantName || 'Valued Business Owner'}</strong>. Your company profile qualifies for a <strong>Complimentary 30-Min Financial Health Check</strong> with our Senior Partner.
              </p>
            </div>

            {/* Result Summary Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between items-center text-slate-700 gap-2">
                <span>{calcT.matchedPackage}:</span>
                <strong className="text-emerald-800 font-bold text-right">{result.recommendedTier}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-700 gap-2">
                <span>Est. Monthly Savings:</span>
                <strong className="text-emerald-700 text-sm font-extrabold text-right">
                  RM {result.monthlySavings.toLocaleString()} {calcT.perMonth}
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-700 gap-2">
                <span>{calcT.incentiveLabel}:</span>
                <span className="text-[#003352] font-bold text-right">{calcT.incentiveValue}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleWhatsAppForward}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>{calcT.btnWhatsAppLock}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDone(false);
                  setStep(1);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline block mx-auto pt-1 cursor-pointer"
              >
                {calcT.btnRecheck}
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          /* Step 1: Quick Saringan (3-Click Questions) */
          <form onSubmit={handleNextToLead} className="space-y-4 text-xs">
            {/* 1. Entity Type */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#003352] shrink-0" />
                <span>{calcT.q1Label}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(calcT?.q1Options || []).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setEntityType(opt.key as any)}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-semibold transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
                      entityType === opt.key
                        ? 'bg-[#003352] text-white border-[#003352] shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Current Setup / Pain Point */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#003352] shrink-0" />
                <span>{calcT?.q2Label}</span>
              </label>
              <div className="space-y-1.5">
                {(calcT?.q2Options || []).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setCurrentSetup(item.key as any)}
                    className={`w-full p-2.5 rounded-xl border text-left flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-xs transition-all cursor-pointer min-h-[44px] ${
                      currentSetup === item.key
                        ? 'bg-[#003352]/10 border-[#003352] text-[#003352] font-bold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="pr-1 leading-snug break-words">{item.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#003352]/15 text-[#003352] font-bold shrink-0 self-start xs:self-center whitespace-nowrap">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-4 bg-[#003352] hover:bg-[#00243b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
            >
              <span>{calcT.btnCalculate}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10.5px] sm:text-[11px] text-slate-500 pt-1 text-center">
              <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{calcT.privacyGuarantee}</span>
            </div>
          </form>
        ) : (
          /* Step 2: Instant Results & Quick Sign-Up */
          <form onSubmit={handleFinalSubmit} className="space-y-4 text-xs">
            {/* Live Result Highlight */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] gap-2">
                <span className="font-semibold text-[#003352]">{calcT.matchedPackage}:</span>
                <span className="px-2 py-0.5 rounded bg-[#003352] text-white font-bold text-right truncate">
                  {result.recommendedTier}
                </span>
              </div>

              <div className="pt-1 flex items-baseline justify-between border-t border-slate-200 gap-2">
                <span className="text-slate-600">{calcT.savingsVsInHouse}:</span>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black text-emerald-700">
                    RM {result.monthlySavings.toLocaleString()} <span className="text-xs font-medium text-slate-600">{calcT.perMonth}</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold">
                    ~RM {result.annualSavings.toLocaleString()} {calcT.annualSavingsSuffix} ({result.percentSaved}%)
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                <span>{calcT.lhdnCompliance}:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{calcT.auditReadyBadge}</span>
                </span>
              </div>
            </div>

            {/* Quick Sign-Up Fields */}
            <div className="space-y-2.5">
              <div className="font-bold text-slate-900 text-xs">
                {calcT.formHeading}:
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  {calcT.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={calcT.namePlaceholder}
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003352]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  {calcT.phoneLabel} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder={calcT.phonePlaceholder}
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003352]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  {calcT.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={calcT.emailPlaceholder}
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003352]"
                />
              </div>
            </div>

            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-3.5 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 cursor-pointer min-h-[44px]"
              >
                {calcT.btnBack}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>{isSubmitting ? calcT.submitting : calcT.btnSubmit}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Counselor/Advisor Direct Hotline Bar */}
      <div className="bg-slate-50 px-4 sm:px-5 py-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Phone className="w-3.5 h-3.5 text-[#003352] shrink-0" />
          <span className="text-[10.5px] sm:text-[11px] truncate">
            {calcT.hotlineNeedHelp} <strong className="text-slate-900">{COMPANY_INFO.phoneDisplay}</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            const msg = encodeURIComponent(
              "Hello RNF Advisory, I would like to inquire about eligibility assessment for our company."
            );
            window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${msg}`, '_blank');
          }}
          className="text-emerald-700 hover:text-emerald-800 font-bold text-[10.5px] sm:text-[11px] flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-3 h-3 shrink-0" />
          <span>{calcT.hotlineChat}</span>
        </button>
      </div>
    </div>
  );
};

