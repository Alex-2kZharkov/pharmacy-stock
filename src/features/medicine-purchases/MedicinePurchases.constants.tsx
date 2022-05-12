import {
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

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
    valueFormatter: (params: GridValueFormatterParams) => {
      return format(new Date(params.value as string), "dd MMMM yyyy", {
        locale: russianLocale,
      });
    },
    // renderCell: ({ row }: GridRenderCellParams<Date>) =>
    //   row.quantity < row.orderPoint ? (
    //     <>
    //       <Tooltip title="Количества товара на складе меньше Точки заказа. Закупите больше товара">
    //         <WarningOutlined style={{ color: WARNING }} />
    //       </Tooltip>
    //       <div style={{ marginLeft: 8 }}>{row.quantity}</div>
    //     </>
    //   ) : (
    //     row.quantity
    //   ),
  },
];
