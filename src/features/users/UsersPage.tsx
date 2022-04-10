import { useState } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper/AdminPageWrapper";
import { useGetUsersQuery } from "../../services/api/user.api";
import { useStyles } from "../medicine/Medicines.styles";

import { UserDialog } from "./UserDialog/UserDialog";
import { USER_TABLE_COLUMNS } from "./UsersPage.constants";

export const UsersPage = () => {
  const classes = useStyles();
  const { data: usersList } = useGetUsersQuery();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpened = () => setIsDialogOpen(true);

  const handleDialogClosed = () => setIsDialogOpen(false);

  return (
    <>
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

      <UserDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClosed}
        onSubmit={handleDialogOpened}
      />
    </>
  );
};
