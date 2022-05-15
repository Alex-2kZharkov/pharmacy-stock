import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { PagesTypes } from "../../types/common/pages.types";

export interface AppState {
  currentPage: PagesTypes;
  isSidebarExpanded: boolean;
  currentSearchValue: string;
  isSearchFieldDisabled: boolean;
  isAddButtonDisabled: boolean;
}

const initialState: AppState = {
  currentPage: PagesTypes.OVERVIEW_PAGE,
  isSidebarExpanded: true,
  currentSearchValue: "",
  isSearchFieldDisabled: true,
  isAddButtonDisabled: true,
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
    setCurrentSearchValue: (state, { payload }) => {
      state.currentSearchValue = payload;
    },
  },
});

export const { setCurrentPage, setIsSidebarExpanded, setCurrentSearchValue } =
  appSlice.actions;

export const selectCurrentPage = (state: RootState) => state.app.currentPage;

export const selectIsSideBarExpanded = (state: RootState) =>
  state.app.isSidebarExpanded;

export const selectCurrentSearchValue = (state: RootState) =>
  state.app.currentSearchValue;

export const selectIsSearchFieldDisabled = (state: RootState) =>
  [PagesTypes.OVERVIEW_PAGE, PagesTypes.RECOMMENDATIONS_PAGE].includes(
    state.app.currentPage
  );

export const selectIsAddButtonDisabled = (state: RootState) =>
  [
    PagesTypes.OVERVIEW_PAGE,
    PagesTypes.PURCHASES_PAGE,
    PagesTypes.SALES_PAGE,
    PagesTypes.RECOMMENDATIONS_PAGE,
  ].includes(state.app.currentPage);

export const appReducer = appSlice.reducer;
