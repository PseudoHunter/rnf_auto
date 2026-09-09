import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO, SME_PAIN_POINTS, SME_SERVICES, HOW_IT_WORKS_STEPS, COMPARISON_DATA, PRICING_TIERS, SME_TESTIMONIALS, TRUST_PROOF_STATS } from '../data/content';
import { PricingTier } from '../types';

export interface CompanyInfoData {
  name: string;
  tagline: string;
  regNumber: string;
  experienceYears: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  operatingHours: string;
}

export interface HeroSectionData {
  eyebrow: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  startingPrice: string;
  helplineText: string;
  steps: { title: string; subtitle: string }[];
}

export interface PainPointItem {
  icon: string;
  title: string;
  desc: string;
  highlight: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  points: string[];
  icon: string;
  badge: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

export interface CostComparisonData {
  inHouse: {
    title: string;
    monthlySalary: number;
    epfSocsoEis: number;
    softwareLicenses: number;
    officeEquipmentHr: number;
    totalMonthly: number;
    annualCost: number;
    painPoints: string[];
  };
  rnfManaged: {
    title: string;
    monthlyFeeRange: string;
    averageFee: number;
    epfSocsoEis: number;
    softwareLicenses: string;
    officeEquipmentHr: number;
    totalMonthly: number;
    annualCost: number;
    benefits: string[];
  };
}

export interface TestimonialItem {
  name: string;
  role: string;
  business: string;
  quote: string;
  savings: string;
}

export interface CmsContent {
  companyInfo: CompanyInfoData;
  hero: HeroSectionData;
  painPoints: PainPointItem[];
  services: ServiceItem[];
  howItWorks: HowItWorksStep[];
  costComparison: CostComparisonData;
  pricingTiers: PricingTier[];
  testimonials: TestimonialItem[];
}

const DEFAULT_CONTENT: CmsContent = {
  companyInfo: {
    name: "RNF Business Solutions",
    tagline: "Khidmat Akaun, Cukai, Gaji & e-Invois Lengkap Untuk SME Malaysia",
    regNumber: "201801042918 (1306950-V)",
    experienceYears: "15+",
    phone: "+60 11-5129 1786",
    phoneDisplay: "011-5129 1786",
    whatsappNumber: "601151291786",
    whatsappDisplay: "+60 11-5129 1786",
    email: "info@rnfbusinesssolutions.com",
    address: "Unit 21-01, Level 21, Mercu Aspire KL, Eco City, No 3 Jalan Bangsar, 59200, Kuala Lumpur",
    operatingHours: "Isnin – Jumaat: 9:00 AM – 6:00 PM",
  },
  hero: {
    eyebrow: "Khas Untuk SME & Peniaga Malaysia (< RM500k Hasil)",
    headline: "Urus Akaun, Cukai & Gaji Syarikat Tanpa Perlu",
    headlineHighlight: "Gaji Kerani Mahal.",
    subheadline: "Tak perlu pening susun resit dalam kotak kasut atau risau surat kompaun LHDN. Hantar gambar resit via WhatsApp — kami uruskan simpan kira, e-Invois, dan slip gaji staf dari serendah RM 299 / bulan.",
    startingPrice: "RM 299 / bulan",
    helplineText: "Ada soalan segera mengenai akaun atau e-Invois?",
    steps: [
      { title: "1. Saringan 1 Minit", subtitle: "Pilih entiti & transaksi" },
      { title: "2. Kira Jimat Kos", subtitle: "Jimat sehingga 70%" },
      { title: "3. Padanan Pakej", subtitle: "Bermula RM299/bln" },
      { title: "4. Konsultasi Santai", subtitle: "Percuma bersama akauntan" },
    ],
  },
  painPoints: SME_PAIN_POINTS,
  services: SME_SERVICES,
  howItWorks: HOW_IT_WORKS_STEPS,
  costComparison: COMPARISON_DATA,
  pricingTiers: PRICING_TIERS,
  testimonials: SME_TESTIMONIALS,
};

interface CmsContextType {
  content: CmsContent;
  updateCompanyInfo: (data: Partial<CompanyInfoData>) => void;
  updateHero: (data: Partial<HeroSectionData>) => void;
  updatePainPoints: (data: PainPointItem[]) => void;
  updateServices: (data: ServiceItem[]) => void;
  updateHowItWorks: (data: HowItWorksStep[]) => void;
  updateCostComparison: (data: Partial<CostComparisonData>) => void;
  updatePricingTiers: (data: PricingTier[]) => void;
  updateTestimonials: (data: TestimonialItem[]) => void;
  resetToDefaults: () => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  currentRoute: 'home' | 'admin';
  navigateTo: (route: 'home' | 'admin') => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const STORAGE_KEY = 'rnf_cms_content_v2';
const AUTH_KEY = 'rnf_admin_auth_v1';
const ADMIN_PIN = 'rnf2026';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CmsContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONTENT, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CONTENT;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [currentRoute, setCurrentRoute] = useState<'home' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === '/admin' || 
        path.startsWith('/admin') || 
        hash === '#admin' || 
        search.includes('admin') ||
        search.includes('backend')
      ) {
        return 'admin';
      }
    }
    return 'home';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === '/admin' || 
        path.startsWith('/admin') || 
        hash === '#admin' || 
        search.includes('admin') ||
        search.includes('backend')
      ) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const saveToStorage = (newContent: CmsContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const updateCompanyInfo = (data: Partial<CompanyInfoData>) => {
    const updated = { ...content, companyInfo: { ...content.companyInfo, ...data } };
    saveToStorage(updated);
  };

  const updateHero = (data: Partial<HeroSectionData>) => {
    const updated = { ...content, hero: { ...content.hero, ...data } };
    saveToStorage(updated);
  };

  const updatePainPoints = (data: PainPointItem[]) => {
    const updated = { ...content, painPoints: data };
    saveToStorage(updated);
  };

  const updateServices = (data: ServiceItem[]) => {
    const updated = { ...content, services: data };
    saveToStorage(updated);
  };

  const updateHowItWorks = (data: HowItWorksStep[]) => {
    const updated = { ...content, howItWorks: data };
    saveToStorage(updated);
  };

  const updateCostComparison = (data: Partial<CostComparisonData>) => {
    const updated = { ...content, costComparison: { ...content.costComparison, ...data } };
    saveToStorage(updated);
  };

  const updatePricingTiers = (data: PricingTier[]) => {
    const updated = { ...content, pricingTiers: data };
    saveToStorage(updated);
  };

  const updateTestimonials = (data: TestimonialItem[]) => {
    const updated = { ...content, testimonials: data };
    saveToStorage(updated);
  };

  const resetToDefaults = () => {
    saveToStorage(DEFAULT_CONTENT);
  };

  const loginAdmin = (pin: string) => {
    if (pin.trim() === ADMIN_PIN || pin.trim() === 'admin' || pin.trim() === '1234') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  const navigateTo = (route: 'home' | 'admin') => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      if (route === 'admin') {
        window.history.pushState({}, '', '#admin');
      } else {
        window.history.pushState({}, '', window.location.pathname.replace(/\/admin.*$/, '') || '/');
      }
    }
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        updateCompanyInfo,
        updateHero,
        updatePainPoints,
        updateServices,
        updateHowItWorks,
        updateCostComparison,
        updatePricingTiers,
        updateTestimonials,
        resetToDefaults,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        currentRoute,
        navigateTo,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
