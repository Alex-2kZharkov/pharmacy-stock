import { makeStyles } from "@material-ui/core";

import { WHITE } from "../../theme/colors/colors.constants";

export const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
  divider: {
    borderRightWidth: "2px !important",
    marginRight: `${theme.spacing(3)}px !important`,
  },
  formControl: { width: 400, marginRight: `${theme.spacing(1)}px !important` },
  button: {
    width: 40,
    "&:hover": {
      "& $icon": {
        color: theme.palette.primary.main,
      },
    },
  },
  filledInput: {
    backgroundColor: WHITE,
    "&:hover": { backgroundColor: `${WHITE} !important` },
    "&:focus": { backgroundColor: `${WHITE} !important` },
    "&:not(:focus)": { backgroundColor: `${WHITE} !important` },
  },
}));
