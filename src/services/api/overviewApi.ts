import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { BudgetDto } from "../../types/dto/Budget.dto";

export const overviewApi = createApi({
  reducerPath: "overviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBudget: builder.query<BudgetDto, void>({
      query: (dateFilter) => ({
        url: "budget",
      }),
    }),
    getShippingCost: builder.query<number, string>({
      query: (dateFilter) => ({
        url: "medicine-shippings/cost",
        params: {
          dateFrom: dateFilter ?? "",
        },
      }),
    }),
    getSalesNumber: builder.query<number, string>({
      query: (dateFilter) => ({
        url: "medicine-sales/profit",
        params: {
          dateFrom: dateFilter ?? "",
        },
      }),
    }),
  }),
});

export const {
  useGetBudgetQuery,
  useLazyGetSalesNumberQuery,
  useLazyGetShippingCostQuery,
} = overviewApi;
