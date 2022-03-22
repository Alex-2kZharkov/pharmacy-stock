import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 52,
    border: `solid 2px ${theme.palette.primary.light}`,
    borderRadius: "100%",
  },
  avatar: {
    borderRadius: "100%",
  },
}));
