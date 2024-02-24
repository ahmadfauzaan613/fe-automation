module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      Quicksand: 'Quicksand',
      Roboto: 'Roboto',
    },
    extend: {
      screens: {
        phone: { min: '320px', max: '480px' },
        tablet: { min: '481px', max: '768px' },
        laptop: { min: '769px', max: '1024px' },
        desktop: { min: '1025px', max: '1200px' },
        desktop2: { min: '1201px', max: '1919px' },
        desktop3: { min: '1920px', max: '9999px' },
      },
    },
  },
  plugins: [],
}
