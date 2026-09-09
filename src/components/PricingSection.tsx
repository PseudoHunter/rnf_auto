import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  MessageCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PricingTier } from '../types';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
  onOpenHealthCheck: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectTier,
  onOpenHealthCheck,
}) => {
  const { content } = useCms();
  const { companyInfo, pricingTiers } = content;
  const [isAnnual, setIsAnnual] = useState(true);

  const handleWhatsAppPackage = (tier: PricingTier) => {
    const price = isAnnual ? tier.annualPriceMonthly : tier.monthlyPrice;
    const billing = isAnnual ? "Annual Retainer (15% savings)" : "Monthly Flexible";
    const text = encodeURIComponent(
      `Hi RNF Advisory, I am interested in engaging your "${tier.name}" package (RM ${price}/month, ${billing}).\n\n` +
      `Our transaction volume fits the "${tier.transactionLimit}". Please share onboarding details.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Harga Telus & Berpatutan</span>
          </div>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pakej Khas Untuk Peniaga & SME Malaysia
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Pilih pakej yang sesuai dengan volum transaksi bisnes anda. Tiada kontrak terikat, tiada liabiliti caruman KWSP, dan akaun diurus oleh akauntan bertauliah.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bayaran Bulanan
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAnnual
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Langganan Tahunan</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                isAnnual ? 'bg-amber-400 text-slate-900' : 'bg-blue-100 text-blue-800'
              }`}>
                Jimat 15%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {pricingTiers.map((tier) => {
            const price = isAnnual ? tier.annualPriceMonthly : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                  tier.isPopular
                    ? 'bg-slate-900 text-white border-2 border-blue-500 shadow-2xl lg:-translate-y-2'
                    : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'
                } p-7 sm:p-8`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Most Popular For Sdn Bhd</span>
                  </div>
                )}

                <div>
                  {/* Badge & Name */}
                  <div className="mb-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      tier.isPopular
                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {tier.badge}
                    </span>
                    <h3 className={`font-['Outfit'] text-2xl font-bold mt-2 ${
                      tier.isPopular ? 'text-white' : 'text-slate-900'
                    }`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs mt-1 ${tier.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {tier.targetProfile}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className={`py-5 border-y my-5 ${
                    tier.isPopular ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold text-slate-400">RM</span>
                      <span className={`font-['Outfit'] text-4xl sm:text-5xl font-extrabold tracking-tight ${
                        tier.isPopular ? 'text-white' : 'text-slate-900'
                      }`}>
                        {price.toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium ${tier.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                        / month
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        tier.isPopular ? 'bg-blue-900/80 text-blue-200' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {tier.transactionLimit}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 mb-6">
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      tier.isPopular ? 'text-blue-400' : 'text-slate-900'
                    }`}>
                      Package Deliverables:
                    </div>
                    <ul className="space-y-2.5">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            tier.isPopular ? 'text-emerald-400' : 'text-emerald-600'
                          }`} />
                          <span className={tier.isPopular ? 'text-slate-200' : 'text-slate-600'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Statutory Shield Features */}
                  <div className={`p-3.5 rounded-xl text-xs mb-6 ${
                    tier.isPopular ? 'bg-slate-800/80 border border-slate-700' : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <div className={`font-bold mb-1.5 flex items-center gap-1.5 ${
                      tier.isPopular ? 'text-amber-300' : 'text-slate-900'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Statutory & Audit Coverage:</span>
                    </div>
                    <ul className="space-y-1">
                      {tier.statutoryCoverage.map((sc, scIdx) => (
                        <li key={scIdx} className={`flex items-center gap-1.5 ${
                          tier.isPopular ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          <span className="w-1 h-1 rounded-full bg-blue-500" />
                          <span>{sc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="space-y-2 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectTier(tier.name)}
                    className={`w-full py-3.5 px-4 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      tier.isPopular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Pilih {tier.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWhatsAppPackage(tier)}
                    className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      tier.isPopular
                        ? 'text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tanya via WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Corporate Volume Banner */}
        <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-slate-900">
              Ada Tunggakan Akaun atau Resit Backlog Tahun Lepas?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Jangan bimbang jika akaun anda belum sempat dikemaskini selama 1 atau 2 tahun. Kami ada pakej 'Backlog Clearance' khas untuk bersihkan rekod anda dengan cepat sebelum disoal LHDN.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenHealthCheck}
            className="shrink-0 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            Dapatkan Sebut Harga Backlog
          </button>
        </div>
      </div>
    </section>
  );
};
