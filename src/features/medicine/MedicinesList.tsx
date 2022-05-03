import { useEffect } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import {
  useLazyGetMedicinesQuery,
  useLazyUpdateOrderPointQuery,
} from "../../services/api/medicine.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MedicineDto } from "../../types/dto/Medicine.dto";

import { EditOrderPointDialog } from "./components/EditOrderPointDialog";
import { MEDICINE_TABLE_COLUMNS } from "./Medicines.constants";
import { useStyles } from "./Medicines.styles";
import {
  selectCurrentEditableMedicine,
  selectIsEditOrderPointDialogOpen,
  setCurrentEditableMedicine,
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
  const [updateOrderPoint, { isFetching: isUpdateExecuting }] =
    useLazyUpdateOrderPointQuery();

  const handleEditOrderPointDialogClose = () =>
    dispatch(setIsEditOrderPointDialogOpen(false));

  const handleEditOrderPointDialogConfirm = (payload: Partial<MedicineDto>) => {
    updateOrderPoint(payload);
    dispatch(setCurrentEditableMedicine(undefined));
    handleEditOrderPointDialogClose();
  };

  useEffect(() => {
    getMedicines();
  }, [getMedicines, isUpdateExecuting]);

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
        confirm={handleEditOrderPointDialogConfirm}
        medicine={currentEditableMedicine}
      />
    </>
  );
};
