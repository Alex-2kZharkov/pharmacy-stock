import { GridValueFormatterParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

export const MEDICINE_TABLE_COLUMNS = [
  {
    field: "updatedAt",
    headerName: "Дата изменения",
    width: 200,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) => {
      return format(new Date(params.value as string), "HH:mm, dd MMMM yyyy", {
        locale: russianLocale,
      });
    },
  },
  {
    field: "name",
    headerName: "Наименование",
    width: 200,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Количество",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Общая сумма",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "singleAmount",
    headerName: "Стоимость единицы",
    type: "number",
    width: 200,
    editable: true,
  },
];
