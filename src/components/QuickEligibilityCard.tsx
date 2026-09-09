import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  TrendingDown, 
  Clock, 
  Building, 
  Users, 
  Lock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface QuickEligibilityCardProps {
  onSuccessOpenBooking?: (data: { entity: string; currentSetup: string; savings: number; tier: string }) => void;
}

export const QuickEligibilityCard: React.FC<QuickEligibilityCardProps> = ({
  onSuccessOpenBooking,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [entityType, setEntityType] = useState<'Sdn Bhd' | 'Enterprise' | 'LLP'>('Sdn Bhd');
  const [currentSetup, setCurrentSetup] = useState<'in_house' | 'diy' | 'backlog' | 'loan'>('in_house');
  const [monthlyVolume, setMonthlyVolume] = useState<'starter' | 'medium' | 'high'>('medium');
  
  // Lead submission state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Dynamic calculations based on small SME cost comparison (< RM500k revenue)
  const calculateResult = () => {
    let monthlyInHouseCost = 3500; // Salary + EPF/SOCSO for junior clerk
    let rnfFee = 499;
    let recommendedTier = 'Pakej SME Berkembang (RM499/bln)';

    if (monthlyVolume === 'starter') {
      rnfFee = 299;
      monthlyInHouseCost = 2800;
      recommendedTier = 'Pakej Mikro / Enterprise (RM299/bln)';
    } else if (monthlyVolume === 'high') {
      rnfFee = 799;
      monthlyInHouseCost = 4200;
      recommendedTier = 'Pakej Sdn Bhd Pro (RM799/bln)';
    }

    const monthlySavings = monthlyInHouseCost - rnfFee;
    const annualSavings = monthlySavings * 12;
    const percentSaved = Math.round((monthlySavings / monthlyInHouseCost) * 100);

    return {
      monthlySavings,
      annualSavings,
      percentSaved,
      rnfFee,
      recommendedTier,
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
      `*Permohonan Saringan Kelayakan SME (RNF Business Solutions)*\n\n` +
      `*Nama:* ${applicantName || 'Pemilik Perniagaan'}\n` +
      `*Entiti:* ${entityType}\n` +
      `*Status Akaun Semasa:* ${currentSetup}\n` +
      `*Anggaran Penjimatan:* RM ${result.monthlySavings.toLocaleString()}/bulan (${result.percentSaved}%)\n` +
      `*Pakej Padanan:* ${result.recommendedTier}\n` +
      `*No Telefon:* ${applicantPhone}\n` +
      (applicantEmail ? `*Email:* ${applicantEmail}\n` : '') +
      `\nSila sahkan slot Complimentary 30-Min Financial Health Check & pengecualian yuran setup.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div id="quick-checker" className="w-full bg-white text-slate-900 rounded-3xl shadow-2xl border border-blue-200/80 overflow-hidden">
      {/* Header with High-Attention Tag (BAM-Inspired) */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-4 sm:p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Saringan Pantas 1 Minit
            </span>
          </div>
          <div className="text-[11px] text-blue-200 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>20 Kuota Percuma Bulan Ini</span>
          </div>
        </div>
        
        <h3 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-white mt-2">
          Semak Kelayakan Penjimatan & Pematuhan LHDN Syarikat
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Dapatkan padanan pakej perakaunan luar (outsourced) & ketahui potensi penjimatan kos sehingga 70% secara automatik.
        </p>

        {/* Step Indicator (Inspired by BAM 4-Step flow) */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px]">
          <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-amber-300' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">1</span>
            <span>Profil</span>
          </div>
          <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-amber-300' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">2</span>
            <span>Keputusan</span>
          </div>
          <div className={`flex items-center gap-1.5 font-bold ${isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">3</span>
            <span>Sahkan Slot</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6">
        {isDone ? (
          /* Step 3: Success & WhatsApp Direct Lock */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-['Outfit'] text-xl font-bold text-slate-900">
                Tahniah! Permohonan Diterima
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Terima kasih, <strong>{applicantName}</strong>. Profil syarikat anda layak untuk <strong>Complimentary 30-Min Financial Health Check</strong> bersama Senior Partner kami.
              </p>
            </div>

            {/* Enticing Result Summary Box */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between items-center text-slate-700">
                <span>Padanan Pakej:</span>
                <strong className="text-emerald-800 font-bold">{result.recommendedTier}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Anggaran Penjimatan Bulanan:</span>
                <strong className="text-emerald-700 text-sm font-extrabold">
                  RM {result.monthlySavings.toLocaleString()} / bln
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Insentif Tambahan:</span>
                <span className="text-blue-700 font-bold">Pengecualian Yuran Setup RM500</span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleWhatsAppForward}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kunci Slot via WhatsApp Segera (Respon Pantas)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDone(false);
                  setStep(1);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline block mx-auto pt-1"
              >
                Kira semula dengan profil lain
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          /* Step 1: Quick Saringan (3-Click Questions) */
          <form onSubmit={handleNextToLead} className="space-y-4 text-xs">
            {/* 1. Entity Type */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Jenis Entiti Perniagaan Anda</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'Sdn Bhd', label: 'Sdn Bhd' },
                  { key: 'Enterprise', label: 'Enterprise / Sole' },
                  { key: 'LLP', label: 'LLP / Perkongsian' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setEntityType(item.key as any)}
                    className={`py-2 px-2.5 text-center rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      entityType === item.key
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Current Setup / Pain Point */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>2. Situasi Perakaunan Semasa Syarikat</span>
              </label>
              <div className="space-y-1.5">
                {[
                  {
                    key: 'in_house',
                    label: 'Ada kerani/eksekutif akaun sendiri (Kos tinggi & turnover)',
                    badge: 'Jimat ~70%',
                  },
                  {
                    key: 'diy',
                    label: 'Owner buat sendiri / resit bersepah dalam fail & plastik',
                    badge: 'Bebas Tekanan',
                  },
                  {
                    key: 'backlog',
                    label: 'Tertunggak lebih 1 tahun (Risiko denda LHDN / SSM)',
                    badge: 'Selesaikan Segera',
                  },
                  {
                    key: 'loan',
                    label: 'Perlu akaun kemas untuk pinjaman bank / geran SME',
                    badge: 'Bank-Ready',
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setCurrentSetup(item.key as any)}
                    className={`w-full p-2.5 rounded-xl border text-left flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-xs transition-all cursor-pointer min-h-[44px] ${
                      currentSetup === item.key
                        ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="pr-1 leading-snug">{item.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100/80 text-blue-800 font-bold shrink-0 self-start xs:self-center">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Monthly Volume */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                3. Anggaran Jumlah Transaksi / Resit Sebulan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'starter', label: '< 80 resit', desc: 'Starter' },
                  { key: 'medium', label: '80 – 300 resit', desc: 'Standard SME' },
                  { key: 'high', label: '300+ resit', desc: 'High Volume' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMonthlyVolume(item.key as any)}
                    className={`py-2 px-2 text-center rounded-xl border text-xs transition-all cursor-pointer ${
                      monthlyVolume === item.key
                        ? 'bg-slate-900 text-white border-slate-900 font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Lihat Anggaran Penjimatan & Pakej Sesuai</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>100% Percuma • Tiada Obligasi • Dilindungi NDA</span>
            </div>
          </form>
        ) : (
          /* Step 2: Instant Results & 30-Sec Quick Sign-Up (High Conversion) */
          <form onSubmit={handleFinalSubmit} className="space-y-4 text-xs">
            {/* Live Result Highlight */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-blue-900">Padanan Pakej RNF:</span>
                <span className="px-2 py-0.5 rounded bg-blue-700 text-white font-bold">
                  {result.recommendedTier}
                </span>
              </div>

              <div className="pt-1 flex items-baseline justify-between border-t border-blue-200/70">
                <span className="text-slate-600">Potensi Jimat vs Staf Dalaman:</span>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black text-emerald-700">
                    RM {result.monthlySavings.toLocaleString()} <span className="text-xs font-medium text-slate-600">/bulan</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold">
                    Jimat ~RM {result.annualSavings.toLocaleString()} setahun ({result.percentSaved}% kos)
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-200/70 flex items-center justify-between text-[11px] text-slate-600">
                <span>Pematuhan LHDN & e-Invois:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  100% Dijamin Audit-Ready
                </span>
              </div>
            </div>

            {/* Quick Sign-Up Fields (Just 3 inputs: Name, WhatsApp, Email) */}
            <div className="space-y-2.5">
              <div className="font-bold text-slate-900 text-xs">
                Kunci Slot 30-Min Health Check & Pengecualian Yuran Setup:
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Nama Anda / Pengarah Syarikat *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Encik Ahmad / Ms Lee"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Nombor WhatsApp / Telefon *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 012-345 6789"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Alamat E-mel Korporat (Pilihan)
                </label>
                <input
                  type="email"
                  placeholder="nama@syarikat.com"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-3 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl border border-slate-200"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>{isSubmitting ? 'Memproses...' : 'Daftar & Kunci Slot Percuma'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Counselor/Advisor Direct Hotline Bar (BAM-Inspired) */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="text-[11px]">
            Perlukan bantuan segera? <strong className="text-slate-900">{COMPANY_INFO.phoneDisplay}</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            const msg = encodeURIComponent("Salam RNF Advisory, saya ingin bertanya tentang semakan kelayakan akaun syarikat kami.");
            window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${msg}`, '_blank');
          }}
          className="text-emerald-700 hover:text-emerald-800 font-bold text-[11px] flex items-center gap-1"
        >
          <MessageCircle className="w-3 h-3" />
          <span>Chat WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
