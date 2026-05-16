module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A855F7",
        secondary: "#7C3AED",
        accent: "#E9D5FF",
        danger: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          lighter: "rgba(255, 255, 255, 0.15)",
          dark: "rgba(0, 0, 0, 0.2)",
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      keyframes: {
        "glass-glow": {
          "0%, 100%": { "box-shadow": "0 0 20px rgba(168, 85, 247, 0.2)" },
          "50%": { "box-shadow": "0 0 40px rgba(168, 85, 247, 0.4)" },
        },
        "pulse-purple": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "glass-glow": "glass-glow 3s ease-in-out infinite",
        "pulse-purple": "pulse-purple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
