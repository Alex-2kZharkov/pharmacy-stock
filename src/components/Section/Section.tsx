import { FC } from "react";

import { Stack, Typography } from "@mui/material";

import { selectCurrentUser } from "../../features/app/authSlice";
import { useAppSelector } from "../../store/hooks";
import { Toolbar } from "../Toolbar";

import { useStyles } from "./Section.styles";

interface Props {
  title: string;
}

export const Section: FC<Props> = ({ title }) => {
  const classes = useStyles();
  const { firstName, lastName } = useAppSelector(selectCurrentUser) ?? {};

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
    >
      <div className={classes.title}>{title}</div>
      <Stack direction="row">
        <Toolbar />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2" component="div">
            {`${firstName} ${lastName}`}
          </Typography>
          <div className={classes.avatarContainer}>
            <img
              className={classes.avatar}
              src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
              alt="Person avatar"
              width="44"
              height="44"
            />
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
};
