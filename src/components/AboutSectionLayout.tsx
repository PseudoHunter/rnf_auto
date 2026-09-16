import React from 'react';
import { SectionBanner } from './SectionBanner';
import { SmeHowItWorks } from './SmeHowItWorks';

interface AboutSectionLayoutProps {
  onOpenHealthCheck: (topic?: string) => void;
}

export const AboutSectionLayout: React.FC<AboutSectionLayoutProps> = ({
  onOpenHealthCheck: _onOpenHealthCheck,
}) => {
  return (
    <section id="about" className="w-full">
      {/* 1. Cinematic Banner matching About us.svg styled for RNF */}
      <SectionBanner
        brandText="RNF BUSINESS SOLUTIONS"
        brandSubtext="ACCOUNTING • BOOKKEEPING • PAYROLL • AUTOMATION"
        title="Dedicated from day one"
        subtitle="Built upon financial integrity, record accuracy, and dedication to empowering Malaysian businesses."
        backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80"
        heightClass="min-h-[440px] sm:min-h-[500px] lg:min-h-[560px]"
      />

      {/* 2. Editorial Dual-Statement Section matching About us.svg with Canva #003352 tone */}
      <div className="relative w-full bg-[#00253c] text-white py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#003859]">
        {/* Cinematic Executive Workspace Photography matching About us.svg */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001c2d]/90 via-[#00253c]/85 to-[#001c2d]/95" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 sm:space-y-16">
          {/* Statement 1 matching About us.svg */}
          <div className="max-w-2xl mx-auto">
            <p className="font-['Outfit'] text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#f4f6fc] font-light leading-relaxed tracking-tight">
              We are driven by the conviction that corporate accounting, financial statements, and tax compliance should be{' '}
              <span className="text-white font-medium underline decoration-emerald-400 underline-offset-8">
                simple, accessible, and stress-free.
              </span>
            </p>
          </div>

          {/* Subtle Graphic Visual Accent / Divider */}
          <div className="flex items-center justify-center gap-2">
            <span className="w-12 h-px bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="w-12 h-px bg-white/20" />
          </div>

          {/* Statement 2 matching About us.svg */}
          <div className="max-w-2xl mx-auto">
            <p className="font-['Outfit'] text-sm sm:text-base md:text-lg text-[#bac7db] font-light leading-relaxed">
              Since our founding, RNF has grown into the trusted financial partner for Malaysian SME owners prioritizing{' '}
              <span className="text-[#f4f6fc] font-medium">uncompromising accuracy, transparent retainers, and fast advisory response.</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. 3-Step Onboarding Workflow (matching uploaded Screenshot 1) */}
      <SmeHowItWorks />
    </section>
  );
};
