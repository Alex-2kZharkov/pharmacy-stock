import { MouseEvent, useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { useLazyGetMedicineSalesQuery } from "../../services/api/medicineSale.api";

import { MEDICINE_SALE_TABLE_COLUMNS } from "./MedicineSale.constants";
import { useStyles } from "./MedicineSale.styles";

export const MedicineSale = () => {
  const classes = useStyles();
  const [periodName, setPeriodName] = useState("");
  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };

  const [getMedicineSales, { data: medicineSaleList }] =
    useLazyGetMedicineSalesQuery();

  useEffect(() => {
    const period = DATE_PERIODS[periodName];

    getMedicineSales(period?.toISOString());
  }, [getMedicineSales, periodName]);

  return (
    <AdminPageWrapper sectionTitle="Продажи">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
              <Stack height="100%" alignItems="center" justifyContent="center">
                Нет данных
              </Stack>
            ),
          }}
        />
      </Box>
    </AdminPageWrapper>
  );
};
