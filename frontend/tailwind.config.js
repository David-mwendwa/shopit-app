/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#6C5CE7', // Modern indigo/purple for primary actions
          light: '#7F6BFF',
          dark: '#5D4BCC',
        },
        secondary: {
          DEFAULT: '#00CEC9', // Clean teal for accents
          light: '#00E5DF',
          dark: '#00A8A3',
        },
        // Background Colors
        background: {
          light: '#F9FAFB', // Soft white/gray for app background
          DEFAULT: '#FFFFFF', // Pure white for cards/containers
        },
        // Text Colors
        text: {
          primary: '#111827', // Deep gray for main text
          secondary: '#6B7280', // Medium gray for secondary text
          muted: '#9CA3AF', // Muted text for less important info
        },
        // UI Elements
        border: {
          DEFAULT: '#E5E7EB', // Light gray for borders/dividers
          hover: '#D1D5DB', // Slightly darker on hover
        },
        // Status Colors
        success: {
          DEFAULT: '#10B981', // Green for success states
          light: '#D1FAE5',
          dark: '#047857',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber for warnings
          light: '#FEF3C7',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444', // Red for errors
          light: '#FEE2E2',
          dark: '#DC2626',
        },
        // Utility Colors
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      // Extend other theme values if needed
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover':
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
