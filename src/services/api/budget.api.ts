import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { BudgetDto } from "../../types/dto/Budget.dto";

export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBudget: builder.query<BudgetDto, void>({
      query: (dateFilter) => ({
        url: "budget",
      }),
    }),
  }),
});

export const { useGetBudgetQuery } = budgetApi;
