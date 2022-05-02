import {
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

export const MEDICINE_SALE_TABLE_COLUMNS = [
  {
    field: "createdAt",
    headerName: "Дата продажи",
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
    headerName: "Объем продажи",
    type: "number",
    width: 170,
    editable: true,
  },
  {
    field: "amountPerUnit",
    headerName: "Стоимость 1 ед.",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "totalAmount",
    headerName: "Суммарная стоимость продажи",
    type: "number",
    width: 250,
    editable: true,
  },
];
