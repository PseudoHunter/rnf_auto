import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, MessageCircle, Lock } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { BookingFormData } from '../types';

interface HealthCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTopic?: string;
}

export const HealthCheckModal: React.FC<HealthCheckModalProps> = ({
  isOpen,
  onClose,
  preselectedTopic,
}) => {
  const { content } = useCms();
  const { companyInfo } = content;
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    companyName: '',
    entityType: 'Sdn Bhd',
    monthlyVolume: '100 – 300 transactions/mo',
    primaryConcern: preselectedTopic || 'Financial health audit & outsourcing savings',
    phoneNumber: '',
    email: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `*Priority Health Check Booking*\n\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Company:* ${formData.companyName} (${formData.entityType})\n` +
      `*Phone:* ${formData.phoneNumber}\n` +
      `*Concern:* ${formData.primaryConcern}\n` +
      `*Slot:* ${formData.preferredTime}\n\n` +
      `Please assign a Senior Partner for our 30-Min session.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close Health Check Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-['Outfit'] text-2xl font-bold text-slate-900">
              Audit Scheduled Successfully
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. Our advisory office will contact you via WhatsApp / Phone to confirm your exact 30-min window.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleWhatsAppForward}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Immediately</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Senior Malaysian Advisory Desk
                </span>
                <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 leading-tight">
                  Book Free 30-Min Financial Health Check
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Get an immediate forensic review of your statutory standing, cash flow bottlenecks, and discover how to save up to 70% vs in-house overhead.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dato' / Mr / Ms Tan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Synergy Engineering Sdn Bhd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Entity Type
                  </label>
                  <select
                    value={formData.entityType}
                    onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Sdn Bhd">Sdn Bhd</option>
                    <option value="Sole Proprietor">Enterprise / Sole Proprietor</option>
                    <option value="LLP">LLP / Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Monthly Document Volume
                  </label>
                  <select
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="< 80 tx/mo">&lt; 80 tx/mo (Starter)</option>
                    <option value="100 – 300 tx/mo">100 – 300 tx/mo (Growing)</option>
                    <option value="300+ tx/mo">300+ tx/mo (High Volume)</option>
                    <option value="Backlog Clean-up">Backlog Clean-up</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+60 1X-XXX XXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="director@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Primary Pain Point or Objective
                </label>
                <select
                  value={formData.primaryConcern}
                  onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Cost savings: replace in-house accounts exec">
                    Replace in-house accounts exec (Save up to 70%)
                  </option>
                  <option value="Clean unfiled backlogs & bank reconciliation">
                    Clean unfiled backlogs & bank reconciliation
                  </option>
                  <option value="Preparing bank-ready financials for commercial loan">
                    Preparing bank-ready financials for commercial loan
                  </option>
                  <option value="LHDN e-Invoicing & CP 204 tax penalty protection">
                    LHDN e-Invoicing & CP 204 tax penalty protection
                  </option>
                  <option value="Automated staff payroll & statutory filings (Form E/EA)">
                    Automated staff payroll & statutory filings (Form E/EA)
                  </option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-200" />
                  <span>{isSubmitting ? 'Reserving Session...' : 'Confirm Free 30-Min Audit'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-2">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  <span>Strictly confidential under corporate Non-Disclosure Agreement (NDA).</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
