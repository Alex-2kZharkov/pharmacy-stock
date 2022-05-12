import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { BuyMedicineDialogTypes } from "../../features/medicine/components/BuyMedicineDilalog/BuyMedicineDialog.types";
import { Optional } from "../../types/common/general.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicines: builder.query<MedicineDto[], void>({
      query: () => ({ url: "medicines" }),
    }),

    createMedicine: builder.query<undefined, Partial<MedicineDto>>({
      query: (payload) => ({
        url: "medicines",
        method: "POST",
        body: payload,
      }),
    }),

    updateMedicine: builder.query<undefined, Partial<MedicineDto>>({
      query: ({ _id, ...payload }) => ({
        url: `medicines/${_id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    calculatePrognosis: builder.query<{ message: string }, Optional<string>>({
      query: (id) => ({
        url: `medicines/prognosis`,
        method: "POST",
        body: { id },
      }),
    }),

    buyMedicine: builder.query<{ message: string }, BuyMedicineDialogTypes>({
      query: (payload) => ({
        url: `medicine-shippings`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetMedicinesQuery,
  useLazyCreateMedicineQuery,
  useLazyUpdateMedicineQuery,
  useLazyCalculatePrognosisQuery,
  useLazyBuyMedicineQuery,
} = medicineApi;
