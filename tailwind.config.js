/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // hoặc 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        overlock: ["Overlock", "cursive"],
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "0%, 100%": { color: "#ef4444" }, // red-500
          "33%": { color: "#3b82f6" },     // blue-500
          "66%": { color: "#22c55e" },     // green-500
        },
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
