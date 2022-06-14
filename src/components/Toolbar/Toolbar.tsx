import { ChangeEvent } from "react";

import { ClearOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  Tooltip,
} from "@mui/material";

import { setIsCreateDialogOpen } from "../../features/administrative-purchase/administrativePurchaseSlice";
import {
  selectCurrentPage,
  selectCurrentSearchValue,
  selectIsAddButtonDisabled,
  selectIsSearchFieldDisabled,
  setCurrentSearchValue,
} from "../../features/app/appSlice";
import { setIsCreateDialogOpen as setIsCreateCategoryDialogOpen } from "../../features/category/categorySlice";
import { setIsCreateMedicineDialogOpen } from "../../features/medicine/medicineSlice";
import { setIsCreateUserDialogOpen } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";

import { useStyles } from "./Toolbar.styles";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const currentPage = useAppSelector(selectCurrentPage);
  const currentSearchValue = useAppSelector(selectCurrentSearchValue);
  const isSearchFieldDisabled = useAppSelector(selectIsSearchFieldDisabled);
  const isAddButtonDisabled = useAppSelector(selectIsAddButtonDisabled);

  const handleSearchFieldChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setCurrentSearchValue(e.currentTarget.value));

  const cancelSearch = () => {
    dispatch(setCurrentSearchValue(""));
  };

  const handleAddButtonClick = () => {
    if (currentPage === PagesTypes.EMPLOYEES_PAGE) {
      // eslint-disable-next-line no-console
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
      dispatch(setIsCreateUserDialogOpen(true));
    }

    if (currentPage === PagesTypes.ITEMS_PAGE) {
      dispatch(setIsCreateMedicineDialogOpen(true));
    }

    if (currentPage === PagesTypes.CATEGORY_PAGE) {
      dispatch(setIsCreateCategoryDialogOpen(true));
    }

    if (currentPage === PagesTypes.ADMINISTRATIVE_PURCHASES) {
      dispatch(setIsCreateDialogOpen(true));
    }
  };

  return (
    <>
      <Stack direction="row" mr={3} alignItems="center">
        <FormControl className={classes.formControl} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">
            Поиск по названию...
          </InputLabel>
          <FilledInput
            className={classes.filledInput}
            id="filled-adornment-password"
            value={currentSearchValue}
            onChange={handleSearchFieldChange}
            disabled={isSearchFieldDisabled}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title={currentSearchValue ? "Отменить" : "Найти"}>
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    disabled={isSearchFieldDisabled}
                    onClick={cancelSearch}
                  >
                    {currentSearchValue ? <ClearOutlined /> : <SearchIcon />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
        </FormControl>
        <IconButton
          aria-label="Добавить"
          className={classes.button}
          onClick={handleAddButtonClick}
          disabled={isAddButtonDisabled}
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
