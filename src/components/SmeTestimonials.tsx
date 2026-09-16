import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const SmeTestimonials: React.FC = () => {
  const { content, t } = useCms();
  const testimonials = content.testimonials;
  const testT = t.testimonials;

  return (
    <section id="testimoni" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            {testT.badge}
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
            {testT.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 break-words">
            {testT.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {(testimonials || []).map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-50 rounded-2xl p-5 sm:p-7 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Dynamic Stars */}
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-5 sm:mb-6 break-words">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm font-['Outfit'] truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {item.role} • <strong className="text-slate-700">{item.business}</strong>
                  </div>
                </div>

                {item.savings && (
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0 whitespace-nowrap">
                    {item.savings}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Micro Trust Proof Bar */}
        <div className="mt-10 sm:mt-12 text-center text-xs text-slate-600 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            {testT.trust1}
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            {testT.trust2}
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            {testT.trust3}
          </span>
        </div>
      </div>
    </section>
  );
};

