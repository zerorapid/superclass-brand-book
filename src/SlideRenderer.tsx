import React from 'react';
import { motion } from 'motion/react';
import { BrandBookState } from './types';
import { 
  ArrowRight,
  User,
  Search,
  Settings,
  Mail,
  Heart,
  Star,
  Menu,
  Check,
  X
} from 'lucide-react';

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
      className="w-full h-full bg-white p-12 md:p-16 flex flex-col font-sans relative text-slate-900 overflow-hidden"
    >
      <div className="flex justify-between items-start flex-none relative z-50">
        <SampleLogo className="h-6 w-auto" />
        <div className="flex gap-12 text-[10px] font-bold tracking-widest uppercase text-slate-400">
           {section && <span>{section}</span>}
           <span>{number}</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center mt-12 relative z-10">
        {children}
      </div>
      
      <div className="flex-none flex justify-between items-end text-[9px] font-medium tracking-widest uppercase text-slate-300 pt-8 relative z-50">
        <span>{state.brandName}</span>
        <span>Brand Identity System</span>
      </div>
      
      {/* Structural Footnote Line */}
      <div className="absolute bottom-[88px] left-12 right-12 h-px bg-slate-100 z-0 pointer-events-none" />
    </motion.div>
  );

  switch (index) {
    case 0: // Title Page
      return (
        <PageWrapper number="01">
          <div className="absolute top-0 right-0 w-[45%] h-full overflow-hidden bg-slate-100">
             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2000" alt="Cover" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
          </div>
          <div className="relative z-10 max-w-2xl pr-12 flex flex-col justify-center h-full">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-6 text-slate-900 uppercase">
              {state.brandName}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              {state.tagline}
            </p>
          </div>
        </PageWrapper>
      );

    case 1: // Origin
      return (
        <PageWrapper section="Origin" number="02">
          <div className="grid grid-cols-2 gap-20 items-center h-full">
            <div className="max-w-xl pr-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Core Message</h2>
              <p className="text-3xl md:text-4xl font-normal leading-[1.4] text-slate-900 tracking-tight">
                {state.introduction}
              </p>
            </div>
            <div className="h-full w-full bg-slate-50 relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1552674605-15c37127e106?auto=format&fit=crop&q=80&w=2000" alt="Origin" className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" />
            </div>
          </div>
        </PageWrapper>
      );

    case 2: // Vision
      return (
        <PageWrapper section="Direction" number="03">
          <div className="grid grid-cols-2 gap-20 items-start pt-12 h-full">
            <div className="h-[70%] w-full bg-slate-50 relative overflow-hidden mt-12">
               <img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=2000" alt="Vision" className="w-full h-full object-cover grayscale opacity-70 mix-blend-multiply" />
            </div>
            <div className="max-w-xl pl-8 mt-24">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Vision</h2>
              <p className="text-3xl md:text-4xl font-normal leading-[1.4] text-slate-900 tracking-tight">
                {state.vision}
              </p>
            </div>
          </div>
        </PageWrapper>
      );

    case 3: // Values
      return (
        <PageWrapper section="Foundation" number="04">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-20 relative z-10">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {state.coreValues.map((val, i) => (
               <div key={i} className="border-t-2 border-slate-900 pt-8">
                  <p className="text-5xl font-light text-slate-300 mb-6 tracking-tighter">0{i+1}</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug uppercase tracking-tight">{val}</p>
               </div>
            ))}
          </div>
          <div className="absolute right-12 bottom-12 text-[400px] font-bold text-slate-50 leading-none tracking-tighter z-0 pointer-events-none select-none">V</div>
        </PageWrapper>
      );

    case 4: // Voice
      return (
        <PageWrapper section="Communication" number="05">
          <div className="grid grid-cols-2 gap-20 items-center h-full">
            <div className="max-w-xl pr-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Tone of Voice</h2>
              <p className="text-3xl md:text-4xl font-normal leading-[1.4] text-slate-900 tracking-tight">
                {state.toneOfVoice}
              </p>
            </div>
            <div className="h-[80%] w-full bg-slate-900 relative overflow-hidden flex items-center justify-center p-16">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
               <p className="text-5xl md:text-6xl font-light text-white text-center leading-[1.1] tracking-tighter">"We speak with absolute conviction."</p>
            </div>
          </div>
        </PageWrapper>
      );

    case 5: // Positioning (New)
      return (
        <PageWrapper section="Positioning" number="06">
          <div className="h-full flex flex-col justify-center items-center text-center max-w-4xl mx-auto relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">The Elevator Pitch</h2>
            <p className="text-3xl md:text-4xl font-normal leading-[1.4] text-slate-900 tracking-tight">
              {state.positioning}
            </p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[600px] text-slate-50 font-bold opacity-50 pointer-events-none z-0">”</div>
        </PageWrapper>
      );

    case 6: // Target Audience (New)
      return (
        <PageWrapper section="Audience" number="07">
          <div className="grid grid-cols-2 gap-20 h-full items-center">
             <div className="h-[80%] w-full overflow-hidden bg-slate-100">
               <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=2000" alt="Audience" className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply" />
             </div>
             <div className="flex flex-col justify-center max-w-xl pl-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Target Persona</h2>
                <p className="text-3xl md:text-4xl font-normal leading-[1.4] text-slate-900 tracking-tight">
                  {state.audience}
                </p>
             </div>
          </div>
        </PageWrapper>
      );

    case 7: // Primary Logo
      return (
        <PageWrapper section="Identity" number="08">
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

    case 8: // The Mark (Logo Centric)
      return (
        <PageWrapper section="The Mark" number="09">
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <div className="w-full h-full border border-slate-900 absolute" />
              <div className="w-px h-full bg-slate-900 absolute left-1/2" />
              <div className="w-full h-px bg-slate-900 absolute top-1/2" />
              <div className="w-full h-full rounded-full border border-slate-900 absolute scale-[0.8]" />
            </div>
            <SampleLogo className="w-full h-full max-w-[80%] max-h-[80%] z-10" />
          </div>
        </PageWrapper>
      );

    case 9: // Secondary Logo
      return (
        <PageWrapper section="Identity" number="10">
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

    case 10: // Logo Variations
      return (
        <PageWrapper section="Adaptability" number="11">
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

    case 11: // Clear Space
      return (
        <PageWrapper section="Parameters" number="12">
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

    case 12: // Minimum Size (New)
      return (
        <PageWrapper section="Parameters" number="13">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 h-full items-center">
            <div className="space-y-12">
               <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">Digital Minimum</h2>
               <div className="pb-12 border-b border-slate-100 flex flex-col items-center justify-center">
                  <SampleLogo className="h-[32px] w-auto mb-8 opacity-80" />
                  <p className="text-sm font-mono text-slate-400 tracking-widest">{state.logoMinSizeDigital}</p>
               </div>
               <p className="text-base font-light text-slate-500">To maintain legibility on screens, never reduce the mark below this threshold.</p>
            </div>
            <div className="space-y-12">
               <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">Print Minimum</h2>
               <div className="pb-12 border-b border-slate-100 flex flex-col items-center justify-center">
                  <SampleLogo className="h-[40px] w-auto mb-8 opacity-80" />
                  <p className="text-sm font-mono text-slate-400 tracking-widest">{state.logoMinSizePrint}</p>
               </div>
               <p className="text-base font-light text-slate-500">For physical applications, this is the absolute minimum size required for structural integrity.</p>
            </div>
          </div>
        </PageWrapper>
      );

    case 13: // Improper Usage
      return (
        <PageWrapper section="Prohibited" number="14">
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

    case 14: // Do's and Don'ts
      return (
        <PageWrapper section="Rules" number="15">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 h-full items-start pt-12">
            <div className="space-y-12">
               <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">Do's</h2>
               <div className="space-y-8">
                 {state.dos.map((rule, i) => (
                   <div key={i} className="flex gap-4 border-b border-slate-100 pb-8">
                     <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                       <Check size={12} className="text-slate-900" />
                     </div>
                     <p className="text-lg font-light text-slate-800">{rule}</p>
                   </div>
                 ))}
               </div>
            </div>
            <div className="space-y-12">
               <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">Don'ts</h2>
               <div className="space-y-8">
                 {state.donts.map((rule, i) => (
                   <div key={i} className="flex gap-4 border-b border-slate-100 pb-8">
                     <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                       <X size={12} className="text-slate-400" />
                     </div>
                     <p className="text-lg font-light text-slate-500">{rule}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 15: // Color Palette
      return (
        <PageWrapper section="Spectrum" number="16">
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

    case 16: // Typography
      return (
        <PageWrapper section="Type System" number="17">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 h-full items-center">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Primary / Heading</h3>
              <div className="pb-12 border-b border-slate-100">
                <p className="text-5xl font-heading font-light tracking-tight text-slate-900 mb-4 truncate">{state.typographySettings.headingFont}</p>
                <p className="text-2xl font-heading font-light text-slate-400 truncate">Aa Bb Cc Dd Ee Ff</p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Secondary / Body</h3>
              <div className="pb-12 border-b border-slate-100">
                <p className="text-5xl font-body font-light tracking-tight text-slate-900 mb-4 truncate">{state.typographySettings.bodyFont}</p>
                <p className="text-base font-body font-light text-slate-500 leading-relaxed">
                  Typography establishes our voice. The secondary typeface is optimized for legibility at smaller sizes and long-form reading.
                </p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 17: // Typographic Hierarchy (New)
      return (
        <PageWrapper section="Type Scale" number="18">
          <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-12">Typographic Hierarchy</h2>
          <div className="space-y-8 max-w-4xl">
             <div className="flex items-baseline gap-12 border-b border-slate-100 pb-8">
                <span className="w-12 text-[10px] font-mono text-slate-400 tracking-widest">H1</span>
                <span className="text-6xl font-heading font-light text-slate-900 tracking-tight truncate">Display Title</span>
             </div>
             <div className="flex items-baseline gap-12 border-b border-slate-100 pb-8">
                <span className="w-12 text-[10px] font-mono text-slate-400 tracking-widest">H2</span>
                <span className="text-4xl font-heading font-light text-slate-800 tracking-tight truncate">Section Heading</span>
             </div>
             <div className="flex items-baseline gap-12 border-b border-slate-100 pb-8">
                <span className="w-12 text-[10px] font-mono text-slate-400 tracking-widest">H3</span>
                <span className="text-2xl font-heading font-light text-slate-800 tracking-tight truncate">Subsection Title</span>
             </div>
             <div className="flex items-baseline gap-12 border-b border-slate-100 pb-8">
                <span className="w-12 text-[10px] font-mono text-slate-400 tracking-widest">BODY</span>
                <span className="text-lg font-body font-light text-slate-600 leading-relaxed">This paragraph represents the standard body copy. It is optimized for maximum legibility and readability across both digital and physical applications.</span>
             </div>
          </div>
        </PageWrapper>
      );

    case 18: // Iconography
      return (
        <PageWrapper section="Iconography" number="19">
          <div className="max-w-4xl space-y-16">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium">System Icons</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
              {[ArrowRight, User, Search, Settings, Mail, Heart, Star, Menu].map((Icon, idx) => (
                <div key={idx} className="aspect-square bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
              ))}
            </div>
            <p className="text-sm font-light text-slate-500 max-w-xl">
              Our iconography system relies on precise, consistent line weights and minimalist geometry. Icons should always remain functional, utilizing a 1.5px stroke to ensure perfect clarity across all digital environments.
            </p>
          </div>
        </PageWrapper>
      );

    case 19: // Photography
      return (
        <PageWrapper section="Art Direction" number="20">
           <div className="max-w-3xl">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-12">Photography Style</h2>
            <p className="text-3xl md:text-4xl font-light leading-relaxed text-slate-800">
              {state.photographyStyle}
            </p>
          </div>
        </PageWrapper>
      );

    case 20: // Brand Pattern
      return (
        <PageWrapper section="Graphic Elements" number="21">
          <div className="w-full h-full flex flex-col justify-center">
             <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-8">Brand Pattern</h2>
             <div className="flex-1 bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                {state.brandPattern ? (
                  <img src={state.brandPattern} className="w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Brand Pattern" />
                ) : (
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">No Pattern Provided</p>
                )}
             </div>
          </div>
        </PageWrapper>
      );

    case 21: // Stationery Mockup
      return (
        <PageWrapper section="Application" number="22">
          <div className="w-full h-full flex flex-col justify-center">
             <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-8">Stationery & Print</h2>
             <div className="flex-1 bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                {state.mockupStationery ? (
                  <img src={state.mockupStationery} className="w-full h-full object-cover mix-blend-multiply opacity-90" alt="Stationery Mockup" />
                ) : (
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">No Image Provided</p>
                )}
             </div>
          </div>
        </PageWrapper>
      );

    case 22: // Social Mockup
      return (
        <PageWrapper section="Application" number="23">
          <div className="w-full h-full flex flex-col justify-center">
             <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-8">Digital & Social</h2>
             <div className="flex-1 bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                {state.mockupSocial ? (
                  <img src={state.mockupSocial} className="w-full h-full object-cover mix-blend-multiply opacity-90" alt="Social Media Mockup" />
                ) : (
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">No Image Provided</p>
                )}
             </div>
          </div>
        </PageWrapper>
      );

    case 23: // Marketing Mockup
      return (
        <PageWrapper section="Application" number="24">
          <div className="w-full h-full flex flex-col justify-center">
             <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-8">Marketing & Out-of-Home</h2>
             <div className="flex-1 bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                {state.mockupMarketing ? (
                  <img src={state.mockupMarketing} className="w-full h-full object-cover mix-blend-multiply opacity-90" alt="Marketing Mockup" />
                ) : (
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">No Image Provided</p>
                )}
             </div>
          </div>
        </PageWrapper>
      );

    case 24: // Conclusion
      return (
        <PageWrapper number="25">
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
