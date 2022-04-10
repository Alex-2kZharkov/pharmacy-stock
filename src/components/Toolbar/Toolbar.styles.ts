import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
  divider: {
    borderRightWidth: "2px !important",
    marginRight: `${theme.spacing(3)}px !important`,
  },
  button: {
    width: 52,
    "&:hover": {
      "& $icon": {
        color: theme.palette.primary.main,
      },
    },
  },
}));
