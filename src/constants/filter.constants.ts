import { endOfDay, startOfDay, sub } from "date-fns";

import { DateFilterType } from "../types/common/filter.types";

export const PERIODS_ARRAY = [
  "today",
  "yesterday",
  "week",
  "month",
  "quarter",
  "year",
];

export const [TODAY, YESTERDAY, WEEK, MONTH, QUARTER, YEAR] = PERIODS_ARRAY;

export const DATE_PERIODS: { [k: string]: DateFilterType } = {
  [TODAY]: {
    dateFrom: startOfDay(new Date()),
    dateTo: endOfDay(new Date()),
  },
  [YESTERDAY]: {
    dateFrom: startOfDay(sub(new Date(), { days: 1 })),
    dateTo: endOfDay(sub(new Date(), { days: 1 })),
  },
  [WEEK]: {
    dateFrom: startOfDay(sub(new Date(), { weeks: 1 })),
    dateTo: endOfDay(sub(new Date(), { weeks: 1 })),
  },
  [MONTH]: {
    dateFrom: startOfDay(sub(new Date(), { months: 1 })),
    dateTo: endOfDay(sub(new Date(), { months: 1 })),
  },
  [QUARTER]: {
    dateFrom: startOfDay(sub(new Date(), { months: 3 })),
    dateTo: endOfDay(sub(new Date(), { months: 3 })),
  },
  [YEAR]: {
    dateFrom: startOfDay(sub(new Date(), { years: 1 })),
    dateTo: endOfDay(sub(new Date(), { years: 1 })),
  },
};
