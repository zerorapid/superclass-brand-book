export interface BrandColor {
  hex: string;
  name: string;
  description?: string;
}

export interface BrandFont {
  family: string;
  usage: 'heading' | 'body' | 'accent';
  link?: string;
}

export interface BrandBookState {
  version: string;
  lastUpdated: string;
  
  // Identity
  brandName: string;
  tagline: string;
  introduction: string;
  vision: string;
  coreValues: [string, string, string];
  toneOfVoice: string;
  
  // Marks & Assets
  primaryLogo: string;
  secondaryLogo: string;
  mockupImage: string;
  photographyStyle: string;
  
  // Aesthetics
  primaryColors: BrandColor[];
  secondaryColors: BrandColor[];
  fonts: BrandFont[];
  typographySettings: {
    headingFont: string;
    bodyFont: string;
  };
  
  // UI State
  isExporting?: boolean;
  isPrinting?: boolean;
  currentSlide: number;
}

export const INITIAL_STATE: BrandBookState = {
  version: '1.0.0',
  lastUpdated: new Date().toLocaleDateString(),
  
  brandName: 'Superclass',
  tagline: 'Brand Identity Platform',
  introduction: 'Superclass is a definitive brand identity generator designed for modern agencies and digital creators. It provides a robust, scalable framework for visual consistency.',
  vision: 'To become the global standard for frictionless, high-fidelity brand distribution.',
  coreValues: ['Radical Simplicity', 'Unyielding Precision', 'Velocity'],
  toneOfVoice: 'Authoritative, precise, and understated. We speak with the quiet confidence of superior engineering.',
  
  primaryLogo: '', 
  secondaryLogo: '',
  mockupImage: '',
  photographyStyle: 'Clean, high-contrast structural compositions with an emphasis on geometric shadows and stark, minimalist environments.',
  
  primaryColors: [

    { hex: '#212A29', name: 'Obsidian' },
    { hex: '#00F5FF', name: 'Electric Cyan' }
  ],
  secondaryColors: [
    { hex: '#F1F5F9', name: 'Cloud White' },
    { hex: '#0F172A', name: 'Midnight Slate' }
  ],
  fonts: [
    { family: 'Space Grotesk', usage: 'heading' },
    { family: 'Inter', usage: 'body' }
  ],
  typographySettings: {
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter'
  },
  
  currentSlide: 0,
  isPrinting: false
};
