import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
  },
  disabledDeleteButton: {
    color: theme.palette.primary.light,
  },
}));
