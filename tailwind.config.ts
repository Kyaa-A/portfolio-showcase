import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      colors: {
        background: '#121212',
        foreground: '#EAEAEA',
        'foreground-secondary': '#A1A1A1',
        accent: '#D9D9D9',
      },
    },
  },
  plugins: [],
}

export default config
