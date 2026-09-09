import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck,
  Mail
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { RnfLogo } from './RnfLogo';

interface NavbarProps {
  onOpenHealthCheck: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHealthCheck, onNavigateTo }) => {
  const { content, navigateTo } = useCms();
  const { companyInfo } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Secret admin access: tap logo 5 times in succession
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoTap = () => {
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

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Masalah SME', id: 'masalah-sme' },
    { label: 'Servis Kami', id: 'perkhidmatan' },
    { label: 'Cara Kerja', id: 'cara-kerja' },
    { label: 'Banding Kos', id: 'bandingkan-kos' },
    { label: 'Pakej Harga', id: 'pricing' },
    { label: 'Testimoni', id: 'testimoni' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Salam ${companyInfo.name}, saya ingin tahu lebih lanjut mengenai pakej akaun & cukai untuk bisnes saya.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Micro-Bar */}
      <div className="bg-[#09263b] text-slate-200 text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 border-b border-blue-950/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Official Address */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-300 truncate">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
            <span className="truncate" title={companyInfo.address}>
              Mercu Aspire KL, Eco City, Bangsar, KL
            </span>
          </div>

          {/* Right: Direct Phone & WhatsApp (Optimized for Mobile Tap) */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs shrink-0">
            <a
              href={`mailto:${companyInfo.email}`}
              className="hidden md:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-blue-400" />
              <span>{companyInfo.email}</span>
            </a>

            <a
              href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`}
              className="flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 transition-colors py-0.5"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="text-[11px] sm:text-xs">{companyInfo.phoneDisplay}</span>
            </a>

            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer py-0.5"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden xs:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-200 border-b ${
          isScrolled ? 'shadow-md border-slate-200' : 'border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Name (Special admin access via 5 rapid taps) */}
          <div 
            onClick={handleLogoTap}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 select-none"
            title="RNF Business Solutions"
          >
            {/* The exact logo file /rnf-logo.svg */}
            <RnfLogo size={38} className="sm:w-[46px] sm:h-[46px]" variant="badge" />

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-['Outfit'] text-base sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors leading-tight">
                  RNF <span className="text-blue-700">BUSINESS</span> SOLUTIONS
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-semibold tracking-wide text-slate-500 truncate max-w-[190px] xs:max-w-[240px] sm:max-w-none">
                Akaun • Cukai • Gaji • e-Invois LHDN
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 text-xs xl:text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Action Group */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('consultation-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onOpenHealthCheck();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Sebut Harga Percuma</span>
            </button>

            <button
              onClick={onOpenHealthCheck}
              className="flex items-center gap-2 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Konsultasi 1-to-1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle & Fast Action */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              onClick={onOpenHealthCheck}
              className="sm:hidden px-2.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold rounded-lg whitespace-nowrap min-h-[36px] flex items-center"
            >
              Konsultasi
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between cursor-pointer min-h-[44px]"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenHealthCheck();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
              >
                <ShieldCheck className="w-4 h-4 text-blue-200" />
                <span>Tempah Sesi Konsultasi Percuma</span>
              </button>

              <button
                onClick={() => {
                  openWhatsApp();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold rounded-xl flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Penasihat ({companyInfo.phoneDisplay})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
