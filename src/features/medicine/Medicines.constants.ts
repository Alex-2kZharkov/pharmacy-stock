import { GridValueFormatterParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

export const MEDICINE_TABLE_COLUMNS = [
  {
    field: "updatedAt",
    headerName: "Дата изменения",
    width: 170,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) => {
      return format(new Date(params.value as string), "dd MMMM yyyy HH:mm", {
        locale: russianLocale,
      });
    },
  },
  {
    field: "name",
    headerName: "Наименование",
    width: 170,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Остаток на складе",
    type: "number",
    width: 170,
    editable: true,
  },
  {
    field: "primaryAmount",
    headerName: "Стоимость покупки 1 ед.",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "finalAmount",
    headerName: "Стоимость продажи 1 ед.",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "percent",
    headerName: "% добавленной стоимости",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "soldItemsForMonth",
    headerName: "Продано на текущий месяц",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "nextMonthPrognosis",
    headerName: "Прогноризуемый спрос",
    type: "number",
    width: 200,
    editable: true,
  },
];
