import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper/AdminPageWrapper";
import { ROWS_PER_PAGE } from "../../constants/pagination.constants";
import { MEDICINES_MOCK } from "../../mocks/medicines.mock";

import { MEDICINE_TABLE_COLUMNS } from "./Medicine.constants";
import { useStyles } from "./Medicine.styles";

export const Medicine = () => {
  const classes = useStyles();

  return (
    <AdminPageWrapper sectionTitle="Лекарства">
      <Box className={classes.dataGridContainer}>
        <DataGrid
          className={classes.dataGrid}
          rows={MEDICINES_MOCK}
          columns={MEDICINE_TABLE_COLUMNS}
          pageSize={5}
          rowsPerPageOptions={[ROWS_PER_PAGE]}
          disableSelectionOnClick
        />
      </Box>
    </AdminPageWrapper>
  );
};
