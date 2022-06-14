import { MouseEvent, useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  // CircularProgress,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { RecommendationModal } from "../../components/RecommendationModal";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { DEBOUNCE_TIME } from "../../constants/size.constants";
import { useGetCategoriesQuery } from "../../services/api/category.api";
import {
  useLazyBuyMedicineQuery,
  useLazyCalculatePrognosisQuery,
  useLazyCreateMedicineQuery,
  useLazyGetMedicinesQuery,
  useLazyUpdateMedicineQuery,
} from "../../services/api/medicine.api";
import { useGetBudgetQuery } from "../../services/api/overview.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { WHITE } from "../../theme/colors/colors.constants";
import { PagesTypes } from "../../types/common/pages.types";
import { CategoryDto } from "../../types/dto/Category.dto";
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
  const [calculatePrognosis, { data: prognosisData }] =
    useLazyCalculatePrognosisQuery();
  const [buyMedicine, { isFetching: isBuyingExecuting }] =
    useLazyBuyMedicineQuery();
  const { data: categoriesList } = useGetCategoriesQuery({
    dateFilter: "",
    name: "",
  });

  const [periodName, setPeriodName] = useState("");
  const [inputValue, setInputValue] = useState("");

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

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
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
    debouncedRequest({
      dateFilter: DATE_PERIODS[periodName]?.toISOString(),
      name: currentSearchValue,
      categoryFilter: inputValue,
    });
    refetch();
  }, [
    getMedicines,
    isUpdateExecuting,
    isCreationExecuting,
    isCalculatePrognosisDialogOpen,
    isBuyingExecuting,
    prognosisData?.description,
    currentSearchValue,
    refetch,
    periodName,
    inputValue,
  ]);

  return (
    <>
      <AdminPageWrapper sectionTitle="Справочник товаров">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.dateFilterContainer}
        >
          <DateFilter value={periodName} onChange={handleChange} />
          <Autocomplete
            disablePortal
            getOptionLabel={(option: CategoryDto) => option.name}
            id="combo-box-demo"
            options={categoriesList ?? []}
            sx={{
              width: 400,
              marginLeft: -5,
              backgroundColor: WHITE,
            }}
            renderInput={(params) => (
              <TextField {...params} label="Введите название категории" />
            )}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
          <Typography variant="h6">
            Всего записей: {medicineList?.length ?? 0}
          </Typography>
        </Stack>
        {/*{!medicineList ? (*/}
        {/*  <Stack*/}
        {/*    sx={{ marginTop: 2 }}*/}
        {/*    direction="row"*/}
        {/*    alignItems="center"*/}
        {/*    justifyContent="center"*/}
        {/*  >*/}
        {/*    <CircularProgress*/}
        {/*      style={{ marginTop: 150, color: ACCENT }}*/}
        {/*      size={150}*/}
        {/*    />*/}
        {/*  </Stack>*/}
        {/*) : (*/}
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
        {/*)}*/}
      </AdminPageWrapper>

      <RecommendationModal
        isOpen={isCalculatePrognosisDialogOpen}
        onClose={handleCalculatePrognosisDialogClose}
        message={prognosisData?.description}
      />
      <MedicineDialog
        isOpen={isCreateMedicineDialogOpen}
        onClose={handleCreateMedicineDialogClose}
        confirm={handleCreateMedicineDialogConfirm}
        categories={categoriesList}
      />
      <MedicineDialog
        isOpen={isEditOrderPointDialogOpened}
        onClose={handleEditMedicineDialogClose}
        confirm={handleEditMedicineDialogConfirm}
        medicine={currentEditableMedicine}
        categories={categoriesList}
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
