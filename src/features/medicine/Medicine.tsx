import { Stack } from "@mui/material";

import { Section } from "../../components/Section/Section";
import { SectionCard } from "../../components/Section/SectionCard/SectionCard";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Indicator } from "../overview/Indicator/Indicator";

export const Medicine = () => {
  return (
    <Stack direction="row">
      <Sidebar />{" "}
      <SectionCard>
        <Section title="Лекарства" name="Александр Жарков" />
        <Stack direction="row" spacing={4}>
          <Indicator title="Продано" number={60} />{" "}
          <Indicator title="Куплено" number={16} />
          <Indicator title="Остаток" number={43} />
          <Indicator title="Продано" number={64} />
        </Stack>
      </SectionCard>
    </Stack>
  );
};
