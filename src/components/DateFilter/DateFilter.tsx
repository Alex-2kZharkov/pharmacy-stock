import { useState, MouseEvent } from "react";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { endOfDay, startOfDay, sub } from "date-fns";

import { useStyles } from "./DateFilter.styles";

export const DateFilter = () => {
  const classes = useStyles();
  const [period, setPeriod] = useState("");
  const [today, yesterday, week, month, quarter, year] = [
    "today",
    "yesterday",
    "week",
    "month",
    "quarter",
    "year",
  ];

  const periods = {
    [today]: {
      dateFrom: startOfDay(new Date()),
      dateTo: endOfDay(new Date()),
    },
    [yesterday]: {
      dateFrom: startOfDay(sub(new Date(), { days: 1 })),
      dateTo: endOfDay(sub(new Date(), { days: 1 })),
    },
    [week]: {
      dateFrom: startOfDay(sub(new Date(), { weeks: 1 })),
      dateTo: endOfDay(sub(new Date(), { weeks: 1 })),
    },
    [month]: {
      dateFrom: startOfDay(sub(new Date(), { months: 1 })),
      dateTo: endOfDay(sub(new Date(), { months: 1 })),
    },
    [quarter]: {
      dateFrom: startOfDay(sub(new Date(), { months: 3 })),
      dateTo: endOfDay(sub(new Date(), { months: 3 })),
    },
    [year]: {
      dateFrom: startOfDay(sub(new Date(), { years: 1 })),
      dateTo: endOfDay(sub(new Date(), { years: 1 })),
    },
  };

  const handleChange = (event: MouseEvent<HTMLElement>, periodName: string) => {
    // eslint-disable-next-line no-console
    console.log(periodName, periods[periodName]);
    setPeriod(periodName);
  };

  return (
    <ToggleButtonGroup
      value={period}
      exclusive
      onChange={handleChange}
      className={classes.dateFilterContainer}
    >
      <ToggleButton value={today} className={classes.inactiveButton}>
        Сегодня
      </ToggleButton>
      <ToggleButton value={yesterday} className={classes.inactiveButton}>
        Вчера
      </ToggleButton>
      <ToggleButton value={week} className={classes.inactiveButton}>
        Неделя
      </ToggleButton>
      <ToggleButton value={month} className={classes.inactiveButton}>
        Месяц
      </ToggleButton>
      <ToggleButton value={quarter} className={classes.inactiveButton}>
        Квартал
      </ToggleButton>
      <ToggleButton value={year} className={classes.inactiveButton}>
        Год
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
