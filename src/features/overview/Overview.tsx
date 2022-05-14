import { MouseEvent, useEffect, useState } from "react";

import { Stack } from "@mui/material";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { ItemsChart } from "../../components/ItemsChart";
import { DATE_PERIODS } from "../../constants/filter.constants";
import {
  useGetBudgetQuery,
  useLazyGetSalesNumberQuery,
  useLazyGetShippingCostQuery,
} from "../../services/api/overviewApi";
import { Item } from "../../types/common/general.types";

import { Indicator } from "./Indicator";
import { useStyles } from "./Overview.styles";

export const Overview = () => {
  const classes = useStyles();

  const { data: budget } = useGetBudgetQuery();
  const [getShippingCost, { data: shippingCost }] =
    useLazyGetShippingCostQuery();
  const [getSalesNumber, { data: salesNumber }] = useLazyGetSalesNumberQuery();

  const [periodName, setPeriodName] = useState("");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };

  useEffect(() => {
    getSalesNumber(DATE_PERIODS[periodName]?.toISOString());
    getShippingCost(DATE_PERIODS[periodName]?.toISOString());
  }, [getSalesNumber, getShippingCost, periodName]);

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
      >
        <ItemsChart items={[] as Item[]} />
      </Stack>
    </AdminPageWrapper>
  );
};
