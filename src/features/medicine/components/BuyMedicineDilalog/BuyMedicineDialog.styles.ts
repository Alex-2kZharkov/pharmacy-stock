import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dialogActions: {
    marginTop: theme.spacing(2),
  },
  datepicker: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    "& p": {
      marginLeft: 0,
    },
  },
}));
