import React from 'react';
import { motion } from 'motion/react';
import { BrandBookState } from './types';
import { Layout, XCircle, CheckCircle } from 'lucide-react';
import { hexToRgb, getContrastRatio } from './lib/colorUtils';

interface SlideRendererProps {
  state: BrandBookState;
  index: number;
}

export const SlideRenderer = ({ state, index }: SlideRendererProps) => {
  const slideVariants = {
    initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.2 } }
  };

  const SampleLogo = ({ className = "w-12 h-12", color }: { className?: string, color?: string }) => {
    if (state.primaryLogo) {
      return <img src={state.primaryLogo} alt="Logo" className={`${className} object-contain`} style={{ filter: color === '#FFFFFF' ? 'brightness(0) invert(1)' : color ? 'brightness(0)' : 'none' }}/>;
    }
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-45 opacity-20" />
        <div className="absolute inset-0 bg-black rounded-lg -rotate-12 opacity-10" />
        <div className="relative font-black text-2xl tracking-tighter italic" style={{ color }}>{state.brandName.charAt(0)}</div>
      </div>
    );
  };

  const PageWrapper = ({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) => (
    <motion.div
      variants={state.isExporting ? {} : slideVariants}
      initial={state.isExporting ? false : "initial"}
      animate={state.isExporting ? false : "animate"}
      exit={state.isExporting ? false : "exit"}
      className="w-full h-full bg-white p-8 md:p-12 flex flex-col font-sans relative"
      id={`slide-${index}`}
    >
      <div className="flex-none mb-3">
        {title && <h2 className="text-xl md:text-2xl font-bold tracking-tighter uppercase mb-0.5">{title}</h2>}
        {subtitle && <p className="text-slate-500 font-mono text-[8px] md:text-[10px] uppercase tracking-widest">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        {children}
      </div>
      <div className="flex-none mt-3 pt-3 border-t border-slate-100 flex justify-between items-end">
        <div className="flex items-center gap-3">
          <SampleLogo className="h-6 w-auto flex-none" />
          <div>
            <p className="font-bold text-[9px] md:text-[10px] uppercase leading-tight">{state.brandName}</p>
            <p className="text-[8px] text-slate-400 uppercase tracking-tighter">Guidelines v{state.version} • {state.lastUpdated}</p>
          </div>
        </div>
        <p className="text-xl md:text-2xl font-black text-slate-100 leading-none">{String(index + 1).padStart(2, '0')}</p>
      </div>
    </motion.div>
  );

  switch (index) {
    case 0: // Title Page
      return (
        <PageWrapper>
          <div className="h-full flex flex-col justify-center items-center text-center py-4">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-slate-100 overflow-hidden p-8">
               <SampleLogo className="w-full h-full" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Brand<br/>Guidelines
            </h1>
            <div className="w-16 h-1 bg-black my-6" />
            <p className="text-xl md:text-2xl font-medium text-slate-800">{state.brandName}</p>
            <p className="text-slate-500 uppercase tracking-widest text-xs md:text-sm mt-2">{state.tagline}</p>
          </div>
        </PageWrapper>
      );

    case 1: // Brand Introduction
      return (
        <PageWrapper title="Brand Story" subtitle="Introduction">
          <div className="max-w-3xl space-y-8">
            <p className="text-3xl font-medium leading-tight text-slate-900 italic">
              {state.introduction}
            </p>
          </div>
        </PageWrapper>
      );

    case 2: // Primary Logo
      return (
        <PageWrapper title="Primary Logo" subtitle="Core Identifier">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl flex items-center justify-center min-h-[240px] border border-slate-100 shadow-inner p-12">
               <SampleLogo className="w-full h-full max-w-[80%]" />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                This is the crown jewel of our visual identity. It consists of the wordmark and the symbol locked together in a specific ratio.
              </p>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-bold text-blue-900 uppercase text-[9px] tracking-widest mb-1">Usage Rule</p>
                <p className="text-blue-800 text-xs">Always prefer this version on light backgrounds for maximum impact and brand recognition.</p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 3: // Logo Variations
      return (
        <PageWrapper title="Logo Variations" subtitle="Flexibility">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-slate-900 aspect-video rounded-xl flex items-center justify-center p-12 shadow-inner">
                 <SampleLogo className="w-48 h-auto" color="#FFFFFF" />
              </div>
              <p className="text-xs uppercase tracking-widest font-bold text-center">Reversed / Dark Background</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 aspect-video rounded-xl flex items-center justify-center p-12">
                 <SampleLogo className="w-48 h-auto" color={state.primaryColors[0]?.hex || '#000000'} />
              </div>
              <p className="text-xs uppercase tracking-widest font-bold text-center">Positive / Light Background</p>
            </div>
          </div>
        </PageWrapper>
      );

    case 4: // Clear Space
      return (
        <PageWrapper title="Clear Space" subtitle="Technical Specs">
          <div className="flex items-center justify-center">
            <div className="text-center max-w-lg">
              <div className="relative inline-block border border-blue-200 bg-blue-50/30 p-12 rounded-lg mb-8">
                 <div className="absolute top-0 left-0 p-2 text-[10px] font-mono text-blue-400">"X" Padding</div>
                 <SampleLogo className="w-32 h-32 opacity-50" />
              </div>
              <p className="text-sm text-slate-500">
                To maintain legibility, always leave a clear space equal to the height of the logo's inner lettermark around the boundaries. Do not crowd the logo with typography or other graphics.
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 5: // Improper Usage
      return (
        <PageWrapper title="Do Not" subtitle="Logo Protection">
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Do not stretch', p: 'scale-x-150' },
              { label: 'Do not recolor', p: 'sepia hue-rotate-180' },
              { label: 'Do not rotate', p: 'rotate-12' },
            ].map((v, i) => (
              <div key={i} className="space-y-2">
                <div className="bg-slate-50 aspect-video rounded-lg flex items-center justify-center p-4 relative overflow-hidden ring-1 ring-slate-100">
                  <div className={`w-16 h-16 flex items-center justify-center ${v.p}`}>
                      <SampleLogo className="w-12 h-12" />
                  </div>
                   <div className="absolute top-2 right-2">
                     <XCircle className="text-red-500" size={16} />
                   </div>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-center text-red-600 truncate">{v.label}</p>
              </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 6: // Color Palette
      return (
        <PageWrapper title="Color Palette" subtitle="Digital & Print">
          <div className="grid grid-cols-2 gap-8 h-full">
            <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              {state.primaryColors.map((color, i) => {
                const rgb = hexToRgb(color.hex);
                const contrast = getContrastRatio(rgb.r, rgb.g, rgb.b);
                return (
                  <div key={i} className="flex-1 relative group p-6 flex flex-col justify-end transition-transform origin-left" style={{ backgroundColor: color.hex, color: contrast }}>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1">{color.name}</h3>
                      <div className="flex gap-4 text-[10px] font-mono opacity-80 uppercase tracking-widest">
                        <span>HEX: {color.hex}</span>
                        <span>RGB: {rgb.r}, {rgb.g}, {rgb.b}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col gap-4 h-full">
              {state.secondaryColors.map((color, i) => {
                const rgb = hexToRgb(color.hex);
                const contrast = getContrastRatio(rgb.r, rgb.g, rgb.b);
                return (
                  <div key={i} className="flex-1 rounded-2xl p-6 flex flex-col justify-end border border-slate-100" style={{ backgroundColor: color.hex, color: contrast }}>
                    <h3 className="font-bold tracking-tight mb-1">{color.name}</h3>
                    <p className="text-[9px] font-mono opacity-80 uppercase tracking-widest">{color.hex}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </PageWrapper>
      );

    case 7: // Typography
      return (
        <PageWrapper title="Typography" subtitle="Type System">
          <div className="grid grid-cols-1 gap-8 mt-4">
            <div className="border-b border-slate-100 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Primary / Heading</h3>
                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{state.typographySettings.headingFont}</span>
              </div>
              <p className="text-5xl md:text-7xl font-heading leading-none truncate pr-4">
                Aa Bb Cc Dd Ee Ff Gg
              </p>
              <p className="text-2xl font-heading mt-4 opacity-50 truncate">
                0123456789 !@#$%&*()
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Secondary / Body</h3>
                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{state.typographySettings.bodyFont}</span>
              </div>
              <p className="text-2xl font-body leading-relaxed max-w-3xl">
                Typography is a core element of our visual identity. It helps convey our tone of voice, ensuring all communications are clear, legible, and instantly recognizable. 
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 8: // Conclusion
      return (
        <PageWrapper title="Conclusion" subtitle="Apply & Connect">
          <div className="h-full flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-slate-100">
                <SampleLogo className="w-10 h-10" />
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic uppercase mb-8">{state.brandName}</h2>
             <p className="text-sm text-slate-500 max-w-md">
                These guidelines are designed to ensure the brand is presented consistently and professionally across all touchpoints.
             </p>
          </div>
        </PageWrapper>
      );

    default:
      return <PageWrapper>End of Presentation</PageWrapper>;
  }
};
