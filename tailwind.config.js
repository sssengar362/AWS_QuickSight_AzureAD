module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all your components
    ],
    theme: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  };
  