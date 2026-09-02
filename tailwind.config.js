/** @type {import('tailwindcss').Config} */
const rgb = (v) => ({ opacityValue }) =>
  opacityValue === undefined ? `rgb(var(${v}))` : `rgb(var(${v}) / ${opacityValue})`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: '1.25rem' },
    extend: {
      colors: {
        bg: rgb('--c-bg'),
        surface: rgb('--c-surface'),
        'surface-2': rgb('--c-surface-2'),
        'surface-3': rgb('--c-surface-3'),
        line: rgb('--c-border'),
        'line-strong': rgb('--c-border-strong'),
        fg: rgb('--c-fg'),
        'fg-muted': rgb('--c-fg-muted'),
        'fg-subtle': rgb('--c-fg-subtle'),
        primary: {
          50: rgb('--c-primary-50'), 100: rgb('--c-primary-100'), 200: rgb('--c-primary-200'),
          300: rgb('--c-primary-300'), 400: rgb('--c-primary-400'), 500: rgb('--c-primary-500'),
          600: rgb('--c-primary-600'), 700: rgb('--c-primary-700'), 800: rgb('--c-primary-800'),
          900: rgb('--c-primary-900'), DEFAULT: rgb('--c-primary-500'),
        },
        accent: {
          400: rgb('--c-accent-400'), 500: rgb('--c-accent-500'), 600: rgb('--c-accent-600'),
          DEFAULT: rgb('--c-accent-500'),
        },
        cyan: { 400: rgb('--c-cyan-400'), 500: rgb('--c-cyan-500') },
        success: rgb('--c-success'),
        warning: rgb('--c-warning'),
        danger: rgb('--c-danger'),
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'display-sm': ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-xl': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      spacing: { 4.5: '1.125rem', 5.5: '1.375rem', 13: '3.25rem', 18: '4.5rem' },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(var(--c-shadow) / 0.06)',
        soft: '0 2px 8px -2px rgb(var(--c-shadow) / 0.08), 0 8px 24px -8px rgb(var(--c-shadow) / 0.10)',
        card: '0 1px 3px 0 rgb(var(--c-shadow) / 0.07), 0 12px 32px -12px rgb(var(--c-shadow) / 0.16)',
        lift: '0 8px 20px -6px rgb(var(--c-shadow) / 0.14), 0 24px 56px -20px rgb(var(--c-shadow) / 0.24)',
        glow: '0 0 0 1px rgb(var(--c-primary-500) / 0.25), 0 8px 32px -8px rgb(var(--c-primary-500) / 0.45)',
        'inner-line': 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, rgb(var(--c-primary-600)) 0%, rgb(var(--c-primary-500)) 45%, rgb(var(--c-accent-500)) 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgb(var(--c-primary-500) / 0.14) 0%, rgb(var(--c-accent-500) / 0.14) 100%)',
        'grid-pattern': 'linear-gradient(to right, rgb(var(--c-border) / 0.7) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-border) / 0.7) 1px, transparent 1px)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'pulse-dot': { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.45', transform: 'scale(.85)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-up': 'fade-up .5s cubic-bezier(.16,1,.3,1) both',
      },
      transitionTimingFunction: { spring: 'cubic-bezier(.16,1,.3,1)' },
    },
  },
  plugins: [],
};
