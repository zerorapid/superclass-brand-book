import React from 'react';
import { motion } from 'motion/react';
import { BrandBookState } from './types';

interface SlideRendererProps {
  state: BrandBookState;
  index: number;
}

export const SlideRenderer = ({ state, index }: SlideRendererProps) => {
  const slideVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  const SampleLogo = ({ className = "w-12 h-12", color, useSecondary = false }: { className?: string, color?: string, useSecondary?: boolean }) => {
    const src = useSecondary ? state.secondaryLogo : state.primaryLogo;
    if (src) {
      return <img src={src} alt="Logo" className={`${className} object-contain`} style={{ filter: color === '#FFFFFF' ? 'brightness(0) invert(1)' : color ? 'brightness(0)' : 'none' }}/>;
    }
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative font-light text-4xl tracking-widest uppercase" style={{ color: color || '#111827' }}>{state.brandName.charAt(0)}</div>
      </div>
    );
  };

  const PageWrapper = ({ children, section, number }: { children: React.ReactNode; section?: string; number: string }) => (
    <motion.div
      variants={state.isExporting ? {} : slideVariants}
      initial={state.isExporting ? false : "initial"}
      animate={state.isExporting ? false : "animate"}
      exit={state.isExporting ? false : "exit"}
      className="w-full h-full bg-white p-12 md:p-20 flex flex-col font-sans relative text-slate-900"
    >
      <div className="flex justify-between items-start flex-none">
        <SampleLogo className="h-6 w-auto" />
        <div className="flex gap-12 text-[10px] font-medium tracking-widest uppercase text-slate-400">
           {section && <span>{section}</span>}
           <span>{number}</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
      
      <div className="flex-none flex justify-between items-end text-[9px] font-medium tracking-widest uppercase text-slate-300">
        <span>{state.brandName}</span>
        <span>Brand Identity System</span>
      </div>
    </motion.div>
  );

  switch (index) {
    case 0: // Title Page
      return (
        <PageWrapper number="01">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6 text-slate-900">
              {state.brandName}
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400 font-medium">
              {state.tagline}
            </p>
          </div>
        </PageWrapper>
      );

    case 1: // Origin
      return (
        <PageWrapper section="Origin" number="02">
          <div className="max-w-3xl">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-12">Core Message</h2>
            <p className="text-3xl md:text-4xl font-light leading-relaxed text-slate-800">
              {state.introduction}
            </p>
          </div>
        </PageWrapper>
      );

    case 2: // Vision
      return (
        <PageWrapper section="Direction" number="03">
          <div className="max-w-3xl">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-12">Vision</h2>
            <p className="text-3xl md:text-4xl font-light leading-relaxed text-slate-800">
              {state.vision}
            </p>
          </div>
        </PageWrapper>
      );

    case 3: // Values
      return (
        <PageWrapper section="Foundation" number="04">
          <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-16">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {state.coreValues.map((val, i) => (
               <div key={i} className="border-t border-slate-100 pt-8">
                  <p className="text-[10px] font-mono text-slate-400 mb-4 tracking-widest">0{i+1}</p>
                  <p className="text-xl md:text-2xl font-light text-slate-800 leading-snug">{val}</p>
               </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 4: // Voice
      return (
        <PageWrapper section="Communication" number="05">
          <div className="max-w-3xl">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-12">Tone of Voice</h2>
            <p className="text-3xl md:text-4xl font-light leading-relaxed text-slate-800">
              {state.toneOfVoice}
            </p>
          </div>
        </PageWrapper>
      );

    case 5: // Primary Logo
      return (
        <PageWrapper section="Identity" number="06">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="flex items-center justify-center min-h-[300px]">
               <SampleLogo className="w-full h-full max-w-[60%]" />
            </div>
            <div className="space-y-8 max-w-sm">
              <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">Primary Mark</h2>
              <p className="text-base font-light leading-relaxed text-slate-600">
                The core identifier of the brand. This version should be the primary choice for all applications to ensure maximum recognition.
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 6: // Secondary Logo
      return (
        <PageWrapper section="Identity" number="07">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="flex items-center justify-center min-h-[300px] bg-slate-50">
               {state.secondaryLogo ? (
                 <SampleLogo className="w-full h-full max-w-[50%]" useSecondary />
               ) : (
                 <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">No Alternate Provided</p>
               )}
            </div>
            <div className="space-y-8 max-w-sm">
              <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">Secondary Mark</h2>
              <p className="text-base font-light leading-relaxed text-slate-600">
                Used when spatial constraints or formatting requirements prevent the use of the primary mark.
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 7: // Logo Variations
      return (
        <PageWrapper section="Adaptability" number="08">
           <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-16">Variations</h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-slate-900 aspect-[4/3] flex items-center justify-center p-12">
                 <SampleLogo className="w-32 h-auto" color="#FFFFFF" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-medium text-slate-400">Reversed Application</p>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-50 aspect-[4/3] flex items-center justify-center p-12">
                 <SampleLogo className="w-32 h-auto" color={state.primaryColors[0]?.hex || '#000000'} />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-medium text-slate-400">Positive Application</p>
            </div>
          </div>
        </PageWrapper>
      );

    case 8: // Clear Space
      return (
        <PageWrapper section="Parameters" number="09">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="flex items-center justify-center">
              <div className="relative inline-block p-16 border border-slate-100 bg-slate-50">
                 <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-400">X</div>
                 <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-400">X</div>
                 <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-400">X</div>
                 <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400">X</div>
                 <SampleLogo className="w-32 h-32 opacity-80" />
              </div>
            </div>
            <div className="space-y-8 max-w-sm">
              <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">Clear Space</h2>
              <p className="text-base font-light leading-relaxed text-slate-600">
                An isolation zone must be maintained around the mark. This invisible boundary protects the integrity of the logo from competing visual elements.
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 9: // Improper Usage
      return (
        <PageWrapper section="Prohibited" number="10">
          <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-16">Improper Usage</h2>
          <div className="grid grid-cols-3 gap-12">
            {[
              { label: 'Do not stretch', p: 'scale-x-150' },
              { label: 'Do not recolor', p: 'sepia opacity-50' },
              { label: 'Do not rotate', p: 'rotate-12' },
            ].map((v, i) => (
              <div key={i} className="space-y-6">
                <div className="bg-slate-50 aspect-square flex items-center justify-center p-4">
                  <div className={`w-16 h-16 flex items-center justify-center ${v.p}`}>
                      <SampleLogo className="w-12 h-12" />
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-medium text-red-400">{v.label}</p>
              </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 10: // Color Palette
      return (
        <PageWrapper section="Spectrum" number="11">
          <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-16">Color System</h2>
          <div className="flex h-64 gap-2 mb-8">
            {state.primaryColors.map((color, i) => (
               <div key={i} className="flex-1 rounded-sm" style={{ backgroundColor: color.hex }} />
            ))}
            {state.secondaryColors.map((color, i) => (
               <div key={i} className="flex-1 opacity-20 rounded-sm" style={{ backgroundColor: color.hex }} />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-8">
            {[...state.primaryColors, ...state.secondaryColors].map((color, i) => (
               <div key={i} className="space-y-2">
                 <h3 className="text-sm font-medium text-slate-900">{color.name}</h3>
                 <p className="text-[10px] font-mono uppercase text-slate-400 tracking-widest">{color.hex}</p>
               </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 11: // Typography
      return (
        <PageWrapper section="Type System" number="12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 h-full items-center">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Primary / Heading</h3>
              <div className="pb-12 border-b border-slate-100">
                <p className="text-5xl font-heading font-light tracking-tight text-slate-900 mb-4">{state.typographySettings.headingFont}</p>
                <p className="text-2xl font-heading font-light text-slate-400 truncate">Aa Bb Cc Dd Ee Ff</p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Secondary / Body</h3>
              <div className="pb-12 border-b border-slate-100">
                <p className="text-5xl font-body font-light tracking-tight text-slate-900 mb-4">{state.typographySettings.bodyFont}</p>
                <p className="text-base font-body font-light text-slate-500 leading-relaxed">
                  Typography establishes our voice. The secondary typeface is optimized for legibility at smaller sizes and long-form reading.
                </p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 12: // Photography
      return (
        <PageWrapper section="Art Direction" number="13">
           <div className="max-w-3xl">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-12">Photography Style</h2>
            <p className="text-3xl md:text-4xl font-light leading-relaxed text-slate-800">
              {state.photographyStyle}
            </p>
          </div>
        </PageWrapper>
      );

    case 13: // Mockup
      return (
        <PageWrapper section="Application" number="14">
          <div className="w-full h-full flex flex-col justify-center">
             <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-8">Brand In Context</h2>
             <div className="flex-1 bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                {state.mockupImage ? (
                  <img src={state.mockupImage} className="w-full h-full object-cover mix-blend-multiply opacity-90" alt="Mockup" />
                ) : (
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">No Application Image Provided</p>
                )}
             </div>
          </div>
        </PageWrapper>
      );

    case 14: // Conclusion
      return (
        <PageWrapper number="15">
          <div className="h-full flex flex-col justify-center items-center text-center">
             <SampleLogo className="w-12 h-12 mb-12 opacity-50" />
             <h2 className="text-3xl font-light tracking-tight text-slate-900 mb-6">{state.brandName}</h2>
             <p className="text-sm text-slate-400 font-light max-w-sm leading-relaxed">
                Thank you for reviewing the visual identity system. Please adhere to these guidelines to ensure consistency.
             </p>
          </div>
        </PageWrapper>
      );

    default:
      return <PageWrapper number="XX">END</PageWrapper>;
  }
};
