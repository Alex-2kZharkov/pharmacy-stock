import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { PagesTypes } from "../../types/common/pages.types";

export interface AppState {
  currentPage: PagesTypes;
}

const initialState: AppState = {
  currentPage: PagesTypes.OVERVIEW_PAGE,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export const { setCurrentPage } = appSlice.actions;

export const selectCurrentPage = (state: RootState) => state.app.currentPage;

export const appReducer = appSlice.reducer;
