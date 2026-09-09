import React from 'react';
import { BookOpen, ShieldCheck, Users, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface SmeServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const SmeServices: React.FC<SmeServicesProps> = ({ onSelectService }) => {
  const { content } = useCms();
  const services = content.services;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-indigo-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-amber-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="perkhidmatan" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Penyelesaian Lengkap
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Yang Kami Uruskan Untuk Syarikat Anda
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Segalanya diuruskan secara profesional, tepat pada masa, dan tanpa istilah teknikal yang mengelirukan.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-100/80 text-blue-800">
                    {service.badge}
                  </span>
                </div>

                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  {service.tagline}
                </div>
                <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-200">
                  {service.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-slate-800 hover:text-blue-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Tanya Mengenai {service.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
