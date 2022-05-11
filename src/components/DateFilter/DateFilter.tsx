import { FC, MouseEvent } from "react";

import { ToggleButtonGroup, ToggleButton, Divider } from "@mui/material";

import {
  TODAY,
  YESTERDAY,
  WEEK,
  MONTH,
  QUARTER,
  YEAR,
} from "../../constants/filter.constants";

import { useStyles } from "./DateFilter.styles";

interface Props {
  value: string;
  onChange: (event: MouseEvent<HTMLElement>, periodName: string) => void;
}

export const DateFilter: FC<Props> = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      className={classes.dateFilterContainer}
    >
      <ToggleButton value={TODAY} className={classes.button}>
        Сегодня
      </ToggleButton>
      <Divider orientation="vertical" flexItem />
      <ToggleButton value={YESTERDAY} className={classes.button}>
        Вчера
      </ToggleButton>
      <Divider orientation="vertical" flexItem />
      <ToggleButton value={WEEK} className={classes.button}>
        Неделя
      </ToggleButton>
      <Divider orientation="vertical" flexItem />
      <ToggleButton value={MONTH} className={classes.button}>
        Месяц
      </ToggleButton>
      <Divider orientation="vertical" flexItem />
      <ToggleButton value={QUARTER} className={classes.button}>
        Квартал
      </ToggleButton>
      <Divider orientation="vertical" flexItem />
      <ToggleButton value={YEAR} className={classes.button}>
        Год
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
