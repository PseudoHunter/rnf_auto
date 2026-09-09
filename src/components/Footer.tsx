import React, { useRef } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUp, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { RnfLogo } from './RnfLogo';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
  onOpenHealthCheck: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo, onOpenHealthCheck }) => {
  const { content, navigateTo } = useCms();
  const { companyInfo } = content;

  // Secret admin access: tap copyright 5 times in succession
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretAdminTap = () => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);

    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      navigateTo('admin');
      return;
    }

    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071927] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Corporate Overview (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <RnfLogo size={44} variant="badge" />
              <div>
                <span className="font-['Outfit'] text-lg font-bold tracking-tight text-white">
                  RNF <span className="text-blue-400">BUSINESS</span> SOLUTIONS
                </span>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  Corporate Advisory • Finance • Digital Growth
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Membantu pemilik SME & Enterprise Malaysia menjimatkan sehingga 70% kos kerani akaun, memastikan 100% kepatuhan cukai LHDN & e-Invois, serta menyediakan laporan kewangan kemas sedia bank.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div><strong>Pendaftaran:</strong> SSM {companyInfo.regNumber}</div>
              <div><strong>Rekod Prestasi:</strong> {companyInfo.experienceYears} Tahun Pengalaman • Ratusan SME Diuruskan</div>
            </div>
          </div>

          {/* Service Wings Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Perkhidmatan SME
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTo('perkhidmatan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Simpan Kira & Akaun Bulanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('perkhidmatan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cukai Syarikat & e-Invois LHDN
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('perkhidmatan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gaji Staf, KWSP, SOCSO & EIS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('perkhidmatan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Penyata Kewangan Sedia Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('cara-kerja')}
                  className="hover:text-white transition-colors text-blue-400 cursor-pointer"
                >
                  3 Langkah Mudah Hantar Resit
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Tools & Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Pautan Pantas
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTo('masalah-sme')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Masalah Utama SME
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('bandingkan-kos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Banding Kos: Kerani vs RNF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pakej & Harga Langganan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('testimoni')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kisah Kejayaan Pelanggan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('consultation-form')}
                  className="hover:text-white transition-colors text-amber-400 cursor-pointer font-bold"
                >
                  Sebut Harga Percuma 15 Minit
                </button>
              </li>
            </ul>
          </div>

          {/* Head Office Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Pejabat Rasmi
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {companyInfo.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a 
                  href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`} 
                  className="hover:text-amber-300 transition-colors font-mono"
                >
                  {companyInfo.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="hover:text-blue-300 transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{companyInfo.operatingHours}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenHealthCheck}
                className="w-full py-2.5 px-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors text-center cursor-pointer shadow-sm"
              >
                Konsultasi & Sebut Harga
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Statutory & Disclaimer Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div 
            onClick={handleSecretAdminTap}
            className="cursor-default select-none hover:text-slate-300 transition-colors"
            title="RNF Business Solutions"
          >
            © {new Date().getFullYear()} RNF Business Solutions. Hak cipta terpelihara. Pendaftaran SSM Malaysia.
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span>MFRS Compliant</span>
            <span>Companies Act 2016</span>
            <span>LHDN e-Invoicing Ready</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
