const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// 🎨 Soft Pastel Backgrounds
export const CATEGORY_COLORS = {
  grocery: '#F4FBF5',       // softer green
  restaurant: '#FFF6F0',    // softer orange
  stores: '#F5F8FF',        // softer blue
  pharmacy: '#FAF2FF',      // softer purple
  electronics: '#F3F8FD',   // softer sky blue
  fashion: '#FFF5F8',       // softer pink
};

// 🎯 Bold Active Tab Colors
export const CATEGORY_ACTIVE_COLORS = {
  grocery: '#2E7D32',       // green
  restaurant: '#E64A19',    // orange
  stores: '#1976D2',        // blue
  pharmacy: '#8E24AA',      // purple
  electronics: '#1565C0',   // darker blue
  fashion: '#D81B60',       // pink
};

// 🧭 Distance-based color helper
export const getDistanceColor = (distance: number): string => {
  if (distance < 5) return '#2E7D32';     // green
  if (distance <= 10) return '#F9A825';   // yellow
  return '#D32F2F';                       // red
};
