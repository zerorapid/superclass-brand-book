import React, { useState } from 'react';
import { BrandBookState } from './types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings2, 
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

  const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <label className={`block text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider ${className || ''}`}>{children}</label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      {...props} 
      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  );

  const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea 
      {...props} 
      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[80px]"
    />
  );

  const TabButton = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
        activeTab === id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
      }`}
    >
      <Icon size={16} />
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="w-[380px] bg-white border-r border-slate-100 flex flex-col h-full overflow-hidden shadow-2xl z-10 font-sans">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Settings2 className="text-white" size={18} />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight leading-none uppercase">Editor</h1>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">v{state.version}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={prevSlide}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-20"
            disabled={state.currentSlide === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-20"
            disabled={state.currentSlide === totalSlides - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-100 bg-white">
        <TabButton id="identity" icon={FileText} label="Identity" />
        <TabButton id="aesthetics" icon={Palette} label="Aesthetics" />
        <TabButton id="export" icon={Download} label="Export" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-white">
        {activeTab === 'identity' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <Label>Brand Name</Label>
              <Input value={state.brandName} onChange={(e) => updateField('brandName', e.target.value)} />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input value={state.tagline} onChange={(e) => updateField('tagline', e.target.value)} />
            </div>
            <div>
              <Label>About / Introduction</Label>
              <TextArea value={state.introduction} onChange={(e) => updateField('introduction', e.target.value)} />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <Label className="flex items-center gap-2 mb-3">
                <ImageIcon size={12} /> Primary Logo
              </Label>
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group">
                {state.primaryLogo ? (
                  <div className="relative">
                    <img src={state.primaryLogo} alt="Logo" className="max-h-24 mx-auto object-contain" />
                    <button 
                      onClick={(e) => { e.preventDefault(); updateField('primaryLogo', ''); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-100">
                      <ImageIcon className="text-slate-400" size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Upload Logo</p>
                      <p className="text-[10px] text-slate-400">SVG or transparent PNG</p>
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
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Colors */}
            <div>
              <Label className="flex items-center gap-2 mb-4">
                <Palette size={12} /> Brand Colors
              </Label>
              <div className="space-y-3">
                {state.primaryColors.map((color, i) => (
                  <div key={`primary-${i}`} className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 border border-black/10">
                      <input 
                        type="color" 
                        value={color.hex}
                        className="w-12 h-12 -mt-2 -ml-2 cursor-pointer"
                        onChange={(e) => {
                          const newColors = [...state.primaryColors];
                          newColors[i].hex = e.target.value;
                          updateField('primaryColors', newColors);
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                         value={color.name} 
                         className="flex-1 text-xs font-bold bg-transparent outline-none"
                         onChange={(e) => {
                           const newColors = [...state.primaryColors];
                           newColors[i].name = e.target.value;
                           updateField('primaryColors', newColors);
                         }}
                         placeholder="Color Name"
                      />
                      <span className="text-[9px] font-mono text-slate-400 uppercase">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="pt-6 border-t border-slate-100">
              <Label className="flex items-center gap-2 mb-4">
                <TypeIcon size={12} /> Typography Preset
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: 'Modern Tech', head: 'Space Grotesk', body: 'Inter' },
                  { name: 'Classic Editorial', head: 'Playfair Display', body: 'Lora' },
                  { name: 'Clean Minimal', head: 'Outfit', body: 'Manrope' },
                  { name: 'Bold Impact', head: 'Oswald', body: 'Roboto' }
                ].map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => updateField('typographySettings', { headingFont: preset.head, bodyFont: preset.body })}
                    className={`p-3 border rounded-xl text-left transition-all ${
                      state.typographySettings.headingFont === preset.head 
                        ? 'border-blue-600 bg-blue-50 shadow-[0_0_0_2px_rgba(37,99,235,0.2)]' 
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{preset.name}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="font-bold">{preset.head}</span>
                      <span className="text-slate-300">/</span>
                      <span>{preset.body}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6 flex flex-col items-center justify-center h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2">
               <Download size={24} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-black text-lg">Ready to Export</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                Generate a perfect, vector-grade PDF of your brand book. For best results, enable background graphics and remove margins in the print dialog.
              </p>
            </div>
            
            <button 
              onClick={async () => {
                updateField('isPrinting', true);
                await new Promise(r => setTimeout(r, 1000));
                window.print();
                updateField('isPrinting', false);
              }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl active:scale-[0.98] mt-4"
            >
              Export PDF Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
