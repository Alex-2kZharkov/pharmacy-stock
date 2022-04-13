import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { UserDto } from "../../types/dto/user.types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserDto[], void>({
      query: () => ({ url: "users" }),
    }),

    createUser: builder.query<UserDto, UserDto>({
      query: (body) => ({ url: "users", method: "POST", body }),
    }),
  }),
});

export const { useGetUsersQuery, useLazyCreateUserQuery } = userApi;
