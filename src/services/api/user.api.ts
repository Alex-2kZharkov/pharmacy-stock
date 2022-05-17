import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { UserDto } from "../../types/dto/User.dto";

export const userApi = createApi({
  reducerPath: "userApi",
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
    getUsers: builder.query<UserDto[], void>({
      query: () => ({ url: "users" }),
    }),

    createUser: builder.query<UserDto, UserDto>({
      query: (body) => ({ url: "users", method: "POST", body }),
    }),

    updateUser: builder.query<UserDto, UserDto>({
      query: (payload) => ({
        url: `users/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteUser: builder.query<undefined, Optional<string>>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        _id: Optional<string>,
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "getUsers",
            undefined,
            (draft: UserDto[]) => {
              const index = draft.findIndex((user) => user._id === _id);
              draft.splice(index, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    login: builder.query<
      { access_token: string; user: { _doc: UserDto } },
      { username: string; password: string }
    >({
      query: (payload) => ({
        url: `auth/login`,
        method: "POST",
        body: payload,
      }),
    }),

    getUser: builder.query<UserDto[], string>({
      query: (id) => ({ url: `users/${id}` }),
    }),
  }),
});
export const {
  useLazyGetUsersQuery,
  useLazyCreateUserQuery,
  useLazyUpdateUserQuery,
  useLazyDeleteUserQuery,
  useLazyLoginQuery,
  useLazyGetUserQuery,
} = userApi;
