// Color palette constants
export const colors = {
  primary: '#499537',
  secondary: '#3D98D1', 
  tertiary: '#D4A27A',
  quaternary: '#C2B7DA',
  
  // Semantic colors
  error: '#CA545A',
  warning: '#C5953B', 
  success: '#677D00',
  info: '#627ACE',
  
  // Base colors
  white: '#ffffff',
  black: '#000000',
  
  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
} as const;

// Helper function to get CSS custom property
export const getCSSColor = (colorName: keyof typeof colors) => {
  if (colorName in colors) {
    return `var(--${colorName})`;
  }
  return colors[colorName];
};

export type ColorName = keyof typeof colors;