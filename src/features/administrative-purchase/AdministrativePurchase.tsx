import { MouseEvent, useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { DEBOUNCE_TIME } from "../../constants/size.constants";
import {
  useLazyCreateUserAdministrativePurchaseQuery,
  useLazyGetAdministrativePurchaseQuery,
  useLazyUpdateUserAdministrativePurchaseQuery,
} from "../../services/api/administrativePurchase.api";
import { useGetBudgetQuery } from "../../services/api/overview.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { ACCENT } from "../../theme/colors/colors.constants";
import { PagesTypes } from "../../types/common/pages.types";
import { selectCurrentSearchValue, setCurrentPage } from "../app/appSlice";

import { ADMINISTRATIVE_PURCHASE_TABLE_COLUMNS } from "./AdministrativePurchase.constants";
import { useStyles } from "./AdministrativePurchase.styles";
import { AdministrativePurchaseDialog } from "./AdministrativePurchaseDialog";
import {
  selectCurrentEditablePurchase,
  selectIsCreateDialogOpen,
  selectIsUpdateDialogOpen,
  setIsCreateDialogOpen,
  setIsUpdateDialogOpen,
} from "./administrativePurchaseSlice";

export const AdministrativePurchase = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isCreateDialogOpen = useAppSelector(selectIsCreateDialogOpen);
  const isUpdateDialogOpen = useAppSelector(selectIsUpdateDialogOpen);
  const currentEditablePurchase = useAppSelector(selectCurrentEditablePurchase);
  const currentSearchValue = useAppSelector(selectCurrentSearchValue);

  const { data: budget, refetch } = useGetBudgetQuery();
  const [getAdministrativePurchases, { data: administrativePurchaseList }] =
    useLazyGetAdministrativePurchaseQuery();
  const [createAdministrativePurchase, { isFetching: isCreationFetching }] =
    useLazyCreateUserAdministrativePurchaseQuery();
  const [updateAdministrativePurchase, { isFetching: isUpdateFetching }] =
    useLazyUpdateUserAdministrativePurchaseQuery();

  const [periodName, setPeriodName] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.ADMINISTRATIVE_PURCHASES));
  }, [dispatch]);

  useEffect(() => {
    const debouncedRequest = debounce(
      getAdministrativePurchases,
      DEBOUNCE_TIME
    );

    debouncedRequest({
      dateFilter: DATE_PERIODS[periodName]?.toISOString(),
      name: currentSearchValue,
    });
    refetch();
  }, [
    getAdministrativePurchases,
    periodName,
    currentSearchValue,
    isCreationFetching,
    isUpdateFetching,
    refetch,
  ]);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };

  const handleCreateDialogClosed = () => dispatch(setIsCreateDialogOpen(false));

  const handleUpdateDialogClosed = () => dispatch(setIsUpdateDialogOpen(false));

  return (
    <>
      <AdminPageWrapper sectionTitle="Административные расходы">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.dateFilterContainer}
        >
          <DateFilter value={periodName} onChange={handleChange} />
          <Typography variant="h6">
            Всего записей: {administrativePurchaseList?.length ?? 0}
          </Typography>
        </Stack>
        {/*{!administrativePurchaseList ? (*/}
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
        {/*) : */}
        <Box className={classes.dataGridContainer}>
          <DataGrid
            className={classes.dataGrid}
            rows={administrativePurchaseList ?? []}
            columns={ADMINISTRATIVE_PURCHASE_TABLE_COLUMNS}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            disableColumnMenu={true}
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

      <AdministrativePurchaseDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCreateDialogClosed}
        confirm={createAdministrativePurchase}
        budgetAmount={budget?.amount ?? 0}
      />
      <AdministrativePurchaseDialog
        isOpen={isUpdateDialogOpen}
        onClose={handleUpdateDialogClosed}
        confirm={updateAdministrativePurchase}
        administrativePurchase={currentEditablePurchase}
        budgetAmount={budget?.amount ?? 0}
      />
    </>
  );
};
