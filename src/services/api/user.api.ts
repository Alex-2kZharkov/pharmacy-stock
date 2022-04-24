import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/host.constants";
import { Optional } from "../../types/common/general.types";
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
  }),
});

export const {
  useLazyGetUsersQuery,
  useLazyCreateUserQuery,
  useLazyUpdateUserQuery,
  useLazyDeleteUserQuery,
} = userApi;
