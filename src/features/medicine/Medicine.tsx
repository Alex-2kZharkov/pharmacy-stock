import { Stack } from "@mui/material";

import { Section } from "../../components/Section/Section";
import { SectionCard } from "../../components/Section/SectionCard/SectionCard";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const Medicine = () => {
  return (
    <Stack direction="row">
      <Sidebar />{" "}
      <SectionCard>
        <Section title="Лекарства" name="Александр Жарков" />
      </SectionCard>
    </Stack>
  );
};
