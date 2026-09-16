import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SectionBanner } from './SectionBanner';
import { QuickEligibilityCard } from './QuickEligibilityCard';

interface HomeSectionLayoutProps {
  onOpenHealthCheck: (topic?: string) => void;
  onNavigateTo: (sectionId: string) => void;
}

export const HomeSectionLayout: React.FC<HomeSectionLayoutProps> = ({
  onOpenHealthCheck,
}) => {
  const { content, t, addLead } = useCms();
  const { companyInfo } = content;
  const heroT = t.hero;

  // Get a Quote Form State
  const [quoteName, setQuoteName] = useState('');
  const [quoteContact, setQuoteContact] = useState('');
  const [quotePackages, setQuotePackages] = useState<string[]>(['Growing Accounting (RM800/mo)']);
  const [quoteVolume, setQuoteVolume] = useState('150 - 300 documents/mo');
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePackage = (pkg: string) => {
    setQuotePackages((prev) => 
      prev.includes(pkg) ? prev.filter((p) => p !== pkg) : [...prev, pkg]
    );
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addLead({
        fullName: quoteName,
        companyName: `${quoteName} (Retainer Quote Inquiry)`,
        entityType: 'Sdn Bhd',
        phone: quoteContact,
        email: 'quote@rnfbusinesssolutions.com',
        serviceCategory: 'accounting',
        selectedPackage: quotePackages.join(', ') || 'Custom Accounting Retainer',
        dataVolumeOrStaffCount: quoteVolume,
        estimatedMonthlyValue: 800,
        status: 'baru',
        assignedTo: 'Muhammad Alif Hakimi',
        source: 'Home Get a Retainer Quote Form',
        notes: [`Selected Packages: ${quotePackages.join(', ')}`, `Volume / Detail: ${quoteVolume}`],
      });
    } catch (err) {
      console.error('Lead error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsQuoteSubmitted(true);
    }, 500);
  };

  const handleWhatsAppForwardQuote = () => {
    const text = encodeURIComponent(
      `*Retainer Quote Request - RNF Business Solutions*\n\n` +
      `*Full Name:* ${quoteName}\n` +
      `*Contact Number / WhatsApp:* ${quoteContact}\n` +
      `*Selected Packages:* ${quotePackages.join(', ')}\n` +
      `*Estimated Volume / Staff:* ${quoteVolume}\n\n` +
      `Please provide a formal retainer quote and complimentary preliminary review.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="home" className="w-full">
      {/* 1. Cinematic Hero Banner */}
      <SectionBanner
        brandText="RNF BUSINESS SOLUTIONS"
        brandSubtext="ACCOUNTING • BOOKKEEPING • PAYROLL • AUTOMATION"
        title="Your financial clarity starts here"
        subtitle="Smooth, simple, and stress-free bookkeeping, payroll & LHDN tax compliance for Malaysian SMEs."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
        heightClass="min-h-[460px] sm:min-h-[540px] lg:min-h-[620px]"
      />

      {/* 2. Middle Section: "ACCOUNTING SUPPORT FOR MALAYSIAN SMEs" */}
      <div className="relative w-full bg-[#00253c] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-[#003859]">
        {/* Subtle Executive Architecture Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f30] via-[#002842]/95 to-[#003352]/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left space-y-6">
            <div>
              <h3 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#f4f6fc] tracking-tight drop-shadow leading-tight uppercase">
                ACCOUNTING SUPPORT FOR MALAYSIAN SMEs
              </h3>
            </div>

            {/* Left-Aligned Key Benefits List */}
            <div className="space-y-4 pt-2 text-left">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1.5 shadow-xs shadow-emerald-400/50" />
                <div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#f4f6fc] uppercase tracking-wide">
                    MONTHLY ACCOUNTING SUPPORT
                  </div>
                  <div className="text-xs sm:text-sm text-[#bac7db] mt-0.5">
                    Bookkeeping, bank reconciliation & monthly reporting.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1.5 shadow-xs shadow-emerald-400/50" />
                <div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#f4f6fc] uppercase tracking-wide">
                    FLEXIBLE MONTHLY PACKAGES — FROM RM600/MONTH
                  </div>
                  <div className="text-xs sm:text-sm text-[#bac7db] mt-0.5">
                    Based on transaction volume and service scope.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1.5 shadow-xs shadow-emerald-400/50" />
                <div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#f4f6fc] uppercase tracking-wide">
                    PAYROLL & COMPLIANCE SUPPORT
                  </div>
                  <div className="text-xs sm:text-sm text-[#bac7db] mt-0.5">
                    EPF • SOCSO • EIS • PCB • e-Invoice support where applicable.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1.5 shadow-xs shadow-emerald-400/50" />
                <div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#f4f6fc] uppercase tracking-wide">
                    CLEAR MONTHLY PRICING
                  </div>
                  <div className="text-xs sm:text-sm text-[#bac7db] mt-0.5">
                    Scope and fees agreed upfront.
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-Trust & Helpline */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#001f33] hover:bg-[#002a45] border border-[#004770] text-[#f4f6fc] font-semibold text-xs sm:text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{companyInfo.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenHealthCheck('Prompt Consultation Request')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>1-Minute Financial Health Check</span>
              </button>
            </div>
          </div>

          {/* Original Metrics Proof Grid with descriptions removed */}
          <div className="mt-12 pt-8 border-t border-[#003859] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            {(heroT?.metrics || []).map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#002e48]/80 border border-[#004770] backdrop-blur-xs flex flex-col justify-center items-center min-h-[80px]">
                <div className="font-['Outfit'] text-lg sm:text-2xl font-extrabold text-white">
                  {m.val}
                </div>
                <div className="text-[11px] font-bold text-emerald-400 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. "Get a quote" Section */}
      <div className="w-full bg-[#003352] text-white py-14 sm:py-20 lg:py-24 border-b border-[#004d7c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: "Get a quote" display & description (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <h3 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#f4f6fc] tracking-tight">
                  Get a quote
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#d6e2f0] leading-relaxed font-normal">
                  Complete the form and our senior accountant will contact you with a personalised, transparent retainer quote — fast, accurate, and tailored to your business volume.
                </p>
              </div>

              {/* 1-Minute Diagnostic Card Embedded */}
              <div className="mt-6">
                <QuickEligibilityCard
                  onSuccessOpenBooking={() => onOpenHealthCheck('Assessment Follow-Up')}
                />
              </div>
            </div>

            {/* Right Column: Form Card with Canva Aesthetic (7 Cols) */}
            <div className="lg:col-span-7">
              {isQuoteSubmitted ? (
                <div className="bg-[#00263e] border border-[#004d7c] rounded-2xl p-6 sm:p-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-900/60 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-white">
                    Quote Request Received
                  </h4>
                  <p className="text-xs sm:text-sm text-[#d6e2f0] max-w-md mx-auto">
                    Thank you, {quoteName}. A Senior Chartered Accountant from RNF is reviewing your business requirements for {quotePackages.join(', ')}.
                  </p>
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppForwardQuote}
                      className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm via WhatsApp Immediately</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsQuoteSubmitted(false)}
                      className="px-5 py-3 rounded-full bg-[#003859] text-[#f4f6fc] hover:text-white text-xs sm:text-sm font-semibold min-h-[44px] cursor-pointer"
                    >
                      Submit Another Quote Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4 sm:space-y-5 text-left">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#f4f6fc] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="e.g. Mohd Khairul / Sarah Tan"
                      className="w-full px-4 py-3 rounded-xl bg-[#00263e] border border-[#004d7c] text-white placeholder-[#7d93b2] focus:outline-none focus:border-[#38bdf8] text-sm transition-all"
                    />
                  </div>

                  {/* Contact Number Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#f4f6fc] mb-1.5">
                      Contact / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={quoteContact}
                      onChange={(e) => setQuoteContact(e.target.value)}
                      placeholder="+60 1x-xxx xxxx"
                      className="w-full px-4 py-3 rounded-xl bg-[#00263e] border border-[#004d7c] text-white placeholder-[#7d93b2] focus:outline-none focus:border-[#38bdf8] text-sm transition-all"
                    />
                  </div>

                  {/* Service / Package Checkboxes */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#f4f6fc] mb-2">
                      Selected Packages & Corporate Services
                    </label>
                    <div className="space-y-2 bg-[#00243b] p-3.5 sm:p-4 rounded-xl border border-[#004770]">
                      {[
                        { id: 'Starter Accounting (RM600/mo)', label: 'Starter Accounting (RM600/mo)' },
                        { id: 'Growing Accounting (RM800/mo)', label: 'Growing Accounting (RM800/mo) — Most Popular' },
                        { id: 'Advanced Corporate (RM1,200/mo)', label: 'Advanced Corporate (RM1,200/mo)' },
                        { id: 'Corporate Payroll & Statutory Filing (From RM200/mo)', label: 'Corporate Payroll & Statutory Filing (From RM200/mo)' },
                      ].map((item) => {
                        const checked = quotePackages.includes(item.id);
                        return (
                          <label
                            key={item.id}
                            onClick={() => togglePackage(item.id)}
                            className="flex items-center gap-3 cursor-pointer select-none text-xs sm:text-sm text-[#f4f6fc] hover:text-white"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              checked ? 'bg-emerald-500 border-emerald-400' : 'border-[#005587] bg-transparent'
                            }`}>
                              {checked && <span className="text-[10px] text-white font-bold">✓</span>}
                            </div>
                            <span>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Volume / Staff Count Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#f4f6fc] mb-1.5">
                      Estimated Monthly Document Volume *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteVolume}
                      onChange={(e) => setQuoteVolume(e.target.value)}
                      placeholder="e.g. 150 invoices/mo or newly incorporated Sdn Bhd"
                      className="w-full px-4 py-3 rounded-xl bg-[#00263e] border border-[#004d7c] text-white placeholder-[#7d93b2] focus:outline-none focus:border-[#38bdf8] text-sm transition-all"
                    />
                  </div>

                  {/* Crisp Light Pill Submit Button matching #f4f6fc Canva Aesthetics */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#f4f6fc] hover:bg-white text-[#003352] font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      <span>{isSubmitting ? 'Processing...' : 'Request Formal Retainer Quote'}</span>
                      <ArrowRight className="w-4 h-4 text-[#003352]" />
                    </button>
                    <p className="text-[11px] text-[#c4d3e8] text-center mt-2.5 opacity-80">
                      Your company information is strictly protected under our Non-Disclosure Agreement (NDA).
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
