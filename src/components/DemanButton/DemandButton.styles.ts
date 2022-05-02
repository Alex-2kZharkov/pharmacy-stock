import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  demandButton: {
    color: theme.palette.success.main,
  },
  disabledDemandButton: {
    color: theme.palette.primary.light,
  },
}));
