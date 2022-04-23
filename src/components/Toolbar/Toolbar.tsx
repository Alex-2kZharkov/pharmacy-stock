import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, IconButton, Stack } from "@mui/material";

import { selectCurrentPage } from "../../features/app/appSlice";
import { setIsCreateUserDialogOpen } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";

import { useStyles } from "./Toolbar.styles";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const currentPage = useAppSelector(selectCurrentPage);

  const handleAddButtonClick = () => {
    if (currentPage === PagesTypes.EMPLOYEES_PAGE) {
      dispatch(setIsCreateUserDialogOpen(true));
    }
  };

  return (
    <>
      <Stack direction="row" mr={3}>
        <IconButton aria-label="Поиск" className={classes.button}>
          <SearchIcon className={classes.icon} />
        </IconButton>
        <IconButton
          aria-label="Добавить"
          className={classes.button}
          onClick={handleAddButtonClick}
        >
          <AddIcon className={classes.icon} />
        </IconButton>
      </Stack>
      <Divider
        className={classes.divider}
        orientation="vertical"
        variant="middle"
        flexItem
      />
    </>
  );
};
