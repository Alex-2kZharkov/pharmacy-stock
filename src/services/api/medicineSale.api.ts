import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { RootState } from "../../store/store";
import { Item } from "../../types/common/general.types";
import { MedicineSaleDto } from "../../types/dto/MedicineSale.dto";

export const medicineSaleApi = createApi({
  reducerPath: "medicineSaleApi",
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
    getMedicineSales: builder.query<
      MedicineSaleDto[],
      { dateFilter: string; name: string }
    >({
      query: ({ dateFilter, name }) => ({
        url: "medicine-sales",
        params: {
          dateFrom: dateFilter ?? "",
          name,
        },
      }),
    }),

    getMedicineSalesDemand: builder.query<
      Item[],
      { dateFrom: string; id: string }
    >({
      query: ({ dateFrom, id }) => ({
        url: "medicine-sales/demand",
        params: {
          dateFrom: dateFrom ?? "",
          id,
        },
      }),
    }),
  }),
});

export const {
  useLazyGetMedicineSalesQuery,
  useLazyGetMedicineSalesDemandQuery,
} = medicineSaleApi;
