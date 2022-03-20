import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: "100%",
    maxWidth: 300,
    minHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    "& .MuiTypography-root": {
      color: theme.palette.secondary.main,
    },
    "& .MuiListItemButton-root": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    "&": {
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },

      "&:hover .MuiTypography-root": {
        color: theme.palette.primary.light,
      },
      "&:hover .MuiListItemIcon-root": {
        color: theme.palette.primary.light,
      },
    },

    "& .MuiListItemIcon-root": {
      color: theme.palette.secondary.main,
    },
  },
}));
