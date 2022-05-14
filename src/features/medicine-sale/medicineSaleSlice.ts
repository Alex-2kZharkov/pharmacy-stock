import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

export interface MedicineSaleState {
  isMedicineDemandChartModalOpen: boolean;
}

const initialState: MedicineSaleState = {
  isMedicineDemandChartModalOpen: false,
};

export const medicineSaleSlice = createSlice({
  name: "medicineSale",
  initialState,
  reducers: {
    setIsMedicineDemandChartModalOpen: (state, { payload }) => {
      state.isMedicineDemandChartModalOpen = payload;
    },
  },
});

export const { setIsMedicineDemandChartModalOpen } = medicineSaleSlice.actions;

export const selectIsMedicineDemandChartModalOpen = (state: RootState) =>
  state.medicineSale.isMedicineDemandChartModalOpen;

export const medicineSaleReducer = medicineSaleSlice.reducer;
