import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'image1': "url('https://res.cloudinary.com/daxe20xia/image/upload/cld_1')",
        'image2': "url('https://res.cloudinary.com/daxe20xia/image/upload/cld_2')",
        'image3': "url('https://res.cloudinary.com/daxe20xia/image/upload/cld_3')",
        'image4': "url('https://res.cloudinary.com/daxe20xia/image/upload/cld_4')",
        'image5': "url('/bg-nat.svg')",
        'image6': "url('/bg-two.svg')"
      },
      fontFamily: {
        'dancing': 'Dancing Script, cursive',
        'vibes': 'Great Vibes, cursive',
        'moirai': 'Moirai One, cursive',
        'playball': 'Playball, cursive',
        'tangerine': 'Tangerine, cursive',
        'major-mono': 'Major Mono Display, monospace',
        'megrim': 'Megrim, cursive',
        'qwitcher': 'Qwitcher Grypen, cursive',
        'sansopen': 'Open Sans',
        'poppins': 'Poppins, sans-serif',
        'alice': 'Alice, serif',
        'sacramento': 'Sacramento, cursive'
      },
      borderRadius: {
        'blob': '30% 70% 73% 27% / 25% 33% 67% 75%'
      },

    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwind-clip-path')]
}
export default config
