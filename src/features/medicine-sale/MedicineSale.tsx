import { MouseEvent, useEffect, useState } from "react";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { DEBOUNCE_TIME } from "../../constants/size.constants";
import {
  useLazyGetMedicineSalesDemandQuery,
  useLazyGetMedicineSalesQuery,
} from "../../services/api/medicineSale.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ACCENT } from "../../theme/colors/colors.constants";
import { PagesTypes } from "../../types/common/pages.types";
import { selectCurrentSearchValue, setCurrentPage } from "../app/appSlice";

import { MedicineDemandChart } from "./components/MedicineDemanChart";
import { MEDICINE_SALE_TABLE_COLUMNS } from "./MedicineSale.constants";
import { useStyles } from "./MedicineSale.styles";
import {
  selectCurrentMedicineSale,
  selectIsMedicineDemandChartModalOpen,
  setIsMedicineDemandChartModalOpen,
} from "./medicineSaleSlice";

export const MedicineSale = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isDemandChartOpen = useAppSelector(
    selectIsMedicineDemandChartModalOpen
  );
  const currentMedicineSale = useAppSelector(selectCurrentMedicineSale);
  const currentSearchValue = useAppSelector(selectCurrentSearchValue);

  const [getMedicineSales, { data: medicineSaleList }] =
    useLazyGetMedicineSalesQuery();
  const [getMedicineSalesDemand, { data: salesDemandList }] =
    useLazyGetMedicineSalesDemandQuery();

  const [periodName, setPeriodName] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.PURCHASES_PAGE));
  }, [dispatch]);

  useEffect(() => {
    const debouncedRequest = debounce(getMedicineSales, DEBOUNCE_TIME);

    debouncedRequest({
      dateFilter: DATE_PERIODS[periodName]?.toISOString(),
      name: currentSearchValue,
    });

    if (currentMedicineSale) {
      getMedicineSalesDemand({
        dateFrom: DATE_PERIODS[periodName]?.toISOString(),
        id: currentMedicineSale.medicine._id,
      });
    }
  }, [
    getMedicineSales,
    periodName,
    currentMedicineSale,
    getMedicineSalesDemand,
    currentSearchValue,
  ]);

  const handleDemandChartClose = () =>
    dispatch(setIsMedicineDemandChartModalOpen(false));

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };

  return (
    <>
      <AdminPageWrapper sectionTitle="Продажи">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.dateFilterContainer}
        >
          <DateFilter value={periodName} onChange={handleChange} />
          <Typography variant="h6">
            Всего записей: {medicineSaleList?.length ?? 0}
          </Typography>
        </Stack>
        {!medicineSaleList ? (
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
              columns={MEDICINE_SALE_TABLE_COLUMNS}
              disableSelectionOnClick
              rows={medicineSaleList ?? []}
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
      <MedicineDemandChart
        isOpen={isDemandChartOpen}
        onClose={handleDemandChartClose}
        medicineName={currentMedicineSale?.medicine?.name}
        items={salesDemandList}
      />
    </>
  );
};
