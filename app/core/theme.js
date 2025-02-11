import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#2F2F2F",
    primary: "#4399E6", // Update the primary color from the source code "#E9446A" to "#4399E6"
    secondary: "#1F2732",
    error: "#ED1C24",
  },
};
