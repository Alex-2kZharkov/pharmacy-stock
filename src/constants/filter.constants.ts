import { startOfDay, sub } from "date-fns";

export const PERIODS_ARRAY = [
  "today",
  "yesterday",
  "week",
  "month",
  "quarter",
  "year",
];

export const [TODAY, YESTERDAY, WEEK, MONTH, QUARTER, YEAR] = PERIODS_ARRAY;

export const DATE_PERIODS: { [k: string]: Date } = {
  [TODAY]: startOfDay(new Date()),
  [YESTERDAY]: startOfDay(sub(new Date(), { days: 1 })),
  [WEEK]: startOfDay(sub(new Date(), { weeks: 1 })),
  [MONTH]: startOfDay(sub(new Date(), { months: 1 })),
  [QUARTER]: startOfDay(sub(new Date(), { months: 3 })),
  [YEAR]: startOfDay(sub(new Date(), { years: 1 })),
};
