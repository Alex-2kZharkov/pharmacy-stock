import { MouseEvent, useEffect, useState } from "react";

import { CircularProgress, Stack } from "@mui/material";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { ItemsChart } from "../../components/ItemsChart";
import { DATE_PERIODS } from "../../constants/filter.constants";
import {
  FULL_SCREEN_CHART_WIDTH,
  OVERVIEW_CHART_HEIGHT,
  PARTIAL_SCREEN_CHART_WIDTH,
} from "../../constants/size.constants";
import {
  useGetBudgetQuery,
  useLazyGetMedicineSalesDemandQuery,
  useLazyGetSalesNumberQuery,
  useLazyGetShippingCostQuery,
} from "../../services/api/overview.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ACCENT } from "../../theme/colors/colors.constants";
import { PagesTypes } from "../../types/common/pages.types";
import { selectIsSideBarExpanded, setCurrentPage } from "../app/appSlice";

import { Indicator } from "./Indicator";
import { useStyles } from "./Overview.styles";

export const Overview = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isSideBarExpanded = useAppSelector(selectIsSideBarExpanded);

  const { data: budget } = useGetBudgetQuery();
  const [getShippingCost, { data: shippingCost }] =
    useLazyGetShippingCostQuery();
  const [getSalesNumber, { data: salesNumber }] = useLazyGetSalesNumberQuery();
  const [
    getMedicineSalesDemand,
    { data: salesList, isFetching: isListFetching },
  ] = useLazyGetMedicineSalesDemandQuery();

  const [periodName, setPeriodName] = useState("");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };
  useEffect(() => {
    dispatch(setCurrentPage(PagesTypes.OVERVIEW_PAGE));
  }, [dispatch]);

  useEffect(() => {
    const date = DATE_PERIODS[periodName]?.toISOString();
    getSalesNumber(date);
    getShippingCost(date);
    getMedicineSalesDemand(date);
  }, [getMedicineSalesDemand, getSalesNumber, getShippingCost, periodName]);

  return (
    <AdminPageWrapper sectionTitle="Главная">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        className={classes.dateFilterContainer}
        spacing={2}
      >
        <DateFilter value={periodName} onChange={handleChange} />
        <Indicator title="Бюджет" number={budget?.amount ?? 0} />
        <Indicator title="Расход" number={shippingCost ?? 0} />
        <Indicator title="Продано ед." number={salesNumber ?? 0} />
      </Stack>
      <Stack
        sx={{ marginTop: 2 }}
        direction="row"
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        {isListFetching ? (
          <CircularProgress
            style={{ marginTop: 150, color: ACCENT }}
            size={150}
          />
        ) : (
          <ItemsChart
            items={salesList}
            width={
              isSideBarExpanded
                ? PARTIAL_SCREEN_CHART_WIDTH
                : FULL_SCREEN_CHART_WIDTH
            }
            height={OVERVIEW_CHART_HEIGHT}
          />
        )}
      </Stack>
    </AdminPageWrapper>
  );
};
