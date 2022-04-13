import { Stack } from "@mui/material";

import { AdminPageWrapper } from "../../components/AdminPageWrapper/AdminPageWrapper";

import { IncomeChart } from "./IncomeChart";
import { Indicator } from "./Indicator/Indicator";
import { Example } from "./ItemsChart";

export const Overview = () => {
  return (
    <AdminPageWrapper sectionTitle="Главная">
      <Stack direction="row" spacing={4} justifyContent="stretch">
        <Indicator title="Прибыль" number={60} />{" "}
        <Indicator title="Расход" number={16} />
        <Indicator title="Объем проданных товаров" number={43} />
      </Stack>
      <Stack
        sx={{ marginTop: 2 }}
        direction="row"
        spacing={4}
        alignItems="center"
      >
        <IncomeChart />
      </Stack>
      <Example />
    </AdminPageWrapper>
  );
};
