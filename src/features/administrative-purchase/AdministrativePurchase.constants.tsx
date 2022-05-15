import { Stack } from "@mui/material";
import {
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { EditButton } from "../../components/EditButton";
import { EntitiesNames } from "../../types/common/general.types";
import { AdministrativePurchaseDto } from "../../types/dto/AdministrativePurchase.dto";

export const ADMINISTRATIVE_PURCHASE_TABLE_COLUMNS: GridColumns = [
  {
    field: "createdAt",
    headerName: "Дата создания",
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
    headerName: "Назначение",
    width: 200,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Затраченная сумма",
    width: 170,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<AdministrativePurchaseDto>) => (
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <div>{row.amount}</div>
        <Stack direction="row">
          <EditButton
            entityName={EntitiesNames.AdministrativePurchase}
            payload={row as AdministrativePurchaseDto}
          />
        </Stack>
      </Stack>
    ),
  },
];
