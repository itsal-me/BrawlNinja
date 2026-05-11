/**
 * Design Tokens - Modern Minimal SaaS Theme
 * 60-30-10 Color Rule, White BG, Yellow Accent
 */

export const colors = {
  // Primary (60%)
  primary: '#ffffff',
  primaryDark: '#f8fafc',
  
  // Secondary (30%)
  secondary: '#f1f5f9',
  secondaryLight: '#e2e8f0',
  
  // Accent (10%)
  accent: '#eab308', // Modern Yellow
  accentSoft: '#fef3c7',
  accentRed: '#ef4444', 
  accentBlue: '#3b82f6',
  
  // Neutral
  text: '#0f172a',
  textMuted: '#667085',
  textInverted: '#ffffff',
  
  // Backgrounds
  bg: '#ffffff',
  bgAlt: '#f8fafc',
  bgCard: '#ffffff',
  bgHover: '#f1f5f9',
  
  // Borders
  border: '#e2e8f0',
  borderLight: '#edf2f7',
  borderStrong: '#cbd5e1',
  
  // States
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Shadows (Removed per request)
  shadowMd: 'none',
  shadowLg: 'none',
};

export const typography = {
  // Font families
  sansSerif: "'Manrope', 'Segoe UI', Arial, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  
  // Font sizes
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  
  // Font weights
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  
  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
};

export const breakpoints = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1280px',
};

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px', // Subtle
  lg: '12px',
  xl: '16px',
  full: '20px',
};

export const shadows = {
  none: 'none',
  subtle: '0 6px 16px rgba(15, 23, 42, 0.08)',
  card: '0 8px 20px rgba(15, 23, 42, 0.08)',
  input: 'none',
};

// Responsive utilities
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: calc(${breakpoints.tablet} + 1px))`,
};
