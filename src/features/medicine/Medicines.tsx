import { useEffect } from "react";

import { Box, CircularProgress, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { RecommendationModal } from "../../components/RecommendationModal";
import { DEBOUNCE_TIME } from "../../constants/size.constants";
import {
  useLazyBuyMedicineQuery,
  useLazyCalculatePrognosisQuery,
  useLazyCreateMedicineQuery,
  useLazyGetMedicinesQuery,
  useLazyUpdateMedicineQuery,
} from "../../services/api/medicine.api";
import { useGetBudgetQuery } from "../../services/api/overview.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ACCENT } from "../../theme/colors/colors.constants";
import { PagesTypes } from "../../types/common/pages.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";
import { selectCurrentSearchValue, setCurrentPage } from "../app/appSlice";

import { BuyMedicineDialog } from "./components/BuyMedicineDilalog";
import { BuyMedicineDialogTypes } from "./components/BuyMedicineDilalog/BuyMedicineDialog.types";
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
  const currentSearchValue = useAppSelector(selectCurrentSearchValue);

  const { data: budget, refetch } = useGetBudgetQuery();
  const [getMedicines, { data: medicineList }] = useLazyGetMedicinesQuery();
  const [createMedicine, { isFetching: isCreationExecuting }] =
    useLazyCreateMedicineQuery();
  const [updateMedicine, { isFetching: isUpdateExecuting }] =
    useLazyUpdateMedicineQuery();
  const [calculatePrognosis, { data }] = useLazyCalculatePrognosisQuery();
  const [buyMedicine, { isFetching: isBuyingExecuting }] =
    useLazyBuyMedicineQuery();

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

  const handleBuyMedicineDialogConfirm = (payload: BuyMedicineDialogTypes) => {
    buyMedicine(payload);
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
    const debouncedRequest = debounce(getMedicines, DEBOUNCE_TIME);
    debouncedRequest(currentSearchValue);
    refetch();
  }, [
    getMedicines,
    isUpdateExecuting,
    isCreationExecuting,
    isCalculatePrognosisDialogOpen,
    isBuyingExecuting,
    data?.message,
    currentSearchValue,
    refetch,
  ]);

  return (
    <>
      <AdminPageWrapper sectionTitle="Справочник товаров">
        {!medicineList ? (
          <Stack
            sx={{ marginTop: 2 }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress
              style={{ marginTop: 150, color: ACCENT }}
              size={150}
            />
          </Stack>
        ) : (
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
        )}
      </AdminPageWrapper>

      <RecommendationModal
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
        budgetAmount={budget?.amount ?? 0}
      />
    </>
  );
};
