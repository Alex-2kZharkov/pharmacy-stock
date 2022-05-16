import { MouseEvent, useEffect, useState } from "react";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { DEBOUNCE_TIME } from "../../constants/size.constants";
import {
  useLazyCreateMedicineSaleQuery,
  useLazyGetMedicinePurchasesQuery,
} from "../../services/api/medicinePurchases.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ACCENT } from "../../theme/colors/colors.constants";
import { PagesTypes } from "../../types/common/pages.types";
import { selectCurrentSearchValue, setCurrentPage } from "../app/appSlice";

import { SellMedicineDialog } from "./components/SellMedicineDilalog";
import { SellMedicineDialogTypes } from "./components/SellMedicineDilalog/SellMedicineDialog.types";
import { MEDICINE_PURCHASES_TABLE_COLUMNS } from "./MedicinePurchases.constants";
import { useStyles } from "./MedicinePurchases.styles";
import {
  selectCurrentEditableMedicinePurchase,
  selectIsSellMedicineDialogOpen,
  setCurrentEditableMedicinePurchase,
  setIsSellMedicineDialogOpen,
} from "./medicinePurchaseSlice";

export const MedicinePurchases = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isSellMedicineDialogOpen = useAppSelector(
    selectIsSellMedicineDialogOpen
  );
  const currentSearchValue = useAppSelector(selectCurrentSearchValue);
  const currentEditableMedicinePurchase = useAppSelector(
    selectCurrentEditableMedicinePurchase
  );

  const [getMedicinePurchases, { data: medicinePurchases }] =
    useLazyGetMedicinePurchasesQuery();
  const [createMedicineSale, { isFetching: isCreatingSaleExecuting }] =
    useLazyCreateMedicineSaleQuery();

  const [periodName, setPeriodName] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.PURCHASES_PAGE));
  }, [dispatch]);

  useEffect(() => {
    const debouncedRequest = debounce(getMedicinePurchases, DEBOUNCE_TIME);

    debouncedRequest({
      dateFilter: DATE_PERIODS[periodName]?.toISOString(),
      name: currentSearchValue,
    });
  }, [
    getMedicinePurchases,
    periodName,
    isCreatingSaleExecuting,
    currentSearchValue,
  ]);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => setPeriodName(newPeriodName);

  const handleSellMedicineDialogClose = () =>
    dispatch(setIsSellMedicineDialogOpen(false));

  const handleSellMedicineDialogConfirm = (
    payload: SellMedicineDialogTypes
  ) => {
    createMedicineSale(payload);
    dispatch(setCurrentEditableMedicinePurchase(undefined));
    handleSellMedicineDialogClose();
  };

  return (
    <>
      <AdminPageWrapper sectionTitle="Товары на складе">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.dateFilterContainer}
        >
          <DateFilter value={periodName} onChange={handleChange} />
          <Typography variant="h6">
            Всего записей: {medicinePurchases?.length ?? 0}
          </Typography>
        </Stack>
        {!medicinePurchases ? (
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
              columns={MEDICINE_PURCHASES_TABLE_COLUMNS}
              disableSelectionOnClick
              rows={medicinePurchases ?? []}
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

      <SellMedicineDialog
        isOpen={isSellMedicineDialogOpen}
        onClose={handleSellMedicineDialogClose}
        confirm={handleSellMedicineDialogConfirm}
        medicinePurchase={currentEditableMedicinePurchase}
      />
    </>
  );
};
