import { WarningOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { addDays, format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { TWO_WEEKS } from "../../constants/date.constants";
import { WARNING } from "../../theme/colors/colors.constants";
import { MedicineDto } from "../../types/dto/Medicine.dto";

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
    width: 140,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<Date>) => {
      const formattedDate = format(
        new Date(row.expirationDate as string),
        "dd MMMM yyyy",
        {
          locale: russianLocale,
        }
      );

      return new Date(row.expirationDate as string) <=
        addDays(new Date(), TWO_WEEKS) ? (
        <>
          <div style={{ marginRight: 8 }}>{formattedDate}</div>
          <Tooltip title="Срок годности товара истекает">
            <WarningOutlined style={{ color: WARNING }} />
          </Tooltip>
        </>
      ) : (
        formattedDate
      );
    },
  },
];
