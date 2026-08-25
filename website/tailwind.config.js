/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme Colors driven by CSS variables
        lavender: {
          50: 'var(--color-lavender-50)',
          100: 'var(--color-lavender-100)',
          200: 'var(--color-lavender-200)',
          300: 'var(--color-lavender-300)',
          400: 'var(--color-lavender-400)',
          500: 'var(--color-primary-lavender)', // Primary Lavender
          600: 'var(--color-lavender-600)',
          700: 'var(--color-lavender-accent)',  // Deep Accent
          800: 'var(--color-lavender-deep)',
          900: 'var(--color-lavender-900)',
          soft: 'var(--color-soft-lavender)',
          primary: 'var(--color-primary-lavender)',
          deep: 'var(--color-lavender-deep)',
        },
        cream: {
          DEFAULT: 'var(--color-cream)',
          50: 'var(--color-cream-50)',
          100: 'var(--color-cream)',
          200: 'var(--color-cream-200)',
        },
        charcoal: {
          DEFAULT: 'var(--color-dark-charcoal)',
          dark: 'var(--color-dark-charcoal)',
          muted: 'var(--color-muted-gray)',
          light: 'var(--color-light-gray)',
        },
        offwhite: 'var(--color-off-white)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          muted: 'var(--color-surface-muted)',
          border: 'var(--color-border)',
        },
        status: {
          veg: 'var(--color-status-veg)',
          nonVeg: 'var(--color-status-nonveg)',
          vegan: 'var(--color-status-vegan)',
          eggless: 'var(--color-status-eggless)',
          glutenFree: 'var(--color-status-glutenfree)',
          inStock: 'var(--color-status-instock)',
          outOfStock: 'var(--color-status-outofstock)',
          limited: 'var(--color-status-limited)',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sourceSerif: ['"Source Serif 4"', '"Source Serif Pro"', 'Georgia', 'serif'],
        fanwood: ['"Fanwood Text"', 'Georgia', 'serif'],
        sans: [
          '"General Sans"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        snug: '-0.01em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px var(--shadow-color-sm)',
        'soft-md': '0 4px 16px -4px var(--shadow-color-md)',
        'soft-lg': '0 8px 24px -6px var(--shadow-color-lg)',
      },
      minHeight: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
      },
    },
  },
  plugins: [],
};
