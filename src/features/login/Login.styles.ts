import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(13.2, 0),
  },
  container: {
    padding: theme.spacing(5, 4),
    width: 380,
    height: 582,
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: 8,
  },
  panelIconContainer: {
    maxWidth: 40,
    maxHeight: 40,
    padding: theme.spacing(1, 0.8),
    borderRadius: 100,
    backgroundColor: theme.palette.primary.main,
  },
  panelIcon: {
    marginLeft: theme.spacing(0.4),
    color: theme.palette.primary.light,
  },
  panelTitle: {
    fontSize: "1.2rem",
    color: "#A4A6B3",
  },
  loginTitle: {
    textAlign: "center",
    color: "#252733",
  },
  loginSubTitle: {
    marginTop: `${theme.spacing(1)}px !important`,
    textAlign: "center",
    color: "#9FA2B4",
  },
  form: {
    marginTop: theme.spacing(5),
  },
  label: {
    marginTop: `${theme.spacing(1)}px !important`,
    fontSize: "0.75rem !important",
    color: "#9FA2B4",
  },

  filledInput: {
    color: "#4B506D !important",
    borderColor: "#F0F1F7 !important",
    backgroundColor: "#FCFDFE",
    "&:hover": { backgroundColor: `#FCFDFE !important` },
    "&:focus": { backgroundColor: `#FCFDFE !important` },
    "&:not(:focus)": { backgroundColor: `#FCFDFE !important` },

    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#F0F1F7",
      },
      "&:hover fieldset": {
        borderColor: "#F0F1F7",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  loginButton: {
    width: "100%",
    backgroundColor: `${theme.palette.primary.main} !important`,
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
    borderRadius: 8,
    marginTop: `${theme.spacing(2)}px !important`,
  },
}));
