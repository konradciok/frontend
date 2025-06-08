import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}', './app/**/*.{ts,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        background: 'white',
        foreground: '#0f172a',
        primary: {
          DEFAULT: '#3b82f6',
          foreground: 'white',
        },
        border: '#e2e8f0',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config