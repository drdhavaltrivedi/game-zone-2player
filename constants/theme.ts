// Design System - Theme Constants
export const COLORS = {
  // Primary colors
  primary: '#6C63FF',
  primaryDark: '#5850E6',
  primaryLight: '#8880FF',
  
  // Player colors
  player1: '#FF6B9D',
  player1Light: '#FFB6D2',
  player1Dark: '#E6568A',
  
  player2: '#4ECDC4',
  player2Light: '#8FDED9',
  player2Dark: '#3DB5AD',
  
  // Neutral colors
  background: '#0F0E17',
  backgroundLight: '#1C1B26',
  surface: '#232135',
  surfaceLight: '#2E2C3E',
  
  text: '#FFFFFE',
  textSecondary: '#A7A9BE',
  
  // Status colors
  success: '#67E480',
  warning: '#FFD23F',
  error: '#EF4565',
  
  // Gradients
  gradient1: ['#6C63FF', '#9D95FF'],
  gradient2: ['#FF6B9D', '#FFA8C5'],
  gradient3: ['#4ECDC4', '#7FE8E1'],
  backgroundGradient: ['#0F0E17', '#1C1B26'],
};

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 12,
  },
};

// Cell size will be calculated based on screen width
export const GAME = {
  cellGap: 12,
  boardPadding: 20,
  winLineWidth: 6,
};
