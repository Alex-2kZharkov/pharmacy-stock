import { useEffect } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { useLazyGetMedicinesQuery } from "../../services/api/medicine.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { EditOrderPointDialog } from "./components/EditOrderPointDialog";
import { MEDICINE_TABLE_COLUMNS } from "./Medicines.constants";
import { useStyles } from "./Medicines.styles";
import {
  selectCurrentEditableMedicine,
  selectIsEditOrderPointDialogOpen,
  setIsEditOrderPointDialogOpen,
} from "./medicineSlice";

export const MedicinesList = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const currentEditableMedicine = useAppSelector(selectCurrentEditableMedicine);
  const isEditOrderPointDialogOpened = useAppSelector(
    selectIsEditOrderPointDialogOpen
  );

  const [getMedicines, { data: medicineList }] = useLazyGetMedicinesQuery();

  const handleEditOrderPointDialogClose = () =>
    dispatch(setIsEditOrderPointDialogOpen(false));

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  return (
    <>
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

      <EditOrderPointDialog
        isOpen={isEditOrderPointDialogOpened}
        onClose={handleEditOrderPointDialogClose}
        confirm={handleEditOrderPointDialogClose}
        medicine={currentEditableMedicine}
      />
    </>
  );
};
