/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
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
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'rgba(255,255,255,0.08)',
				input: 'rgba(255,255,255,0.14)',
				ring: '#F97316',
				background: '#0f1117',
				foreground: '#f1f5ff',
				primary: {
					DEFAULT: '#0f1117',
					foreground: '#f1f5ff',
				},
				secondary: {
					DEFAULT: '#161b27',
					foreground: '#8b9ab5',
				},
				accent: {
					DEFAULT: '#F97316',
					foreground: '#ffffff',
				},
				slate: {
					950: '#0f1117',
					900: '#161b27',
					800: '#1e2535',
					700: '#4d5f7a',
					600: '#8b9ab5',
					500: '#8b9ab5',
					400: '#8b9ab5',
					300: '#f1f5ff',
					200: '#f1f5ff',
					100: '#f1f5ff',
					50: '#f1f5ff',
				},
				orange: {
					500: '#F97316',
					400: '#fb923c',
					600: '#ea580c',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
