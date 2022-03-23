import { makeStyles } from "@material-ui/core";

import { BLACK, WHITE } from "../../../theme/colors/colors.constants";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "23%",
    padding: theme.spacing(3, 3.5),
    border: `solid 2px ${theme.palette.secondary.dark}`,
    borderRadius: theme.spacing(1),
    backgroundColor: WHITE,
    cursor: "pointer",

    "&:hover": {
      borderColor: theme.palette.primary.main,
      "& $title": {
        color: theme.palette.primary.main,
      },
      "& $digit": {
        color: theme.palette.primary.main,
      },
    },
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: 500,
    color: theme.palette.secondary.main,
  },
  digit: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: BLACK,
  },
}));
