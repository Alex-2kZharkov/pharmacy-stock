import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";

export interface MedicineState {
  isEditOrderPointDialogOpen: boolean;
  isCalculatePrognosisDialogOpen: boolean;
  currentEditableMedicine: Optional<MedicineDto>;
}

const initialState: MedicineState = {
  isEditOrderPointDialogOpen: false,
  isCalculatePrognosisDialogOpen: false,
  currentEditableMedicine: undefined,
};

export const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    setIsEditOrderPointDialogOpen: (state, { payload }) => {
      state.isEditOrderPointDialogOpen = payload;
    },
    setIsCalculatePrognosisDialogOpen: (state, { payload }) => {
      state.isCalculatePrognosisDialogOpen = payload;
    },
    setCurrentEditableMedicine: (state, { payload }) => {
      state.currentEditableMedicine = payload;
    },
  },
});

export const {
  setIsEditOrderPointDialogOpen,
  setCurrentEditableMedicine,
  setIsCalculatePrognosisDialogOpen,
} = medicineSlice.actions;

export const selectIsEditOrderPointDialogOpen = (state: RootState) =>
  state.medicine.isEditOrderPointDialogOpen;

export const selectIsCalculatePrognosisDialogOpen = (state: RootState) =>
  state.medicine.isCalculatePrognosisDialogOpen;

export const selectCurrentEditableMedicine = (state: RootState) =>
  state.medicine.currentEditableMedicine;

export const medicineReducer = medicineSlice.reducer;
