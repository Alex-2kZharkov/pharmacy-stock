import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { MedicinePurchaseDto } from "../../types/dto/MedicinePurchase.dto";

export const medicinePurchaseApi = createApi({
  reducerPath: "medicinePurchaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicinePurchases: builder.query<MedicinePurchaseDto[], string>({
      query: (dateFilter) => ({
        url: "medicine-shippings",
        params: {
          dateFrom: dateFilter ?? "",
        },
      }),
    }),
  }),
});

export const { useLazyGetMedicinePurchasesQuery } = medicinePurchaseApi;
