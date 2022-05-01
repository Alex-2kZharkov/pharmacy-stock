import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { MedicineSaleDto } from "../../types/dto/MedicineSale.dto";

export const medicineSaleApi = createApi({
  reducerPath: "medicineSaleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicineSales: builder.query<MedicineSaleDto[], void>({
      query: () => ({ url: "medicine-sales" }),
    }),
  }),
});

export const { useLazyGetMedicineSalesQuery } = medicineSaleApi;
