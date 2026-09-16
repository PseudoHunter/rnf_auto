import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck,
  Mail,
  Lock
} from 'lucide-react';
import { useCms, AUTHORIZED_ADMIN_EMAIL } from '../context/CmsContext';
import { RnfLogo } from './RnfLogo';

interface NavbarProps {
  onOpenHealthCheck: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHealthCheck, onNavigateTo }) => {
  const { content, navigateTo, isAdminLoggedIn, t } = useCms();
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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Packages & Services', id: 'fleet' },
    { label: 'About Us', id: 'about' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${companyInfo.name}, I would like to inquire about your corporate accounting (RM600 - RM1200) and payroll (RM200 - RM500) packages.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Micro-Bar - Strictly One Line with Anti-Overflow */}
      <div className="bg-[#002033] text-[#bac7db] text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 border-b border-[#003657]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 whitespace-nowrap overflow-hidden">
          {/* Left: Official Address in One Line with Truncation Guard */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#bac7db] shrink-0 whitespace-nowrap min-w-0">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none font-medium">
              {t.nav.address}
            </span>
          </div>

          {/* Right: Contacts & Portal Access */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs shrink-0 whitespace-nowrap">
            <a
              href={`mailto:${companyInfo.email}`}
              className="hidden md:inline-flex items-center gap-1.5 text-[#bac7db] hover:text-[#f4f6fc] transition-colors whitespace-nowrap"
            >
              <Mail className="w-3 h-3 text-emerald-400" />
              <span>{companyInfo.email}</span>
            </a>

            <a
              href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`}
              className="flex items-center gap-1 font-bold text-emerald-300 hover:text-emerald-200 transition-colors py-0.5 whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="hidden xs:inline">{companyInfo.phoneDisplay}</span>
              <span className="xs:hidden">Call</span>
            </a>

            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer py-0.5 whitespace-nowrap"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Discreet Admin Portal Access Link */}
            <button
              onClick={() => navigateTo('admin')}
              title={`Secret Admin Portal (${AUTHORIZED_ADMIN_EMAIL})`}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                isAdminLoggedIn 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              <Lock className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar - Texts Arranged Neatly in One Single Line */}
      <div 
        className={`bg-[#003352]/95 backdrop-blur-md transition-shadow duration-200 border-b ${
          isScrolled ? 'shadow-lg border-[#004d7c]' : 'border-[#003f66]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          {/* Brand Logo & Name - Arranged neatly in one line */}
          <div 
            onClick={handleLogoTap}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0 select-none whitespace-nowrap min-w-0"
            title="RNF Business Solutions (Klik 5 kali untuk Admin Portal)"
          >
            <RnfLogo size={36} className="sm:w-[42px] sm:h-[42px] shrink-0" variant="badge" />

            <div className="flex items-center gap-2 whitespace-nowrap min-w-0">
              <span className="font-['Outfit'] text-sm sm:text-lg lg:text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap truncate">
                RNF <span className="text-emerald-400">BUSINESS</span> SOLUTIONS
              </span>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#00243b] text-emerald-300 border border-emerald-500/30 whitespace-nowrap shrink-0">
                {t.nav.brandTag}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap shrink-0 whitespace-nowrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-2.5 xl:px-3 py-1.5 text-xs font-semibold tracking-tight text-[#f4f6fc]/90 hover:text-white hover:bg-[#00263e] rounded-lg transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Action Group */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0 flex-nowrap whitespace-nowrap">
            <button
              onClick={() => {
                const el = document.getElementById('consultation-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onOpenHealthCheck();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#003352] bg-[#f4f6fc] hover:bg-white rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs hover:shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
              <span className="whitespace-nowrap">Get a Quote</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2 shrink-0 whitespace-nowrap">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 hover:bg-[#00263e] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#003f66] bg-[#002740] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-[#f4f6fc] hover:text-white hover:bg-[#003352] rounded-xl transition-colors flex items-center justify-between cursor-pointer min-h-[44px]"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <div className="pt-3 border-t border-[#003f66] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenHealthCheck();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 px-4 bg-[#f4f6fc] hover:bg-white text-[#003352] text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>Book Complimentary Consultation</span>
              </button>

              <button
                onClick={() => {
                  openWhatsApp();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 bg-[#003352] text-emerald-300 border border-[#004d7c] hover:bg-[#003b5e] text-xs font-bold rounded-xl flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp ({companyInfo.phoneDisplay})</span>
              </button>

              {/* Secret Admin Portal in Mobile Menu */}
              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-slate-400 hover:text-emerald-300 text-xs flex items-center justify-center gap-1.5 pt-2"
              >
                <Lock className="w-3 h-3" />
                <span>{t.nav.admin}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

