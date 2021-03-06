import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  editButton: {
    color: theme.palette.primary.main,
  },
  disabledEditButton: {
    color: theme.palette.primary.light,
  },
}));
