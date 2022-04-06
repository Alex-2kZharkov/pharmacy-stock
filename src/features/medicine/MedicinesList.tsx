import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper/AdminPageWrapper";
import { ROWS_PER_PAGE } from "../../constants/pagination.constants";
import { MEDICINES_MOCK } from "../../mocks/medicines.mock";

import { MEDICINE_TABLE_COLUMNS } from "./Medicines.constants";
import { useStyles } from "./Medicines.styles";

export const MedicinesList = () => {
  const classes = useStyles();

  return (
    <AdminPageWrapper sectionTitle="Лекарства">
      <Box className={classes.dataGridContainer}>
        <DataGrid
          className={classes.dataGrid}
          rows={MEDICINES_MOCK}
          columns={MEDICINE_TABLE_COLUMNS}
          pageSize={ROWS_PER_PAGE}
          disableSelectionOnClick
        />
      </Box>
    </AdminPageWrapper>
  );
};
