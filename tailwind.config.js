/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
			display: ['Playfair Display', 'serif'],
			script: ['Great Vibes', 'cursive'],
  		},
  		colors: {
        'hope-cream': 'hsl(48 33% 97%)',
        'hope-blue': 'hsl(216 70% 20%)',
        'hope-gold': 'hsl(48 100% 55%)',
        'hope-gold-light': 'hsl(48 80% 70%)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  		},
  		boxShadow: {
  			'sketch': '6px 6px 0px 0px rgba(30, 58, 138, 1)',
  			'sketch-sm': '4px 4px 0px 0px rgba(30, 58, 138, 1)',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")]
}