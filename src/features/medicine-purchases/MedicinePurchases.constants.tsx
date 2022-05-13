import { WarningOutlined } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { addDays, format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { ONE_WEEK, TWO_WEEKS } from "../../constants/date.constants";
import { WARNING, ERROR } from "../../theme/colors/colors.constants";
import { MedicineDto } from "../../types/dto/Medicine.dto";

import { SellMedicineButton } from "./components/SellMedicineButton";

export const MEDICINE_PURCHASES_TABLE_COLUMNS = [
  {
    field: "createdAt",
    headerName: "Дата закупки",
    width: 170,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) => {
      return format(new Date(params.value as string), "dd MMMM yyyy HH:mm", {
        locale: russianLocale,
      });
    },
  },
  {
    field: "medicine.name",
    headerName: "Наименование товара",
    width: 250,
    editable: true,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return row.medicine.name;
    },
  },
  {
    field: "quantity",
    headerName: "Остаток на складе",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "medicine.finalAmount",
    headerName: "Стоимость продажи 1 ед.",
    type: "number",
    width: 200,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<MedicineDto>) =>
      row.medicine.finalAmount.toFixed(2),
  },
  {
    field: "expirationDate",
    headerName: "Годен до",
    width: 180,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<Date>) => {
      const formattedDate = format(
        new Date(row.expirationDate as string),
        "dd MMMM yyyy",
        {
          locale: russianLocale,
        }
      );
      const expirationDate = new Date(row.expirationDate as string);
      const isLessOrEqualToWeek =
        expirationDate <= addDays(new Date(), ONE_WEEK) &&
        expirationDate < addDays(new Date(), TWO_WEEKS);

      return row.quantity > 0 &&
        expirationDate <= addDays(new Date(), TWO_WEEKS) ? (
        <>
          <div style={{ marginRight: 8 }}>{formattedDate}</div>
          <Tooltip title="Срок годности товара истекает">
            <WarningOutlined
              style={{ color: isLessOrEqualToWeek ? ERROR : WARNING }}
            />
          </Tooltip>
          <SellMedicineButton medicinePurchase={row} />
        </>
      ) : (
        <>
          {formattedDate}
          <Box style={{ marginRight: 32 }} />
          <SellMedicineButton medicinePurchase={row} />
        </>
      );
    },
  },
];
