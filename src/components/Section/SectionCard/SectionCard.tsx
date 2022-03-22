import { FC } from "react";

import { Card } from "@mui/material";

import { useStyles } from "./SectionCard.styles";

export const SectionCard: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Card sx={{ background: "#F7F8FC" }} className={classes.card}>
      {children}
    </Card>
  );
};
