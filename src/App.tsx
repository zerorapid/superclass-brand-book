/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { INITIAL_STATE, BrandBookState } from './types';
import { Sidebar } from './Sidebar';
import { SlideRenderer } from './SlideRenderer';
import { AnimatePresence } from 'motion/react';
import { Layers } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<BrandBookState>(INITIAL_STATE);

  // Expose updater for inline editing in SlideRenderer
  (window as any).updateBrandBookState = (path: string, value: any) => {
    setState(prev => {
      const newState = { ...prev };
      const keys = path.split('.');
      let current: any = newState;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
        current = current[key];
      }
      
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const PROGRESS_DOTS = Array.from({ length: 26 });

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
    root.style.setProperty('--weight-heading', state.typographySettings.headingWeight);
    root.style.setProperty('--weight-body', state.typographySettings.bodyWeight);
    root.style.setProperty('--ls-heading', state.typographySettings.headingLetterSpacing);
    root.style.setProperty('--lh-body', state.typographySettings.bodyLineHeight);
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
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Settings Sidepanel */}
      <Sidebar state={state} setState={setState} />

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col relative h-full">
        {/* Navigation / Header */}
        <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-black text-white px-1.5 py-0.5 rounded">Live</span>
              <h2 className="font-bold text-sm tracking-tight">Presentation Preview</h2>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex gap-1">
              {PROGRESS_DOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState(prev => ({ ...prev, currentSlide: i }))}
                  className={`w-2 h-2 rounded-full transition-all ${
                    state.currentSlide === i ? 'bg-black w-6' : 'bg-slate-200 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-mono font-bold uppercase text-slate-400">
               Slide {state.currentSlide + 1} of 26
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
               <Layers size={14} />
               <span>Brand Book Generator</span>
            </div>
          </div>
        </header>

        {/* Slide Viewer */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-12 bg-slate-50 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="slide-container main-preview-slide w-full max-w-5xl h-full max-h-[85vh] aspect-[16/10] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden relative group">
            <AnimatePresence mode="wait">
              <SlideRenderer key={state.currentSlide} state={state} index={state.currentSlide} />
            </AnimatePresence>
            
            {/* Quick Navigation Overlays */}
            <button 
              onClick={() => state.currentSlide > 0 && setState(prev => ({ ...prev, currentSlide: prev.currentSlide - 1 }))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-black border border-slate-100"
              disabled={state.currentSlide === 0}
            >
              <span className="text-xl">←</span>
            </button>
            <button 
              onClick={() => state.currentSlide < 25 && setState(prev => ({ ...prev, currentSlide: prev.currentSlide + 1 }))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-black border border-slate-100"
              disabled={state.currentSlide === 25}
            >
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar / Quick Access */}
        <footer className="h-10 border-t border-slate-100 bg-white/50 backdrop-blur-sm flex items-center px-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest gap-8">
           <div className="flex gap-2">
             <span>Primary HEX:</span>
             <span className="text-slate-900">{state.primaryColors[0]?.hex}</span>
           </div>
           <div className="flex gap-2">
             <span>Typography:</span>
             <span className="text-slate-900">{state.fonts[1]?.family}</span>
           </div>
           <div className="ml-auto">
             Press <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-900">CMD + P</span> to Print
           </div>
        </footer>
      </main>

      {/* Full Book Export Container (Hidden except during printing) */}
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
