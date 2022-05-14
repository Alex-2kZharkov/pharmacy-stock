import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { MedicineSaleDto } from "../../types/dto/MedicineSale.dto";

export interface MedicineSaleState {
  isMedicineDemandChartModalOpen: boolean;
  currentMedicineSale?: MedicineSaleDto;
}

const initialState: MedicineSaleState = {
  isMedicineDemandChartModalOpen: false,
  currentMedicineSale: undefined,
};

export const medicineSaleSlice = createSlice({
  name: "medicineSale",
  initialState,
  reducers: {
    setIsMedicineDemandChartModalOpen: (state, { payload }) => {
      state.isMedicineDemandChartModalOpen = payload;
    },
    setCurrentMedicineSale: (state, { payload }) => {
      state.currentMedicineSale = payload;
    },
  },
});

export const { setIsMedicineDemandChartModalOpen, setCurrentMedicineSale } =
  medicineSaleSlice.actions;

export const selectIsMedicineDemandChartModalOpen = (state: RootState) =>
  state.medicineSale.isMedicineDemandChartModalOpen;

export const selectCurrentMedicineSale = (state: RootState) =>
  state.medicineSale.currentMedicineSale;

export const medicineSaleReducer = medicineSaleSlice.reducer;
