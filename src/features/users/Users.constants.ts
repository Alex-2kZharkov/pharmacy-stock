import { GridValueGetterParams } from "@mui/x-data-grid";

export const USER_TABLE_COLUMNS = [
  {
    field: "updatedAt",
    headerName: "Дата создания",
    width: 200,
    editable: true,
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
  },
];
