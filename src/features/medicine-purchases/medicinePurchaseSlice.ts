import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { MedicinePurchaseDto } from "../../types/dto/MedicinePurchase.dto";

export interface MedicinePurchaseState {
  isSellMedicineDialogOpen: boolean;
  currentEditableMedicinePurchase: Optional<MedicinePurchaseDto>;
}

const initialState: MedicinePurchaseState = {
  isSellMedicineDialogOpen: false,
  currentEditableMedicinePurchase: undefined,
};

export const medicinePurchaseSlice = createSlice({
  name: "medicinePurchase",
  initialState,
  reducers: {
    setIsSellMedicineDialogOpen: (state, { payload }) => {
      state.isSellMedicineDialogOpen = payload;
    },
    setCurrentEditableMedicine: (state, { payload }) => {
      state.currentEditableMedicinePurchase = payload;
    },
  },
});

export const { setIsSellMedicineDialogOpen, setCurrentEditableMedicine } =
  medicinePurchaseSlice.actions;

export const selectCurrentEditableMedicine = (state: RootState) =>
  state.medicinePurchase.currentEditableMedicinePurchase;

export const selectIsSellMedicineDialogOpen = (state: RootState) =>
  state.medicinePurchase.isSellMedicineDialogOpen;

export const medicinePurchaseReducer = medicinePurchaseSlice.reducer;
