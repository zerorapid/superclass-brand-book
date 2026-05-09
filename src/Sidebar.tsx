import React from 'react';
import { BrandBookState } from './types';
import { SlideRenderer } from './SlideRenderer';
import { hexToRgb, hexToCmyk, getContrastRatio } from './lib/colorUtils';
import { generateBrandContent, generateBrandImage } from './services/geminiService';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings2, 
  BookOpen, 
  Image as ImageIcon, 
  Palette, 
  Type as TypeIcon,
  Plus,
  Trash2,
  Download,
  Mail,
  Sparkles,
  AlertCircle,
  Loader2,
  Layers,
  LayoutDashboard,
  Printer
} from 'lucide-react';
// @ts-ignore
import jsPDF from 'jspdf';
// @ts-ignore
import domtoimage from 'dom-to-image-more';

interface SidebarProps {
  state: BrandBookState;
  setState: React.Dispatch<React.SetStateAction<BrandBookState>>;
}

export const Sidebar = ({ state, setState }: SidebarProps) => {
  const [isGenerating, setIsGenerating] = React.useState<string | null>(null);

  const updateField = (field: keyof BrandBookState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (['stationary', 'social', 'outdoor', 'digital'].includes(field)) {
          updateField('mockups', { ...state.mockups, [field]: reader.result as string });
        } else {
          updateField(field as keyof BrandBookState, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'primaryLogo' | 'secondaryLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextSlide = () => updateField('currentSlide', Math.min(25, state.currentSlide + 1));
  const prevSlide = () => updateField('currentSlide', Math.max(0, state.currentSlide - 1));

  const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-2 mb-4 px-4">
        <div className="p-1.5 bg-slate-100 rounded text-slate-500">
          <Icon size={16} />
        </div>
        <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">{title}</h3>
      </div>
      <div className="space-y-4 px-4">
        {children}
      </div>
    </div>
  );

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
            disabled={state.currentSlide === 25}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-8">
        <Section title="Brand Core" icon={BookOpen}>
          <div>
            <Label>Brand Name</Label>
            <Input value={state.brandName} onChange={(e) => updateField('brandName', e.target.value)} />
          </div>
          <div>
            <Label>Tagline</Label>
            <Input value={state.tagline} onChange={(e) => updateField('tagline', e.target.value)} />
          </div>
          <div>
            <Label>Story / Intro</Label>
            <TextArea value={state.introduction} onChange={(e) => updateField('introduction', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Mission</Label>
              <TextArea value={state.mission} onChange={(e) => updateField('mission', e.target.value)} />
            </div>
            <div>
              <Label>Vision</Label>
              <TextArea value={state.vision} onChange={(e) => updateField('vision', e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Brand Archetype</Label>
            <Input value={state.brandArchetype} onChange={(e) => updateField('brandArchetype', e.target.value)} placeholder="e.g. The Creator, The Explorer" />
          </div>
          <div>
            <Label>Brand Promise</Label>
            <TextArea value={state.brandPromise} onChange={(e) => updateField('brandPromise', e.target.value)} />
          </div>
          <div>
            <Label>Tone of Voice</Label>
            <TextArea value={state.toneOfVoice} onChange={(e) => updateField('toneOfVoice', e.target.value)} />
          </div>
          <div>
             <Label>Target Audience</Label>
             <Input value={state.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label>Personality Traits</Label>
              <button 
                onClick={() => updateField('personalityTraits', [...state.personalityTraits, 'New Trait'])}
                className="text-[10px] text-blue-600 font-bold"
              >
                + Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.personalityTraits.map((trait, i) => (
                <div key={i} className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                  <input 
                    value={trait} 
                    className="bg-transparent text-[10px] w-16 focus:outline-none"
                    onChange={(e) => {
                      const newTraits = [...state.personalityTraits];
                      newTraits[i] = e.target.value;
                      updateField('personalityTraits', newTraits);
                    }}
                  />
                  <button onClick={() => updateField('personalityTraits', state.personalityTraits.filter((_, idx) => idx !== i))}>
                    <Trash2 size={10} className="text-slate-300 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Core Values</Label>
              <button 
                onClick={() => updateField('coreValues', [...state.coreValues, { title: 'New Value', description: 'Enter description...' }])}
                className="text-[10px] text-blue-600 font-bold"
              >
                + Add Value
              </button>
            </div>
            <div className="space-y-3">
              {state.coreValues.map((val, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-lg relative group">
                  <button 
                    onClick={() => updateField('coreValues', state.coreValues.filter((_, idx) => idx !== i))}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 size={12} className="text-slate-300 hover:text-red-500" />
                  </button>
                  <Input 
                    value={val.title} 
                    className="mb-2 font-bold"
                    placeholder="Value Title"
                    onChange={(e) => {
                      const newValues = [...state.coreValues];
                      newValues[i].title = e.target.value;
                      updateField('coreValues', newValues);
                    }}
                  />
                  <TextArea 
                    value={val.description} 
                    className="text-xs min-h-[60px]"
                    placeholder="Value Description"
                    onChange={(e) => {
                      const newValues = [...state.coreValues];
                      newValues[i].description = e.target.value;
                      updateField('coreValues', newValues);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Logos" icon={ImageIcon}>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
               <Label>Primary Logo</Label>
               <input 
                 type="file" 
                 accept="image/*" 
                 onChange={(e) => handleLogoUpload(e, 'primaryLogo')}
                 className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-slate-800 cursor-pointer w-full"
               />
            </div>
            <div>
               <Label>Secondary Logo</Label>
               <input 
                 type="file" 
                 accept="image/*" 
                 onChange={(e) => handleLogoUpload(e, 'secondaryLogo')}
                 className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer w-full"
               />
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div>
                  <Label>Min Size</Label>
                  <Input value={state.logoMinSize} onChange={(e) => updateField('logoMinSize', e.target.value)} />
               </div>
               <div>
                  <Label>Clear Space</Label>
                  <Input value={state.logoClearSpace} onChange={(e) => updateField('logoClearSpace', e.target.value)} />
               </div>
            </div>
          </div>
        </Section>

         <Section title="Colors" icon={Palette}>
            <div className="flex justify-between items-center mb-1">
              <Label>Primary Colors</Label>
              <button 
                onClick={() => updateField('primaryColors', [...state.primaryColors, { hex: '#000000', name: 'New Color' }])}
                className="text-[10px] text-blue-600 font-bold"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {state.primaryColors.map((color, i) => (
                 <div key={i} className="flex gap-2 items-center group">
                    <input 
                      type="color" 
                      value={color.hex} 
                      onChange={(e) => {
                        const newColors = [...state.primaryColors];
                        newColors[i].hex = e.target.value;
                        updateField('primaryColors', newColors);
                      }}
                      className="w-8 h-8 rounded border-none cursor-pointer p-0 overflow-hidden"
                    />
                    <Input 
                       value={color.name} 
                       placeholder="Name" 
                       onChange={(e) => {
                         const newColors = [...state.primaryColors];
                         newColors[i].name = e.target.value;
                         updateField('primaryColors', newColors);
                       }}
                    />
                    <button onClick={() => updateField('primaryColors', state.primaryColors.filter((_, idx) => idx !== i))}>
                      <Trash2 size={14} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100" />
                    </button>
                 </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <Label>Secondary Colors</Label>
                <button 
                  onClick={() => updateField('secondaryColors', [...state.secondaryColors, { hex: '#cccccc', name: 'New Color' }])}
                  className="text-[10px] text-blue-600 font-bold"
                >
                  + Add
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {state.secondaryColors.map((color, i) => (
                  <div key={i} className="flex flex-col gap-1 group relative">
                    <button 
                      onClick={() => updateField('secondaryColors', state.secondaryColors.filter((_, idx) => idx !== i))}
                      className="absolute -top-1 -right-1 z-10 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={10} className="text-red-500 bg-white rounded-full" />
                    </button>
                    <div className="flex gap-1">
                      <input 
                        type="color" 
                        value={color.hex} 
                        onChange={(e) => {
                          const newColors = [...state.secondaryColors];
                          newColors[i].hex = e.target.value;
                          updateField('secondaryColors', newColors);
                        }}
                        className="w-10 h-10 rounded-lg border border-slate-200"
                      />
                      <Input 
                         value={color.name} 
                         className="flex-1 text-[10px] py-1"
                         onChange={(e) => {
                           const newColors = [...state.secondaryColors];
                           newColors[i].name = e.target.value;
                           updateField('secondaryColors', newColors);
                         }}
                      />
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </Section>

        <Section title="Typography" icon={TypeIcon}>
          <div className="space-y-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
              <Label className="text-blue-600">Heading Style</Label>
              <div className="space-y-3 mt-2">
                <div>
                  <Label className="text-[9px]">Font Family</Label>
                  <select 
                    value={state.typographySettings.headingFont}
                    onChange={(e) => updateField("typographySettings", { ...state.typographySettings, headingFont: e.target.value })}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  >
                    {["Space Grotesk", "Montserrat", "Playfair Display", "Inter", "Oswald", "Outfit", "Plus Jakarta Sans"].map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-[9px]">Weight</Label>
                    <select 
                      value={state.typographySettings.headingWeight}
                      onChange={(e) => updateField("typographySettings", { ...state.typographySettings, headingWeight: e.target.value })}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    >
                      {["300", "400", "500", "600", "700", "800", "900"].map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-[9px]">Spacing</Label>
                    <Input 
                      type="text"
                      value={state.typographySettings.headingLetterSpacing}
                      onChange={(e) => updateField("typographySettings", { ...state.typographySettings, headingLetterSpacing: e.target.value })}
                      placeholder="-0.02em"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
              <Label className="text-blue-600">Body Style</Label>
              <div className="space-y-3 mt-2">
                <div>
                  <Label className="text-[9px]">Font Family</Label>
                  <select 
                    value={state.typographySettings.bodyFont}
                    onChange={(e) => updateField("typographySettings", { ...state.typographySettings, bodyFont: e.target.value })}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  >
                    {["Inter", "Open Sans", "Roboto", "Lora", "Manrope", "Lexend", "Source Sans 3"].map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-[9px]">Weight</Label>
                    <select 
                      value={state.typographySettings.bodyWeight}
                      onChange={(e) => updateField("typographySettings", { ...state.typographySettings, bodyWeight: e.target.value })}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    >
                      {["300", "400", "500", "600", "700"].map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-[9px]">Line Height</Label>
                    <Input 
                      type="text"
                      value={state.typographySettings.bodyLineHeight}
                      onChange={(e) => updateField("typographySettings", { ...state.typographySettings, bodyLineHeight: e.target.value })}
                      placeholder="1.6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => updateField("typographySettings", {
                  headingFont: "Playfair Display",
                  bodyFont: "Lora",
                  headingWeight: "700",
                  bodyWeight: "400",
                  headingLetterSpacing: "0.02em",
                  bodyLineHeight: "1.8"
                })}
                className="text-[9px] py-2 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium"
              >
                Classic Luxury
              </button>
              <button 
                onClick={() => updateField("typographySettings", {
                  headingFont: "Plus Jakarta Sans",
                  bodyFont: "Inter",
                  headingWeight: "800",
                  bodyWeight: "400",
                  headingLetterSpacing: "-0.04em",
                  bodyLineHeight: "1.6"
                })}
                className="text-[9px] py-2 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium"
              >
                Modern Tech
              </button>
            </div>
          </div>
        </Section>
         <Section title="Asset Styles" icon={Layers}>
            <div className="space-y-4">
              <div>
                <Label>Photography Style</Label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'photographyImage')}
                  className="text-[10px] mb-2 block"
                />
                <TextArea value={state.photographyStyle} onChange={(e) => updateField('photographyStyle', e.target.value)} />
              </div>
              <div>
                <Label>Iconography Style</Label>
                <TextArea value={state.iconographyStyle} onChange={(e) => updateField('iconographyStyle', e.target.value)} />
              </div>
              <div>
                <Label>Mockups / Applications (Reference)</Label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'applicationImage')}
                  className="text-[10px] mb-2 block"
                />
                <div className="p-4 bg-slate-50 border border-dotted border-slate-300 rounded-lg text-center">
                   <p className="text-[10px] text-slate-400">Upload a master mockup for the presentation.</p>
                </div>
              </div>
              <div>
                <Label>Pattern Style</Label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'patternImage')}
                  className="text-[10px] mb-2 block"
                />
                <TextArea value={state.patternStyle} onChange={(e) => updateField('patternStyle', e.target.value)} />
              </div>
            </div>
         </Section>

         <Section title="Mockup Assets" icon={LayoutDashboard}>
            <div className="grid grid-cols-2 gap-2">
               {[
                 { id: 'stationary', label: 'Stationary' },
                 { id: 'social', label: 'Social Media' },
                 { id: 'outdoor', label: 'Outdoor/Sign' },
                 { id: 'digital', label: 'Web/App' }
               ].map(m => (
                 <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left">
                    <Label className="mb-2">{m.label}</Label>
                    <div className="aspect-video bg-slate-200 rounded-md overflow-hidden mb-2 relative group">
                       {(state.mockups as any)[m.id] ? (
                         <img src={(state.mockups as any)[m.id]} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">Empty</div>
                       )}
                       <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Plus className="text-white" size={20} />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, m.id)} />
                       </label>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="mt-4">
               <Label>Social Strategy</Label>
               <TextArea value={state.socialStrategy} onChange={(e) => updateField('socialStrategy', e.target.value)} />
            </div>
         </Section>

        <Section title="Contact" icon={Mail}>
          <div>
            <Label>Contact Email</Label>
            <Input value={state.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} />
          </div>
          <div>
            <Label>Brand Manager</Label>
            <Input value={state.brandManager} onChange={(e) => updateField('brandManager', e.target.value)} />
          </div>
          <div className="pt-2 border-t border-slate-100 mt-2 space-y-4">
             <Label className="text-slate-400">Social Links</Label>
             <div>
                <Label className="text-[10px]">Website</Label>
                <Input value={state.socialLinks.website} onChange={(e) => updateField('socialLinks', { ...state.socialLinks, website: e.target.value })} placeholder="https://..." />
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px]">Instagram</Label>
                  <Input value={state.socialLinks.instagram} onChange={(e) => updateField('socialLinks', { ...state.socialLinks, instagram: e.target.value })} placeholder="@handle" />
                </div>
                <div>
                  <Label className="text-[10px]">LinkedIn</Label>
                  <Input value={state.socialLinks.linkedin} onChange={(e) => updateField('socialLinks', { ...state.socialLinks, linkedin: e.target.value })} placeholder="company/id" />
                </div>
             </div>
          </div>
        </Section>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-2">
         <button 
           onClick={async () => {
             // 1. Enter "100% Accurate" Mode
             updateField('isPrinting', true);
             
             // 2. Wait for DOM to switch to pure book view
             await new Promise(r => setTimeout(r, 1000));

             // 3. Trigger Browser Print (Vector Grade)
             window.print();

             // 4. Return to Editor
             updateField('isPrinting', false);
           }}
           className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-1 hover:bg-blue-700 transition-all shadow-xl active:scale-[0.98]"
         >
           <div className="flex items-center gap-2">
             <Download size={18} />
             <span>Export 100% Accurate PDF</span>
           </div>
           <span className="text-[9px] opacity-70 font-medium">CANVA-GRADE VECTOR EXPORT</span>
         </button>
      </div>
    </div>
  );
};
