import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { RootState } from "../../store/store";
import { Item } from "../../types/common/general.types";
import { BudgetDto } from "../../types/dto/Budget.dto";

export const overviewApi = createApi({
  reducerPath: "overviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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

    getMedicineSalesDemand: builder.query<Item[], string>({
      query: (dateFrom) => ({
        url: "medicine-sales/demand-general",
        params: {
          dateFrom: dateFrom ?? "",
        },
      }),
    }),
  }),
});

export const {
  useGetBudgetQuery,
  useLazyGetSalesNumberQuery,
  useLazyGetShippingCostQuery,
  useLazyGetMedicineSalesDemandQuery,
} = overviewApi;
