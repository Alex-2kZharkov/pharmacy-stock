import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { CategoryDto } from "../../types/dto/Category.dto";

export interface CategoryState {
  isCreateDialogOpen: boolean;
  isUpdateDialogOpen: boolean;
  currentEditableCategory: Optional<CategoryDto>;
}

const initialState: CategoryState = {
  isCreateDialogOpen: false,
  isUpdateDialogOpen: false,
  currentEditableCategory: undefined,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setIsCreateDialogOpen: (state, { payload }) => {
      state.isCreateDialogOpen = payload;
    },
    setIsUpdateDialogOpen: (state, { payload }) => {
      state.isUpdateDialogOpen = payload;
    },
    setCurrentEditableCategory: (state, { payload }) => {
      state.currentEditableCategory = payload;
    },
  },
});

export const {
  setCurrentEditableCategory,
  setIsCreateDialogOpen,
  setIsUpdateDialogOpen,
} = categorySlice.actions;

export const selectIsCreateDialogOpen = (state: RootState) =>
  state.category.isCreateDialogOpen;

export const selectIsUpdateDialogOpen = (state: RootState) =>
  state.category.isUpdateDialogOpen;

export const selectCurrentEditablePurchase = (state: RootState) =>
  state.category.currentEditableCategory;

export const categoryReducer = categorySlice.reducer;
