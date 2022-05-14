import { MouseEvent, useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { DATE_PERIODS } from "../../constants/filter.constants";
import {
  useLazyGetMedicineSalesDemandQuery,
  useLazyGetMedicineSalesQuery,
} from "../../services/api/medicineSale.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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

  const [getMedicineSales, { data: medicineSaleList }] =
    useLazyGetMedicineSalesQuery();
  const [getMedicineSalesDemand, { data: salesDemandList }] =
    useLazyGetMedicineSalesDemandQuery();

  const [periodName, setPeriodName] = useState("");

  useEffect(() => {
    getMedicineSales(DATE_PERIODS[periodName]?.toISOString());

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
