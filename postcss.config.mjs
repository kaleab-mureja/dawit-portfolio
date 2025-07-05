// postcss.config.mjs
const config = {
  plugins: [
    [
      "@tailwindcss/postcss",
      {
        theme: {
          screens: {
            'xs': '400px',
            'sm': '500px',
            'md': '700px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
          },
        },
      },
    ],
  ],
};

export default config;