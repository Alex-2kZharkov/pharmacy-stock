import { useEffect } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import {
  useLazyCalculatePrognosisQuery,
  useLazyGetMedicinesQuery,
  useLazyUpdateMedicineQuery,
} from "../../services/api/medicine.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MedicineDto } from "../../types/dto/Medicine.dto";

import { CalculatePrognosisDialog } from "./components/CalculatePrognosisDialog";
import { EditMedicineDialog } from "./components/EditMedicineDialog";
import { MEDICINE_TABLE_COLUMNS } from "./Medicines.constants";
import { useStyles } from "./Medicines.styles";
import {
  selectCurrentEditableMedicine,
  selectIsCalculatePrognosisDialogOpen,
  selectIsEditOrderPointDialogOpen,
  setCurrentEditableMedicine,
  setIsCalculatePrognosisDialogOpen,
  setIsEditOrderPointDialogOpen,
} from "./medicineSlice";

export const MedicinesList = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const currentEditableMedicine = useAppSelector(selectCurrentEditableMedicine);
  const isEditOrderPointDialogOpened = useAppSelector(
    selectIsEditOrderPointDialogOpen
  );
  const isCalculatePrognosisDialogOpen = useAppSelector(
    selectIsCalculatePrognosisDialogOpen
  );

  const [getMedicines, { data: medicineList }] = useLazyGetMedicinesQuery();
  const [updateMedicine, { isFetching: isUpdateExecuting }] =
    useLazyUpdateMedicineQuery();
  const [calculatePrognosis, { data }] = useLazyCalculatePrognosisQuery();

  const handleEditOrderPointDialogClose = () =>
    dispatch(setIsEditOrderPointDialogOpen(false));

  const handleCalculatePrognosisDialogClose = () =>
    dispatch(setIsCalculatePrognosisDialogOpen(false));

  const handleEditOrderPointDialogConfirm = (payload: Partial<MedicineDto>) => {
    updateMedicine(payload);
    dispatch(setCurrentEditableMedicine(undefined));
    handleEditOrderPointDialogClose();
  };

  useEffect(() => {
    if (currentEditableMedicine?._id && isCalculatePrognosisDialogOpen) {
      calculatePrognosis(currentEditableMedicine?._id);
    }
  }, [
    calculatePrognosis,
    currentEditableMedicine?._id,
    isCalculatePrognosisDialogOpen,
  ]);

  useEffect(() => {
    getMedicines();
  }, [getMedicines, isUpdateExecuting, data?.message]);

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

      <CalculatePrognosisDialog
        isOpen={isCalculatePrognosisDialogOpen}
        onClose={handleCalculatePrognosisDialogClose}
        message={data?.message}
      />
      <EditMedicineDialog
        isOpen={isEditOrderPointDialogOpened}
        onClose={handleEditOrderPointDialogClose}
        confirm={handleEditOrderPointDialogConfirm}
        medicine={currentEditableMedicine}
      />
    </>
  );
};
