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
  const { content, addLead } = useCms();
  const { companyInfo } = content;
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    companyName: '',
    entityType: 'Sdn Bhd',
    monthlyVolume: '100 – 300 data',
    primaryConcern: preselectedTopic || 'Cost savings for corporate accounts & payroll',
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

    try {
      addLead({
        fullName: formData.fullName,
        companyName: formData.companyName,
        entityType: (formData.entityType as any) || 'Sdn Bhd',
        phone: formData.phoneNumber,
        email: formData.email || 'lead@client.com.my',
        serviceCategory: formData.primaryConcern.toLowerCase().includes('payroll') ? 'payroll' : 'accounting',
        selectedPackage: preselectedTopic || 'Complimentary Financial Health Audit',
        dataVolumeOrStaffCount: formData.monthlyVolume,
        estimatedMonthlyValue: 800,
        status: 'baru',
        assignedTo: 'Muhammad Alif Hakimi',
        source: 'Modal Semakan Kesihatan Kewangan',
        notes: [`Topic: ${formData.primaryConcern}`, `Preferred Time: ${formData.preferredTime}`],
      });
    } catch (err) {
      console.error('Lead capture error:', err);
    }

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
      `*Objective:* ${formData.primaryConcern}\n` +
      `*Preferred Slot:* ${formData.preferredTime}\n\n` +
      `Please assign a Senior Advisory Partner for our 30-minute session.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close Health Check Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-slate-900 break-words">
              Audit Scheduled Successfully
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed break-words">
              Thank you, <strong>{formData.fullName}</strong>. Our advisory office will contact you via WhatsApp to confirm your exact 30-minute consultation window.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleWhatsAppForward}
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Confirm on WhatsApp Immediately</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#003352]/10 border border-[#003352]/20 flex items-center justify-center text-[#003352] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#003352] uppercase tracking-wider">
                  Senior Malaysian Advisory Desk
                </span>
                <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-slate-900 leading-tight break-words">
                  Schedule Free 30-Min Financial Health Check
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-5 sm:mb-6 break-words">
              Receive a structured review of your statutory standing, cash flow bottlenecks, and discover how to save up to 70% in monthly corporate operating costs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Danial Hakimi / Sarah Tan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#003352] focus:outline-none"
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
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#003352] focus:outline-none"
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
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#003352] focus:outline-none bg-white"
                  >
                    <option value="Sdn Bhd">Sdn Bhd (Sendirian Berhad)</option>
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
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#003352] focus:outline-none bg-white"
                  >
                    <option value="< 300 data">&lt; 300 transactions (Starter)</option>
                    <option value="301 - 550 data">301 – 550 transactions (Basic)</option>
                    <option value="551 - 750 data">551 – 750 transactions (Advance)</option>
                    <option value="751 - 1100 data">751 – 1,100 transactions (Premium)</option>
                    <option value="Tunggakan Resit Sahaja">Unfiled Backlogs Clean-up Only</option>
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
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#003352] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com.my"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#003352] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Primary Business Focus
                </label>
                <select
                  value={formData.primaryConcern}
                  onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
                  className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#003352] focus:outline-none"
                >
                  <option value="Ganti kerani akaun & jimat kos bulanan">
                    Replace in-house accounts executive (Save up to 70%)
                  </option>
                  <option value="Kemas resit bersepah & selesaikan tunggakan akaun">
                    Clean unfiled receipt backlogs & bank reconciliation
                  </option>
                  <option value="Sediakan penyata kemas untuk lulus pinjaman bank">
                    Prepare audit-ready financials for commercial bank loan
                  </option>
                  <option value="Penyediaan e-Invois LHDN & elak denda cukai">
                    LHDN e-Invoicing readiness & CP204 tax penalty prevention
                  </option>
                  <option value="Pengurusan gaji staf, KWSP & SOCSO">
                    Automated corporate payroll, EPF, SOCSO & statutory Form E/EA
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#003352] hover:bg-[#00243b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isSubmitting ? 'Reserving Session...' : 'Confirm Free 30-Min Audit'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-2 text-center">
                  <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
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
