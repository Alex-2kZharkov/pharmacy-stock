import { FC } from "react";

import { Stack } from "@mui/material";

import { useStyles } from "./Indicator.styles";

interface Props {
  title: string;
  number: number;
}

export const Indicator: FC<Props> = ({ title, number }) => {
  const classes = useStyles();

  return (
    <Stack className={classes.root} alignItems="center">
      <div className={classes.title}>{title}</div>
      <div className={classes.digit}> {number} </div>
    </Stack>
  );
};
