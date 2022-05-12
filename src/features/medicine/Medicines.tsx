import { useEffect } from "react";

import { Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import {
  useLazyCalculatePrognosisQuery,
  useLazyCreateMedicineQuery,
  useLazyGetMedicinesQuery,
  useLazyUpdateMedicineQuery,
} from "../../services/api/medicine.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";
import { setCurrentPage } from "../app/appSlice";

import { BuyMedicineDialog } from "./components/BuyMedicineDilalog";
import { CalculatePrognosisDialog } from "./components/CalculatePrognosisDialog";
import { MedicineDialog } from "./components/MedicineDialog";
import { MEDICINE_TABLE_COLUMNS } from "./Medicines.constants";
import { useStyles } from "./Medicines.styles";
import {
  selectCurrentEditableMedicine,
  selectIsBuyMedicineDialogOpen,
  selectIsCalculatePrognosisDialogOpen,
  selectIsCreateMedicineDialogOpen,
  selectIsEditMedicineDialogOpen,
  setCurrentEditableMedicine,
  setIsBuyMedicineDialogOpen,
  setIsCalculatePrognosisDialogOpen,
  setIsCreateMedicineDialogOpen,
  setIsEditMedicineDialogOpen,
} from "./medicineSlice";

export const Medicines = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const currentEditableMedicine = useAppSelector(selectCurrentEditableMedicine);
  const isCreateMedicineDialogOpen = useAppSelector(
    selectIsCreateMedicineDialogOpen
  );
  const isEditOrderPointDialogOpened = useAppSelector(
    selectIsEditMedicineDialogOpen
  );
  const isCalculatePrognosisDialogOpen = useAppSelector(
    selectIsCalculatePrognosisDialogOpen
  );
  const isBuyMedicineDialogOpen = useAppSelector(selectIsBuyMedicineDialogOpen);

  const [getMedicines, { data: medicineList }] = useLazyGetMedicinesQuery();
  const [createMedicine, { isFetching: isCreationExecuting }] =
    useLazyCreateMedicineQuery();
  const [updateMedicine, { isFetching: isUpdateExecuting }] =
    useLazyUpdateMedicineQuery();
  const [calculatePrognosis, { data }] = useLazyCalculatePrognosisQuery();

  const handleCalculatePrognosisDialogClose = () =>
    dispatch(setIsCalculatePrognosisDialogOpen(false));

  const handleCreateMedicineDialogClose = () =>
    dispatch(setIsCreateMedicineDialogOpen(false));

  const handleCreateMedicineDialogConfirm = (payload: Partial<MedicineDto>) => {
    createMedicine(payload);
    handleCreateMedicineDialogClose();
  };

  const handleEditMedicineDialogClose = () =>
    dispatch(setIsEditMedicineDialogOpen(false));

  const handleEditMedicineDialogConfirm = (payload: Partial<MedicineDto>) => {
    updateMedicine(payload);
    dispatch(setCurrentEditableMedicine(undefined));
    handleEditMedicineDialogClose();
  };

  const handleBuyMedicineDialogClose = () =>
    dispatch(setIsBuyMedicineDialogOpen(false));

  const handleBuyMedicineDialogConfirm = (payload: Partial<MedicineDto>) => {
    // updateMedicine(payload);
    dispatch(setCurrentEditableMedicine(undefined));
    handleBuyMedicineDialogClose();
  };

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.ITEMS_PAGE));
  }, [dispatch]);

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
  }, [
    getMedicines,
    isUpdateExecuting,
    isCreationExecuting,
    isCalculatePrognosisDialogOpen,
    data?.message,
  ]);

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
            components={{
              // eslint-disable-next-line react/no-multi-comp
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Нет данных
                </Stack>
              ),
            }}
          />
        </Box>
      </AdminPageWrapper>

      <CalculatePrognosisDialog
        isOpen={isCalculatePrognosisDialogOpen}
        onClose={handleCalculatePrognosisDialogClose}
        message={data?.message}
      />
      <MedicineDialog
        isOpen={isCreateMedicineDialogOpen}
        onClose={handleCreateMedicineDialogClose}
        confirm={handleCreateMedicineDialogConfirm}
      />
      <MedicineDialog
        isOpen={isEditOrderPointDialogOpened}
        onClose={handleEditMedicineDialogClose}
        confirm={handleEditMedicineDialogConfirm}
        medicine={currentEditableMedicine}
      />
      <BuyMedicineDialog
        isOpen={isBuyMedicineDialogOpen}
        onClose={handleBuyMedicineDialogClose}
        confirm={handleBuyMedicineDialogConfirm}
        medicine={currentEditableMedicine}
        budgetAmount={100000}
      />
    </>
  );
};
