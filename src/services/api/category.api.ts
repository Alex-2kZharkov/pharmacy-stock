import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { RootState } from "../../store/store";
import { CategoryDto } from "../../types/dto/Category.dto";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
    getCategories: builder.query<
      CategoryDto[],
      { dateFilter: string; name: string }
    >({
      query: ({ dateFilter, name }) => ({
        url: "categories",
        params: {
          dateFrom: dateFilter ?? "",
          name,
        },
      }),
    }),

    createCategory: builder.query<CategoryDto, CategoryDto>({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
      }),
    }),

    updateCategory: builder.query<CategoryDto, CategoryDto>({
      query: (payload) => ({
        url: `categories/${payload._id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useLazyUpdateCategoryQuery,
  useLazyCreateCategoryQuery,
} = categoriesApi;
