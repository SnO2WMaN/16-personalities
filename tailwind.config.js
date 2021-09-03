/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  plugins: [],
  theme: {
    extend: {
      colors: {
        twitter: {
          1: '#1da1f2',
        },
      },
    },
    zIndex: {
      0: 0,
      1: 1,
      infinity: 2147483647,
    },
  },
};
