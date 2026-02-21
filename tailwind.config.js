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
        'bush-sand': '#F4F1DE',
        'deep-ocean': '#2E4057',
        'terra-cotta': '#E8A87C',
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
  			'sketch': '6px 6px 0px 0px rgba(46, 64, 87, 1)',
  			'sketch-sm': '4px 4px 0px 0px rgba(46, 64, 87, 1)',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")]
}