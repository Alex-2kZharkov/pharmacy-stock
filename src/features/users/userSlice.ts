import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { UserDto } from "../../types/dto/user.types";

export interface UserState {
  isCreateUserDialogOpen: boolean;
  isUpdateUserDialogOpen: boolean;
  currentEditableUser: Optional<UserDto>;
}

const initialState: UserState = {
  isCreateUserDialogOpen: false,
  isUpdateUserDialogOpen: false,
  currentEditableUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsCreateUserDialogOpen: (state, { payload }) => {
      state.isCreateUserDialogOpen = payload;
    },
    setIsUpdateUserDialogOpen: (state, { payload }) => {
      state.isUpdateUserDialogOpen = payload;
    },
    setCurrentEditableUser: (state, { payload }) => {
      state.currentEditableUser = payload;
    },
  },
});

export const {
  setIsCreateUserDialogOpen,
  setIsUpdateUserDialogOpen,
  setCurrentEditableUser,
} = userSlice.actions;

export const selectIsCreateUserDialogOpen = (state: RootState) =>
  state.user.isCreateUserDialogOpen;

export const selectIsUpdateUserDialogOpen = (state: RootState) =>
  state.user.isUpdateUserDialogOpen;

export const selectCurrentEditableUser = (state: RootState) =>
  state.user.currentEditableUser;

export const userReducer = userSlice.reducer;
