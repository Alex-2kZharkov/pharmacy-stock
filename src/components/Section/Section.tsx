import { FC } from "react";

import { Stack, Typography } from "@mui/material";

import { useStyles } from "./Section.styles";

interface Props {
  title: string;
  name: string;
}

export const Section: FC<Props> = ({ title, name }) => {
  const classes = useStyles();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
    >
      <div className={classes.title}>{title}</div>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle2" component="div">
          {name}
        </Typography>
        <div className={classes.avatarContainer}>
          <img
            className={classes.avatar}
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt="Person avatar"
            width="44"
            height="44"
          />
        </div>
      </Stack>
    </Stack>
  );
};
