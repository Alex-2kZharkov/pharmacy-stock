import { MouseEvent, useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { RecommendationModal } from "../../components/RecommendationModal";
import { DATE_PERIODS } from "../../constants/filter.constants";
import { DEBOUNCE_TIME } from "../../constants/size.constants";
import { useLazyGetRecommendationsQuery } from "../../services/api/recommendation.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PagesTypes } from "../../types/common/pages.types";
import { selectCurrentSearchValue, setCurrentPage } from "../app/appSlice";

import { RECOMMENDATION_TABLE_COLUMNS } from "./Recommendation.constants";
import { useStyles } from "./Recommendation.styles";
import {
  selectCurrentRecommendationText,
  selectIsRecommendationModalOpen,
  setIsRecommendationModalOpen,
} from "./recommendationSlice";

export const Recommendation = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const currentSearchValue = useAppSelector(selectCurrentSearchValue);
  const currentRecommendationText = useAppSelector(
    selectCurrentRecommendationText
  );
  const isRecommendationModalOpen = useAppSelector(
    selectIsRecommendationModalOpen
  );

  const [getRecommendations, { data: recommendationList }] =
    useLazyGetRecommendationsQuery();

  const [periodName, setPeriodName] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.RECOMMENDATIONS_PAGE));
  }, [dispatch]);

  useEffect(() => {
    const debouncedRequest = debounce(getRecommendations, DEBOUNCE_TIME);

    debouncedRequest({
      dateFilter: DATE_PERIODS[periodName]?.toISOString(),
      name: currentSearchValue,
    });
  }, [periodName, getRecommendations, currentSearchValue]);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };

  const handleRecommendationModalClose = () =>
    dispatch(setIsRecommendationModalOpen(false));

  return (
    <>
      <AdminPageWrapper sectionTitle="Рекомендации">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.dateFilterContainer}
        >
          <DateFilter value={periodName} onChange={handleChange} />
          <Typography variant="h6">
            Всего записей: {recommendationList?.length ?? 0}
          </Typography>
        </Stack>
        <Box className={classes.dataGridContainer}>
          <DataGrid
            className={classes.dataGrid}
            columns={RECOMMENDATION_TABLE_COLUMNS}
            disableSelectionOnClick
            rows={recommendationList ?? []}
            disableColumnMenu={true}
            getRowId={(row) => row._id}
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
      </AdminPageWrapper>

      <RecommendationModal
        isOpen={isRecommendationModalOpen}
        onClose={handleRecommendationModalClose}
        message={currentRecommendationText}
      />
    </>
  );
};
