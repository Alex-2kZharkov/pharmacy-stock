import { makeStyles } from "@material-ui/core";
import { alpha } from "@mui/material";

export const useStyles = makeStyles((theme) => ({
  button: {
    "&.Mui-selected, &.Mui-selected:hover": {
      color: `${theme.palette.primary.light} !important`,
      backgroundColor: `${theme.palette.background.paper} !important`,
    },

    backgroundColor: `${theme.palette.primary.contrastText} !important`,
    color: `${alpha(theme.palette.secondary.contrastText, 0.9)} !important`,
  },
}));
