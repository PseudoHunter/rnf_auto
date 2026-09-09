import React from 'react';
import { Receipt, Wallet, AlertTriangle, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface SmePainPointsProps {
  onOpenHealthCheck: () => void;
}

export const SmePainPoints: React.FC<SmePainPointsProps> = ({ onOpenHealthCheck }) => {
  const { content } = useCms();
  const painPoints = content.painPoints;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Receipt':
        return <Receipt className="w-6 h-6 text-red-600" />;
      case 'Wallet':
        return <Wallet className="w-6 h-6 text-amber-600" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'Building':
        return <Building className="w-6 h-6 text-blue-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="masalah-sme" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-3">
            Realiti Pemilik SME Malaysia
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pernah Alami Masalah Ini Dalam Bisnes Anda?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Kebanyakan pemilik syarikat dengan hasil bawah RM500k terperangkap dengan masalah yang sama setiap bulan.
          </p>
        </div>

        {/* 4 Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {item.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Reassurance */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Jangan risau, biar kami selesaikan dari A sampai Z.</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Anda fokus cari jualan dan kembangkan bisnes. Semua urusan resit, buku akaun, KWSP staf, dan cukai LHDN kami buatkan serendah RM299/bulan.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenHealthCheck}
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-all"
          >
            <span>Dapatkan Konsultasi Percuma</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
