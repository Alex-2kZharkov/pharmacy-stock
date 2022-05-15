import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { AdministrativePurchaseDto } from "../../types/dto/AdministrativePurchase.dto";

export const administrativePurchase = createApi({
  reducerPath: "administrativePurchase",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAdministrativePurchase: builder.query<
      AdministrativePurchaseDto[],
      { dateFilter: string; name: string }
    >({
      query: ({ dateFilter, name }) => ({
        url: "users",
        params: {
          dateFrom: dateFilter ?? "",
          name,
        },
      }),
    }),

    createUserAdministrativePurchase: builder.query<
      AdministrativePurchaseDto,
      AdministrativePurchaseDto
    >({
      query: (body) => ({
        url: "administrative-purchases",
        method: "POST",
        body,
      }),
    }),

    updateUserAdministrativePurchase: builder.query<
      AdministrativePurchaseDto,
      AdministrativePurchaseDto
    >({
      query: (payload) => ({
        url: `administrative-purchases/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});
export const {
  useLazyCreateUserAdministrativePurchaseQuery,
  useLazyGetAdministrativePurchaseQuery,
  useLazyUpdateUserAdministrativePurchaseQuery,
} = administrativePurchase;
