import React, { useState } from 'react';
import { BrandBookState } from './types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download,
  Image as ImageIcon, 
  Palette, 
  Type as TypeIcon,
  Trash2,
  FileText
} from 'lucide-react';

interface SidebarProps {
  state: BrandBookState;
  setState: React.Dispatch<React.SetStateAction<BrandBookState>>;
  totalSlides: number;
}

export const Sidebar = ({ state, setState, totalSlides }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'aesthetics' | 'export'>('identity');

  const updateField = (field: keyof BrandBookState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('primaryLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextSlide = () => updateField('currentSlide', Math.min(totalSlides - 1, state.currentSlide + 1));
  const prevSlide = () => updateField('currentSlide', Math.max(0, state.currentSlide - 1));

  return (
    <div className="w-[400px] bg-white border-r border-slate-100 flex flex-col h-full overflow-hidden z-10 font-sans">
      
      {/* HEADER - MINIMALIST */}
      <div className="px-10 py-8 bg-white flex items-center justify-between">
        <div>
          <h1 className="font-light text-2xl tracking-tight text-slate-800">Superclass</h1>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={prevSlide}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
            disabled={state.currentSlide === 0}
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
            disabled={state.currentSlide === totalSlides - 1}
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* TABS - MINIMALIST */}
      <div className="flex px-8 border-b border-slate-100 bg-white">
        {[
          { id: 'identity', label: 'Identity' },
          { id: 'aesthetics', label: 'Aesthetics' },
          { id: 'export', label: 'Export' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 text-[11px] font-medium uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-slate-900" />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-10 py-12 bg-white">
        {activeTab === 'identity' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Brand Name</label>
              <input 
                type="text"
                value={state.brandName} 
                onChange={(e) => updateField('brandName', e.target.value)} 
                className="w-full bg-transparent border-b border-slate-200 pb-2 text-lg font-light text-slate-900 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder:text-slate-300"
                placeholder="Enter brand name"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Tagline</label>
              <input 
                type="text"
                value={state.tagline} 
                onChange={(e) => updateField('tagline', e.target.value)} 
                className="w-full bg-transparent border-b border-slate-200 pb-2 text-sm font-light text-slate-600 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder:text-slate-300"
                placeholder="A brief descriptor"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Core Message</label>
              <textarea 
                value={state.introduction} 
                onChange={(e) => updateField('introduction', e.target.value)} 
                className="w-full bg-slate-50 border border-slate-100 p-4 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors min-h-[160px] resize-none rounded-sm"
              />
            </div>
            
            <div className="pt-8">
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-4">
                Primary Mark
              </label>
              <div className="bg-slate-50 border border-slate-100 p-10 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group rounded-sm">
                {state.primaryLogo ? (
                  <div className="relative">
                    <img src={state.primaryLogo} alt="Logo" className="max-h-24 mx-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={(e) => { e.preventDefault(); updateField('primaryLogo', ''); }}
                      className="absolute -top-6 -right-6 text-slate-400 p-2 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="mx-auto text-slate-300" size={24} strokeWidth={1} />
                    <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Upload Logo</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept=".svg,.png" 
                  onChange={handleLogoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  title=""
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aesthetics' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            
            {/* Colors */}
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-6">
                Color Palette
              </label>
              <div className="space-y-6">
                {state.primaryColors.map((color, i) => (
                  <div key={`primary-${i}`} className="flex items-center gap-6 group">
                    <div className="w-10 h-10 shrink-0 rounded-full relative overflow-hidden shadow-inner ring-1 ring-slate-900/5">
                      <input 
                        type="color" 
                        value={color.hex}
                        className="absolute inset-[-10px] w-[60px] h-[60px] cursor-pointer"
                        onChange={(e) => {
                          const newColors = [...state.primaryColors];
                          newColors[i].hex = e.target.value.toUpperCase();
                          updateField('primaryColors', newColors);
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                         value={color.name} 
                         className="w-full text-sm font-light text-slate-900 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                         onChange={(e) => {
                           const newColors = [...state.primaryColors];
                           newColors[i].name = e.target.value;
                           updateField('primaryColors', newColors);
                         }}
                         placeholder="Color Name"
                      />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="pt-8 border-t border-slate-100">
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-6">
                Typography
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: 'Modern Sans', head: 'Inter', body: 'Inter' },
                  { name: 'Elegant Serif', head: 'Playfair Display', body: 'Lora' },
                  { name: 'Geometric', head: 'Space Grotesk', body: 'Outfit' }
                ].map(preset => {
                  const isActive = state.typographySettings.headingFont === preset.head && state.typographySettings.bodyFont === preset.body;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => updateField('typographySettings', { headingFont: preset.head, bodyFont: preset.body })}
                      className={`text-left transition-all p-5 rounded-md ${
                        isActive 
                          ? 'bg-slate-50 ring-1 ring-slate-200' 
                          : 'bg-transparent hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400 mb-3">{preset.name}</p>
                      <div className="flex flex-col gap-1">
                        <span className="font-light text-lg text-slate-900">{preset.head}</span>
                        <span className="text-[11px] text-slate-500 font-light">{preset.body}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'export' && (
          <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-500 py-12">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-8 ring-1 ring-slate-100">
               <Download size={20} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div className="text-center space-y-4 mb-12">
              <h3 className="font-light text-2xl text-slate-900">Finalize</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed max-w-[240px] mx-auto">
                Generate a minimal, vector-grade PDF. Enable background graphics in the print dialog.
              </p>
            </div>
            
            <button 
              onClick={async () => {
                updateField('isPrinting', true);
                await new Promise(r => setTimeout(r, 1000));
                window.print();
                updateField('isPrinting', false);
              }}
              className="w-full bg-slate-900 text-white rounded-md py-4 font-medium text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-[0.98]"
            >
              Export Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
