import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  editOrderPointButton: {
    color: theme.palette.primary.main,
  },
  disabledEditOrderPointButton: {
    color: theme.palette.primary.light,
  },
}));
