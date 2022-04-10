import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, IconButton, Stack } from "@mui/material";

import { useStyles } from "./Toolbar.styles";

export const Toolbar = () => {
  const classes = useStyles();

  return (
    <>
      <Stack direction="row" mr={3}>
        <IconButton aria-label="Поиск" className={classes.button}>
          <SearchIcon className={classes.icon} />
        </IconButton>
        <IconButton aria-label="Добавить" className={classes.button}>
          <AddIcon className={classes.icon} />
        </IconButton>
      </Stack>
      <Divider
        className={classes.divider}
        orientation="vertical"
        variant="middle"
        flexItem
      />
    </>
  );
};
