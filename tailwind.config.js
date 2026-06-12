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
				display: ['Space Grotesk', 'system-ui', 'sans-serif'],
				body: ['Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'hero': ['clamp(40px, 7vw, 88px)', { lineHeight: '1', fontWeight: '700' }],
				'section': ['clamp(30px, 4vw, 48px)', { lineHeight: '1.1', fontWeight: '600' }],
				'card': ['20px', { lineHeight: '1.3', fontWeight: '500' }],
			},
			colors: {
				green: {
					primary: '#0F5D36',
					secondary: '#2F7A57',
				},
				'accent-blue': '#D9ECF3',
				'bg-main': '#F7F7F4',
				'text-primary': '#1A1A1A',
				'text-muted': '#6B7280',
			},
			borderRadius: {
				'2xl': '1.25rem',
				'3xl': '1.5rem',
				'4xl': '1.75rem',
			},
		},
	},
	plugins: [],
}
