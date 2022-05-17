import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { SellMedicineDialogTypes } from "../../features/medicine-purchases/components/SellMedicineDilalog/SellMedicineDialog.types";
import { RootState } from "../../store/store";
import { MedicinePurchaseDto } from "../../types/dto/MedicinePurchase.dto";

export const medicinePurchaseApi = createApi({
  reducerPath: "medicinePurchaseApi",
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
    getMedicinePurchases: builder.query<
      MedicinePurchaseDto[],
      { dateFilter: string; name: string }
    >({
      query: ({ dateFilter, name }) => ({
        url: "medicine-shippings",
        params: {
          dateFrom: dateFilter ?? "",
          name,
        },
      }),
    }),

    createMedicineSale: builder.query<undefined, SellMedicineDialogTypes>({
      query: (payload) => ({
        url: "medicine-sales",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetMedicinePurchasesQuery,
  useLazyCreateMedicineSaleQuery,
} = medicinePurchaseApi;
