import { blue, green, grey, orange, red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

import {
  ACCENT,
  BACKGROUND,
  BACKGROUND_ACCENT,
  DEFAULT_GREY,
  LIGHT_GREY,
  MAIN,
  WHITE,
} from "./colors/colors.constants";
import { getMuiTypography } from "./Typography";

export type ThemeColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral"
  | "alternative";

export type StatusColor = Exclude<ThemeColor, "primary" | "secondary">;

export const theme = createTheme({
  palette: {
    primary: {
      light: MAIN,
      main: ACCENT,
      contrastText: WHITE,
    },
    secondary: {
      light: LIGHT_GREY,
      main: DEFAULT_GREY,
    },
    background: {
      default: BACKGROUND,
      paper: BACKGROUND_ACCENT,
    },
    text: {
      primary: DEFAULT_GREY,
      secondary: grey[500],
      hint: grey[600],
    },
    error: {
      light: red[100],
      main: red[700],
      dark: red[900],
    },
    warning: {
      light: orange[50],
      main: orange[700],
      dark: orange[900],
    },
    success: {
      light: green[50],
      main: green[700],
      dark: green[900],
    },
    info: {
      light: blue[50],
      main: blue[300],
      dark: blue[700],
    },
  },
  typography: getMuiTypography(DEFAULT_GREY),
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiSelect: {
      variant: "outlined",
    },
    MuiInputLabel: {
      variant: "outlined",
    },
    MuiButton: {
      variant: "outlined",
    },
    MuiChip: {
      size: "small",
    },
  },
});
