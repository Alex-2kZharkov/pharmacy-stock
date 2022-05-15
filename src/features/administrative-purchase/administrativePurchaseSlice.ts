import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { AdministrativePurchaseDto } from "../../types/dto/AdministrativePurchase.dto";

export interface UserState {
  isCreateDialogOpen: boolean;
  isUpdateDialogOpen: boolean;
  currentEditablePurchase: Optional<AdministrativePurchaseDto>;
}

const initialState: UserState = {
  isCreateDialogOpen: false,
  isUpdateDialogOpen: false,
  currentEditablePurchase: undefined,
};

export const administrativePurchaseSlice = createSlice({
  name: "administrativePurchase",
  initialState,
  reducers: {
    setIsCreateDialogOpen: (state, { payload }) => {
      state.isCreateDialogOpen = payload;
    },
    setIsUpdateDialogOpen: (state, { payload }) => {
      state.isUpdateDialogOpen = payload;
    },
    setCurrentEditablePurchase: (state, { payload }) => {
      state.currentEditablePurchase = payload;
    },
  },
});

export const {
  setCurrentEditablePurchase,
  setIsCreateDialogOpen,
  setIsUpdateDialogOpen,
} = administrativePurchaseSlice.actions;

export const selectIsCreateDialogOpen = (state: RootState) =>
  state.administrativePurchase.isCreateDialogOpen;

export const selectIsUpdateDialogOpen = (state: RootState) =>
  state.administrativePurchase.isUpdateDialogOpen;

export const selectCurrentEditablePurchase = (state: RootState) =>
  state.administrativePurchase.currentEditablePurchase;

export const administrativePurchaseReducer =
  administrativePurchaseSlice.reducer;
