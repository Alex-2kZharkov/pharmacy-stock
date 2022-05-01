import { Stack } from "@mui/material";
import {
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import russianLocale from "date-fns/locale/ru";

import { DeleteButton } from "../../components/DeleteButton";
import { EditButton } from "../../components/EditButton";
import { RoleChip } from "../../components/RoleChip";
import { EntitiesNames } from "../../types/common/general.types";
import { UserDto } from "../../types/dto/User.dto";

export const USER_TABLE_COLUMNS: GridColumns = [
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
    field: "firstName",
    headerName: "Имя",
    width: 170,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Фамилия",
    width: 170,
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
    width: 130,
    editable: true,
  },
  {
    field: "description",
    headerName: "Роль",
    width: 250,
    editable: true,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return row.role.description;
    },
    renderCell: ({ row }: GridRenderCellParams<Date>) => (
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <RoleChip role={row.role.name} description={row.role.description} />
        <Stack direction="row">
          <EditButton
            entityName={EntitiesNames.User}
            payload={row as UserDto}
          />
          <DeleteButton payload={row as UserDto} />
        </Stack>
      </Stack>
    ),
  },
];
