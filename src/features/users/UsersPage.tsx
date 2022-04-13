import { useEffect } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AdminPageWrapper } from "../../components/AdminPageWrapper/AdminPageWrapper";
import { useGetUsersQuery } from "../../services/api/user.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";
import { setCurrentPage } from "../app/appSlice";

import { UserDialog } from "./UserDialog/UserDialog";
import { selectIsUserDialogOpen, setIsUserDialogOpen } from "./userSlice";
import { USER_TABLE_COLUMNS } from "./UsersPage.constants";
import { useStyles } from "./UsersPage.styles";

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { data: usersList } = useGetUsersQuery();
  const isUserDialogOpen = useAppSelector(selectIsUserDialogOpen);

  const handleDialogClosed = () => dispatch(setIsUserDialogOpen(false));

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

      <UserDialog isOpen={isUserDialogOpen} onClose={handleDialogClosed} />
    </>
  );
};
