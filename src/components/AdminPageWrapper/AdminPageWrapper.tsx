import { FC } from "react";

import { Stack } from "@mui/material";

import { BACKGROUND_ACCENT } from "../../theme/colors/colors.constants";
import { Section } from "../Section";
import { SectionCard } from "../Section/SectionCard";
import { Sidebar } from "../Sidebar";

interface Props {
  sectionTitle: string;
}
export const AdminPageWrapper: FC<Props> = ({ sectionTitle, children }) => {
  return (
    <Stack direction="row" style={{ backgroundColor: BACKGROUND_ACCENT }}>
      <Sidebar />
      <SectionCard>
        <Section title={sectionTitle} />
        {children}
      </SectionCard>
    </Stack>
  );
};
