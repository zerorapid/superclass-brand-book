import React from 'react';
import { motion } from 'motion/react';
import { BrandBookState } from './types';
import { hexToRgb, hexToCmyk } from './lib/colorUtils';
import { 
  CheckCircle2, 
  XCircle, 
  Mail, 
  User, 
  Type, 
  Palette, 
  Layout, 
  Eye, 
  Target,
  Globe,
  Instagram,
  Linkedin
} from 'lucide-react';

interface SlideRendererProps {
  state: BrandBookState;
  index: number;
  key?: React.Key;
}

export const SlideRenderer = ({ state, index }: SlideRendererProps) => {
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const updateState = (path: string, value: any) => {
    // This is a helper to update nested state from the slide itself
    // In a real app, you'd pass this from App.tsx
    (window as any).updateBrandBookState(path, value);
  };

  const EditableText = ({ 
    value, 
    path, 
    className = "", 
    element: Element = "div" as any,
    multiline = false
  }: { 
    value: string; 
    path: string; 
    className?: string; 
    element?: any;
    multiline?: boolean;
  }) => {
    return (
      <Element
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: any) => updateState(path, e.target.innerText)}
        className={`hover:bg-slate-50 transition-colors cursor-text outline-none focus:ring-2 focus:ring-blue-100 rounded px-1 -mx-1 ${className}`}
      >
        {value}
      </Element>
    );
  };

  const SoaroLogo = ({ className = "w-12 h-12", color = "#212A29" }: { className?: string, color?: string }) => (
    <svg width="1282" height="298" viewBox="0 0 1282 298" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M95.3896 269.31C66.5596 269.31 39.43 266.06 14 259.56C10.32 258.43 8.49023 256.03 8.49023 252.35V222.25C8.49023 218.01 10.7505 216.04 15.2705 216.32C45.7905 221.41 71.4999 223.95 92.4199 223.95C108.53 223.95 119.19 222.47 124.42 219.5C129.65 216.53 132.26 210.39 132.26 201.06C132.26 193.43 129.99 188.2 125.48 185.38C120.96 182.56 112.62 180.58 100.47 179.45L82.2402 177.75C52.0002 174.93 30.6605 169.13 18.2305 160.37C6.08047 151.61 0 136.63 0 115.44C0 91.14 6.99047 73.83 20.9805 63.51C34.9705 53.2 58.3496 48.04 91.1396 48.04C120.24 48.04 146.25 51.01 169.14 56.94C172.81 57.79 174.65 60.05 174.65 63.72V93.82C174.65 98.06 172.39 100.04 167.87 99.75C141.59 95.23 116.86 92.97 93.6904 92.97C78.7104 92.97 68.8205 94.32 64.0205 97C59.2105 99.69 56.6696 105.27 56.3896 113.74C56.3896 119.67 58.3004 123.91 62.1104 126.46C65.9304 129 73.0605 130.98 83.5205 132.4L103.44 134.52C127.74 137.91 145.12 141.59 155.58 145.54C166.88 150.06 175.01 156.35 179.96 164.4C184.9 172.45 187.8 184.39 188.65 200.22C188.65 225.94 181.58 243.88 167.45 254.05C153.32 264.22 129.3 269.31 95.3896 269.31Z" fill={color}/>
      <path d="M360.91 261.26C347.62 266.63 327.99 269.31 301.99 269.31C275.99 269.31 255.5 266.41 242.22 260.62C228.93 254.83 218.9 244.16 212.12 228.62C205.34 212.51 201.95 189.2 201.95 158.68C201.95 101.31 215.65 67.26 243.07 56.52C256.91 50.87 276.56 48.04 301.99 48.04C327.42 48.04 347.06 50.87 360.91 56.52C374.48 62.18 384.65 72.91 391.43 88.74C398.49 104.57 402.03 127.88 402.03 158.68C402.03 215.48 388.32 249.68 360.91 261.26ZM301.99 223.11C320.07 223.11 331.38 219.16 335.9 211.24C340.7 203.05 343.11 185.53 343.11 158.68C343.11 131.83 340.7 114.03 335.9 106.11C331.38 98.2 320.07 94.1 301.99 93.82C283.62 93.82 272.17 97.78 267.65 105.69C263.13 113.04 260.87 130.7 260.87 158.68C260.87 186.66 263.13 204.32 267.65 211.67C272.45 219.3 283.9 223.12 301.99 223.12" fill={color}/>
      <path d="M481.26 269.31C432.37 269.31 407.93 246.28 407.93 200.22C407.93 178.46 414.14 162.64 426.58 152.74C439.01 142.85 459.92 137.06 489.32 135.36L544 131.97C544 116.43 541.31 106.4 535.95 101.87C530.29 97.07 517.86 94.66 498.65 94.66C476.04 94.66 452.45 97.2 427.86 102.29C423.34 103.14 421.08 101.17 421.08 96.36V65.84C421.08 62.17 422.78 59.77 426.17 58.63C450.19 51.57 476.75 48.03 505.86 48.03C524.23 48.03 538.781 49.37 549.521 52.06C560.261 54.75 569.72 59.76 577.92 67.11C593.46 80.67 601.24 108.65 601.24 151.04V258.29C601.24 262.53 599.12 264.65 594.88 264.65H560.12C556.73 264.65 554.33 262.95 552.91 259.56L548.25 244.72C547.4 244.85 545.28 248.11 541.89 251.5C539.35 254.04 532.141 257.72 520.271 262.52C509.251 267.04 496.251 269.3 481.271 269.3M496.95 223.11C506.84 223.11 515.88 221.84 524.08 219.29C532.27 216.75 537.78 214.06 540.61 211.24L544 207V172.66L497.8 175.63C483.95 176.48 474.98 178.32 470.88 181.14C466.78 183.97 464.73 189.9 464.73 198.94C464.73 207.98 466.92 214.27 471.3 217.8C475.68 221.34 484.23 223.10 496.95 223.1" fill={color}/>
      <path d="M679.26 264.65H633.48C629.24 264.65 627.12 262.53 627.12 258.29V59.0598C627.12 54.8198 629.24 52.6998 633.48 52.6998H667.39C671.35 52.6998 673.75 54.5398 674.6 58.2098L679.26 83.2198C681.52 77.8598 686.18 71.4998 693.25 64.1398C703.42 53.9698 724.35 49.0698 745.83 49.0698C752.04 49.0698 755.86 49.2198 757.28 49.4898C761.23 50.0598 763.21 52.1798 763.21 55.8498V96.9698C763.21 101.49 760.94 103.33 756.43 102.48C748.8 101.35 740.32 100.79 731 100.79C716.59 100.79 701.17 103.99 694.96 110.77C688.74 117.55 685.63 127.45 685.63 140.44V258.28C685.63 262.52 683.511 264.64 679.271 264.64" fill={color}/>
      <path d="M1130.33 270.27H1082.12C1077.66 270.27 1075.42 268.04 1075.42 263.57V53.7701C1075.42 49.3101 1077.65 47.0702 1082.12 47.0702H1117.83C1121.99 47.0702 1124.53 49.0101 1125.42 52.8701L1130.33 79.2101C1132.71 72.9601 1137.62 65.9702 1145.06 58.2302C1155.77 47.5202 1172.44 42.1602 1195.05 42.1602C1225.1 42.1602 1247.12 49.1601 1261.11 63.1401C1274.79 76.8301 1281.64 103.31 1281.64 142.6V263.57C1281.64 268.03 1279.41 270.27 1274.94 270.27H1226.73C1222.27 270.27 1220.04 268.04 1220.04 263.57V152.42C1220.04 128.31 1217.51 112.55 1212.45 105.1C1207.69 97.9602 1195.93 94.3901 1177.19 94.3901C1162.61 94.3901 1152.26 97.6701 1146.17 104.21C1140.07 110.76 1137.02 120.58 1137.02 133.67V263.56C1137.02 268.02 1134.79 270.26 1130.32 270.26" fill={color}/>
      <path d="M916.65 297.17C834.72 297.17 768.07 230.51 768.07 148.58C768.07 66.65 834.72 0 916.65 0C998.58 0 1065.23 66.65 1065.23 148.58C1065.23 230.51 998.57 297.17 916.65 297.17ZM916.65 12.93C841.85 12.93 780.99 73.79 780.99 148.59C780.99 223.39 841.85 284.25 916.65 284.25C991.45 284.25 1052.31 223.39 1052.31 148.59C1052.31 73.79 991.45 12.93 916.65 12.93Z" fill={color}/>
      <path d="M992.56 241.34C990.77 241.34 988.99 240.6 987.71 239.15C985.35 236.47 985.61 232.39 988.29 230.03C1011.69 209.43 1025.11 179.74 1025.11 148.59C1025.11 125.42 1017.91 103.33 1004.3 84.6799C1002.19 81.7999 1002.82 77.7599 1005.71 75.6499C1008.59 73.5499 1012.63 74.1699 1014.74 77.0599C1029.99 97.9299 1038.04 122.66 1038.04 148.59C1038.04 183.46 1023.02 216.67 996.83 239.73C995.6 240.81 994.08 241.34 992.56 241.34Z" fill={color}/>
      <path d="M822.97 221.63C820.95 221.63 818.96 220.69 817.7 218.92C803.02 198.3 795.26 173.98 795.26 148.59C795.26 114.4 809.79 81.62 835.14 58.64C837.79 56.24 841.871 56.44 844.271 59.09C846.671 61.73 846.47 65.82 843.82 68.22C821.17 88.75 808.19 118.05 808.19 148.6C808.19 171.29 815.12 193.02 828.23 211.43C830.3 214.34 829.62 218.37 826.71 220.44C825.57 221.25 824.27 221.64 822.97 221.64" fill={color}/>
      <path d="M839.18 200C836.95 200 834.79 198.85 833.59 196.79C825.12 182.21 820.64 165.55 820.64 148.6C820.64 137.96 822.37 127.49 825.79 117.51C826.95 114.13 830.62 112.34 833.99 113.49C837.37 114.65 839.17 118.32 838.01 121.7C835.06 130.34 833.561 139.39 833.561 148.61C833.561 163.28 837.43 177.7 844.76 190.31C846.55 193.39 845.51 197.35 842.42 199.14C841.4 199.73 840.28 200.02 839.18 200.02" fill={color}/>
      <path d="M997.25 194.12C996.3 194.12 995.34 193.91 994.43 193.47C991.22 191.91 989.881 188.04 991.441 184.83C996.951 173.49 999.741 161.3 999.741 148.59C999.741 133.04 995.42 117.89 987.25 104.76C985.36 101.73 986.291 97.7499 989.321 95.8599C992.351 93.9699 996.33 94.8999 998.22 97.9299C998.22 113.11 1012.66 130.63 1012.66 148.59C1012.66 163.27 1009.43 177.36 1003.06 190.48C1001.94 192.78 999.641 194.12 997.241 194.12" fill={color}/>
      <path d="M916.65 171.47C904.03 171.47 893.771 161.21 893.771 148.59C893.771 135.97 904.03 125.71 916.65 125.71C929.27 125.71 939.53 135.97 939.53 148.59C939.53 161.21 929.27 171.47 916.65 171.47ZM916.65 138.63C911.16 138.63 906.69 143.10 906.69 148.59C906.69 154.08 911.16 158.55 916.65 158.55C922.14 158.55 926.61 154.08 926.61 148.59C926.61 143.1 922.14 138.63 916.65 138.63Z" fill={color}/>
      <path d="M840.37 246.35C838.08 246.35 835.78 245.55 833.93 243.92L817.731 229.65C813.791 226.18 813.3 220.27 816.62 216.19L864.28 157.68C865.45 156.25 866.99 155.18 868.75 154.59L897.7 144.94L901.78 157.2L873.71 166.56L828.57 221.98L840.21 232.24L912.55 158.98L921.75 168.06L847.311 243.45C845.421 245.38 842.9 246.36 840.38 246.36" fill={color}/>
      <path d="M934.39 151.92L930.39 139.63L958.521 130.47L1004.04 75.37L992.47 65.03L919.63 137.79L910.5 128.65L985.46 53.77C989.09 53.77 994.98 49.94 998.84 53.39L1014.94 67.77C1018.86 71.27 1019.3 77.18 1015.96 81.23L967.9 139.41C966.72 140.83 965.17 141.89 963.41 142.46L934.39 151.91V151.92ZM994.61 62.89L994.59 62.91C994.59 62.91 994.6 62.90 994.61 62.89Z" fill={color}/>
      <path d="M834.99 103.09C834.99 98.82 838.41 95.45 842.63 95.45C846.85 95.45 850.271 98.87 850.271 103.09C850.271 107.31 846.85 110.73 842.63 110.73C838.41 110.73 834.99 107.31 834.99 103.09Z" fill={color}/>
      <path d="M975.771 202.81C975.771 198.59 979.19 195.17 983.41 195.17C987.63 195.17 991.05 198.59 991.05 202.81C991.05 207.03 987.63 210.45 983.41 210.45C979.19 210.45 975.771 207.03 975.771 202.81Z" fill={color}/>
    </svg>
  );

  const SampleLogo = ({ className = "w-12 h-12", color }: { className?: string, color?: string }) => {
    if (state.brandName === 'Soaro') return <SoaroLogo className={className} color={color} />;
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-45 opacity-20" />
        <div className="absolute inset-0 bg-black rounded-lg -rotate-12 opacity-10" />
        <div className="relative font-black text-2xl tracking-tighter italic" style={{ color }}>A</div>
      </div>
    );
  };

  const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <label className={`block text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider ${className || ''}`}>{children}</label>
  );

  const getImage = (val: string | undefined, placeholder: string) => {
    if (val && val.startsWith('data:')) return val;
    if (val && val.startsWith('http')) return val;
    return `https://images.unsplash.com/${placeholder}?auto=format&fit=crop&q=80&w=1200`;
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
      <div className="flex-none mb-3">
        {title && <h2 className="text-xl md:text-2xl font-bold tracking-tighter uppercase mb-0.5">{title}</h2>}
        {subtitle && <p className="text-slate-500 font-mono text-[8px] md:text-[10px] uppercase tracking-widest">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
        {children}
      </div>
      <div className="flex-none mt-3 pt-3 border-t border-slate-100 flex justify-between items-end">
        <div className="flex items-center gap-3">
          <SampleLogo className="h-6 w-auto flex-none" />
          <div>
            <p className="font-bold text-[9px] md:text-[10px] uppercase leading-tight">{state.brandName}</p>
            <p className="text-[8px] text-slate-400 uppercase tracking-tighter">Guidelines v{state.version} • {state.lastUpdated}</p>
          </div>
        </div>
        <p className="text-xl md:text-2xl font-black text-slate-100 leading-none">{String(index + 1).padStart(2, '0')}</p>
      </div>
    </motion.div>
  );

  switch (index) {
    case 0: // Title Page
      return (
        <PageWrapper>
          <div className="h-full flex flex-col justify-center items-center text-center py-4">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-slate-100 overflow-hidden">
               <SampleLogo className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              <EditableText value="Brand" path="brandName_prefix" className="inline" />
              <br />
              <EditableText value="Guidelines" path="brandName_suffix" className="inline" />
            </h1>
            <div className="w-16 h-1 bg-black my-6 md:my-8" />
            <div>
              <EditableText value={state.brandName} path="brandName" element="p" className="text-xl md:text-2xl font-medium text-slate-800" />
              <EditableText value={state.tagline} path="tagline" element="p" className="text-slate-500 uppercase tracking-widest text-xs md:text-sm mt-2" />
            </div>
          </div>
        </PageWrapper>
      );

    case 1: // Table of Contents
      return (
        <PageWrapper title="Table of Contents" subtitle="Navigation">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-2xl mt-4">
            {[
              "Title Page", "Table of Contents", "Brand Story", "Mission & Vision", 
              "Core Values", "Target Audience", "Personality & Tone", "Primary Logo", 
              "Secondary Logos", "Clear Space & Min Size", "Color Variations", "Improper Usage",
              "Primary Palette", "Secondary Palette", "Typography", "Hierarchy",
              "Photography Style", "Iconography", "Graphic Elements", "Archetype & Tone",
              "Pattern Gallery", "Stationary Mockups", "Social Media Presence", "Outdoor Branding",
              "Digital Product UI", "Conclusion & Contact"
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-baseline group cursor-pointer border-b border-slate-50 pb-1">
                <span className="text-slate-400 font-mono text-[10px] mr-2">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-medium text-xs md:text-sm group-hover:text-blue-600 transition-colors truncate">{item}</span>
                <div className="flex-1 border-b border-dotted border-slate-200 mx-2 mb-1" />
              </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 2: // Brand Introduction
      return (
        <PageWrapper title="Brand Story" subtitle="Introduction">
          <div className="max-w-3xl space-y-8 mt-12">
            <EditableText 
              value={state.introduction} 
              path="introduction" 
              element="p" 
              className="text-3xl font-medium leading-tight text-slate-900 italic" 
            />
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div>
                <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-slate-400">Founded</h4>
                <p className="font-mono">2024</p>
              </div>
              <div>
                <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-slate-400">Headquarters</h4>
                <p className="font-mono">Global / Digital</p>
              </div>
              <div>
                <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-slate-400">Industry</h4>
                <p className="font-mono">Creator Economy</p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 3: // Mission & Vision
      return (
        <PageWrapper title="Mission & Vision" subtitle="Aspiration">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 md:mt-8">
            <div className="space-y-4">
              <div className="inline-block p-1.5 bg-slate-900 text-white rounded">
                <Target size={20} />
              </div>
              <h3 className="text-2xl font-bold uppercase italic">The Mission</h3>
              <EditableText 
                value={state.mission} 
                path="mission" 
                element="p" 
                className="text-sm md:text-base text-slate-600 leading-relaxed" 
              />
            </div>
            <div className="space-y-4">
              <div className="inline-block p-1.5 bg-blue-600 text-white rounded">
                <Eye size={20} />
              </div>
              <h3 className="text-2xl font-bold uppercase italic">The Vision</h3>
              <EditableText 
                value={state.vision} 
                path="vision" 
                element="p" 
                className="text-sm md:text-base text-slate-600 leading-relaxed" 
              />
            </div>
          </div>
        </PageWrapper>
      );

    case 4: // Core Values
      return (
        <PageWrapper title="Core Values" subtitle="Principles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {state.coreValues.map((val, i) => (
              <div key={i} className="p-6 border-l border-slate-100 hover:border-black transition-colors bg-slate-50/50 rounded-r-lg">
                <span className="text-slate-200 font-mono text-3xl block mb-4">{String(i+1).padStart(2, '0')}</span>
                <EditableText 
                  value={val.title} 
                  path={`coreValues.${i}.title`} 
                  element="h4" 
                  className="text-lg font-bold uppercase mb-2" 
                />
                <EditableText 
                  value={val.description} 
                  path={`coreValues.${i}.description`} 
                  element="p" 
                  className="text-slate-500 text-xs leading-relaxed" 
                />
              </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 5: // Target Audience
      return (
        <PageWrapper title="Target Audience" subtitle="Who we serve">
          <div className="flex flex-col h-full justify-center py-2">
            <p className="text-2xl md:text-4xl font-black tracking-tight leading-tight max-w-4xl">
              Our audience is comprised of <span className="text-blue-600">{state.targetAudience}</span>.
            </p>
            <div className="mt-4 md:mt-8 flex flex-wrap gap-2 md:gap-3">
              {["Global", "Creative", "Tech-Forward", "Quality-Driven"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 border border-slate-200 rounded-full text-[8px] md:text-xs font-medium uppercase tracking-widest whitespace-nowrap bg-slate-50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </PageWrapper>
      );

    case 6: // Personality & Tone
      return (
        <PageWrapper title="Personality & Tone" subtitle="Character">
          <div className="grid grid-cols-2 gap-16 mt-8">
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-8 text-slate-400">Traits</h4>
              <div className="space-y-4">
                {state.personalityTraits.map((trait) => (
                  <div key={trait} className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-black" />
                    <span className="text-4xl font-bold uppercase">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-8 text-slate-400">Tone of Voice</h4>
              <p className="text-2xl leading-relaxed italic text-slate-700">
                {state.toneOfVoice}
              </p>
              <div className="mt-8 p-6 bg-slate-50 rounded-lg">
                <p className="text-sm font-mono uppercase text-slate-400 mb-2">Example</p>
                <p className="font-medium text-slate-900 border-l-4 border-blue-600 pl-4">
                  "We're here to help you build something that matters."
                </p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 7: // Primary Logo
      return (
        <PageWrapper title="Primary Logo" subtitle="Core Identifier">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="bg-slate-50 rounded-xl flex items-center justify-center min-h-[240px] border border-slate-100 shadow-inner">
               <SampleLogo className="w-48 h-auto max-w-[80%]" />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                This is the crown jewel of our visual identity. It consists of the wordmark and the symbol locked together in a specific ratio.
              </p>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-bold text-blue-900 uppercase text-[9px] tracking-widest mb-1">Usage Rule</p>
                <p className="text-blue-800 text-xs">Always prefer this version on light backgrounds for maximum impact and brand recognition.</p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 8: // Secondary Logos
      return (
        <PageWrapper title="Secondary Logos" subtitle="Alternate Versions">
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <div className="bg-slate-900 aspect-video rounded-xl flex items-center justify-center p-12">
                 <SoaroLogo className="w-48 h-auto" color="#FFFFFF" />
              </div>
              <p className="text-xs uppercase tracking-widest font-bold text-center">Reversed / Dark Background</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 aspect-video rounded-xl flex items-center justify-center p-12">
                 <SoaroLogo className="w-48 h-auto" color="#212A29" />
              </div>
              <p className="text-xs uppercase tracking-widest font-bold text-center">Positive / Light Background</p>
            </div>
          </div>
        </PageWrapper>
      );

    case 9: // Clear Space & Minimum Size
      return (
        <PageWrapper title="Clear Space & Size" subtitle="Technical Specs">
          <div className="grid grid-cols-2 gap-16 mt-12">
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-8 text-slate-400">Clear Space</h4>
              <div className="relative inline-block border border-blue-200 bg-blue-50/30 p-12 rounded-lg">
                 <div className="absolute top-0 left-0 p-2 text-[10px] font-mono text-blue-400">"X" Padding</div>
                 <div className="w-32 h-32 bg-slate-200 rounded animate-pulse" />
              </div>
              <p className="mt-8 text-sm text-slate-500">
                To maintain legibility, always leave a clear space equal to <span className="font-bold text-black">{state.logoClearSpace}</span> around the logo boundaries.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-8 text-slate-400">Minimum Size</h4>
              <div className="space-y-8">
                <div className="flex items-end gap-12">
                  <div>
                    <div className="w-8 h-8 bg-slate-200 rounded mb-2" />
                    <p className="font-mono text-xs">Print: {state.logoMinSize}</p>
                  </div>
                  <div>
                    <div className="w-4 h-4 bg-slate-200 rounded mb-2" />
                    <p className="font-mono text-xs">Digital: 24px</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Avoid scaling the logo below {state.logoMinSize} in height. If space is limited, use the icon-only brand mark.
                </p>
              </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 10: // Color Variations
      return (
        <PageWrapper title="Variations" subtitle="Flexibility">
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Full Color', bg: 'bg-white', text: 'text-black', filter: '' },
              { label: 'Grayscale', bg: 'bg-slate-100', text: 'text-slate-400', filter: 'grayscale brightness-150' },
              { label: 'High Contrast', bg: 'bg-black', text: 'text-white', filter: 'invert brightness-200' },
              { label: 'Brand Accent', bg: 'bg-blue-600', text: 'text-white', filter: 'brightness-0 invert' }
            ].map((v, i) => (
              <div key={i} className={`${v.bg} border border-slate-100 aspect-square rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden transition-transform hover:scale-105`}>
                  <div className={`w-16 h-16 flex items-center justify-center mb-4 ${v.filter}`}>
                      <SampleLogo className="w-12 h-12" color={v.label === 'High Contrast' ? '#FFFFFF' : (v.label === 'Brand Accent' ? '#FFFFFF' : undefined)} />
                  </div>
                 <span className={`text-[9px] uppercase font-bold tracking-widest ${v.text}`}>{v.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 text-[10px] text-slate-500 italic">
             <p>Use monochrome versions on backgrounds where brand colors lack sufficient contrast.</p>
             <p>Never tint the logo or change specific elements to non-brand colors.</p>
          </div>
        </PageWrapper>
      );

    case 11: // Improper Logo Usage
      return (
        <PageWrapper title="Do Not" subtitle="Logo Protection">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mt-1">
            {[
              { label: 'Do not stretch', p: 'scale-x-150' },
              { label: 'Do not recolor', p: 'sepia hue-rotate-180' },
              { label: 'Do not shadow', p: 'drop-shadow-xl' },
              { label: 'Do not rotate', p: 'rotate-12' },
              { label: 'Do not outline', p: 'ring-4 ring-black ring-offset-4 ring-offset-white' },
              { label: 'Do not busy bg', p: 'opacity-50 blur-[2px]' }
            ].map((v, i) => (
              <div key={i} className="space-y-1">
                <div className="bg-slate-50 aspect-video rounded-lg flex items-center justify-center p-2 relative overflow-hidden ring-1 ring-slate-100">
                  <div className={`w-12 md:w-16 h-12 md:h-16 flex items-center justify-center ${v.p}`}>
                      <SampleLogo className="w-8 h-8" />
                  </div>
                   <div className="absolute top-1 right-1">
                     <XCircle className="text-red-500" size={12} />
                   </div>
                </div>
                <p className="text-[8px] uppercase tracking-widest font-bold text-center text-red-600 truncate">{v.label}</p>
              </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 12: // Primary Color Palette
      return (
        <PageWrapper title="Primary Palette" subtitle="Digital & Print">
          <div className="grid grid-cols-2 gap-8 mt-12">
            {state.primaryColors.map((color, i) => (
              <div key={i} className="group">
                <div 
                  className="h-48 rounded-2xl mb-6 shadow-sm border border-slate-100 transition-all group-hover:shadow-xl" 
                  style={{ backgroundColor: color.hex }} 
                />
                <div className="flex justify-between items-start">
                   <div>
                     <p className="font-bold text-xl mb-1">{color.name}</p>
                     <p className="text-slate-400 font-mono text-sm uppercase">{color.hex}</p>
                   </div>
                   <div className="text-right font-mono text-[10px] space-y-1 text-slate-400">
                     <p>RGB: {Object.values(hexToRgb(color.hex)).join(', ')}</p>
                     <p>CMYK: {Object.values(hexToCmyk(color.hex)).join(', ')}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </PageWrapper>
      );

    case 13: // Secondary/Accent Color Palette
      return (
        <PageWrapper title="Support Palette" subtitle="Accents">
          <div className="grid grid-cols-2 gap-4 mt-8">
            {state.secondaryColors.map((color, i) => (
              <div key={i} className="p-6 border border-slate-100 rounded-xl flex items-center gap-6">
                <div className="w-20 h-20 rounded-lg shadow-inner" style={{ backgroundColor: color.hex }} />
                <div>
                   <p className="font-bold mb-1 uppercase tracking-tight">{color.name}</p>
                   <p className="font-mono text-xs opacity-50 uppercase">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-slate-50 rounded-2xl">
            <h4 className="font-black uppercase text-xs mb-4">Color Ratio</h4>
            <div className="flex h-4 w-full rounded-full overflow-hidden">
               <div className="w-[70%] bg-black" />
               <div className="w-[20%] bg-slate-200" />
               <div className="w-[10%] bg-blue-600" />
            </div>
            <p className="mt-4 text-xs text-slate-400 italic">Recommended usage: 70/20/10 rule applied across most layouts.</p>
          </div>
        </PageWrapper>
      );

    case 14: // Primary Typography
      return (
        <PageWrapper title="Typography" subtitle="Typefaces">
          <div className="space-y-8 md:space-y-12 mt-4 md:mt-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-slate-100 pb-8 md:pb-12">
               <div className="text-6xl md:text-8xl font-black text-slate-100 italic md:w-32 uppercase leading-none font-heading">Aa</div>
               <div className="flex-1">
                 <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 uppercase tracking-tighter font-heading">{state.typographySettings.headingFont}</h3>
                 <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-4 md:mb-6 font-body">Primary Heading Typeface</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                   <p className="text-slate-400 font-mono text-[10px] md:text-sm uppercase leading-loose break-all font-heading">
                     ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                     abcdefghijklmnopqrstuvwxyz<br />
                     1234567890!@#$%^&*()
                   </p>
                   <div className="space-y-2 md:space-y-4">
                     <p className="text-[10px] font-bold bg-slate-900 text-white inline-block px-2 py-0.5 uppercase font-body">Sample</p>
                     <p className="text-base md:text-xl leading-snug font-heading">The quick brown fox jumps over the lazy dog.</p>
                   </div>
                 </div>
               </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-slate-100 pb-8 md:pb-12">
               <div className="text-6xl md:text-8xl font-black text-slate-100 italic md:w-32 uppercase leading-none font-body">Aa</div>
               <div className="flex-1">
                 <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 uppercase tracking-tighter font-body">{state.typographySettings.bodyFont}</h3>
                 <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-4 md:mb-6 font-body">Secondary Body Typeface</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                   <p className="text-slate-400 font-mono text-[10px] md:text-sm uppercase leading-loose break-all font-body">
                     ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                     abcdefghijklmnopqrstuvwxyz<br />
                     1234567890!@#$%^&*()
                   </p>
                   <div className="space-y-2 md:space-y-4">
                     <p className="text-[10px] font-bold bg-slate-900 text-white inline-block px-2 py-0.5 uppercase font-body">Sample</p>
                     <p className="text-base md:text-xl leading-snug font-body">The quick brown fox jumps over the lazy dog.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 15: // Typographic Hierarchy
      return (
        <PageWrapper title="Hierarchy" subtitle="Scale System">
          <div className="space-y-12 mt-8">
             <div className="space-y-2 border-l-2 border-slate-200 pl-8">
                <p className="font-mono text-[10px] text-slate-400 uppercase">H1 / Heading Mega</p>
                <h1 className="text-6xl font-heading uppercase tracking-tighter">This is our main title</h1>
             </div>
             <div className="space-y-2 border-l-2 border-slate-200 pl-8 opacity-80">
                <p className="font-mono text-[10px] text-slate-400 uppercase">H2 / Section Title</p>
                <h2 className="text-3xl font-heading uppercase tracking-tight">Supportive section header text</h2>
             </div>
             <div className="space-y-2 border-l-2 border-slate-200 pl-8">
                <p className="font-mono text-[10px] text-slate-400 uppercase">Body / Standard</p>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-body">
                   This is how our body copy looks when displayed in large blocks. We prefer generous line spacing for maximum readability and a clean modern aesthetic.
                </p>
             </div>
             <div className="space-y-2 border-l-2 border-slate-200 pl-8 opacity-60">
                <p className="font-mono text-[10px] text-slate-400 uppercase">Caption / Small</p>
                <p className="text-xs uppercase tracking-widest font-bold font-body">Small details and supplementary labels</p>
             </div>
          </div>
        </PageWrapper>
      );

    case 16: // Photography Style Guidelines
      return (
        <PageWrapper title="Imagery" subtitle="Photography">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
             <div className="bg-slate-100 rounded-2xl aspect-video md:aspect-square flex items-center justify-center overflow-hidden border border-slate-100">
                <img 
                  src={getImage(state.photographyImage, 'photo-1497366216548-37526070297c')} 
                  className="w-full h-full object-cover" 
                  alt="Photography Style" 
                  referrerPolicy="no-referrer" 
                  crossOrigin="anonymous"
                />
             </div>
             <div className="space-y-6 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 aspect-video rounded-xl flex items-center justify-center p-3 border border-slate-100">
                    <CheckCircle2 className="text-green-500" size={20} />
                  </div>
                  <div className="bg-slate-50 aspect-video rounded-xl flex items-center justify-center p-3 border border-slate-100">
                    <XCircle className="text-red-500" size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <h4 className="font-black uppercase text-[9px] text-slate-400 mb-1">Subject</h4>
                     <p className="text-[10px] leading-tight">Human-centric, active, real-world.</p>
                   </div>
                   <div>
                     <h4 className="font-black uppercase text-[9px] text-slate-400 mb-1">Lighting</h4>
                     <p className="text-[10px] leading-tight">Natural sunlight, high key, soft shadows.</p>
                   </div>
                </div>
             </div>
          </div>
        </PageWrapper>
      );

    case 17: // Iconography System
      return (
        <PageWrapper title="Icons" subtitle="UI Elements">
          <div className="mt-8">
             <p className="text-xl max-w-2xl mb-12">
                Our iconography system is designed for clarity and speed. All icons must be <span className="font-bold underline decoration-blue-500">{state.iconographyStyle}</span>.
             </p>
             <div className="grid grid-cols-6 gap-8">
                {[Palette, Type, Layout, Eye, Target, Mail].map((Icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 bg-slate-50 p-6 rounded-2xl group transition-all hover:bg-black hover:text-white">
                    <Icon size={32} strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100">Icon-{i}</span>
                  </div>
                ))}
             </div>
          </div>
        </PageWrapper>
      );

    case 18: // Graphic Elements & Patterns
      return (
        <PageWrapper title="Graphics" subtitle="Patterns & Shapes">
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
             <div className="relative overflow-hidden bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100">
                <img 
                  src={getImage(state.patternImage, 'photo-1550684848-fac1c5b4e853')} 
                  className="w-full h-full object-cover opacity-80" 
                  alt="Brand Pattern" 
                  referrerPolicy="no-referrer" 
                  crossOrigin="anonymous"
                />
                {!state.patternImage && (
                   <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="bg-white/80 backdrop-blur-md p-6 shadow-2xl rounded-lg">
                        <p className="text-xs uppercase tracking-widest font-black mb-2 opacity-50 text-center">Pattern Applied</p>
                        <p className="italic text-sm text-center">"{state.patternStyle}"</p>
                    </div>
                  </div>
                )}
             </div>
             <div className="space-y-12">
                <p className="text-2xl leading-snug">Patterns help create a recognizable texture for our brand without needing a logo on every pixel.</p>
                <div className="p-8 border-2 border-black rounded-xl">
                   <h4 className="font-black uppercase text-xs mb-4">Application Rules</h4>
                   <ul className="space-y-3 text-sm list-disc pl-4">
                      <li>Use minimally on secondary surfaces.</li>
                      <li>Never allow patterns to compete with readability of primary text.</li>
                      <li>Patterns should always be monochromatic.</li>
                   </ul>
                </div>
             </div>
          </div>
        </PageWrapper>
      );

    case 19: // Brand Archetype & Tone
      return (
        <PageWrapper title="Archetype" subtitle="Voice & Personality">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">
            <div className="space-y-6">
              <div className="text-sm font-black uppercase text-blue-600 tracking-widest">Our Archetype</div>
              <h3 className="text-5xl font-black">{state.brandArchetype || "The Minimalist"}</h3>
              <div>
                <Label>Brand Promise</Label>
                <p className="text-lg text-slate-600 leading-relaxed max-w-md italic">"{state.brandPromise}"</p>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl space-y-8 border border-slate-100">
               <div>
                 <h4 className="font-bold uppercase text-xs text-slate-400 mb-4 tracking-widest">Tone of Voice</h4>
                 <p className="text-xl font-medium leading-relaxed italic">"{state.toneOfVoice}"</p>
               </div>
               <div className="flex flex-wrap gap-2">
                 {state.personalityTraits.map(t => (
                   <span key={t} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-wider">{t}</span>
                 ))}
               </div>
            </div>
          </div>
        </PageWrapper>
      );

    case 20: // Pattern Gallery (10 patterns)
      return (
        <PageWrapper title="Visual Texture" subtitle="Pattern Gallery">
          <div className="grid grid-cols-5 gap-3 mt-4">
             {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl overflow-hidden relative group shadow-sm transition-transform hover:scale-105">
                   {state.patternGallery && state.patternGallery[i] ? (
                     <img src={state.patternGallery[i]} className="w-full h-full object-cover" alt={`Pattern ${i+1}`} referrerPolicy="no-referrer" />
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-200">
                        <Palette size={24} className="mb-2 opacity-20" />
                        <span className="text-[8px] font-bold uppercase tracking-tighter">Variant {i+1}</span>
                     </div>
                   )}
                </div>
             ))}
          </div>
          <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
             <p className="text-xs italic opacity-80 max-w-md">These pattern iterations explore the "${state.patternStyle}" aesthetic, providing a coherent yet diverse visual toolkit for multi-surface application.</p>
             <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Total Variations</p>
                <p className="text-2xl font-black">{state.patternGallery.length} / 10</p>
             </div>
          </div>
        </PageWrapper>
      );

    case 21: // Stationary Mockups
      return (
        <PageWrapper title="Stationary" subtitle="Physical Assets">
          <div className="h-full flex flex-col gap-8 py-4">
             <div className="flex-1 bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 relative group">
                <img 
                  src={getImage(state.mockups?.stationary, 'photo-1586075010623-26cce0cda0a8')} 
                  className="w-full h-full object-cover" 
                  alt="Stationary" 
                  referrerPolicy="no-referrer" 
                  crossOrigin="anonymous"
                />
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-black uppercase text-[10px] mb-4 text-slate-400">Production Specifications</h4>
                <p className="text-sm leading-relaxed text-slate-700 italic">"{state.stationarySpecs}"</p>
             </div>
          </div>
        </PageWrapper>
      );

    case 22: // Social Media
      return (
        <PageWrapper title="Social Media" subtitle="Digital Presence">
           <div className="h-full flex flex-col gap-8 py-4">
             <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden relative">
                <img 
                  src={getImage(state.mockups?.social, 'photo-1611162617213-7d7a39e9b1d7')} 
                  className="w-full h-full object-cover" 
                  alt="Social Media" 
                  referrerPolicy="no-referrer" 
                  crossOrigin="anonymous"
                />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-2">
                   <h4 className="font-black uppercase text-[10px] text-slate-400">Engagement Strategy</h4>
                   <p className="text-sm text-slate-600 italic">"{state.socialStrategy}"</p>
                </div>
                <div className="flex justify-end gap-3">
                   <Instagram size={20} className="text-slate-300" />
                   <Linkedin size={20} className="text-slate-300" />
                   <Globe size={20} className="text-slate-300" />
                </div>
             </div>
          </div>
        </PageWrapper>
      );

    case 23: // Outdoor & Environmental
      return (
        <PageWrapper title="Outdoor" subtitle="Environmental Branding">
           <div className="h-full flex flex-col gap-8 py-4">
             <div className="flex-1 bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
                <img 
                  src={getImage(state.mockups?.outdoor, 'photo-1542744095-2ad4870f79fc')} 
                  className="w-full h-full object-cover" 
                  alt="Outdoor" 
                  referrerPolicy="no-referrer" 
                  crossOrigin="anonymous"
                />
             </div>
             <div className="p-8 border-2 border-slate-100 rounded-2xl flex items-center gap-8">
                <div className="text-sm font-bold uppercase tracking-widest bg-black text-white px-4 py-2">Signage Rules</div>
                <p className="text-sm text-slate-500 italic">Maintain 40% white space on all large scale environmental branding.</p>
             </div>
          </div>
        </PageWrapper>
      );

    case 24: // Digital Product
      return (
        <PageWrapper title="Digital Product" subtitle="Web & App Interface">
           <div className="h-full flex flex-col gap-8 py-4">
             <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src={getImage(state.mockups?.digital, 'photo-1460925895917-afdab827c52f')} 
                  className="w-full h-full object-cover" 
                  alt="Digital Product" 
                  referrerPolicy="no-referrer" 
                  crossOrigin="anonymous"
                />
             </div>
             <div className="grid grid-cols-2 gap-12">
                <div>
                   <h4 className="font-bold text-xs uppercase mb-2">Micro-Interactions</h4>
                   <p className="text-sm text-slate-500">Smooth 0.3s ease transitions between states. No jarring motion.</p>
                </div>
                <div>
                   <h4 className="font-bold text-xs uppercase mb-2">Mobile First</h4>
                   <p className="text-sm text-slate-500">All interfaces must be fully responsive, prioritizing thumb-friendly tap targets.</p>
                </div>
             </div>
          </div>
        </PageWrapper>
      );

    case 25: // Final Page & Contact
      return (
        <PageWrapper title="Conclusion" subtitle="Apply & Connect">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 h-full items-center">
             <div className="space-y-8">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                    <SampleLogo className="w-10 h-10" />
                </div>
                <h2 className="text-6xl font-black tracking-tighter leading-none italic uppercase">{state.brandName}</h2>
                <div className="space-y-4 pt-8 border-t border-slate-100">
                   {state.socialLinks.website && (
                     <div className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                        <Globe size={18} />
                        <span className="font-bold text-sm">{state.socialLinks.website}</span>
                     </div>
                   )}
                   {state.socialLinks.instagram && (
                     <div className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                        <Instagram size={18} />
                        <span className="font-bold text-sm">@{state.socialLinks.instagram}</span>
                     </div>
                   )}
                   {state.socialLinks.linkedin && (
                     <div className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                        <Linkedin size={18} />
                        <span className="font-bold text-sm">{state.socialLinks.linkedin}</span>
                     </div>
                   )}
                </div>
             </div>
             <div className="space-y-6">
                <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
                   <h4 className="font-bold uppercase text-[9px] tracking-widest mb-8 opacity-50">Direct Brand Inquiries</h4>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="p-2 bg-white/10 rounded-lg"><User size={20} className="text-blue-400" /></div>
                         <div>
                            <p className="text-[9px] uppercase tracking-widest opacity-50">Brand Manager</p>
                            <p className="text-xl font-bold">{state.brandManager}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="p-2 bg-white/10 rounded-lg"><Mail size={20} className="text-blue-400" /></div>
                         <div>
                            <p className="text-[9px] uppercase tracking-widest opacity-50">Inquiries</p>
                            <p className="text-xl font-bold">{state.contactEmail}</p>
                         </div>
                      </div>
                   </div>
                </div>
                <p className="text-[10px] text-slate-400 italic leading-relaxed px-4">
                   This document is a living asset. For permissions, high-res downloads, and design approvals, please contact the brand team. All rights reserved © {new Date().getFullYear()}.
                </p>
             </div>
          </div>
        </PageWrapper>
      );

    default:
      return <div>Slide {index + 1}</div>;
  }
};
