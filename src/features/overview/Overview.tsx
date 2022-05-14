import { MouseEvent, useState } from "react";

import { Stack } from "@mui/material";

import { AdminPageWrapper } from "../../components/AdminPageWrapper";
import { DateFilter } from "../../components/DateFilter";
import { ItemsChart } from "../../components/ItemsChart";
import { useGetBudgetQuery } from "../../services/api/budget.api";
import { Item } from "../../types/common/general.types";

import { IncomeChart } from "./IncomeChart";
import { Indicator } from "./Indicator";
import { useStyles } from "./Overview.styles";

export const Overview = () => {
  const classes = useStyles();

  const { data: budget } = useGetBudgetQuery();

  const [periodName, setPeriodName] = useState("");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newPeriodName: string
  ) => {
    setPeriodName(newPeriodName);
  };

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
        <Indicator title="Расход" number={16} />
        <Indicator title="Продано" number={43} />
      </Stack>
      <Stack
        sx={{ marginTop: 2 }}
        direction="row"
        spacing={4}
        alignItems="center"
      >
        <IncomeChart />
        <ItemsChart items={[] as Item[]} />
      </Stack>
    </AdminPageWrapper>
  );
};
