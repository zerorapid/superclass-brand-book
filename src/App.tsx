import { useState, useEffect } from 'react';
import { INITIAL_STATE, BrandBookState } from './types';
import { Sidebar } from './Sidebar';
import { SlideRenderer } from './SlideRenderer';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [state, setState] = useState<BrandBookState>(INITIAL_STATE);

  const TOTAL_SLIDES = 19;
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
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont}:wght@300;400;500;600;700&family=${bodyFont}:wght@300;400;500;600&display=swap`;

    // Apply CSS Variables
    const root = document.documentElement;
    root.style.setProperty('--font-heading', `'${headingFont}', sans-serif`);
    root.style.setProperty('--font-body', `'${bodyFont}', sans-serif`);
    // Default weights for minimalism
    root.style.setProperty('--weight-heading', '400');
    root.style.setProperty('--weight-body', '300');
    root.style.setProperty('--ls-heading', '-0.02em');
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
    <div className="flex h-screen w-screen bg-[#F9FAFB] overflow-hidden text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900">
      <Sidebar state={state} setState={setState} totalSlides={TOTAL_SLIDES} />

      <main className="flex-1 flex flex-col relative h-full">
        <header className="h-16 border-b border-slate-200/50 bg-white/60 backdrop-blur-xl flex items-center justify-between px-10 z-20 transition-all">
          <div className="flex items-center gap-8">
            <h2 className="font-medium text-xs tracking-widest uppercase text-slate-400">Presentation Preview</h2>
            <div className="flex gap-2">
              {PROGRESS_DOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState(prev => ({ ...prev, currentSlide: i }))}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    state.currentSlide === i ? 'w-6 bg-slate-800' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-medium tracking-widest uppercase text-slate-400">
               {String(state.currentSlide + 1).padStart(2, '0')} / {String(TOTAL_SLIDES).padStart(2, '0')}
            </p>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-8 md:p-16 bg-transparent relative overflow-hidden">
          <div className="slide-container main-preview-slide w-full max-w-5xl h-full max-h-[80vh] aspect-[16/10] bg-white rounded-sm shadow-[0_2px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative group ring-1 ring-slate-900/5 transition-all">
            <AnimatePresence mode="wait">
              <SlideRenderer key={state.currentSlide} state={state} index={state.currentSlide} />
            </AnimatePresence>
            
            <button 
              onClick={() => state.currentSlide > 0 && setState(prev => ({ ...prev, currentSlide: prev.currentSlide - 1 }))}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-slate-400 hover:text-slate-900 shadow-sm rounded-full"
              disabled={state.currentSlide === 0}
            >
              <span className="text-xl font-light">←</span>
            </button>
            <button 
              onClick={() => state.currentSlide < TOTAL_SLIDES - 1 && setState(prev => ({ ...prev, currentSlide: prev.currentSlide + 1 }))}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-slate-400 hover:text-slate-900 shadow-sm rounded-full"
              disabled={state.currentSlide === TOTAL_SLIDES - 1}
            >
              <span className="text-xl font-light">→</span>
            </button>
          </div>
        </div>

        <footer className="h-12 flex items-center px-10 text-[10px] text-slate-400 font-medium uppercase tracking-widest gap-8 bg-transparent">
           <div className="flex gap-2">
             <span>Primary:</span>
             <span className="text-slate-600">{state.primaryColors[0]?.hex}</span>
           </div>
           <div className="flex gap-2">
             <span>Typeface:</span>
             <span className="text-slate-600">{state.typographySettings.headingFont}</span>
           </div>
        </footer>
      </main>
    </div>
  );
}
