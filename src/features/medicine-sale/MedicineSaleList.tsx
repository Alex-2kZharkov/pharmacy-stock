import { useEffect } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { useLazyGetMedicineSalesQuery } from "../../services/api/medicineSale.api";

import { MEDICINE_SALE_TABLE_COLUMNS } from "./MedicineSale.constants";
import { useStyles } from "./MedicineSale.styles";

export const MedicineSaleList = () => {
  const classes = useStyles();
  const [getMedicineSales, { data: medicineSaleList }] =
    useLazyGetMedicineSalesQuery();

  useEffect(() => {
    getMedicineSales();
  }, [getMedicineSales]);
  return (
    <AdminPageWrapper sectionTitle="Продажи">
      <Box className={classes.dataGridContainer}>
        <DataGrid
          className={classes.dataGrid}
          columns={MEDICINE_SALE_TABLE_COLUMNS}
          disableSelectionOnClick
          rows={medicineSaleList ?? []}
          disableColumnMenu={true}
          getRowId={(row) => row._id}
        />
      </Box>
    </AdminPageWrapper>
  );
};
