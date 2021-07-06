import { DefaultTheme } from "@react-navigation/native";

const globalTheme = {
  ...DefaultTheme,
  colors: {
    veryDarkBlack: "#18191f",
    darkTurquoise: "#008575",
    darkGray: "#474a57",
    veryLightGray: "#d9d9da",
  },
  fontFamily: {
    Montserrat_400Regular: "Montserrat_400Regular",
    Montserrat_500Medium: "Montserrat_500Medium",
  },
  spacing: {
    screenPadding: "32px",
  },
};

export default globalTheme;
