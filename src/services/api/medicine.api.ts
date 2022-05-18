import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { BuyMedicineDialogTypes } from "../../features/medicine/components/BuyMedicineDilalog/BuyMedicineDialog.types";
import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";

export const medicineApi = createApi({
  reducerPath: "medicineApi",
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
    getMedicines: builder.query<
      MedicineDto[],
      { dateFilter: string; name: string; categoryFilter: string }
    >({
      query: ({ dateFilter, name, categoryFilter }) => ({
        url: "medicines",
        params: { name, dateFrom: dateFilter, categoryFilter },
      }),
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
