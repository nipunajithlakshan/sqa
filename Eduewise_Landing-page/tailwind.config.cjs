/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          Inter: ["Inter-Regular", "sans-serif"],
        },

        colors:{
          primary: "#844CCA",
        },
  
        
        textAlign: {
          center: "center",
          left: "left",
          right: "right",
        },
        
        screens: {
          xsm: "360px",
          xs: "540px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
          "3xl": "1680px",
          "4gs": "712px",
        },
        borderWidth: {
          DEFAULT: "0.75px",
          0: "0",
          2: "2px",
          3: "3px",
          4: "4px",
          6: "6px",
          8: "8px",
        },
        borderRadius: {
          none: "0",
          sm: "2px",
          DEFAULT: "4px",
          md: "6px",
          lg: "8px",
          full: "9999px",
          large: "12px",
        },
        fontSize: {
          xxxs: "0.5rem", //8px
          xxs: "0.625rem", //10px
          xs: "0.75rem", //12px
          sm: "0.875rem", //14px
          base: "1rem", //16px
          lg: "1.125rem", //18px
          xl: "1.25rem", //20px
          "1xl": "1.375rem", //22px
          "2xl": "1.5rem", //25px
          "3xl": "1.875rem", //30px
          "4xl": "2rem", //36px
        },
  
        boxShadow: {
          custom: "0 0 8px 0 #00000026",
        },
      },
    },
    plugins: [require("tailwind-scrollbar")],
  };
  