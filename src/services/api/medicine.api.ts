import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { MedicineDto } from "../../types/dto/medicine.types";

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicines: builder.query<MedicineDto[], void>({
      query: () => ({ url: "medicines" }),
    }),
  }),
});

export const { useLazyGetMedicinesQuery } = medicineApi;
