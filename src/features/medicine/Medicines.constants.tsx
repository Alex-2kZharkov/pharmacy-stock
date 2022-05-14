import { WarningOutlined } from "@mui/icons-material";
import { Stack, Tooltip } from "@mui/material";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { DemandButton } from "../../components/DemanButton";
import { ERROR } from "../../theme/colors/colors.constants";
import { MedicineDto } from "../../types/dto/Medicine.dto";

import { BuyMedicineButton } from "./components/BuyMedicineButton";
import { EditOrderPointButton } from "./components/EditMedicineButton";

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
        <>
          <Tooltip title="Количества товара на складе меньше Точки заказа. Закупите больше товара">
            <WarningOutlined style={{ color: ERROR }} />
          </Tooltip>
          <div style={{ marginLeft: 8 }}>{row.quantity}</div>
        </>
      ) : (
        row.quantity
      ),
  },
  {
    field: "orderPoint",
    headerName: "Точка заказа",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "primaryAmount",
    headerName: "Стоимость покупки 1 ед.",
    type: "number",
    width: 200,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<MedicineDto>) =>
      row.primaryAmount.toFixed(2),
  },
  {
    field: "percent",
    headerName: "% добавленной стоимости",
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
    renderCell: ({ row }: GridRenderCellParams<MedicineDto>) =>
      row.finalAmount.toFixed(2),
  },
  {
    field: "profitPerUnit",
    headerName: "Прибыль от продажи 1 ед.",
    type: "number",
    width: 210,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<MedicineDto>) =>
      (row.finalAmount - row.primaryAmount).toFixed(2),
  },

  {
    field: "prognosisUpdatedAt",
    headerName: "Дата расчета последнего прогноза",
    width: 170,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) => {
      return params.value
        ? format(new Date(params.value as string), "dd MMMM yyyy HH:mm", {
            locale: russianLocale,
          })
        : "";
    },
  },
  {
    field: "prognosis",
    headerName: "Прогноризуемый спрос",
    type: "number",
    width: 200,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<MedicineDto>) => (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <div>{row.prognosis}</div>
        <DemandButton medicine={row} />
        <EditOrderPointButton medicine={row} />
        <BuyMedicineButton medicine={row} />
      </Stack>
    ),
  },
];
