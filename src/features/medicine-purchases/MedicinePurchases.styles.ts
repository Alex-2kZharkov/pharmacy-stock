import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dataGridContainer: {
    height: 580,
    width: "100%",
    backgroundColor: theme.palette.primary.contrastText,
  },
  dataGrid: {
    "& .MuiDataGrid-row:hover": {
      backgroundColor: `${theme.palette.background.default} !important`,
    },
  },
  dateFilterContainer: {
    marginBottom: theme.spacing(2),
  },
}));
