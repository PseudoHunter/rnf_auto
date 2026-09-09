import React from 'react';

interface RnfLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'badge' | 'minimal' | 'horizontal';
  showText?: boolean;
  onClick?: () => void;
}

export const RnfLogo: React.FC<RnfLogoProps> = ({
  className = '',
  size = 48,
  variant = 'badge',
  showText = false,
  onClick,
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  // Uses the exact high-res logo file (/rnf-logo.png and /rnf-logo.svg) matching the uploaded business card
  const logoImage = (
    <picture className="shrink-0 inline-block">
      <source srcSet="/rnf-logo.svg" type="image/svg+xml" />
      <img
        src="/rnf-logo.png"
        alt="RNF Business Solutions"
        style={{ width: pixelSize, height: pixelSize }}
        className={`shrink-0 object-contain rounded-full select-none shadow-xs ${className}`}
        loading="eager"
        decoding="async"
        onError={(e) => {
          // Fallback to SVG or PNG if needed
          const target = e.currentTarget;
          if (!target.src.includes('rnf-logo.svg')) {
            target.src = '/rnf-logo.svg';
          }
        }}
      />
    </picture>
  );

  if (variant === 'badge') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''}`}
      >
        {logoImage}
        {showText && (
          <div className="flex flex-col text-left">
            <span className="font-['Outfit'] font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
              RNF <span className="text-blue-700">BUSINESS</span> SOLUTIONS
            </span>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              Corporate & Financial Advisory
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-3.5 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      >
        {logoImage}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-['Outfit'] font-black text-xl tracking-tight text-slate-900 leading-none">
              RNF <span className="text-blue-800">BUSINESS</span> SOLUTIONS
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 tracking-wide mt-1">
            Finance • Administration • Digital Growth
          </span>
        </div>
      </div>
    );
  }

  // Minimal / Mark
  return onClick ? (
    <span onClick={onClick} className="inline-block cursor-pointer">
      {logoImage}
    </span>
  ) : (
    logoImage
  );
};

