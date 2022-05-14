import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { PagesTypes } from "../../types/common/pages.types";

export interface AppState {
  currentPage: PagesTypes;
  isSidebarExpanded: boolean;
}

const initialState: AppState = {
  currentPage: PagesTypes.OVERVIEW_PAGE,
  isSidebarExpanded: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setIsSidebarExpanded: (state, { payload }) => {
      state.isSidebarExpanded = payload;
    },
  },
});

export const { setCurrentPage, setIsSidebarExpanded } = appSlice.actions;

export const selectCurrentPage = (state: RootState) => state.app.currentPage;
export const selectIsSideBarExpanded = (state: RootState) =>
  state.app.isSidebarExpanded;

export const appReducer = appSlice.reducer;
