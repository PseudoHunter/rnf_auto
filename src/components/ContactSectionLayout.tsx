import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Twitter, 
  Building2, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Send
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SectionBanner } from './SectionBanner';
import { ConsultationFormSection } from './ConsultationFormSection';

interface ContactSectionLayoutProps {
  preselectedPackage?: string;
}

export const ContactSectionLayout: React.FC<ContactSectionLayoutProps> = ({
  preselectedPackage,
}) => {
  const { content, language, addLead } = useCms();
  const { companyInfo } = content;

  // Simple form state matching Contact.svg
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullConsultation, setShowFullConsultation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addLead({
        fullName: name,
        companyName: `${name} (Contact Inquiry)`,
        entityType: 'Sdn Bhd',
        phone: companyInfo.phone,
        email: email,
        serviceCategory: 'accounting',
        selectedPackage: preselectedPackage || 'Direct Contact Inquiry',
        dataVolumeOrStaffCount: 'Standard',
        estimatedMonthlyValue: 800,
        status: 'baru',
        assignedTo: 'Muhammad Alif Hakimi',
        source: 'Contact Page Form',
        notes: [message],
      });
    } catch (err) {
      console.error('Lead error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      `*Pertanyaan Khidmat Akaun & Cukai - RNF Business Solutions*\n\n` +
      `*Nama:* ${name}\n` +
      `*Emel:* ${email}\n` +
      `*Mesej:* ${message || 'Pertanyaan pakej retainer'}\n\n` +
      `Mohon pihak RNF hubungi saya untuk sesi konsultasi.`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="w-full">
      {/* 1. Cinematic Banner matching Contact.svg styled for RNF */}
      <SectionBanner
        brandText="RNF BUSINESS SOLUTIONS"
        brandSubtext="ACCOUNTING • BOOKKEEPING • PAYROLL • AUTOMATION"
        title="Contact us"
        subtitle="Hubungi akauntan bertauliah kami untuk sebarang pertanyaan, saringan kesihatan akaun percuma, atau sebut harga retainer syarikat."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
        heightClass="min-h-[440px] sm:min-h-[500px] lg:min-h-[560px]"
      />

      {/* 2. Deep Dark Forest Green 2-Column Section matching Contact.svg */}
      <div className="w-full bg-[#16332c] text-white py-14 sm:py-20 lg:py-24 border-b border-[#244c41]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Direct Contact Details & Socials matching Contact.svg (5 Cols) */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-5 text-sm sm:text-base text-slate-200">
                {/* Phone */}
                <div>
                  <a 
                    href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`} 
                    className="text-white hover:text-emerald-300 transition-colors font-medium text-lg sm:text-xl block font-mono"
                  >
                    {companyInfo.phoneDisplay}
                  </a>
                  <div className="text-xs text-emerald-300/80 mt-0.5">
                    Talian Khidmat Pelanggan & Konsultasi Pantas
                  </div>
                </div>

                {/* Email */}
                <div>
                  <a 
                    href={`mailto:${companyInfo.email}`} 
                    className="text-white hover:text-emerald-300 transition-colors font-medium text-sm sm:text-base block"
                  >
                    {companyInfo.email}
                  </a>
                  <div className="text-xs text-emerald-300/80 mt-0.5">
                    Pertanyaan Korporat & Sebut Harga Rasmi
                  </div>
                </div>

                {/* Address */}
                <div className="pt-2">
                  <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
                    Unit 21-01, Level 21, Mercu Aspire KL,
                  </p>
                  <p className="text-slate-300 text-sm">
                    Eco City, No 3 Jalan Bangsar, 59200 Kuala Lumpur
                  </p>
                  <p className="text-xs text-emerald-300 mt-1">
                    Ibu Pejabat RNF Business Solutions
                  </p>
                </div>
              </div>

              {/* Social / Direct Channels matching Contact.svg */}
              <div className="flex items-center gap-4 pt-2 text-slate-200">
                <button 
                  type="button"
                  onClick={handleWhatsAppHelp}
                  className="w-10 h-10 rounded-full border border-emerald-400/40 bg-[#122822] flex items-center justify-center text-emerald-300 hover:text-white hover:border-white transition-colors cursor-pointer shadow-xs"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <a 
                  href={`tel:${companyInfo.phone.replace(/[\s-+]/g, '')}`} 
                  className="w-10 h-10 rounded-full border border-slate-400/40 bg-[#122822] flex items-center justify-center hover:text-white hover:border-white transition-colors"
                  aria-label="Phone"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="w-10 h-10 rounded-full border border-slate-400/40 bg-[#122822] flex items-center justify-center hover:text-white hover:border-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* SSM Corporate Proof & Hours */}
              <div className="p-4 rounded-xl bg-[#122822] border border-[#244c41] space-y-2 text-xs text-slate-300 shadow-sm">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{companyInfo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Pendaftaran SSM: {companyInfo.regNumber}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Contact Form matching Contact.svg (7 Cols) */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <div className="bg-[#122822] border border-[#244c41] rounded-2xl p-6 sm:p-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-900/60 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-white">
                    Mesej Berjaya Dihantar!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Terima kasih, {name}. Akauntan kami akan menghubungi anda di {email} dalam masa terdekat.
                  </p>
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppHelp}
                      className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Sambung WhatsApp Sekarang</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-3 rounded-full bg-[#1b3a32] text-slate-200 hover:text-white text-xs sm:text-sm font-semibold min-h-[44px]"
                    >
                      Hantar Mesej Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-200 mb-1.5">
                      Name / Nama Penuh
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mohd Khairul / Alex Tan"
                      className="w-full px-4 py-3 rounded-xl bg-[#1a3830] border border-[#285044] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 text-sm transition-all"
                    />
                  </div>

                  {/* Email address */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-200 mb-1.5">
                      Email address / Emel Rasmi
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@syarikatanda.com.my"
                      className="w-full px-4 py-3 rounded-xl bg-[#1a3830] border border-[#285044] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 text-sm transition-all"
                    />
                  </div>

                  {/* Leave a message */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-200 mb-1.5">
                      Leave a message / Nyatakan keperluan perakaunan syarikat anda
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Nyatakan anggaran transaksi sebulan, isu cukai LHDN, sistem e-Invois, atau bilangan staf yang perlu diuruskan..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1a3830] border border-[#285044] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Cream/Beige Pill Submit Button matching Contact.svg */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#ece4d8] hover:bg-[#dfd7c8] text-[#1c2c26] font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      <span>{isSubmitting ? 'Menghantar...' : 'Hantar Mesej Pertanyaan'}</span>
                      <Send className="w-4 h-4 text-[#1c2c26]" />
                    </button>
                    <p className="text-[11px] text-slate-300 text-center mt-2.5 opacity-80">
                      Maklumat syarikat anda dilindungi sepenuhnya di bawah etika kerahsiaan perakaunan (NDA).
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 3. Original Comprehensive 30-Min Consultation Form (Preserved for full booking depth) */}
      <div className="bg-slate-900">
        <ConsultationFormSection preselectedPackage={preselectedPackage} />
      </div>
    </section>
  );
};
