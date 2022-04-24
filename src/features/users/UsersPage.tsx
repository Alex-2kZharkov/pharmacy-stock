import { useEffect } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import {
  useGetUsersQuery,
  useLazyCreateUserQuery,
} from "../../services/api/user.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";
import { setCurrentPage } from "../app/appSlice";

import { UserDialog } from "./UserDialog";
import {
  selectCurrentEditableUser,
  selectIsCreateUserDialogOpen,
  selectIsUpdateUserDialogOpen,
  setIsCreateUserDialogOpen,
  setIsUpdateUserDialogOpen,
} from "./userSlice";
import { USER_TABLE_COLUMNS } from "./UsersPage.constants";
import { useStyles } from "./UsersPage.styles";

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const isCreateDialogOpen = useAppSelector(selectIsCreateUserDialogOpen);
  const isUpdateDialogOpen = useAppSelector(selectIsUpdateUserDialogOpen);
  const currentEditableUser = useAppSelector(selectCurrentEditableUser);

  const { data: usersList } = useGetUsersQuery();
  const [createUser] = useLazyCreateUserQuery();

  const handleCreateDialogClosed = () =>
    dispatch(setIsCreateUserDialogOpen(false));

  const handleUpdateDialogClosed = () =>
    dispatch(setIsUpdateUserDialogOpen(false));

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.EMPLOYEES_PAGE));
  }, [dispatch]);

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
        isOpen={isCreateDialogOpen}
        onClose={handleCreateDialogClosed}
        confirm={createUser}
      />
      <UserDialog
        isOpen={isUpdateDialogOpen}
        onClose={handleUpdateDialogClosed}
        confirm={createUser}
        user={currentEditableUser}
      />
    </>
  );
};
