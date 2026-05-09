import { useState, useEffect } from 'react';
import { INITIAL_STATE, BrandBookState } from './types';
import { Sidebar } from './Sidebar';
import { SlideRenderer } from './SlideRenderer';
import { AnimatePresence } from 'motion/react';
import { Layers } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<BrandBookState>(INITIAL_STATE);

  const TOTAL_SLIDES = 9;
  const PROGRESS_DOTS = Array.from({ length: TOTAL_SLIDES });

  // Update Google Fonts and CSS Variables
  useEffect(() => {
    const { headingFont, bodyFont } = state.typographySettings;
    const fontsToLoad = [headingFont, bodyFont].map(f => f.replace(/ /g, '+')).join('|');
    const linkId = 'google-fonts-link';
    
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont}:wght@400;500;600;700;800;900&family=${bodyFont}:wght@300;400;500;600;700&display=swap`;

    // Apply CSS Variables
    const root = document.documentElement;
    root.style.setProperty('--font-heading', `'${headingFont}', sans-serif`);
    root.style.setProperty('--font-body', `'${bodyFont}', sans-serif`);
    // Default weights
    root.style.setProperty('--weight-heading', '800');
    root.style.setProperty('--weight-body', '400');
    root.style.setProperty('--ls-heading', '-0.04em');
    root.style.setProperty('--lh-body', '1.6');
  }, [state.typographySettings]);

  if (state.isPrinting) {
    return (
      <div className="bg-white">
        <div id="print-full-book" className="block">
          {PROGRESS_DOTS.map((_, i) => (
            <div key={i} className="print-slide-page">
              <SlideRenderer state={{ ...state, isExporting: true }} index={i} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden text-black font-sans selection:bg-[#00F5FF] selection:text-black">
      <Sidebar state={state} setState={setState} totalSlides={TOTAL_SLIDES} />

      <main className="flex-1 flex flex-col relative h-full">
        <header className="h-16 border-b-2 border-black bg-white flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-[#00F5FF] text-black border-2 border-black px-2 py-0.5">Live</span>
              <h2 className="font-black text-sm tracking-tighter uppercase">Preview Engine</h2>
            </div>
            <div className="h-full w-0.5 bg-black absolute left-64 top-0" style={{ display: 'none' }} />
            <div className="flex gap-2">
              {PROGRESS_DOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState(prev => ({ ...prev, currentSlide: i }))}
                  className={`w-3 h-3 border-2 border-black transition-all ${
                    state.currentSlide === i ? 'bg-[#00F5FF]' : 'bg-white hover:bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-mono font-bold uppercase text-black">
               SLIDE [{state.currentSlide + 1}/{TOTAL_SLIDES}]
            </p>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4 md:p-12 bg-slate-200 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          
          <div className="slide-container main-preview-slide w-full max-w-5xl h-full max-h-[85vh] aspect-[16/10] bg-white border-4 border-black shadow-[16px_16px_0_0_rgba(0,0,0,1)] overflow-hidden relative group">
            <AnimatePresence mode="wait">
              <SlideRenderer key={state.currentSlide} state={state} index={state.currentSlide} />
            </AnimatePresence>
            
            <button 
              onClick={() => state.currentSlide > 0 && setState(prev => ({ ...prev, currentSlide: prev.currentSlide - 1 }))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border-4 border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-[#00F5FF] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000]"
              disabled={state.currentSlide === 0}
            >
              <span className="text-2xl font-black">←</span>
            </button>
            <button 
              onClick={() => state.currentSlide < TOTAL_SLIDES - 1 && setState(prev => ({ ...prev, currentSlide: prev.currentSlide + 1 }))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border-4 border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-[#00F5FF] text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000]"
              disabled={state.currentSlide === TOTAL_SLIDES - 1}
            >
              <span className="text-2xl font-black">→</span>
            </button>
          </div>
        </div>

        <footer className="h-10 border-t-2 border-black bg-white flex items-center px-8 text-[10px] text-black font-mono font-bold uppercase tracking-widest gap-8">
           <div className="flex gap-2">
             <span className="opacity-50">HEX:</span>
             <span>{state.primaryColors[0]?.hex}</span>
           </div>
           <div className="flex gap-2">
             <span className="opacity-50">FONT:</span>
             <span>{state.typographySettings.headingFont}</span>
           </div>
           <div className="ml-auto flex items-center gap-2">
             <span className="opacity-50">SYSTEM</span>
             <span className="bg-black text-[#00F5FF] px-2 py-0.5 border border-black">ONLINE</span>
           </div>
        </footer>
      </main>

      <div className="print-only">
        <div id="print-full-book">
          {PROGRESS_DOTS.map((_, i) => (
            <div key={i} className="slide-container w-[100vw] h-[100vh]">
              <SlideRenderer state={state} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
