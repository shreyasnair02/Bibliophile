/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      martel: ["Martel", "serif"],
      audiowide: ["Audiowide", "cursive"],
      montserrat: ["Montserrat", "sans-serif"],
      outfit: ["Outfit", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9e72a3",

          secondary: "#5b3401",

          accent: "#e595c6",

          neutral: "#ffefdc",

          "base-100": "#fff6eb",

          info: "#8db9f7",

          success: "#1cca70",

          warning: "#c17915",

          error: "#f91519",
        },
      },
    ],
  },
};
