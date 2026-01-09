import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#03045e', // darkest
          800: '#262d79',
          700: '#475492',
          600: '#677bab',
          500: '#88a2c4', 
          400: '#a9c9dd',
          300: '#caf0f6', // lightest
        },
        background: {
          dark: '#03045e',
        },

        surface: {
          dark: '#262d79',
        },

        text: {
          dark: {
            primary: '#caf0f6',
            secondary: '#a9c9dd',
            muted: '#88a2c4',
          },
        },

        border: {
          dark: '#475492',
        },
        highlight: '#b6042a'

      },
    },
  },
  plugins: [],
}

export default config
