import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        dark : '#020817',
        primary: '#0470db',
      },
      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          }
        }
      },
      animation: {
        appear: "appear 0.75s ease-in-out"
      }
    },
  },
  plugins: [
    daisyui
  ],
}

