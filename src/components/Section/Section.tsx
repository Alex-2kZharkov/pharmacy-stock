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
      sx={{ width: "100%" }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle2" component="div">
          {name}
        </Typography>
        <div className={classes.avatarContainer}>
          <img
            className={classes.avatar}
            src="https://ied.eu/wp-content/uploads/2018/04/entrepreneur-1.jpg"
            alt="Person avatar"
            width="44"
            height="44"
          />
        </div>
      </Stack>
    </Stack>
  );
};
