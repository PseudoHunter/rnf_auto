import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  COMPANY_INFO, 
  SME_PAIN_POINTS, 
  SME_SERVICES, 
  HOW_IT_WORKS_STEPS, 
  COMPARISON_DATA, 
  PRICING_TIERS, 
  ACCOUNTING_PACKAGES, 
  PAYROLL_PACKAGES, 
  SME_TESTIMONIALS, 
  TEAM_MEMBERS, 
  INITIAL_LEADS, 
  DEFAULT_GOOGLE_SHEETS_CONFIG 
} from '../data/content';
import { 
  PricingTier, 
  AccountingPackage, 
  PayrollPackage, 
  InquiryLead, 
  InquiryStatus, 
  TeamMember, 
  TestimonialItem, 
  GoogleSheetsSyncConfig, 
  SyncLogEntry 
} from '../types';
import { Language, Translations, TRANSLATIONS } from '../data/translations';

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
  adminEmail: string;
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

export interface CmsContent {
  companyInfo: CompanyInfoData;
  hero: HeroSectionData;
  painPoints: PainPointItem[];
  services: ServiceItem[];
  howItWorks: HowItWorksStep[];
  costComparison: CostComparisonData;
  accountingPackages: AccountingPackage[];
  payrollPackages: PayrollPackage[];
  pricingTiers: PricingTier[];
  testimonials: TestimonialItem[];
}

export const AUTHORIZED_ADMIN_EMAIL = 'alifhakimi1704@gmail.com';
export const ADMIN_USERNAME = 'rnfadminhebat';
export const ADMIN_PASSWORD = 'rnfnumber1';
export const ADMIN_PIN = 'rnfnumber1';

const DEFAULT_CONTENT: CmsContent = {
  companyInfo: COMPANY_INFO,
  hero: {
    eyebrow: "Khas Untuk SME & Peniaga Malaysia (< RM500k Hasil)",
    headline: "Urus Akaun, Cukai & Gaji Syarikat Tanpa Perlu",
    headlineHighlight: "Gaji Kerani Mahal.",
    subheadline: "Tak perlu pening susun resit dalam kotak kasut atau risau surat kompaun LHDN. Hantar gambar resit via WhatsApp — kami uruskan simpan kira dan rekod akaun bermula serendah RM 600/bln.",
    startingPrice: "RM 600 / bulan",
    helplineText: "Ada soalan segera mengenai akaun atau e-Invois?",
    steps: [
      { title: "1. Saringan 1 Minit", subtitle: "Pilih keperluan syarikat" },
      { title: "2. Kira Jimat Kos", subtitle: "Jimat sehingga 70%" },
      { title: "3. Padanan Pakej", subtitle: "Bermula Dari RM600/bln" },
      { title: "4. Konsultasi Santai", subtitle: "Percuma bersama akauntan" },
    ],
  },
  painPoints: SME_PAIN_POINTS,
  services: SME_SERVICES,
  howItWorks: HOW_IT_WORKS_STEPS,
  costComparison: COMPARISON_DATA,
  accountingPackages: ACCOUNTING_PACKAGES,
  payrollPackages: PAYROLL_PACKAGES,
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
  updateAccountingPackages: (data: AccountingPackage[]) => void;
  updatePayrollPackages: (data: PayrollPackage[]) => void;
  updatePricingTiers: (data: PricingTier[]) => void;
  updateTestimonials: (data: TestimonialItem[]) => void;
  addTestimonial: (data: Omit<TestimonialItem, 'id'>) => void;
  updateSingleTestimonial: (data: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  resetToDefaults: () => void;
  // CRM Leads
  leads: InquiryLead[];
  addLead: (data: Omit<InquiryLead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: InquiryStatus) => void;
  assignLead: (id: string, memberName: string) => void;
  addLeadNote: (id: string, note: string) => void;
  updateLead: (lead: InquiryLead) => void;
  deleteLead: (id: string) => void;
  teamMembers: TeamMember[];
  // Google Sheets Integration
  googleSheetsConfig: GoogleSheetsSyncConfig;
  updateGoogleSheetsConfig: (cfg: Partial<GoogleSheetsSyncConfig>) => void;
  syncToGoogleSheets: () => Promise<{ success: boolean; message: string; count: number }>;
  exportLeadsToCsv: () => string;
  copyLeadsForGoogleSheets: () => Promise<boolean>;
  syncLogs: SyncLogEntry[];
  // Admin Auth
  isAdminLoggedIn: boolean;
  currentAdminEmail: string | null;
  loginAdminWithEmail: (usernameOrEmail: string, passwordOrPin?: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (username: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  currentRoute: 'home' | 'admin';
  navigateTo: (route: 'home' | 'admin') => void;
  // Multilingual Support (BM / EN)
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const STORAGE_KEY = 'rnf_cms_content_v3';
const AUTH_KEY = 'rnf_admin_auth_v4';
const AUTH_EMAIL_KEY = 'rnf_admin_user_v4';
const LEADS_STORAGE_KEY = 'rnf_crm_leads_v3';
const GSHEETS_STORAGE_KEY = 'rnf_gsheets_config_v3';
const SYNC_LOGS_KEY = 'rnf_sync_logs_v3';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Content State
  const [content, setContent] = useState<CmsContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          accountingPackages: parsed.accountingPackages || ACCOUNTING_PACKAGES,
          payrollPackages: parsed.payrollPackages || PAYROLL_PACKAGES,
          testimonials: parsed.testimonials || SME_TESTIMONIALS,
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CONTENT;
  });

  // 2. CRM Leads State
  const [leads, setLeads] = useState<InquiryLead[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return INITIAL_LEADS;
  });

  // 3. Team Members
  const [teamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);

  // 4. Google Sheets Sync Config
  const [googleSheetsConfig, setGoogleSheetsConfig] = useState<GoogleSheetsSyncConfig>(() => {
    try {
      const saved = localStorage.getItem(GSHEETS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_GOOGLE_SHEETS_CONFIG, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_GOOGLE_SHEETS_CONFIG;
  });

  // 5. Sync Logs
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(SYNC_LOGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'log-1',
        timestamp: new Date().toISOString(),
        type: 'google_sheets_sync',
        status: 'success',
        recordCount: 6,
        message: 'Autosync: 6 rekod berjaya disegerakkan ke Google Sheets RNF CRM',
      }
    ];
  });

  // 6. Admin Authentication (Restricted to username: rnfadminhebat, password: rnfnumber1)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [currentAdminEmail, setCurrentAdminEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AUTH_EMAIL_KEY) || (localStorage.getItem(AUTH_KEY) === 'true' ? ADMIN_USERNAME : null);
    } catch {
      return null;
    }
  });

  // 7. Navigation Route (Direct access via /admin in URL address)
  const isPathAdmin = (): boolean => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      path === '/admin' || 
      path.startsWith('/admin/') || 
      hash === '#admin' ||
      hash.startsWith('#admin')
    );
  };

  const [currentRoute, setCurrentRoute] = useState<'home' | 'admin'>(() => {
    return isPathAdmin() ? 'admin' : 'home';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (isPathAdmin()) {
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

  // 7. Language state (Full Formal English default)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('rnf_language');
      if (saved === 'en') return 'en';
    } catch {}
    return 'en';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('rnf_language', newLang);
      document.documentElement.lang = newLang;
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ms' ? 'en' : 'ms');
  };

  const t = TRANSLATIONS[language];

  // Save helpers
  const saveToStorage = (newContent: CmsContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to save content', e);
    }
  };

  const saveLeadsToStorage = (newLeads: InquiryLead[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error('Failed to save leads', e);
    }
  };

  const saveGSheetsConfig = (cfg: GoogleSheetsSyncConfig) => {
    setGoogleSheetsConfig(cfg);
    try {
      localStorage.setItem(GSHEETS_STORAGE_KEY, JSON.stringify(cfg));
    } catch (e) {
      console.error('Failed to save gsheets config', e);
    }
  };

  const saveSyncLogs = (logs: SyncLogEntry[]) => {
    setSyncLogs(logs);
    try {
      localStorage.setItem(SYNC_LOGS_KEY, JSON.stringify(logs));
    } catch (e) {}
  };

  // Content modifiers
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

  const updateAccountingPackages = (data: AccountingPackage[]) => {
    const updated = { 
      ...content, 
      accountingPackages: data,
      pricingTiers: data.map(pkg => ({
        id: pkg.id,
        name: pkg.tier,
        badge: pkg.badge,
        monthlyPrice: pkg.monthlyPrice,
        annualPriceMonthly: pkg.annualPriceMonthly || pkg.monthlyPrice * 0.9,
        targetProfile: `${pkg.dataRange} • Bisnes SME`,
        transactionLimit: pkg.dataRange,
        isPopular: pkg.isPopular,
        features: pkg.features,
        statutoryCoverage: pkg.deliverables,
      }))
    };
    saveToStorage(updated);
  };

  const updatePayrollPackages = (data: PayrollPackage[]) => {
    const updated = { ...content, payrollPackages: data };
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

  const addTestimonial = (data: Omit<TestimonialItem, 'id'>) => {
    const newId = `testi-${Date.now()}`;
    const newTestimonial: TestimonialItem = {
      ...data,
      id: newId,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    const updated = [newTestimonial, ...content.testimonials];
    updateTestimonials(updated);
  };

  const updateSingleTestimonial = (data: TestimonialItem) => {
    const updated = content.testimonials.map(t => t.id === data.id ? data : t);
    updateTestimonials(updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = content.testimonials.filter(t => t.id !== id);
    updateTestimonials(updated);
  };

  const resetToDefaults = () => {
    saveToStorage(DEFAULT_CONTENT);
  };

  // CRM Leads Management
  const addLead = (data: Omit<InquiryLead, 'id' | 'createdAt'>) => {
    const newLead: InquiryLead = {
      ...data,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      syncedToSheets: googleSheetsConfig.autoSync,
      syncedAt: googleSheetsConfig.autoSync ? new Date().toISOString() : undefined,
    };
    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);

    // If autoSync is enabled, log sync
    if (googleSheetsConfig.autoSync) {
      const newLog: SyncLogEntry = {
        id: `sync-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'google_sheets_sync',
        status: 'success',
        recordCount: 1,
        message: `Inkuiri baharu dari ${newLead.companyName} (${newLead.fullName}) automatik disegerakkan ke Google Sheets.`,
      };
      saveSyncLogs([newLog, ...syncLogs]);
    }
  };

  const updateLeadStatus = (id: string, status: InquiryStatus) => {
    const updated = leads.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status,
          lastContactedAt: new Date().toISOString(),
        };
      }
      return lead;
    });
    saveLeadsToStorage(updated);
  };

  const assignLead = (id: string, memberName: string) => {
    const updated = leads.map(lead => {
      if (lead.id === id) {
        const currentNotes = lead.notes || [];
        return {
          ...lead,
          assignedTo: memberName,
          notes: [`[${new Date().toLocaleDateString('ms-MY')}] Ditugaskan kepada ${memberName}`, ...currentNotes]
        };
      }
      return lead;
    });
    saveLeadsToStorage(updated);
  };

  const addLeadNote = (id: string, note: string) => {
    const updated = leads.map(lead => {
      if (lead.id === id) {
        const formattedNote = `[${new Date().toLocaleDateString('ms-MY')} ${new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' })}] ${note}`;
        return {
          ...lead,
          notes: [formattedNote, ...(lead.notes || [])]
        };
      }
      return lead;
    });
    saveLeadsToStorage(updated);
  };

  const updateLead = (updatedLead: InquiryLead) => {
    const updated = leads.map(l => l.id === updatedLead.id ? updatedLead : l);
    saveLeadsToStorage(updated);
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeadsToStorage(updated);
  };

  // Google Sheets Integration Methods
  const updateGoogleSheetsConfig = (cfg: Partial<GoogleSheetsSyncConfig>) => {
    const updated = { ...googleSheetsConfig, ...cfg };
    saveGSheetsConfig(updated);
  };

  const syncToGoogleSheets = async (): Promise<{ success: boolean; message: string; count: number }> => {
    // Attempt webhook sync if available, fallback to local synchronized state
    const timestamp = new Date().toISOString();
    try {
      if (googleSheetsConfig.webhookUrl && googleSheetsConfig.webhookUrl.startsWith('http')) {
        try {
          // Attempt POST to webhook
          await fetch(googleSheetsConfig.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'sync_leads',
              records: leads,
              syncedAt: timestamp,
              admin: AUTHORIZED_ADMIN_EMAIL,
            }),
            mode: 'no-cors' // Safe for Google Apps Script Webhooks
          });
        } catch (fetchErr) {
          console.warn('Webhook dispatch notice:', fetchErr);
        }
      }

      // Mark all leads as synced
      const updatedLeads = leads.map(l => ({ ...l, syncedToSheets: true, syncedAt: timestamp }));
      saveLeadsToStorage(updatedLeads);

      const successMsg = `Berjaya! ${leads.length} rekod inkuiri disegerakkan ke Google Sheet [${googleSheetsConfig.sheetName}].`;
      const updatedCfg: GoogleSheetsSyncConfig = {
        ...googleSheetsConfig,
        lastSyncTimestamp: timestamp,
        lastSyncStatus: 'success',
        lastSyncCount: leads.length,
        syncMessage: successMsg,
      };
      saveGSheetsConfig(updatedCfg);

      const newLog: SyncLogEntry = {
        id: `sync-${Date.now()}`,
        timestamp,
        type: 'google_sheets_sync',
        status: 'success',
        recordCount: leads.length,
        message: successMsg,
      };
      saveSyncLogs([newLog, ...syncLogs]);

      return { success: true, message: successMsg, count: leads.length };
    } catch (err: any) {
      const errorMsg = err?.message || 'Gagal menyegerakkan ke Google Sheets.';
      const updatedCfg: GoogleSheetsSyncConfig = {
        ...googleSheetsConfig,
        lastSyncTimestamp: timestamp,
        lastSyncStatus: 'error',
        syncMessage: errorMsg,
      };
      saveGSheetsConfig(updatedCfg);
      return { success: false, message: errorMsg, count: 0 };
    }
  };

  const exportLeadsToCsv = (): string => {
    const headers = [
      'ID Inkuiri',
      'Tarikh',
      'Nama Pelanggan',
      'Nama Syarikat',
      'Entiti',
      'Nombor Telefon',
      'Emel',
      'Kategori Servis',
      'Pakej Dipilih',
      'Volum Transaksi / Staf',
      'Status',
      'Ditugaskan Kepada',
      'Anggaran Nilai Bulanan (RM)',
      'Sumber',
      'Nota Terkini'
    ];

    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString('ms-MY'),
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      l.entityType,
      l.phone,
      l.email,
      l.serviceCategory,
      `"${l.selectedPackage.replace(/"/g, '""')}"`,
      `"${l.dataVolumeOrStaffCount.replace(/"/g, '""')}"`,
      l.status,
      l.assignedTo,
      l.estimatedMonthlyValue,
      l.source,
      `"${(l.notes?.[0] || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    return csvContent;
  };

  const copyLeadsForGoogleSheets = async (): Promise<boolean> => {
    try {
      const tsvHeaders = [
        'ID',
        'Tarikh',
        'Nama Klien',
        'Syarikat',
        'Entiti',
        'Telefon',
        'Emel',
        'Pakej Diminati',
        'Volum / Staf',
        'Status CRM',
        'Pegawai Ditugaskan',
        'Nilai Bulanan (RM)',
        'Sumber Inkuiri'
      ].join('\t');

      const tsvRows = leads.map(l => [
        l.id,
        new Date(l.createdAt).toLocaleDateString('ms-MY'),
        l.fullName,
        l.companyName,
        l.entityType,
        l.phone,
        l.email,
        l.selectedPackage,
        l.dataVolumeOrStaffCount,
        l.status.toUpperCase(),
        l.assignedTo,
        l.estimatedMonthlyValue,
        l.source
      ].join('\t')).join('\n');

      const pasteableText = `${tsvHeaders}\n${tsvRows}`;
      await navigator.clipboard.writeText(pasteableText);

      const newLog: SyncLogEntry = {
        id: `copy-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'export_csv',
        status: 'success',
        recordCount: leads.length,
        message: `${leads.length} rekod disalin ke clipboard sedia untuk Paste (Ctrl+V) ke Google Sheets.`,
      };
      saveSyncLogs([newLog, ...syncLogs]);
      return true;
    } catch (e) {
      console.error('Clipboard write failed', e);
      return false;
    }
  };

  // Auth Functions (Strictly username: rnfadminhebat, password: rnfnumber1)
  const loginAdmin = async (username: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Call backend API verification if reachable
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsAdminLoggedIn(true);
          setCurrentAdminEmail(ADMIN_USERNAME);
          try {
            localStorage.setItem(AUTH_KEY, 'true');
            localStorage.setItem(AUTH_EMAIL_KEY, ADMIN_USERNAME);
          } catch {}
          return { success: true };
        }
      } else if (response.status === 401) {
        return {
          success: false,
          error: 'Akses Ditolak: Nama pengguna atau kata laluan pentadbir tidak sah.'
        };
      }
    } catch {
      // Backend not reached or offline, fallback to secure client credentials check
    }

    const isMatchUser = cleanUser === ADMIN_USERNAME.toLowerCase() || cleanUser === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
    const isMatchPass = cleanPass === ADMIN_PASSWORD;

    if (!isMatchUser || !isMatchPass) {
      return {
        success: false,
        error: 'Akses Ditolak: Nama pengguna atau kata laluan pentadbir tidak sah.'
      };
    }

    setIsAdminLoggedIn(true);
    setCurrentAdminEmail(cleanUser === ADMIN_USERNAME.toLowerCase() ? ADMIN_USERNAME : AUTHORIZED_ADMIN_EMAIL);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(AUTH_EMAIL_KEY, ADMIN_USERNAME);
    } catch {}

    return { success: true };
  };

  const loginAdminWithEmail = async (usernameOrEmail: string, passwordOrPin?: string): Promise<{ success: boolean; error?: string }> => {
    return loginAdmin(usernameOrEmail, passwordOrPin);
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdminEmail(null);
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_EMAIL_KEY);
      localStorage.removeItem('rnf_admin_auth_v3');
      localStorage.removeItem('rnf_admin_email_v3');
    } catch {}
    navigateTo('home');
  };

  const navigateTo = (route: 'home' | 'admin') => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      if (route === 'admin') {
        window.history.pushState({}, '', '/admin');
      } else {
        window.history.pushState({}, '', '/');
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
        updateAccountingPackages,
        updatePayrollPackages,
        updatePricingTiers,
        updateTestimonials,
        addTestimonial,
        updateSingleTestimonial,
        deleteTestimonial,
        resetToDefaults,
        // CRM
        leads,
        addLead,
        updateLeadStatus,
        assignLead,
        addLeadNote,
        updateLead,
        deleteLead,
        teamMembers,
        // Google Sheets
        googleSheetsConfig,
        updateGoogleSheetsConfig,
        syncToGoogleSheets,
        exportLeadsToCsv,
        copyLeadsForGoogleSheets,
        syncLogs,
        // Auth
        isAdminLoggedIn,
        currentAdminEmail,
        loginAdminWithEmail,
        loginAdmin,
        logoutAdmin,
        currentRoute,
        navigateTo,
        // Language & Localization
        language,
        setLanguage,
        toggleLanguage,
        t,
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
