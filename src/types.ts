/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

export interface BrandValue {
  title: string;
  description: string;
}

export interface BrandBookState {
  // Metadata
  version: string;
  lastUpdated: string;
  
  // Part 1: Core
  brandName: string;
  tagline: string;
  introduction: string;
  mission: string;
  vision: string;
  coreValues: BrandValue[];
  targetAudience: string;
  personalityTraits: string[]; // e.g. ["Playful", "Authoritative"]
  toneOfVoice: string;
  brandArchetype: string;
  brandPromise: string;
  socialStrategy: string;
  stationarySpecs: string;
  
  // Part 2: Logos
  primaryLogo?: string; // Data URL or URL
  secondaryLogo?: string;
  logoBackgroundVariant: 'light' | 'dark' | 'color';
  logoMinSize: string;
  logoClearSpace: string;
  
  // Part 3: Visuals
  primaryColors: BrandColor[];
  secondaryColors: BrandColor[];
  fonts: BrandFont[];
  
  // Part 4: Graphics
  photographyStyle: string;
  photographyImage?: string; // AI generated or uploaded
  iconographyStyle: string;
  patternStyle: string;
  patternImage?: string;
  patternGallery: string[]; // Up to 10 patterns
  applicationImage?: string; // Mockup
  
  // Mockups
  mockups: {
    stationary?: string;
    social?: string;
    outdoor?: string;
    digital?: string;
  };

  // Part 5: Contact
  contactEmail: string;
  brandManager: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  
  // Typography Settings
  typographySettings: {
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;
    headingLetterSpacing: string;
    bodyLineHeight: string;
  };
  
  // UI State
  currentSlide: number;
  isPrinting?: boolean;
}

export const INITIAL_STATE: BrandBookState = {
  version: '1.0.0',
  lastUpdated: new Date().toLocaleDateString(),
  brandName: 'Superclass',
  tagline: 'Brand Identity Platform',
  introduction: 'Superclass is a definitive brand identity generator designed for modern agencies and digital creators. It provides a robust, scalable framework for visual consistency.',
  mission: 'To empower creators and agencies with automated, pixel-perfect brand documentation.',
  vision: 'To become the global standard for brand identity generation and distribution.',
  coreValues: [
    { title: 'Consistency', description: 'Unyielding adherence to brand rules and visual standards.' },
    { title: 'Precision', description: 'Pixel-perfect execution across all digital and print mediums.' },
    { title: 'Velocity', description: 'Rapid generation without compromising on agency-grade quality.' }
  ],
  targetAudience: 'Design agencies, solo founders, and digital product teams.',
  personalityTraits: ['Professional', 'Streamlined', 'Authoritative'],
  toneOfVoice: 'Authoritative, precise, and visionary. We speak with the confidence of superior engineering.',
  brandArchetype: 'The Explorer',
  brandPromise: 'Unerring performance in every flight.',
  socialStrategy: 'Showcasing real-world industrial deployments, telemetry visualizations, and engineering breakthroughs.',
  stationarySpecs: 'Carbon-fiber textured business cards, laser-etched metal invitations, matte black technical manuals.',
  primaryLogo: '', // Will use the vector SoaroLogo component
  secondaryLogo: '',
  logoBackgroundVariant: 'dark',
  logoMinSize: '40px',
  logoClearSpace: '24px',
  primaryColors: [
    { hex: '#212A29', name: 'Soaro Obsidian' },
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
    bodyFont: 'Inter',
    headingWeight: '800',
    bodyWeight: '400',
    headingLetterSpacing: '-0.04em',
    bodyLineHeight: '1.6'
  },
  photographyStyle: 'Aerial, high-tech, using cool blue tones and sharp industrial contrasts. Focus on precision engineering and vast horizons.',
  photographyImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
  iconographyStyle: 'Technical line art, 1.5px stroke, using neon cyan accents to denote interactivity and data points.',
  patternStyle: 'Generative topography lines layered with hexadecimal data stream overlays.',
  patternGallery: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400'
  ],
  mockups: {},
  contactEmail: 'operations@soaro.aero',
  brandManager: 'Marcus Vane',
  socialLinks: {
    website: 'https://soaro.aero',
    instagram: 'soaro_aerial',
    linkedin: 'company/soaro-intelligence'
  },
  currentSlide: 0,
  isPrinting: false
};
