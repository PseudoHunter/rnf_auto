import React from 'react';

interface SectionBannerProps {
  brandText?: string;
  brandSubtext?: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  heightClass?: string;
  id?: string;
}

export const SectionBanner: React.FC<SectionBannerProps> = ({
  brandText = 'RNF BUSINESS SOLUTIONS',
  brandSubtext = 'ACCOUNTING • BOOKKEEPING • PAYROLL • AUTOMATION',
  title,
  subtitle,
  backgroundImage,
  heightClass = 'min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]',
  id,
}) => {
  return (
    <div 
      id={id} 
      className={`relative w-full ${heightClass} flex flex-col items-center justify-between text-center overflow-hidden select-none bg-[#00253c]`}
    >
      {/* Cinematic Background Image with Dark Contrast Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Multi-layered Vignette Overlay matching #003352 Canva aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001c2d]/85 via-[#003352]/50 to-[#001c2d]/90" />
      <div className="absolute inset-0 bg-[#003352]/25 mix-blend-multiply" />

      {/* Top Center Brand Header matching the uploaded mockups */}
      <div className="relative z-10 pt-6 sm:pt-8 px-4 w-full flex flex-col items-center justify-center">
        <div className="font-['Outfit'] text-[12px] sm:text-[14px] lg:text-[15px] font-black tracking-[0.22em] text-[#f4f6fc] uppercase leading-tight drop-shadow-md">
          {brandText}
        </div>
        {brandSubtext && (
          <div className="text-[10px] sm:text-[11px] tracking-[0.2em] text-[#bac7db] uppercase font-semibold mt-0.5 opacity-90">
            {brandSubtext}
          </div>
        )}
      </div>

      {/* Centered Large White Display Title */}
      <div className="relative z-10 px-4 sm:px-6 max-w-5xl my-auto py-12 sm:py-16">
        <h2 className="font-['Outfit'] text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg leading-tight break-words">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#f4f6fc]/90 max-w-2xl mx-auto font-normal drop-shadow break-words">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Subtle Fade */}
      <div className="relative z-10 pb-4 w-full" />
    </div>
  );
};
