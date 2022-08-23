module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  purge: { 
    options: {
        safelist: [
            'hover:text-blue-500',
            'hover:text-green-500', 
            'hover:text-pink-500', 
        ], 
    },
},
  theme: {
    extend: {
      colors:{
        twitter:'#00ADED'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
