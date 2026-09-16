import React, { useRef } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp, Lock } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { RnfLogo } from './RnfLogo';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
  onOpenHealthCheck: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo, onOpenHealthCheck }) => {
  const { content, navigateTo, t } = useCms();
  const { companyInfo } = content;
  const f = t.footer;

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
    <footer className="bg-[#001c2d] text-[#bac7db] text-xs border-t border-[#003859]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#003859]">
          {/* Brand & Corporate Overview (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <RnfLogo size={42} variant="badge" />
              <div>
                <span className="font-['Outfit'] text-base sm:text-lg font-bold tracking-tight text-[#f4f6fc]">
                  RNF <span className="text-emerald-400">BUSINESS</span> SOLUTIONS
                </span>
                <p className="text-[10px] text-[#bac7db] font-medium tracking-wider uppercase">
                  ACCOUNTING • BOOKKEEPING • PAYROLL • AUTOMATION
                </p>
              </div>
            </div>

            <p className="text-xs text-[#bac7db] leading-relaxed max-w-sm break-words">
              {f.brandDesc}
            </p>

            <div className="pt-2 text-[11px] text-[#8fa7c4] space-y-1">
              <div><strong>Registration:</strong> SSM {companyInfo.regNumber}</div>
              <div><strong>Track Record:</strong> {companyInfo.experienceYears} Years Experience • Hundreds of Malaysian SMEs Managed</div>
            </div>
          </div>

          {/* Service Wings Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {f.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTo('fleet')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Monthly Bookkeeping & Retainers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('fleet')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corporate Payroll & Statutory PCB
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('fleet')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corporate Tax & LHDN e-Invoicing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('fleet')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bank-Ready Financial Statements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('cara-kerja')}
                  className="hover:text-white transition-colors text-emerald-300 cursor-pointer text-left"
                >
                  3 Simple Steps to Send Receipts
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Tools & Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {f.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Overview & Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Our Firm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('fleet')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pricing Packages
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenHealthCheck}
                  className="hover:text-white transition-colors text-emerald-300 cursor-pointer font-bold text-left"
                >
                  Complimentary Business Review
                </button>
              </li>
            </ul>
          </div>

          {/* Head Office Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {f.officeTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-[#bac7db]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed break-words">
                  {companyInfo.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a 
                  href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`} 
                  className="hover:text-white transition-colors font-mono"
                >
                  {companyInfo.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="hover:text-white transition-colors break-all"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenHealthCheck}
                className="w-full py-2.5 px-3 bg-[#003352] hover:bg-[#004770] text-[#f4f6fc] border border-[#005587] font-bold rounded-xl text-xs transition-colors text-center cursor-pointer shadow-sm min-h-[40px]"
              >
                {t.nav.ctaQuote}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Statutory & Disclaimer Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8fa7c4]">
          <div 
            onClick={handleSecretAdminTap}
            className="cursor-default select-none hover:text-white transition-colors text-center md:text-left break-words"
            title="RNF Business Solutions"
          >
            {f.rights}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {(f?.complianceBadges || []).map((badge, bIdx) => (
              <span key={bIdx}>{badge}</span>
            ))}
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer py-1"
              title="Administrator Portal"
            >
              <Lock className="w-3 h-3" />
              <span>{f.adminAccess}</span>
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#8fa7c4] hover:text-white transition-colors cursor-pointer py-1"
            >
              <span>{f.backToTop}</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
