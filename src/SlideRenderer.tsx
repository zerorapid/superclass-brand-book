import React from 'react';
import { motion } from 'motion/react';
import { BrandBookState } from './types';
import { XCircle } from 'lucide-react';
import { hexToRgb, getContrastRatio } from './lib/colorUtils';

interface SlideRendererProps {
  state: BrandBookState;
  index: number;
}

export const SlideRenderer = ({ state, index }: SlideRendererProps) => {
  const slideVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.1 } }
  };

  const SampleLogo = ({ className = "w-12 h-12", color }: { className?: string, color?: string }) => {
    if (state.primaryLogo) {
      return <img src={state.primaryLogo} alt="Logo" className={`${className} object-contain`} style={{ filter: color === '#FFFFFF' ? 'brightness(0) invert(1)' : color ? 'brightness(0)' : 'none' }}/>;
    }
    return (
      <div className={`relative flex items-center justify-center border-4 border-black bg-[#00F5FF] ${className}`}>
        <div className="relative font-black text-4xl tracking-tighter uppercase" style={{ color: color || 'black' }}>{state.brandName.charAt(0)}</div>
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
      <div className="flex-none mb-6 pb-4 border-b-4 border-black">
        {title && <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">{title}</h2>}
        {subtitle && <p className="text-black font-mono text-xs md:text-sm uppercase tracking-widest mt-2 bg-[#00F5FF] inline-block px-2">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        {children}
      </div>
      <div className="flex-none mt-6 pt-4 border-t-4 border-black flex justify-between items-end">
        <div className="flex items-center gap-4">
          <SampleLogo className="h-10 w-10 flex-none border-2" />
          <div>
            <p className="font-black text-sm md:text-base uppercase leading-tight">{state.brandName}</p>
            <p className="text-[10px] text-black font-mono uppercase tracking-widest bg-yellow-300 inline-block px-1">v{state.version} • {state.lastUpdated}</p>
          </div>
        </div>
        <p className="text-4xl md:text-5xl font-black text-black leading-none">{String(index + 1).padStart(2, '0')}</p>
      </div>
    </motion.div>
  );

  switch (index) {
    case 0: // Title Page
      return (
        <PageWrapper>
          <div className="h-full flex flex-col justify-center items-start text-left py-4">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white border-4 border-black flex items-center justify-center mb-8 p-8 shadow-[8px_8px_0_0_#000]">
               <SampleLogo className="w-full h-full" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              BRAND<br/>SYSTEM
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white bg-black px-4 py-2 uppercase inline-block mb-2">{state.brandName}</p>
            <p className="text-black font-mono uppercase tracking-widest text-sm md:text-base">{state.tagline}</p>
          </div>
        </PageWrapper>
      );

    case 1: // Brand Introduction
      return (
        <PageWrapper title="Origin" subtitle="Core Directive">
          <div className="max-w-4xl space-y-8">
            <p className="text-4xl md:text-5xl font-black leading-none text-black uppercase tracking-tighter border-l-8 border-[#00F5FF] pl-8 py-4">
              {state.introduction}
            </p>
          </div>
        </PageWrapper>
      );

    case 2: // Primary Logo
      return (
        <PageWrapper title="Primary Mark" subtitle="Identity">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white flex items-center justify-center min-h-[300px] border-4 border-black shadow-[8px_8px_0_0_#000] p-12">
               <SampleLogo className="w-full h-full max-w-[80%]" />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-xl md:text-2xl font-bold leading-snug text-black uppercase">
                The core identifier. Use this version on all light backgrounds.
              </p>
              <div className="p-6 bg-[#00F5FF] border-4 border-black shadow-[4px_4px_0_0_#000]">
                <p className="font-black text-black uppercase tracking-widest mb-2 text-lg">RULE 01</p>
                <p className="text-black font-bold text-sm uppercase">Never alter the proportions or spacing of the mark.</p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 3: // Logo Variations
      return (
        <PageWrapper title="Variations" subtitle="Adaptability">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-black aspect-video border-4 border-black flex items-center justify-center p-12 shadow-[8px_8px_0_0_#00F5FF]">
                 <SampleLogo className="w-48 h-auto" color="#FFFFFF" />
              </div>
              <p className="text-sm uppercase font-black text-black bg-yellow-300 inline-block px-2">REVERSED / DARK BG</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border-4 border-black aspect-video flex items-center justify-center p-12 shadow-[8px_8px_0_0_#000]">
                 <SampleLogo className="w-48 h-auto" color={state.primaryColors[0]?.hex || '#000000'} />
              </div>
              <p className="text-sm uppercase font-black text-black bg-yellow-300 inline-block px-2">POSITIVE / LIGHT BG</p>
            </div>
          </div>
        </PageWrapper>
      );

    case 4: // Clear Space
      return (
        <PageWrapper title="Clear Space" subtitle="Parameters">
          <div className="flex items-center justify-start">
            <div className="text-left max-w-2xl">
              <div className="relative inline-block border-4 border-[#00F5FF] p-16 mb-8 bg-white shadow-[8px_8px_0_0_#00F5FF]">
                 <div className="absolute top-0 left-0 bg-[#00F5FF] text-black font-black px-2 py-1 text-sm border-b-4 border-r-4 border-black">"X"</div>
                 <SampleLogo className="w-32 h-32 opacity-20" />
              </div>
              <p className="text-xl font-bold text-black uppercase leading-tight">
                Maintain an isolation zone around the mark to ensure maximum visibility and impact. Do not crowd with other elements.
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 5: // Improper Usage
      return (
        <PageWrapper title="Violations" subtitle="Prohibited">
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              { label: 'DO NOT STRETCH', p: 'scale-x-150' },
              { label: 'DO NOT RECOLOR', p: 'sepia hue-rotate-180' },
              { label: 'DO NOT ROTATE', p: 'rotate-12' },
            ].map((v, i) => (
              <div key={i} className="space-y-4">
                <div className="bg-white aspect-video border-4 border-black flex items-center justify-center p-4 relative overflow-hidden shadow-[4px_4px_0_0_#000]">
                  <div className={`w-16 h-16 flex items-center justify-center ${v.p}`}>
                      <SampleLogo className="w-12 h-12" />
                  </div>
                   <div className="absolute top-0 right-0 bg-black text-white p-2 border-l-4 border-b-4 border-black">
                     <XCircle size={24} strokeWidth={3} />
                   </div>
                </div>
                <p className="text-xs uppercase font-black bg-red-500 text-white inline-block px-2 py-1">{v.label}</p>
              </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 6: // Color Palette
      return (
        <PageWrapper title="Palette" subtitle="Spectrum">
          <div className="grid grid-cols-2 gap-8 h-full">
            <div className="flex flex-col h-full border-4 border-black shadow-[8px_8px_0_0_#000]">
              {state.primaryColors.map((color, i) => {
                const rgb = hexToRgb(color.hex);
                const contrast = getContrastRatio(rgb.r, rgb.g, rgb.b);
                return (
                  <div key={i} className="flex-1 relative p-8 flex flex-col justify-between border-b-4 border-black last:border-b-0" style={{ backgroundColor: color.hex, color: contrast }}>
                    <h3 className="text-4xl font-black tracking-tighter uppercase">{color.name}</h3>
                    <div className="flex flex-col gap-1 text-sm font-mono font-bold uppercase">
                      <span>HEX: {color.hex}</span>
                      <span>RGB: {rgb.r}, {rgb.g}, {rgb.b}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col gap-6 h-full">
              {state.secondaryColors.map((color, i) => {
                const rgb = hexToRgb(color.hex);
                const contrast = getContrastRatio(rgb.r, rgb.g, rgb.b);
                return (
                  <div key={i} className="flex-1 p-6 flex flex-col justify-between border-4 border-black shadow-[4px_4px_0_0_#000]" style={{ backgroundColor: color.hex, color: contrast }}>
                    <h3 className="text-2xl font-black tracking-tighter uppercase">{color.name}</h3>
                    <p className="text-sm font-mono font-bold uppercase">{color.hex}</p>
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
          <div className="grid grid-cols-1 gap-12 mt-4">
            <div className="border-l-8 border-black pl-8">
              <div className="flex justify-between items-baseline mb-6">
                <h3 className="font-black text-xl uppercase bg-[#00F5FF] inline-block px-2 border-2 border-black">PRIMARY / HEADING</h3>
                <span className="font-mono text-sm font-bold bg-black text-white px-3 py-1">{state.typographySettings.headingFont}</span>
              </div>
              <p className="text-6xl md:text-8xl font-heading font-black leading-none uppercase truncate tracking-tighter">
                Aa Bb Cc Dd
              </p>
              <p className="text-3xl font-heading font-black mt-4 opacity-30 truncate">
                0123456789 !@#$
              </p>
            </div>
            <div className="border-l-8 border-slate-300 pl-8">
              <div className="flex justify-between items-baseline mb-6">
                <h3 className="font-black text-xl uppercase bg-yellow-300 inline-block px-2 border-2 border-black">SECONDARY / BODY</h3>
                <span className="font-mono text-sm font-bold bg-black text-white px-3 py-1">{state.typographySettings.bodyFont}</span>
              </div>
              <p className="text-2xl font-body leading-tight font-medium max-w-3xl">
                Typography is a core element of our visual identity. It helps convey our tone of voice, ensuring all communications are clear, legible, and instantly recognizable. 
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 8: // Conclusion
      return (
        <PageWrapper title="Execute" subtitle="End of File">
          <div className="h-full flex flex-col justify-center items-start text-left">
             <div className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center mb-8 shadow-[8px_8px_0_0_#000]">
                <SampleLogo className="w-16 h-16" />
             </div>
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase mb-6">{state.brandName}</h2>
             <p className="text-xl font-bold text-black max-w-xl border-l-8 border-[#00F5FF] pl-6 py-2 uppercase">
                Adhere to these standards to ensure maximum impact and consistency across all deployments.
             </p>
          </div>
        </PageWrapper>
      );

    default:
      return <PageWrapper>END</PageWrapper>;
  }
};
