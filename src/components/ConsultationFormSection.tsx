import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { BookingFormData } from '../types';

interface ConsultationFormSectionProps {
  preselectedPackage?: string;
}

export const ConsultationFormSection: React.FC<ConsultationFormSectionProps> = ({
  preselectedPackage,
}) => {
  const { content, language, t, addLead } = useCms();
  const { companyInfo } = content;
  const consultT = t.consultation;

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    companyName: '',
    entityType: 'Sdn Bhd',
    monthlyVolume: '100 – 300 transactions/mo',
    primaryConcern: preselectedPackage ? `Interested in ${preselectedPackage}` : (language === 'ms' ? 'Kemas resit & jimat kos' : 'Receipt cleanup & cost reduction'),
    phoneNumber: '',
    email: '',
    preferredTime: language === 'ms' ? 'Segera (WhatsApp dalam 15 minit)' : 'Immediate (WhatsApp within 15 mins)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addLead({
        fullName: formData.fullName,
        companyName: formData.companyName,
        entityType: (formData.entityType as any) || 'Sdn Bhd',
        phone: formData.phoneNumber,
        email: formData.email || 'info@client.com.my',
        serviceCategory: formData.primaryConcern.toLowerCase().includes('payroll') || formData.primaryConcern.toLowerCase().includes('gaji') ? 'payroll' : 'accounting',
        selectedPackage: preselectedPackage || formData.primaryConcern || 'Inkuiri Laman Web',
        dataVolumeOrStaffCount: formData.monthlyVolume,
        estimatedMonthlyValue: 800,
        status: 'baru',
        assignedTo: 'Muhammad Alif Hakimi',
        source: 'Borang Konsultasi Laman Web',
        notes: formData.notes ? [formData.notes] : [`Slot: ${formData.preferredTime}`],
      });
    } catch (err) {
      console.error('Lead auto-capture error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      language === 'ms'
        ? `*Tempahan Sesi Konsultasi - RNF Business Solutions*\n\n` +
          `*Nama:* ${formData.fullName}\n` +
          `*Syarikat:* ${formData.companyName} (${formData.entityType})\n` +
          `*Volum Bulanan:* ${formData.monthlyVolume}\n` +
          `*Keperluan Utama:* ${formData.primaryConcern}\n` +
          `*Telefon:* ${formData.phoneNumber}\n` +
          `*Emel:* ${formData.email}\n` +
          `*Waktu Pilihan:* ${formData.preferredTime}\n` +
          (formData.notes ? `*Nota Tambahan:* ${formData.notes}\n` : '') +
          `\nMohon sahkan slot konsultasi kewangan percuma syarikat kami.`
        : `*New Consultation Booking - RNF Business Solutions*\n\n` +
          `*Name:* ${formData.fullName}\n` +
          `*Company:* ${formData.companyName} (${formData.entityType})\n` +
          `*Monthly Volume:* ${formData.monthlyVolume}\n` +
          `*Primary Concern:* ${formData.primaryConcern}\n` +
          `*Phone:* ${formData.phoneNumber}\n` +
          `*Email:* ${formData.email}\n` +
          `*Preferred Time:* ${formData.preferredTime}\n` +
          (formData.notes ? `*Notes:* ${formData.notes}\n` : '') +
          `\nPlease confirm appointment slot for our 30-min Financial Consultation.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="consultation-form" className="py-12 sm:py-16 lg:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Corporate Authority & Registration Proof (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{consultT.badge}</span>
              </div>
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight break-words">
                {consultT.title}
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal break-words">
                {consultT.subtitle}
              </p>
            </div>

            {/* What to expect in 30 mins */}
            <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                {language === 'ms' ? 'Apa Yang Anda Dapat Dalam Sesi Percuma Ini:' : 'What You Receive in this Complimentary Session:'}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-300">
                {(consultT?.benefitList || []).map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="break-words">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate Registration & Contact Card */}
            <div className="bg-slate-800/40 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-3.5 text-xs text-slate-300">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {language === 'ms' ? 'Ibu Pejabat Berdaftar:' : 'Registered Corporate Headquarters:'}
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="break-words">
                  <strong className="text-white block font-medium">{companyInfo.name} (HQ)</strong>
                  {companyInfo.address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{language === 'ms' ? 'Pendaftaran SSM:' : 'SSM Registration:'} <strong className="text-white">{companyInfo.regNumber}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{language === 'ms' ? 'Talian Utama:' : 'General Line:'} <a href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`} className="text-white hover:underline">{companyInfo.phoneDisplay}</a></span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{language === 'ms' ? 'Pertanyaan Rasmi:' : 'Official Inquiries:'} <a href={`mailto:${companyInfo.email}`} className="text-white hover:underline">{companyInfo.email}</a></span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{consultT.guaranteeDesc}</span>
            </div>
          </div>

          {/* Right Column: High-Conversion Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl border border-slate-100">
            {submitted ? (
              <div className="text-center py-8 sm:py-10 space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-slate-900 break-words">
                  {consultT.success.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed break-words">
                  {consultT.success.desc}
                </p>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 max-w-md mx-auto text-left space-y-1">
                  <div><strong>{language === 'ms' ? 'Slot Pilihan:' : 'Preferred Slot:'}</strong> {formData.preferredTime}</div>
                  <div><strong>{language === 'ms' ? 'No. Telefon:' : 'Contact:'}</strong> {formData.phoneNumber} ({formData.email})</div>
                  <div><strong>{language === 'ms' ? 'Fokus Utama:' : 'Primary Need:'}</strong> {formData.primaryConcern}</div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppForward}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{consultT.success.whatsappBtn}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer min-h-[44px]"
                  >
                    {consultT.success.resetBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-slate-900 break-words">
                    {consultT.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 break-words">
                    {consultT.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {consultT.form.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={consultT.form.fullNamePh}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {consultT.form.companyName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={consultT.form.companyNamePh}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {consultT.form.entityType} *
                    </label>
                    <select
                      value={formData.entityType}
                      onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                    >
                      <option value="Sdn Bhd">Sdn Bhd (Sendirian Berhad)</option>
                      <option value="Sole Proprietorship">Enterprise / Sole Proprietorship</option>
                      <option value="Partnership">Partnership / LLP</option>
                      <option value="Bhd">Berhad</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {consultT.form.volumeOrStaff} *
                    </label>
                    <select
                      value={formData.monthlyVolume}
                      onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                    >
                      <option value="< 300 data">&lt; 300 data / 1-5 staff (Starter)</option>
                      <option value="301 - 550 data">301 – 550 data / 6-10 staff (Basic)</option>
                      <option value="551 - 750 data">551 – 750 data / 11-15 staff (Advance)</option>
                      <option value="751 - 1100 data">751 – 1100 data / 15-20 staff (Premium)</option>
                      <option value="> 1100 data / > 20 staff">&gt; 1100 data / &gt; 20 staff (Custom / Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {consultT.form.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={consultT.form.phonePh}
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {consultT.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={consultT.form.emailPh}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {consultT.form.serviceNeed} *
                  </label>
                  <select
                    value={formData.primaryConcern}
                    onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                  >
                    {consultT.form.serviceOptions.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {consultT.form.preferredTime}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 min-h-[44px]"
                  >
                    {consultT.form.timeOptions.map((timeOpt, tIdx) => (
                      <option key={tIdx} value={timeOpt}>
                        {timeOpt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span>{consultT.form.submitting}</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-blue-200 shrink-0" />
                        <span>{consultT.form.submitBtn}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 text-center mt-2 break-words">
                    {consultT.form.privacyNote}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

