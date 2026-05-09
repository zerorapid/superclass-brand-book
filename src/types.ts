export interface BrandColor {
  hex: string;
  name: string;
}

export interface BrandFont {
  family: string;
  usage: 'heading' | 'body' | 'accent';
}

export interface BrandBookState {
  version: string;
  lastUpdated: string;
  
  // Strategy
  brandName: string;
  tagline: string;
  introduction: string;
  vision: string;
  coreValues: [string, string, string];
  toneOfVoice: string;
  
  // Strategy & Rules
  audience: string;
  positioning: string;
  dos: [string, string, string];
  donts: [string, string, string];

  // Marks & Assets
  primaryLogo: string;
  secondaryLogo: string;
  logomark: string;
  wordmark: string;
  logoMinSizeDigital: string;
  logoMinSizePrint: string;
  brandPattern: string;
  mockupStationery: string;
  mockupSocial: string;
  mockupMarketing: string;
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
  showGridOverlay?: boolean;
}

export const INITIAL_STATE: BrandBookState = {
  version: '1.0.0',
  lastUpdated: new Date().toLocaleDateString(),
  
  brandName: 'Nike',
  tagline: 'Just Do It.',
  introduction: 'Greatness is not reserved for the chosen few; it is something anyone can achieve through grit, determination, and action. We exist to empower individuals to push past their physical and mental limits to discover the athlete within.',
  vision: '"To bring inspiration and innovation to every athlete* in the world." (*If you have a body, you are an athlete.)',
  coreValues: ['Innovation', 'Inspiration', 'Empowerment'],
  toneOfVoice: 'Bold & Confident. Motivational & Inspiring. Urgent & Direct. Authentic.',
  
  audience: 'Active individuals, amateur and professional athletes, and fitness enthusiasts of all ages. Gen Z and Millennials who value self-expression, health, and social impact.',
  positioning: 'Nike is the world\'s leading athletic apparel and footwear brand, dedicated to equipping individuals with cutting-edge, performance-driven gear. Beyond just products, Nike is a global community that champions the relentless spirit of sports.',
  
  dos: ['Do focus on the emotional and physical journey of the athlete.', 'Do use bold, concise, and active language that inspires action.', 'Do highlight diversity, inclusion, and authentic stories.'],
  donts: ['Don\'t use passive, timid, or overly complex language.', 'Don\'t portray sports as exclusive only to elite professionals.', 'Don\'t focus entirely on technical specs without emotion.'],

  primaryLogo: 'data:image/svg+xml;utf8,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20viewBox%3D%220%200%20900.8%20420.7%22%3E%3Cpath%20d%3D%22M317.6%2C312.3c-22.3%2C8.4-43.8%2C15.7-66.7%2C18.9-16.3%2C2.4-31.8%2C2.6-47.5-1.2-30.1-7.5-50.3-33.6-49.2-64.7%2C2.1-59.6%2C50.5-113.5%2C89.7-156.1-8%2C15.8-15.4%2C30.7-19.4%2C47.7-2.6%2C11.4-3.8%2C22.5-2.2%2C34.1%2C3.6%2C25.3%2C23.1%2C43.9%2C48.6%2C46.7%2C18.9%2C2.7%2C37.4.1%2C56.4-4.1l467.9-123.1-477.6%2C201.9Z%22%2F%3E%3C%2Fsvg%3E', 
  secondaryLogo: 'data:image/svg+xml;utf8,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20viewBox%3D%220%200%20900.8%20420.7%22%3E%3Cpath%20d%3D%22M365%2C348.6c-19.5%2C8.4-37.3%2C15.7-56.9%2C21.7-35.6%2C11-72.4%2C10.3-100-16-46.6-44.5%2C25.9-142.4%2C60.7-182.6-4.9%2C12.4-9.3%2C23-12.3%2C35.1-2%2C10.6-3.1%2C20.9-1.3%2C31.6%2C6.4%2C39.8%2C49.5%2C53.6%2C85.1%2C44l205.8-55.7-52.9-.4-1.9-67-25.5%2C67.2-38.7-.3%2C60.6-163.1h39.1s-17.1%2C46.8-17.1%2C46.8l38.9-46.8h117.6s-10.3%2C27.4-10.3%2C27.4h-39.2c0%2C.1-12.5%2C34-12.5%2C34h37c0%2C0-11.4%2C30.7-11.4%2C30.7h-37.1s-14.5%2C39.2-14.5%2C39.2h44.7s-4.2%2C12.6-4.2%2C12.6l172.6-46.8%2C2.6.7c.5.1-.2%2C1.7-.8%2C2.6l-284.7%2C123.4-143.5%2C61.7ZM532.1%2C213.7l54.7-146.2-57.4%2C62.8%2C2.7%2C83.4Z%22%2F%3E%3Cpolygon%20points%3D%22377%20226.3%20335.3%20226.4%20339.2%20157.5%20313.1%20226.4%20274.5%20226.3%20335.6%2063.2%20376.8%2063%20372.5%20133.9%20399.5%2063%20438.1%2063.2%20377%20226.3%22%2F%3E%3Cpolygon%20points%3D%22420.5%20226.4%20381.7%20226.4%20442.9%2063.1%20481.7%2063.2%20420.5%20226.4%22%2F%3E%3C%2Fsvg%3E',
  logomark: 'data:image/svg+xml;utf8,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20viewBox%3D%220%200%20900.8%20420.7%22%3E%3Cpath%20d%3D%22M317.6%2C312.3c-22.3%2C8.4-43.8%2C15.7-66.7%2C18.9-16.3%2C2.4-31.8%2C2.6-47.5-1.2-30.1-7.5-50.3-33.6-49.2-64.7%2C2.1-59.6%2C50.5-113.5%2C89.7-156.1-8%2C15.8-15.4%2C30.7-19.4%2C47.7-2.6%2C11.4-3.8%2C22.5-2.2%2C34.1%2C3.6%2C25.3%2C23.1%2C43.9%2C48.6%2C46.7%2C18.9%2C2.7%2C37.4.1%2C56.4-4.1l467.9-123.1-477.6%2C201.9Z%22%2F%3E%3C%2Fsvg%3E',
  wordmark: '',
  logoMinSizeDigital: '32px',
  logoMinSizePrint: '15mm',
  brandPattern: 'data:image/svg+xml;utf8,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%2040V0h40%22%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%221%22%20opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E',
  mockupStationery: '',
  mockupSocial: '',
  mockupMarketing: '',
  photographyStyle: 'Dynamic, gritty, and raw. We embrace sweat, dirt, rain, and intense emotion. Use chiaroscuro lighting (high contrast, spotlights) and heroic, low angles.',
  
  primaryColors: [
    { hex: '#000000', name: 'Nike Black' },
    { hex: '#FFFFFF', name: 'Base White' },
    { hex: '#F5F5F5', name: 'Wolf Grey' }
  ],
  secondaryColors: [
    { hex: '#FF6600', name: 'Shoebox Orange' },
    { hex: '#CEFF00', name: 'Volt Green' }
  ],
  fonts: [
    { family: 'Oswald', usage: 'heading' },
    { family: 'Inter', usage: 'body' }
  ],
  typographySettings: {
    headingFont: 'Oswald',
    bodyFont: 'Inter'
  },
  
  currentSlide: 0
};
