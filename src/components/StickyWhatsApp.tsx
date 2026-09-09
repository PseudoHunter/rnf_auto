import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const StickyWhatsApp: React.FC = () => {
  const { content } = useCms();
  const { companyInfo } = content;
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    "Tanya Pakej Simpan Kira & e-Invois (RM 299/bln)",
    "Bantu Selesaikan Notis / Tunggakan Cukai LHDN",
    "Urus Slip Gaji Staf, KWSP, SOCSO & EIS",
    "Tempah Sesi Konsultasi Percuma Bersama Akauntan",
  ];

  const handleStartChat = (customText?: string) => {
    const textToSend = customText || `Salam ${companyInfo.name}, saya ingin bertanyakan tentang khidmat akaun & cukai untuk bisnes saya.`;
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${companyInfo.whatsappNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* WhatsApp Popup Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200 text-slate-900">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-700" />
              </div>
              <div>
                <div className="font-['Outfit'] font-bold text-sm leading-tight">
                  {companyInfo.name}
                </div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                  <span>Online • Isnin–Jumaat (9am–6pm)</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-slate-700 leading-relaxed">
              Salam! 👋 Selamat datang ke <strong>{companyInfo.name}</strong>.
              <br />
              Ada sebarang soalan mengenai simpan kira, e-Invois LHDN, atau gaji staf? Pilih topik pantas di bawah atau terus mesej kami:
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Pertanyaan Pantas:
              </div>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartChat(`Salam RNF, saya ingin: ${prompt}`)}
                  className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-900 transition-colors flex items-center justify-between group cursor-pointer text-xs"
                >
                  <span className="font-medium">{prompt}</span>
                  <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Direct Launch */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">{companyInfo.phoneDisplay}</span>
            <button
              onClick={() => handleStartChat()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>Buka WhatsApp</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-emerald-600/30 transition-all transform hover:scale-105 cursor-pointer border-2 border-white/20"
        aria-label="Direct WhatsApp Advisory"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
        </div>
        <span className="font-bold text-xs sm:text-sm tracking-wide pr-1">
          WhatsApp Penasihat
        </span>
      </button>
    </div>
  );
};
