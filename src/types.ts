export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  coreBenefit: string;
  keyDeliverables: string[];
  bestFor: string;
  iconName: string;
  accentColor: string;
  softwareBadges?: string[];
  detailedWorkflow?: string[];
}

export interface CaseStudy {
  id: string;
  companyName: string;
  entityType: string;
  industry: 'F&B' | 'Automotive' | 'Education' | 'Retail & Wholesale';
  headline: string;
  keyMetrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  challenge: string;
  rnfSolution: string;
  impactQuote: string;
  founderName: string;
  founderRole: string;
}

export interface AccountingPackage {
  id: string;
  tier: 'STARTER' | 'BASIC' | 'ADVANCE' | 'PREMIUM';
  name: string;
  monthlyPrice: number;
  annualPriceMonthly?: number;
  dataRange: string;
  minData: number;
  maxData: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  deliverables: string[];
}

export interface PayrollPackage {
  id: string;
  tier: 'STARTER' | 'BASIC' | 'ADVANCE' | 'PREMIUM';
  name: string;
  monthlyPrice: number;
  annualPriceMonthly?: number;
  staffRange: string;
  minStaff: number;
  maxStaff: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  deliverables: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPriceMonthly: number;
  targetProfile: string;
  transactionLimit: string;
  features: string[];
  statutoryCoverage: string[];
  isPopular?: boolean;
}

export interface DiagnosticState {
  debtorDelay: string;
  bankReconFrequency: string;
  primaryPainPoint: string;
}

export interface BookingFormData {
  fullName: string;
  companyName: string;
  entityType: string;
  monthlyVolume: string;
  primaryConcern: string;
  phoneNumber: string;
  email: string;
  preferredTime: string;
  notes?: string;
}

export type InquiryStatus = 'baru' | 'dihubungi' | 'konsultasi' | 'menang' | 'tutup';

export interface InquiryLead {
  id: string;
  createdAt: string;
  fullName: string;
  companyName: string;
  entityType: 'Sdn Bhd' | 'Enterprise' | 'LLP' | 'LLP / Perkongsian' | 'Peniaga Online / Tunggal' | 'Perkongsian';
  phone: string;
  email: string;
  serviceCategory: 'accounting' | 'payroll' | 'combo' | 'bundle';
  selectedPackage: string; // e.g. "STARTER (RM 600)" or "Payroll BASIC (RM 300)"
  dataVolumeOrStaffCount: string;
  status: InquiryStatus;
  assignedTo: string; // Team member name or email
  estimatedMonthlyValue: number;
  notes: string[];
  source: string; // 'WhatsApp' | 'Borang Konsultasi Laman Web' | 'Widget Saringan 1 Minit' | 'Panggilan Masuk / WhatsApp'
  lastContactedAt?: string;
  syncedToSheets?: boolean;
  syncedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  avatarColor: string;
  activeLeadsCount?: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  business: string;
  quote: string;
  savings: string;
  rating: number;
  isFeatured?: boolean;
  dateAdded?: string;
}

export interface GoogleSheetsSyncConfig {
  webhookUrl: string;
  spreadsheetId?: string;
  sheetName: string;
  autoSync: boolean;
  lastSyncTimestamp?: string;
  lastSyncStatus?: 'success' | 'error' | 'idle';
  lastSyncCount?: number;
  syncMessage?: string;
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  type: 'google_sheets_sync' | 'export_csv' | 'webhook_push';
  status: 'success' | 'error';
  recordCount: number;
  message: string;
}
