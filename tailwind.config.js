import daisyui from 'daisyui';

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#f8e5ee",
        },
      }
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [daisyui],
}


// @theme {
//   --color-vino-muy-fuerte: oklch(19.65% 0.0376 62.88);
// }

// Vino muy fuerte: #211103
// Vino fuerte: #3d1308
// Vino moderado: #7b0d1e
// Vino ligero: #9f2042
// Vino muy ligero: #f8e5ee