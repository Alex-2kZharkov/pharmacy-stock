import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { Item } from "../../types/common/general.types";
import { MedicineSaleDto } from "../../types/dto/MedicineSale.dto";

export const medicineSaleApi = createApi({
  reducerPath: "medicineSaleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicineSales: builder.query<MedicineSaleDto[], string>({
      query: (dateFilter) => ({
        url: "medicine-sales",
        params: {
          dateFrom: dateFilter ?? "",
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
