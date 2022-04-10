import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper/AdminPageWrapper";
import { useGetUsersQuery } from "../../services/api/user.api";
import { useStyles } from "../medicine/Medicines.styles";

import { USER_TABLE_COLUMNS } from "./Users.constants";

export const UsersList = () => {
  const classes = useStyles();
  const { data: usersList } = useGetUsersQuery();

  return (
    <AdminPageWrapper sectionTitle="Сотрудники">
      <Box className={classes.dataGridContainer}>
        <DataGrid
          className={classes.dataGrid}
          rows={usersList ?? []}
          columns={USER_TABLE_COLUMNS}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          disableColumnMenu={true}
        />
      </Box>
    </AdminPageWrapper>
  );
};