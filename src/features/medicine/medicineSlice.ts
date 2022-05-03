import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";

export interface MedicineState {
  isEditOrderPointDialogOpen: boolean;
  currentEditableMedicine: Optional<MedicineDto>;
}

const initialState: MedicineState = {
  isEditOrderPointDialogOpen: false,
  currentEditableMedicine: undefined,
};

export const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    setIsEditOrderPointDialogOpen: (state, { payload }) => {
      state.isEditOrderPointDialogOpen = payload;
    },
    setCurrentEditableMedicine: (state, { payload }) => {
      state.currentEditableMedicine = payload;
    },
  },
});

export const { setIsEditOrderPointDialogOpen, setCurrentEditableMedicine } =
  medicineSlice.actions;

export const selectIsEditOrderPointDialogOpen = (state: RootState) =>
  state.medicine.isEditOrderPointDialogOpen;

export const selectCurrentEditableMedicine = (state: RootState) =>
  state.medicine.currentEditableMedicine;

export const medicineReducer = medicineSlice.reducer;
