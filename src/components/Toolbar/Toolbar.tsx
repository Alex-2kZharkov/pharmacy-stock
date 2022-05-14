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
} from "@mui/material";

import { selectCurrentPage } from "../../features/app/appSlice";
import { setIsCreateMedicineDialogOpen } from "../../features/medicine/medicineSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";

import { useStyles } from "./Toolbar.styles";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const currentPage = useAppSelector(selectCurrentPage);

  const handleAddButtonClick = () => {
    if (currentPage === PagesTypes.EMPLOYEES_PAGE) {
      dispatch(setIsCreateMedicineDialogOpen(true));
    }

    if (currentPage === PagesTypes.ITEMS_PAGE) {
      dispatch(setIsCreateMedicineDialogOpen(true));
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
            onChange={() => alert("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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
