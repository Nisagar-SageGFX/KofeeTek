/** @type {import('tailwindcss').Config} */

export default {

  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#4A2C1D',
          brownDark: '#2E1A10',
          brownLight: '#6B3F2A',
          gold: '#F5B800',
          goldLight: '#FFD54F',
          cream: '#FFF8F0',
          beige: '#F5EDE0',
          dark: '#1A0F08',
        }
      },

      fontFamily: {
        display: [
          '"Playfair Display"',
          'Georgia',
          'serif'         
        ],

        sans: [
          '"Inter"',
          'system-ui',
          'sans-serif'
        ],       
      },
      

      borderWidth: {
        3: '3px'
      },

      transitionDuration: {
        400: '400ms'
      },

      animation: {
        float: 'float 5s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        marquee2: 'marquee2 32s linear infinite',
        pulseRing: 'pulse-ring 2s ease-out infinite',
        fadeUp: 'fadeUp 0.65s ease-out both',
        spinSlow: 'spin 20s linear infinite',
      },

      keyframes: {
        float: {
          '0%,100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-14px)'
          },
        },

        marquee: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          },
        },

        marquee2: {
          '0%': {
            transform: 'translateX(-50%)'
          },
          '100%': {
            transform: 'translateX(0)'
          },
        },

        'pulse-ring': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(245,184,0,.45)'
          },
          '70%': {
            boxShadow: '0 0 0 14px rgba(245,184,0,0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(245,184,0,0)'
          },
        },

        fadeUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(28px)'
          },
         '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          },
        },
      },

      backgroundImage: {
        'gradient-radial':
        'radial-gradient(var(--tw-gradient-stops))',
      },
    }
},
  plugins: []

}