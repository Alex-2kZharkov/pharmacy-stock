import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { RootState } from "../../store/store";
import { RecommendationDto } from "../../types/dto/Recommendation.dto";

export const recommendationApi = createApi({
  reducerPath: "recommendationApi",
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
    getRecommendations: builder.query<
      RecommendationDto[],
      { dateFilter: string; name: string }
    >({
      query: ({ dateFilter, name }) => ({
        url: "recommendations",
        params: {
          dateFrom: dateFilter ?? "",
          name,
        },
      }),
    }),
  }),
});

export const { useLazyGetRecommendationsQuery } = recommendationApi;
