import { MouseEvent, useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { useLazyGetMedicinePurchasesQuery } from "../../services/api/medicinePurchases.api";
import { useAppDispatch } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";
import { setCurrentPage } from "../app/appSlice";

import { MEDICINE_PURCHASES_TABLE_COLUMNS } from "./MedicinePurchases.constants";
import { useStyles } from "./MedicinePurchases.styles";

export const MedicinePurchases = () => {
  const classes = useStyles();
  const [periodName, setPeriodName] = useState("");
  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };
  const dispatch = useAppDispatch();

  const [getMedicinePurchases, { data: medicinePurchases }] =
    useLazyGetMedicinePurchasesQuery();

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.PURCHASES_PAGE));
  }, [dispatch]);

  useEffect(() => {
    const period = DATE_PERIODS[periodName];

    getMedicinePurchases(period?.toISOString());
  }, [getMedicinePurchases, periodName]);

  // eslint-disable-next-line no-console
  console.log(medicinePurchases);

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
      </AdminPageWrapper>
    </>
  );
};
