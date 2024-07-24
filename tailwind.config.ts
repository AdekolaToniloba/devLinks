import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#633CFF',
          hover: '#BEADFF',
          light: '#EFEBFF',
        },
        secondary: '#BEADFF',
        accent: '#FF3939',
        gray: {
          50: '#FAFAFA',
          100: '#D9D9D9',
          200: '#737373',
          300: '#333333',
        },
      },
      // backgroundImage: {
      //   'MobileMockup': "url('/mobile-preview.svg')"
      // },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-m': ['32px', { lineHeight: '150%' }],
        'heading-s': ['16px', { lineHeight: '150%' }],
        'body-m': ['16px', { lineHeight: '150%' }],
        'body-s': ['12px', { lineHeight: '150%' }],
      },
      borderRadius: {
        'btn': '8px',
      },
    },
  },
  plugins: [],
};
export default config;
