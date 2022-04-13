import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    background: grey[100],
    height: "100%",
  },
}));
