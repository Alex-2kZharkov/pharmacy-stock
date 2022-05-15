import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { SellMedicineDialogTypes } from "../../features/medicine-purchases/components/SellMedicineDilalog/SellMedicineDialog.types";
import { MedicinePurchaseDto } from "../../types/dto/MedicinePurchase.dto";

export const medicinePurchaseApi = createApi({
  reducerPath: "medicinePurchaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
