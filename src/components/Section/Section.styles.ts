import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8.5),
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 52,
    borderRadius: "100%",
  },
  avatar: {
    borderRadius: "100%",
    objectFit: "cover",
  },
}));
