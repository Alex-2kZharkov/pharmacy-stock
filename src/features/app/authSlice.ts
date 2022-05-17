import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { UserDto } from "../../types/dto/User.dto";

interface AuthState {
  user: UserDto | null;
  token: string | null;
}

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: UserDto; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;

export const authReducer = slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
