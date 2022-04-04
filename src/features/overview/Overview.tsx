import { Stack } from "@mui/material";

import { AdminPageWrapper } from "../../components/AdminPageWrapper/AdminPageWrapper";

import { Indicator } from "./Indicator/Indicator";

export const Overview = () => {
  return (
    <AdminPageWrapper sectionTitle="Обзор">
      <Stack direction="row" spacing={4}>
        <Indicator title="Продано" number={60} />{" "}
        <Indicator title="Куплено" number={16} />
        <Indicator title="Остаток" number={43} />
        <Indicator title="Продано" number={64} />
      </Stack>
    </AdminPageWrapper>
  );
};
