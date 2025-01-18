/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heroBg: "#fafafa",
        headingColor: "#383838",
        orangeHeading: "#F46322",
        toOrange: "#9F431A",
        blueHeading: "#008fbf",
        blueBtn: "#008FBF",
        activeBlueBtn: "#247793",
        contactBg: "#F2F2F2",
        contactBg2: "#E1E1E1",
        borderColor: "#38383856",
        blogBorder: "#ededed",
        footerBg: "#00295B",
        footerText: "#dadada",
        footerBorder: "#9B9B9B",
        startgrad: "#0AA9CD",
        endGrad: "#041741",
        faqBg: "#F8F8F8",
        faqIcon: "#E55D20",
        chooseBg: "#F2F3FC",
        chooseText: "#212529",
        subjectBtn: "#8B8B8B",
        blueArrows: "#309EC3",
        hamburgerColor: "#D9D9D9",
        tutorText: "#667085",
        flipBg: "#ffefe7",
        placeholderText: "#9ea3af",
        subHeroStart: "#31A3CA",
        subHeroEnd: "#216C86",
        subjectsBg: "#F7F7F7",
      },

      backgroundPosition: {
        movedown: "0px 360px",
        moveup: "0px 260px",
      },

      fontFamily: {
        MontserratBold: "Montserrat-bold",
      },
      dropShadow: {
        "3xl": "25px 25px 25px rgba(0, 0, 0, 0.15)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
