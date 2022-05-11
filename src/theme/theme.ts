import { blue, green, grey, orange, red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

import {
  ACCENT,
  BACKGROUND,
  BACKGROUND_ACCENT,
  BLACK,
  BORDER_COLOUR,
  DEFAULT_GREY,
  ERROR,
  LIGHT_GREY,
  MAIN,
  SUCCESS,
  WARNING,
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
      dark: BORDER_COLOUR,
      contrastText: BLACK,
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
      main: ERROR,
      dark: red[900],
    },
    warning: {
      light: orange[50],
      main: WARNING,
      dark: orange[900],
    },
    success: {
      light: green[50],
      main: SUCCESS,
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
