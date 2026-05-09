import React, { useState } from 'react';
import { BrandBookState } from './types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download,
  Image as ImageIcon, 
  Trash2
} from 'lucide-react';

interface SidebarProps {
  state: BrandBookState;
  setState: React.Dispatch<React.SetStateAction<BrandBookState>>;
  totalSlides: number;
}

export const Sidebar = ({ state, setState, totalSlides }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'assets' | 'aesthetics' | 'export'>('identity');

  const updateField = (field: keyof BrandBookState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof BrandBookState) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateField(field, reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const nextSlide = () => updateField('currentSlide', Math.min(totalSlides - 1, state.currentSlide + 1));
  const prevSlide = () => updateField('currentSlide', Math.max(0, state.currentSlide - 1));

  return (
    <div className="w-[420px] bg-white border-r border-slate-100 flex flex-col h-full overflow-hidden z-10 font-sans">
      
      <div className="px-10 py-8 bg-white flex items-center justify-between">
        <h1 className="font-light text-2xl tracking-tight text-slate-800">Superclass</h1>
        <div className="flex gap-1">
          <button onClick={prevSlide} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors disabled:opacity-20 disabled:hover:bg-transparent" disabled={state.currentSlide === 0}>
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button onClick={nextSlide} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors disabled:opacity-20 disabled:hover:bg-transparent" disabled={state.currentSlide === totalSlides - 1}>
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex px-8 border-b border-slate-100 bg-white">
        {[
          { id: 'identity', label: 'Identity' },
          { id: 'assets', label: 'Assets' },
          { id: 'aesthetics', label: 'Style' },
          { id: 'export', label: 'Export' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 text-[10px] font-medium uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-slate-900" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-10 py-12 bg-white">
        {activeTab === 'identity' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Brand Name</label>
              <input type="text" value={state.brandName} onChange={(e) => updateField('brandName', e.target.value)} className="w-full bg-transparent border-b border-slate-200 pb-2 text-lg font-light text-slate-900 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder:text-slate-300" />
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Tagline</label>
              <input type="text" value={state.tagline} onChange={(e) => updateField('tagline', e.target.value)} className="w-full bg-transparent border-b border-slate-200 pb-2 text-sm font-light text-slate-600 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder:text-slate-300" />
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Core Message</label>
              <textarea value={state.introduction} onChange={(e) => updateField('introduction', e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors min-h-[100px] resize-none rounded-sm" />
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Vision Statement</label>
              <textarea value={state.vision} onChange={(e) => updateField('vision', e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors min-h-[100px] resize-none rounded-sm" />
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Elevator Pitch (Positioning)</label>
              <textarea value={state.positioning} onChange={(e) => updateField('positioning', e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors min-h-[100px] resize-none rounded-sm" />
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Target Audience</label>
              <textarea value={state.audience} onChange={(e) => updateField('audience', e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors min-h-[100px] resize-none rounded-sm" />
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Tone of Voice</label>
              <input type="text" value={state.toneOfVoice} onChange={(e) => updateField('toneOfVoice', e.target.value)} className="w-full bg-transparent border-b border-slate-200 pb-2 text-sm font-light text-slate-600 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder:text-slate-300" />
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Core Values (Max 3)</label>
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <input key={`value-${i}`} type="text" value={state.coreValues[i]} onChange={(e) => {
                    const newValues = [...state.coreValues] as [string, string, string];
                    newValues[i] = e.target.value;
                    updateField('coreValues', newValues);
                  }} className="w-full bg-slate-50 border border-slate-100 p-3 text-xs font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors rounded-sm" placeholder={`Value 0${i+1}`} />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Do's</label>
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <input key={`do-${i}`} type="text" value={state.dos[i]} onChange={(e) => {
                    const newValues = [...state.dos] as [string, string, string];
                    newValues[i] = e.target.value;
                    updateField('dos', newValues);
                  }} className="w-full bg-slate-50 border border-slate-100 p-3 text-xs font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors rounded-sm" placeholder={`Rule 0${i+1}`} />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Don'ts</label>
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <input key={`dont-${i}`} type="text" value={state.donts[i]} onChange={(e) => {
                    const newValues = [...state.donts] as [string, string, string];
                    newValues[i] = e.target.value;
                    updateField('donts', newValues);
                  }} className="w-full bg-slate-50 border border-slate-100 p-3 text-xs font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors rounded-sm" placeholder={`Rule 0${i+1}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-12 animate-in fade-in duration-500">
             
             {/* Primary Logo */}
             <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Primary Mark</label>
              <div className="bg-slate-50 border border-slate-100 p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group rounded-sm">
                {state.primaryLogo ? (
                  <div className="relative">
                    <img src={state.primaryLogo} alt="Primary Mark" className="max-h-24 mx-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button onClick={(e) => { e.preventDefault(); updateField('primaryLogo', ''); }} className="absolute -top-4 -right-4 text-slate-400 p-2 hover:text-red-500 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto text-slate-300" size={20} strokeWidth={1} />
                    <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Upload Image</p>
                  </div>
                )}
                <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, 'primaryLogo')} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
              </div>
             </div>

             {/* Secondary Logo */}
             <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Secondary / Alternate Mark</label>
              <div className="bg-slate-50 border border-slate-100 p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group rounded-sm">
                {state.secondaryLogo ? (
                  <div className="relative">
                    <img src={state.secondaryLogo} alt="Secondary Mark" className="max-h-24 mx-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button onClick={(e) => { e.preventDefault(); updateField('secondaryLogo', ''); }} className="absolute -top-4 -right-4 text-slate-400 p-2 hover:text-red-500 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto text-slate-300" size={20} strokeWidth={1} />
                    <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Upload Image</p>
                  </div>
                )}
                <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, 'secondaryLogo')} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
              </div>
             </div>

             <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Photography Style</label>
              <textarea value={state.photographyStyle} onChange={(e) => updateField('photographyStyle', e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors min-h-[100px] resize-none rounded-sm" placeholder="Describe the art direction..." />
             </div>

             <div className="flex gap-4">
               <div className="flex-1">
                 <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Min Size (Digital)</label>
                 <input type="text" value={state.logoMinSizeDigital} onChange={(e) => updateField('logoMinSizeDigital', e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-3 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors rounded-sm" placeholder="e.g. 32px" />
               </div>
               <div className="flex-1">
                 <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Min Size (Print)</label>
                 <input type="text" value={state.logoMinSizePrint} onChange={(e) => updateField('logoMinSizePrint', e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-3 text-sm font-light text-slate-600 focus:outline-none focus:bg-slate-100 transition-colors rounded-sm" placeholder="e.g. 15mm" />
               </div>
             </div>

             {/* Pattern */}
             <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Brand Pattern / Texture</label>
              <div className="bg-slate-50 border border-slate-100 p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group rounded-sm">
                {state.brandPattern ? (
                  <div className="relative">
                    <img src={state.brandPattern} alt="Pattern" className="max-h-24 mx-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button onClick={(e) => { e.preventDefault(); updateField('brandPattern', ''); }} className="absolute -top-4 -right-4 text-slate-400 p-2 hover:text-red-500 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto text-slate-300" size={20} strokeWidth={1} />
                    <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Upload Image</p>
                  </div>
                )}
                <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, 'brandPattern')} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
              </div>
             </div>

             {/* Stationery Mockup */}
             <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Stationery Mockup</label>
              <div className="bg-slate-50 border border-slate-100 p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group rounded-sm">
                {state.mockupStationery ? (
                  <div className="relative">
                    <img src={state.mockupStationery} alt="Stationery Mockup" className="max-h-24 mx-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button onClick={(e) => { e.preventDefault(); updateField('mockupStationery', ''); }} className="absolute -top-4 -right-4 text-slate-400 p-2 hover:text-red-500 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto text-slate-300" size={20} strokeWidth={1} />
                    <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Upload Image</p>
                  </div>
                )}
                <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, 'mockupStationery')} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
              </div>
             </div>

             {/* Social Mockup */}
             <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Social Media Mockup</label>
              <div className="bg-slate-50 border border-slate-100 p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group rounded-sm">
                {state.mockupSocial ? (
                  <div className="relative">
                    <img src={state.mockupSocial} alt="Social Media Mockup" className="max-h-24 mx-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button onClick={(e) => { e.preventDefault(); updateField('mockupSocial', ''); }} className="absolute -top-4 -right-4 text-slate-400 p-2 hover:text-red-500 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto text-slate-300" size={20} strokeWidth={1} />
                    <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Upload Image</p>
                  </div>
                )}
                <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, 'mockupSocial')} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
              </div>
             </div>

             {/* Marketing Mockup */}
             <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Marketing Mockup</label>
              <div className="bg-slate-50 border border-slate-100 p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group rounded-sm">
                {state.mockupMarketing ? (
                  <div className="relative">
                    <img src={state.mockupMarketing} alt="Marketing Mockup" className="max-h-24 mx-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button onClick={(e) => { e.preventDefault(); updateField('mockupMarketing', ''); }} className="absolute -top-4 -right-4 text-slate-400 p-2 hover:text-red-500 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto text-slate-300" size={20} strokeWidth={1} />
                    <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Upload Image</p>
                  </div>
                )}
                <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, 'mockupMarketing')} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
              </div>
             </div>

          </div>
        )}

        {activeTab === 'aesthetics' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Color Palette</label>
              <div className="space-y-6">
                {state.primaryColors.map((color, i) => (
                  <div key={`primary-${i}`} className="flex items-center gap-6 group">
                    <div className="w-10 h-10 shrink-0 rounded-full relative overflow-hidden shadow-inner ring-1 ring-slate-900/5">
                      <input type="color" value={color.hex} className="absolute inset-[-10px] w-[60px] h-[60px] cursor-pointer" onChange={(e) => {
                          const newColors = [...state.primaryColors];
                          newColors[i].hex = e.target.value.toUpperCase();
                          updateField('primaryColors', newColors);
                        }} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <input value={color.name} className="w-full text-sm font-light text-slate-900 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-slate-900 focus:outline-none transition-colors" onChange={(e) => {
                           const newColors = [...state.primaryColors];
                           newColors[i].name = e.target.value;
                           updateField('primaryColors', newColors);
                         }} placeholder="Color Name" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3">Google Fonts API</label>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-light text-slate-500 mb-1 block">Heading Font Name</label>
                  <input type="text" value={state.typographySettings.headingFont} onChange={(e) => updateField('typographySettings', { ...state.typographySettings, headingFont: e.target.value })} className="w-full bg-slate-50 border border-slate-100 p-3 text-sm font-light text-slate-900 focus:outline-none focus:bg-slate-100 transition-colors rounded-sm" placeholder="e.g. Inter" />
                </div>
                <div>
                  <label className="text-xs font-light text-slate-500 mb-1 block">Body Font Name</label>
                  <input type="text" value={state.typographySettings.bodyFont} onChange={(e) => updateField('typographySettings', { ...state.typographySettings, bodyFont: e.target.value })} className="w-full bg-slate-50 border border-slate-100 p-3 text-sm font-light text-slate-900 focus:outline-none focus:bg-slate-100 transition-colors rounded-sm" placeholder="e.g. Roboto" />
                </div>
              </div>
              
              <label className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 mb-3 mt-8">Quick Presets</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: 'Modern Sans', head: 'Inter', body: 'Inter' },
                  { name: 'Elegant Serif', head: 'Playfair Display', body: 'Lora' },
                  { name: 'Geometric', head: 'Space Grotesk', body: 'Outfit' }
                ].map(preset => {
                  const isActive = state.typographySettings.headingFont === preset.head && state.typographySettings.bodyFont === preset.body;
                  return (
                    <button key={preset.name} onClick={() => updateField('typographySettings', { headingFont: preset.head, bodyFont: preset.body })}
                      className={`text-left transition-all p-5 rounded-md ${isActive ? 'bg-slate-50 ring-1 ring-slate-200' : 'bg-transparent hover:bg-slate-50'}`}>
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
            <div className="text-center space-y-4 mb-8">
              <h3 className="font-light text-2xl text-slate-900">Finalize</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed max-w-[240px] mx-auto">
                Generate a minimal, vector-grade PDF. Enable background graphics in the print dialog.
              </p>
            </div>
            
            <div className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-md mb-12">
              <span className="text-xs font-medium text-slate-700 tracking-wide">Show Structural Grid</span>
              <button 
                onClick={() => updateField('showGridOverlay', !state.showGridOverlay)}
                className={`w-10 h-5 rounded-full transition-colors relative ${state.showGridOverlay ? 'bg-slate-900' : 'bg-slate-200'}`}
              >
                <div className={`w-3 h-3 rounded-full bg-white absolute top-1 transition-all ${state.showGridOverlay ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <button onClick={async () => {
                updateField('isPrinting', true);
                await new Promise(r => setTimeout(r, 1000));
                window.print();
                updateField('isPrinting', false);
              }}
              className="w-full bg-slate-900 text-white rounded-md py-4 font-medium text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-[0.98] mb-4">
              Export Document
            </button>
            <button onClick={() => {
                if (confirm('Are you sure you want to clear all data and start over?')) {
                  // Hacky but clean way to reset state completely back to INITIAL_STATE without passing INITIAL_STATE explicitly
                  window.location.reload();
                }
              }}
              className="w-full bg-transparent text-slate-400 border border-slate-200 rounded-md py-4 font-medium text-[11px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-[0.98]">
              Reset to Defaults
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
