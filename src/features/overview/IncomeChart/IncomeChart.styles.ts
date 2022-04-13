import { makeStyles } from "@material-ui/core";

import { WHITE } from "../../../theme/colors/colors.constants";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    border: `solid 2px ${theme.palette.secondary.dark}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2, 0),
    backgroundColor: WHITE,
    cursor: "pointer",
  },
}));
