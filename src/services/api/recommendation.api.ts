import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { RecommendationDto } from "../../types/dto/Recommendation.dto";

export const recommendationApi = createApi({
  reducerPath: "recommendationApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
