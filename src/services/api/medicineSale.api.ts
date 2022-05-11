import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { DateFilterString } from "../../types/common/filter.types";
import { MedicineSaleDto } from "../../types/dto/MedicineSale.dto";

export const medicineSaleApi = createApi({
  reducerPath: "medicineSaleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMedicineSales: builder.query<MedicineSaleDto[], DateFilterString>({
      query: ({ dateTo, dateFrom } = {} as DateFilterString) => ({
        url: "medicine-sales",
        params: {
          dateFrom,
          dateTo,
        },
      }),
    }),
  }),
});

export const { useLazyGetMedicineSalesQuery } = medicineSaleApi;
