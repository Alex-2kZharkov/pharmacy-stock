import { TypographyOptions } from "@material-ui/core/styles/createTypography";

import { DEFAULT_FONT_FAMILY } from "../fonts";

export const getMuiTypography = (fontColour: string): TypographyOptions => ({
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: 14,
  h1: {
    fontSize: "1.5rem",
    lineHeight: 1.42,
    color: fontColour,
  },
  h2: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    lineHeight: 1.6,
    color: fontColour,
  },
  h3: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    lineHeight: 1.44,
    color: fontColour,
  },
  h4: {
    fontSize: 16,
    fontWeight: "bold",
  },
  h5: {
    fontSize: 14,
    lineHeight: 1.57,
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: "1rem",
    lineHeight: 1.5,
    color: fontColour,
  },
  subtitle2: {
    fontSize: "0.875rem",
    lineHeight: 1.57,
    color: fontColour,
  },
  body1: {
    fontSize: "0.875rem",
  },
});
