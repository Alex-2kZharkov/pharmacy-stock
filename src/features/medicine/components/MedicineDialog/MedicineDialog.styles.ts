import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dialogActions: {
    marginTop: theme.spacing(2),
  },
  autocomplete: {
    "& p": {
      marginLeft: 0,
    },
  },
}));
