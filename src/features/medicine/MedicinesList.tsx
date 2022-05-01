import { useEffect } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { useLazyGetMedicinesQuery } from "../../services/api/medicine.api";

import { MEDICINE_TABLE_COLUMNS } from "./Medicines.constants";
import { useStyles } from "./Medicines.styles";

export const MedicinesList = () => {
  const classes = useStyles();
  const [getMedicines, { data: medicineList }] = useLazyGetMedicinesQuery();

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  return (
    <AdminPageWrapper sectionTitle="Товары">
      <Box className={classes.dataGridContainer}>
        <DataGrid
          className={classes.dataGrid}
          columns={MEDICINE_TABLE_COLUMNS}
          disableSelectionOnClick
          rows={medicineList ?? []}
          disableColumnMenu={true}
          getRowId={(row) => row._id}
        />
      </Box>
    </AdminPageWrapper>
  );
};
