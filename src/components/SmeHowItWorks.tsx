import React from 'react';
import { Camera, Cpu, CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const SmeHowItWorks: React.FC = () => {
  const { content } = useCms();
  const { companyInfo, howItWorks } = content;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-7 h-7 text-blue-600" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-indigo-600" />;
      case 'CheckCircle':
        return <CheckCircle className="w-7 h-7 text-emerald-600" />;
      default:
        return <CheckCircle className="w-7 h-7 text-blue-600" />;
    }
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      "Salam RNF, saya pemilik SME dan ingin tahu cara mudah hantar resit & mula pakej akaun syarikat saya."
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="cara-kerja" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-400/30">
            Sangat Mudah & Bebas Tekanan
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Cara Kami Beroperasi: Hanya 3 Langkah Sahaja
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Tak perlu install software rumit atau belajar akaun. Serahkan kepada kami, anda fokus cari jualan.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {howItWorks.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-7 relative flex flex-col justify-between hover:border-slate-600 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                    {getIcon(step.icon)}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-700 font-['Outfit']">
                    0{step.step}
                  </span>
                </div>

                <h3 className="font-['Outfit'] text-xl font-bold text-white mb-2">
                  Langkah {step.step}: {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 text-[11px] text-blue-300 font-medium">
                {idx === 0 && '📱 Boleh snap guna telefon terus via WhatsApp'}
                {idx === 1 && '🔒 Data selamat & disimpan secara sulit (NDA)'}
                {idx === 2 && '📊 Lengkap untung rugi & sedia e-Invois LHDN'}
              </div>
            </div>
          ))}
        </div>

        {/* Quick CTA Box */}
        <div className="bg-gradient-to-r from-blue-900/60 via-slate-800 to-indigo-900/60 border border-blue-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-['Outfit'] text-lg sm:text-xl font-bold text-white">
              Ada lambakan resit lama yang belum bersusun?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Jangan bimbang. Pasukan kami boleh bantu 'backlog clearance' resit tertunggak tahun lepas dengan pantas.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppHelp}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp Sekarang</span>
          </button>
        </div>
      </div>
    </section>
  );
};
