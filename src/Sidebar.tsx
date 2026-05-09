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
    <div className="w-[380px] bg-white border-r-2 border-black flex flex-col h-full overflow-hidden z-10 font-sans">
      
      {/* HEADER - BRUTALIST */}
      <div className="p-6 border-b-2 border-black bg-white flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl tracking-tighter uppercase text-black leading-none">Superclass</h1>
          <p className="text-[10px] text-black uppercase font-mono font-bold tracking-widest mt-1 bg-[#00F5FF] inline-block px-1">BUILDER v{state.version}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black"
            disabled={state.currentSlide === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black"
            disabled={state.currentSlide === totalSlides - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* TABS - BRUTALIST */}
      <div className="flex border-b-2 border-black bg-white">
        {[
          { id: 'identity', icon: FileText, label: 'DATA' },
          { id: 'aesthetics', icon: Palette, label: 'STYLE' },
          { id: 'export', icon: Download, label: 'PDF' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex flex-col items-center justify-center py-4 gap-2 border-r-2 border-black last:border-r-0 transition-colors ${
              activeTab === tab.id ? 'bg-black text-white' : 'hover:bg-slate-100 text-black'
            }`}
          >
            <tab.icon size={16} strokeWidth={activeTab === tab.id ? 3 : 2} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        {activeTab === 'identity' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-black mb-2">Brand Name</label>
              <input 
                type="text"
                value={state.brandName} 
                onChange={(e) => updateField('brandName', e.target.value)} 
                className="w-full bg-white border-2 border-black p-3 text-sm font-bold focus:outline-none focus:ring-0 focus:bg-[#00F5FF]/10 transition-colors rounded-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-black mb-2">Tagline</label>
              <input 
                type="text"
                value={state.tagline} 
                onChange={(e) => updateField('tagline', e.target.value)} 
                className="w-full bg-white border-2 border-black p-3 text-sm font-bold focus:outline-none focus:ring-0 focus:bg-[#00F5FF]/10 transition-colors rounded-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-black mb-2">Mission / About</label>
              <textarea 
                value={state.introduction} 
                onChange={(e) => updateField('introduction', e.target.value)} 
                className="w-full bg-white border-2 border-black p-3 text-sm font-bold focus:outline-none focus:ring-0 focus:bg-[#00F5FF]/10 transition-colors min-h-[120px] resize-none rounded-none"
              />
            </div>
            
            <div className="pt-8 border-t-2 border-black">
              <label className="flex items-center gap-2 mb-4 text-[11px] font-mono font-bold uppercase text-black">
                <ImageIcon size={14} /> Primary Mark
              </label>
              <div className="bg-white border-2 border-dashed border-black p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group">
                {state.primaryLogo ? (
                  <div className="relative">
                    <img src={state.primaryLogo} alt="Logo" className="max-h-32 mx-auto object-contain mix-blend-multiply" />
                    <button 
                      onClick={(e) => { e.preventDefault(); updateField('primaryLogo', ''); }}
                      className="absolute -top-4 -right-4 bg-black text-white p-2 hover:bg-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto" size={32} strokeWidth={1} />
                    <div>
                      <p className="text-sm font-bold uppercase">Upload SVG</p>
                    </div>
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
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Colors */}
            <div>
              <label className="flex items-center gap-2 mb-6 text-[11px] font-mono font-bold uppercase text-black">
                <Palette size={14} /> Brand Colors
              </label>
              <div className="space-y-4">
                {state.primaryColors.map((color, i) => (
                  <div key={`primary-${i}`} className="flex items-stretch border-2 border-black bg-white group">
                    <div className="w-16 shrink-0 border-r-2 border-black relative overflow-hidden">
                      <input 
                        type="color" 
                        value={color.hex}
                        className="absolute inset-[-10px] w-[50px] h-[50px] cursor-pointer"
                        onChange={(e) => {
                          const newColors = [...state.primaryColors];
                          newColors[i].hex = e.target.value.toUpperCase();
                          updateField('primaryColors', newColors);
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <input 
                         value={color.name} 
                         className="flex-1 px-3 py-2 text-sm font-black uppercase bg-transparent outline-none focus:bg-[#00F5FF]/10 transition-colors"
                         onChange={(e) => {
                           const newColors = [...state.primaryColors];
                           newColors[i].name = e.target.value;
                           updateField('primaryColors', newColors);
                         }}
                         placeholder="NAME"
                      />
                      <div className="border-t-2 border-black px-3 py-1 bg-slate-100">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{color.hex}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="pt-8 border-t-2 border-black">
              <label className="flex items-center gap-2 mb-6 text-[11px] font-mono font-bold uppercase text-black">
                <TypeIcon size={14} /> Typography Engine
              </label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Brutalist', head: 'Space Grotesk', body: 'Inter' },
                  { name: 'Editorial', head: 'Playfair Display', body: 'Lora' },
                  { name: 'System', head: 'Outfit', body: 'Manrope' }
                ].map(preset => {
                  const isActive = state.typographySettings.headingFont === preset.head;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => updateField('typographySettings', { headingFont: preset.head, bodyFont: preset.body })}
                      className={`text-left border-2 border-black transition-all ${
                        isActive 
                          ? 'bg-black text-white shadow-[4px_4px_0_0_#00F5FF]' 
                          : 'bg-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#000]'
                      }`}
                    >
                      <div className={`p-4 border-b-2 ${isActive ? 'border-white/20' : 'border-black'}`}>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-widest">{preset.name}</p>
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <span className="font-black text-lg">{preset.head}</span>
                        <span className="text-xs font-mono opacity-60">BODY: {preset.body}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'export' && (
          <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-300 py-12">
            <div className="w-24 h-24 border-4 border-black bg-[#00F5FF] flex items-center justify-center mb-8 shadow-[8px_8px_0_0_#000]">
               <Download size={40} className="text-black" />
            </div>
            <div className="text-center space-y-4 mb-12">
              <h3 className="font-black text-3xl uppercase tracking-tighter">RENDER</h3>
              <p className="text-sm text-black font-medium leading-relaxed max-w-[240px] mx-auto border-2 border-black p-4 bg-slate-50">
                A4 Landscape. Enable background graphics in the print dialog.
              </p>
            </div>
            
            <button 
              onClick={async () => {
                updateField('isPrinting', true);
                await new Promise(r => setTimeout(r, 1000));
                window.print();
                updateField('isPrinting', false);
              }}
              className="w-full bg-black text-white border-2 border-black py-5 font-black text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[6px_6px_0_0_#00F5FF] hover:shadow-[2px_2px_0_0_#00F5FF] hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
            >
              EXECUTE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
