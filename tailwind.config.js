/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        cinzel:  ['Inter', 'system-ui', 'sans-serif'],
        raleway: ['Inter', 'system-ui', 'sans-serif'],
        inter:   ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(42px, 8vw, 96px)', { lineHeight: '1', fontWeight: '700' }],
        'section': ['clamp(32px, 5vw, 56px)', { lineHeight: '1.1', fontWeight: '700' }],
        'card':    ['20px', { lineHeight: '1.3', fontWeight: '500' }],
      },
      colors: {
        void:    '#030a05',
        deep:    '#070f09',
        mid:     '#0a160c',
        elevated:'#0f1f12',
        green:   { DEFAULT: '#0F5D36', mid: '#16A34A', bright: '#22c55e', neon: '#4ADE80' },
        gold:    { DEFAULT: '#f59e0b', light: '#fcd34d' },
        teal:    { DEFAULT: '#0d9488' },
        cyan:    { DEFAULT: '#06b6d4' },
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'gold-shimmer': 'goldShimmer 3s linear infinite',
        'spin-slow':    'spin 30s linear infinite',
        'spin-reverse': 'spin 20s linear infinite reverse',
        'float':        'bokehFloat 20s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2s ease-in-out infinite',
        'scroll-bounce':'scrollBounce 2s ease-in-out infinite',
        'marquee':       'marquee 40s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':       { opacity: '1',   transform: 'scale(1.05)' },
        },
      },
      boxShadow: {
        'green': '0 0 30px rgba(22,163,74,0.4)',
        'gold':  '0 0 30px rgba(245,158,11,0.4)',
        'teal':  '0 0 30px rgba(13,148,136,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
