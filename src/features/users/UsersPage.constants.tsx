import {
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { RoleChip } from "../../components/RoleChip/RoleChip";

export const USER_TABLE_COLUMNS: GridColumns = [
  {
    field: "createdAt",
    headerName: "Дата создания",
    width: 200,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) => {
      return format(new Date(params.value as string), "HH:mm, dd MMMM yyyy", {
        locale: russianLocale,
      });
    },
  },
  {
    field: "firstName",
    headerName: "Имя",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Фамилия",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Телефон",
    width: 200,
    editable: true,
  },
  {
    field: "description",
    headerName: "Роль",
    width: 200,
    editable: true,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return row.role.description;
    },
    renderCell: ({ row }: GridRenderCellParams<Date>) => (
      <RoleChip role={row.role.name} description={row.role.description} />
    ),
  },
];
