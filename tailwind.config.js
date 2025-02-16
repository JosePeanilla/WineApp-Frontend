import daisyui from 'daisyui';

export default {
  daisyui: {
    themes: [
      'light',
      {
      WineAppTheme: {
        'primary': '#3d1308', // Custom primary button color
        'secondary': '#7b0d1e',
        'primary-focus': '#9f2042', // Focus state color
        'primary-active': '#f8e5ee', // Active state color
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        wineapp: {
          muyfuerte: '#211103',
          fuerte: '#3d1308',
          moderado: '#7b0d1e',
          ligero: '#9f2042',
          muyligero: '#f8e5ee',
        },
},
  },
  },
darkMode: 'false',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [daisyui],
}

