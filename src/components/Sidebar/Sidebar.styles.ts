import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: "100%",
    maxWidth: 255,
    minHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
  },

  panel: {
    padding: theme.spacing(3, 3, 0),
    cursor: "pointer",
  },
  panelIconContainer: {
    marginRight: theme.spacing(1.5),
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
    fontWeight: 500,
    color: theme.palette.secondary.light,
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },

  listItem: {
    "& .MuiTypography-root": {
      color: theme.palette.secondary.main,
    },
    "&": {
      "& .MuiTypography-root": {
        marginLeft: theme.spacing(-1.1),
      },
      "&:hover .MuiTypography-root": {
        color: theme.palette.primary.light,
      },
      "&:hover .MuiListItemIcon-root": {
        color: theme.palette.primary.light,
      },
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.secondary.light,
    },
  },
}));
