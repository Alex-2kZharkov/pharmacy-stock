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
import { CategoryDto } from "../../types/dto/Category.dto";

export const CATEGORY_TABLE_COLUMNS: GridColumns = [
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
    headerName: "Название категории",
    width: 550,
    editable: true,
    renderCell: ({ row }: GridRenderCellParams<CategoryDto>) => (
      <Stack direction="row" alignItems="center">
        <div style={{ width: 120 }}>{row.name}</div>
        <Stack direction="row">
          <EditButton
            entityName={EntitiesNames.Category}
            payload={row as CategoryDto}
          />
        </Stack>
      </Stack>
    ),
  },
];
