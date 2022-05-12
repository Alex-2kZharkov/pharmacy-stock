import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  buyMedicineButton: {
    color: theme.palette.warning.main,
  },
  disabledBuyMedicineButton: {
    color: theme.palette.primary.light,
  },
}));
