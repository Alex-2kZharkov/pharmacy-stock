import { Stack } from "@mui/material";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { DemandButton } from "../../components/DemanButton";
import { EditButton } from "../../components/EditButton";
import { EntitiesNames } from "../../types/common/general.types";
import { UserDto } from "../../types/dto/User.dto";

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
  },
  {
    field: "orderPoint",
    headerName: "Точка заказа",
    type: "number",
    width: 110,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<Date>) => (
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <div>{row.orderPoint}</div>
        <EditButton
          entityName={EntitiesNames.User}
          payload={row as UserDto}
          tooltipText="Редактировать точку заказа"
        />
      </Stack>
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
