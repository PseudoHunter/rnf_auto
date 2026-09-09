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
