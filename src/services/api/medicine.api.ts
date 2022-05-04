import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { Optional } from "../../types/common/general.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicines: builder.query<MedicineDto[], void>({
      query: () => ({ url: "medicines" }),
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
  }),
});

export const {
  useLazyGetMedicinesQuery,
  useLazyUpdateMedicineQuery,
  useLazyCalculatePrognosisQuery,
} = medicineApi;
