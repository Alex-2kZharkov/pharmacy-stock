import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    color: `${theme.palette.primary.contrastText} !important`,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: "0.7rem !important",
    fontWeight: 500,
  },
  warn: {
    backgroundColor: `${theme.palette.warning.main} !important`,
  },
  error: {
    backgroundColor: `${theme.palette.error.main} !important`,
  },
  success: {
    backgroundColor: `${theme.palette.success.main} !important`,
  },
}));
