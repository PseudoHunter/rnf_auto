import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
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
  const { content } = useCms();
  const { companyInfo } = content;
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    companyName: '',
    entityType: 'Sdn Bhd',
    monthlyVolume: '100 – 300 transactions/mo',
    primaryConcern: preselectedPackage ? `Interested in ${preselectedPackage}` : 'Cash crunch & delayed bank accounts',
    phoneNumber: '',
    email: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `*New Consultation Booking - RNF Business Solutions*\n\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Company:* ${formData.companyName} (${formData.entityType})\n` +
      `*Monthly Volume:* ${formData.monthlyVolume}\n` +
      `*Primary Focus / Pain Point:* ${formData.primaryConcern}\n` +
      `*Phone:* ${formData.phoneNumber}\n` +
      `*Email:* ${formData.email}\n` +
      `*Preferred Slot:* ${formData.preferredTime}\n` +
      (formData.notes ? `*Notes:* ${formData.notes}\n` : '') +
      `\nPlease confirm appointment availability for our 30-min Financial Health Check.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="consultation-form" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Corporate Authority & Registration Proof (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Konsultasi Percuma & Tanpa Sebarang Kewajipan</span>
              </div>
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Dapatkan Nasihat Akauntan Untuk Bisnes Anda
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed font-normal">
                Bercakap terus dengan penasihat akaun RNF. Dalam sesi santai 30 minit ini, kami semak status akaun syarikat anda, bantu elak denda LHDN, dan cadangkan cara jimat kos paling berkesan.
              </p>
            </div>

            {/* What to expect in 30 mins */}
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Apa Yang Anda Dapat Dalam Sesi Percuma Ini:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Semakan status buku akaun & resit semasa (termasuk resit lama yang tertunggak).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Panduan pelaksanaan e-Invois LHDN mengikut fasa bisnes anda.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Kiraan penjimatan kos bulanan berbanding menggaji kerani sendiri.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Tip sediakan penyata kewangan yang kemas untuk pinjaman bank / SME Corp.</span>
                </li>
              </ul>
            </div>

            {/* Corporate Registration & Contact Card */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs text-slate-300">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Registered Corporate Headquarters:
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">{companyInfo.name} (HQ)</strong>
                  {companyInfo.address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>SSM Registration: <strong className="text-white">{companyInfo.regNumber}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>General Line: <a href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`} className="text-white hover:underline">{companyInfo.phoneDisplay}</a></span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Official Inquiries: <a href={`mailto:${companyInfo.email}`} className="text-white hover:underline">{companyInfo.email}</a></span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Operating Hours: {companyInfo.operatingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>All submissions protected under strict Non-Disclosure Agreements (NDA).</span>
            </div>
          </div>

          {/* Right Column: High-Conversion Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Outfit'] text-2xl font-bold text-slate-900">
                  Health Check Request Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. A senior corporate advisory partner has been assigned to review <strong>{formData.companyName}</strong>'s profile.
                </p>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 max-w-md mx-auto text-left space-y-1">
                  <div><strong>Preferred Time:</strong> {formData.preferredTime}</div>
                  <div><strong>Contact:</strong> {formData.phoneNumber} ({formData.email})</div>
                  <div><strong>Primary Concern:</strong> {formData.primaryConcern}</div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppForward}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Connect Immediately via WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                    Tempah Sesi Konsultasi & Sebut Harga Percuma
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Isi butiran ringkas di bawah. Akauntan kami akan hubungi anda dalam masa 15 minit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Penuh Anda *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="cth. Encik Ahmad / Puan Siti"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Syarikat / Jenama Bisnes *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="cth. Restoran Impian / ABC Trading"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Bentuk Entiti Perniagaan *
                    </label>
                    <select
                      value={formData.entityType}
                      onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    >
                      <option value="Sdn Bhd">Sdn Bhd (Sendirian Berhad)</option>
                      <option value="Sole Proprietorship">Enterprise / Peniaga Tunggal</option>
                      <option value="Partnership">Perkongsian (Partnership / LLP)</option>
                      <option value="Bhd">Berhad</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Anggaran Jumlah Transaksi Bulanan *
                    </label>
                    <select
                      value={formData.monthlyVolume}
                      onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    >
                      <option value="< 80 transaksi/bln">&lt; 80 transaksi / bulan (Mikro)</option>
                      <option value="80 – 250 transaksi/bln">80 – 250 transaksi / bulan (SME Sederhana)</option>
                      <option value="250 – 600 transaksi/bln">250 – 600 transaksi / bulan (Aktif)</option>
                      <option value="Tunggakan Sahaja">Tunggakan Resit Sahaja (Backlog)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      No. WhatsApp / Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="cth. 012-345 6789"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Emel Rasmi / Peribadi *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Keperluan Utama Syarikat Anda *
                  </label>
                  <select
                    value={formData.primaryConcern}
                    onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                  >
                    <option value="Ganti kerani akaun & jimat kos bulanan">
                      Ganti kerani akaun & jimat kos bulanan (Jimat sehingga 70%)
                    </option>
                    <option value="Kemas resit bersepah & selesaikan tunggakan akaun">
                      Kemas resit bersepah & selesaikan tunggakan akaun
                    </option>
                    <option value="Penyediaan e-Invois LHDN & elak denda cukai">
                      Penyediaan e-Invois LHDN & elak denda cukai
                    </option>
                    <option value="Sediakan penyata kemas untuk lulus loan bank">
                      Sediakan penyata kemas untuk lulus loan bank
                    </option>
                    <option value="Urus gaji staf, KWSP, SOCSO & PCB">
                      Urus gaji staf, KWSP, SOCSO & PCB
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Waktu Pilihan Dihubungi
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                  >
                    <option value="Segera (WhatsApp dalam 15 minit)">Segera (WhatsApp dalam 15 minit)</option>
                    <option value="Pagi (10:00 AM – 1:00 PM)">Pagi (10:00 AM – 1:00 PM)</option>
                    <option value="Petang (2:00 PM – 5:00 PM)">Petang (2:00 PM – 5:00 PM)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Menghantar Permohonan...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-blue-200" />
                        <span>Hantar Permohonan & Dapatkan Sebut Harga</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Tiada caj tersembunyi. Maklumat anda dijamin sulit dan dilindungi di bawah akta PDPA.
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
