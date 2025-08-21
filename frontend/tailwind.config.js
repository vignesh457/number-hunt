/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        fontFamily: {
            Nunito: ["Nunito-Regular", "sans-serif"],
            NunitoLight: ["Nunito-Light", "sans-serif"],
            NunitoSemiBold: ["Nunito-SemiBold", "sans-serif"],
            NunitoBold: ["Nunito-Bold", "sans-serif"],
            NunitoLightest: ["Nunito-Lightest", "sans-serif"],
        },
        colors: {
            primary: {
                100: "#BBE1FA",
                200: "#3282B8",
                300: "#0F4C75",
                400: "#001428",
            },
            secondary: {
                100: "#FFCB61",
                200: "#FF894F",
            },
            success: {
                100: "#7EB489",
            },
            error: {
                100: "#DB7B7B",
            },
            warning: {
                100: "#F0C565",
            },
            general: {
                100: "#65C3EA",
            },
        },
    },
  },
  plugins: [],
}