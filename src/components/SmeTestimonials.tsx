import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const SmeTestimonials: React.FC = () => {
  const { content } = useCms();
  const testimonials = content.testimonials;

  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Kisah Kejayaan Pelanggan
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata Pemilik Bisnes Yang Menggunakan RNF
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Dari butik fesyen hingga pemilik kafe dan bengkel kereta, mereka kini tidur lena tanpa pening kepala hal akaun.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm font-['Outfit']">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.role} • <strong className="text-slate-700">{item.business}</strong>
                  </div>
                </div>

                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0">
                  {item.savings}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Micro Trust Proof Bar */}
        <div className="mt-12 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            100% Pematuhan LHDN & SSM
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Tiada Bayaran Tersembunyi
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Bebas Tamatkan Langganan Bila-Bila Masa
          </span>
        </div>
      </div>
    </section>
  );
};
