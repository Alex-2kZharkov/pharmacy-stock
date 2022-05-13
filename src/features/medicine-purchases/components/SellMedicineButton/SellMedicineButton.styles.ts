import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sellMedicineButton: {
    color: theme.palette.success.main,
  },
  disabledSellMedicineButton: {
    color: theme.palette.primary.light,
  },
  sellButtonContainer: {
    marginLeft: theme.spacing(2),
  },
}));
