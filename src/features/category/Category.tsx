import { MouseEvent, useEffect, useState } from "react";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { DEBOUNCE_TIME } from "../../constants/size.constants";
import {
  useLazyCreateCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyUpdateCategoryQuery,
} from "../../services/api/category.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ACCENT } from "../../theme/colors/colors.constants";
import { PagesTypes } from "../../types/common/pages.types";
import { selectCurrentSearchValue, setCurrentPage } from "../app/appSlice";

import { CATEGORY_TABLE_COLUMNS } from "./Category.constants";
import { useStyles } from "./Category.styles";
import { CategoryDialog } from "./CategoryDialog";
import {
  selectCurrentEditablePurchase,
  selectIsCreateDialogOpen,
  selectIsUpdateDialogOpen,
  setIsCreateDialogOpen,
  setIsUpdateDialogOpen,
} from "./categorySlice";

export const Category = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isCreateDialogOpen = useAppSelector(selectIsCreateDialogOpen);
  const isUpdateDialogOpen = useAppSelector(selectIsUpdateDialogOpen);
  const currentEditableCategory = useAppSelector(selectCurrentEditablePurchase);
  const currentSearchValue = useAppSelector(selectCurrentSearchValue);

  const [getCategories, { data: categoriesList }] = useLazyGetCategoriesQuery();
  const [createCategory, { isFetching: isCreationFetching }] =
    useLazyCreateCategoryQuery();
  const [updateCategory, { isFetching: isUpdateFetching }] =
    useLazyUpdateCategoryQuery();

  const [periodName, setPeriodName] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.ADMINISTRATIVE_PURCHASES));
  }, [dispatch]);

  useEffect(() => {
    const debouncedRequest = debounce(getCategories, DEBOUNCE_TIME);

    debouncedRequest({
      dateFilter: DATE_PERIODS[periodName]?.toISOString(),
      name: currentSearchValue,
    });
  }, [
    getCategories,
    periodName,
    currentSearchValue,
    isCreationFetching,
    isUpdateFetching,
  ]);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };

  const handleCreateDialogClosed = () => dispatch(setIsCreateDialogOpen(false));

  const handleUpdateDialogClosed = () => dispatch(setIsUpdateDialogOpen(false));

  return (
    <>
      <AdminPageWrapper sectionTitle="Категории товаров">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.dateFilterContainer}
        >
          <DateFilter value={periodName} onChange={handleChange} />
          <Typography variant="h6">
            Всего записей: {categoriesList?.length ?? 0}
          </Typography>
        </Stack>
        {!categoriesList ? (
          <Stack
            sx={{ marginTop: 2 }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress
              style={{ marginTop: 150, color: ACCENT }}
              size={150}
            />
          </Stack>
        ) : (
          <Box className={classes.dataGridContainer}>
            <DataGrid
              className={classes.dataGrid}
              rows={categoriesList ?? []}
              columns={CATEGORY_TABLE_COLUMNS}
              disableSelectionOnClick
              getRowId={(row) => row._id}
              disableColumnMenu={true}
              components={{
                // eslint-disable-next-line react/no-multi-comp
                NoRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Нет данных
                  </Stack>
                ),
              }}
            />
          </Box>
        )}
      </AdminPageWrapper>

      <CategoryDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCreateDialogClosed}
        confirm={createCategory}
      />
      <CategoryDialog
        isOpen={isUpdateDialogOpen}
        onClose={handleUpdateDialogClosed}
        confirm={updateCategory}
        category={currentEditableCategory}
      />
    </>
  );
};
