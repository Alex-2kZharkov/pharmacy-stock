import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

export interface UserState {
  isUserDialogOpen: boolean;
}

const initialState: UserState = {
  isUserDialogOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsUserDialogOpen: (state, { payload }) => {
      state.isUserDialogOpen = payload;
    },
  },
});

export const { setIsUserDialogOpen } = userSlice.actions;

export const selectIsUserDialogOpen = (state: RootState) =>
  state.user.isUserDialogOpen;

export const userReducer = userSlice.reducer;
