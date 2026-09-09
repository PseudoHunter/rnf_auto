import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Phone,
  MessageCircle, 
  Sparkles
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { QuickEligibilityCard } from './QuickEligibilityCard';

interface HeroSectionProps {
  onOpenHealthCheck: (topic?: string) => void;
  onNavigateToSavings: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenHealthCheck,
  onNavigateToSavings,
}) => {
  const { content } = useCms();
  const { companyInfo, hero } = content;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a2336] via-slate-950 to-[#071927] text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Structural Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Value Proposition (Left) + 1-Minute Eligibility Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          {/* Left Column (7 Cols): Core Proposition & Authority */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pain-Point Authority Eyebrow */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-semibold tracking-wide shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{hero.eyebrow}</span>
              </div>
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 text-xs font-medium">
                Sedia e-Invois LHDN
              </span>
            </div>

            {/* High-Conversion H1 Headline */}
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-extrabold tracking-tight text-white leading-[1.16]">
              {hero.headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
                {hero.headlineHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {hero.subheadline}
            </p>

            {/* 4-Step Clear Journey Bar */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-md">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>4 Langkah Mudah Dapatkan Khidmat Akaun:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {hero.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex flex-col justify-center text-center sm:text-left"
                  >
                    <div className="text-amber-400 font-bold text-[11px] truncate">
                      {step.title}
                    </div>
                    <div className="text-[11px] text-slate-300 leading-tight mt-1">
                      {step.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Advisor Helpline Banner */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-blue-950/70 border border-blue-800/80 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-800/60 flex items-center justify-center text-blue-300 shrink-0">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-[11px] text-blue-200 font-medium">
                    {hero.helplineText}
                  </div>
                  <div className="font-bold text-white text-xs sm:text-sm">
                    Hubungi Penasihat:{' '}
                    <a 
                      href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`} 
                      className="text-amber-300 hover:underline font-mono"
                    >
                      {companyInfo.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const text = encodeURIComponent(`Salam ${companyInfo.name}, saya pemilik SME dan ingin bertanya mengenai khidmat akaun syarikat.`);
                  window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Terus</span>
              </button>
            </div>

            {/* Micro-Trust Signals */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-5 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Jimat Kos Sehingga 70%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bebas Denda LHDN & SSM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Laporan Siap Untuk Bank</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Akauntan Bertauliah</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): 1-Minute Quick Diagnostic Calculator */}
          <div className="lg:col-span-5 w-full">
            <QuickEligibilityCard onOpenConsultation={onOpenHealthCheck} />
          </div>
        </div>

        {/* Trust Proof Bar */}
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
              Rekod Prestasi & Metrik Dipercayai SME Malaysia
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-800/60">
              <div className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-blue-200">
                  {companyInfo.experienceYears} Tahun
                </span>
              </div>
              <div className="text-xs font-bold text-blue-400 mt-1">
                Pengalaman Urus Akaun
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Membantu ratusan pemilik bisnes & SME
              </div>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-800/60">
              <div className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-blue-200">
                  RM 299
                </span>
              </div>
              <div className="text-xs font-bold text-blue-400 mt-1">
                Pakej Bermula Dari
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Penyelesaian lengkap tanpa gaji kerani
              </div>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-800/60">
              <div className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-blue-200">
                  70%
                </span>
              </div>
              <div className="text-xs font-bold text-blue-400 mt-1">
                Penjimatan Kos Purata
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Berbanding mengupah staf akaun in-house
              </div>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-800/60">
              <div className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-blue-200">
                  100%
                </span>
              </div>
              <div className="text-xs font-bold text-blue-400 mt-1">
                Patuh LHDN & SSM
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Bebas denda dan audit-ready sepanjang tahun
              </div>
            </div>
          </div>

          {/* Regulatory & Ecosystem Integration Badges */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs text-slate-400">
            <span className="font-medium text-slate-400 text-center sm:text-left">
              Ekosistem Perakaunan & Pematuhan Diiktiraf:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-semibold text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px]">
                LHDN e-Invoicing Ready
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px]">
                SSM Companies Act 2016
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px]">
                KWSP & PERKESO Portal
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px]">
                AutoCount & Xero Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
