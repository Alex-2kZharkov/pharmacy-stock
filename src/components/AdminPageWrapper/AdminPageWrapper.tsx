import { FC } from "react";

import { Stack } from "@mui/material";

import { Section } from "../Section/Section";
import { SectionCard } from "../Section/SectionCard/SectionCard";
import { Sidebar } from "../Sidebar/Sidebar";

interface Props {
  sectionTitle: string;
}
export const AdminPageWrapper: FC<Props> = ({ sectionTitle, children }) => {
  return (
    <Stack direction="row">
      <Sidebar />
      <SectionCard>
        <Section title={sectionTitle} />
        {children}
      </SectionCard>
    </Stack>
  );
};
