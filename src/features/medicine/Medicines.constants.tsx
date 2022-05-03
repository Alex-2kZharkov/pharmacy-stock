import { Chip, Stack } from "@mui/material";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { DemandButton } from "../../components/DemanButton";
import { WARNING, WHITE } from "../../theme/colors/colors.constants";
import { MedicineDto } from "../../types/dto/Medicine.dto";

import { EditOrderPointButton } from "./components/EditOrderPointButton";

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
    headerName: "Наименование товара",
    width: 250,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Остаток на складе",
    type: "number",
    width: 150,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<Date>) =>
      row.quantity < row.orderPoint ? (
        <Chip
          style={{ backgroundColor: WARNING, color: WHITE, fontWeight: 700 }}
          label={row.quantity}
        />
      ) : (
        row.orderPoint
      ),
  },
  {
    field: "orderPoint",
    headerName: "Точка заказа",
    type: "number",
    width: 110,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<MedicineDto>) => (
      <EditOrderPointButton medicine={row} />
    ),
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
    field: "soldForMonth",
    headerName: "Продано на текущий месяц",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "prognosis",
    headerName: "Прогноризуемый спрос",
    type: "number",
    width: 200,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<Date>) => (
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <div>{row.prognosis}</div>
        <DemandButton />
      </Stack>
    ),
  },
];
