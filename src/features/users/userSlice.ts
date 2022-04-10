import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

export interface UserState {
  isCreationDialogOpen: boolean;
}

const initialState: UserState = {
  isCreationDialogOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeCreationDialogVisibility: (state, { payload }) => {
      state.isCreationDialogOpen = payload;
    },
  },
});

export const { changeCreationDialogVisibility } = userSlice.actions;

export const selectIsCreationDialogOpen = (state: RootState) =>
  state.user.isCreationDialogOpen;

export const userReducer = userSlice.reducer;
