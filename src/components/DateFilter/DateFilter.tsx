import { useState, MouseEvent } from "react";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import { useStyles } from "./DateFilter.styles";

export const DateFilter = () => {
  const classes = useStyles();
  const [alignment, setAlignment] = useState("");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      className={classes.dateFilterContainer}
    >
      <ToggleButton value="web" className={classes.inactiveButton}>
        Сегодня
      </ToggleButton>
      <ToggleButton value="android" className={classes.inactiveButton}>
        Вчера
      </ToggleButton>
      <ToggleButton value="ios1" className={classes.inactiveButton}>
        Неделя
      </ToggleButton>
      <ToggleButton value="ios2" className={classes.inactiveButton}>
        Месяц
      </ToggleButton>
      <ToggleButton value="ios3" className={classes.inactiveButton}>
        Квартал
      </ToggleButton>
      <ToggleButton value="ios4" className={classes.inactiveButton}>
        Год
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
