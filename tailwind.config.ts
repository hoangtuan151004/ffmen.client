/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/dist/js/**/*.js", // Dòng này để sử dụng tw-elements
  ],
  theme: {
    extend: {
      fontFamily: {
        clicker: ["Clicker Script", "cursive"], // thêm font vào theme
      },
    },
  },
  plugins: [],
};
