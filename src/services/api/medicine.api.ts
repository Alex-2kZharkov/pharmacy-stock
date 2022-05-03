import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { MedicineDto } from "../../types/dto/Medicine.dto";

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicines: builder.query<MedicineDto[], void>({
      query: () => ({ url: "medicines" }),
    }),

    updateOrderPoint: builder.query<undefined, Partial<MedicineDto>>({
      query: ({ _id, ...payload }) => ({
        url: `medicines/order-point/${_id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useLazyGetMedicinesQuery, useLazyUpdateOrderPointQuery } =
  medicineApi;
