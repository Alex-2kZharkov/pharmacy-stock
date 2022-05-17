import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { CategoryDto } from "../../types/dto/Category.dto";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
  useLazyGetCategoriesQuery,
  useLazyUpdateCategoryQuery,
  useLazyCreateCategoryQuery,
} = categoriesApi;
