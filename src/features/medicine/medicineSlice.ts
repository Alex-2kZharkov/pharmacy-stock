import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Optional } from "../../types/common/general.types";
import { MedicineDto } from "../../types/dto/Medicine.dto";

export interface MedicineState {
  isCreateMedicineDialogOpen: boolean;
  isEditMedicineDialogOpen: boolean;
  isCalculatePrognosisDialogOpen: boolean;
  isBuyMedicineDialogOpen: boolean;
  currentEditableMedicine: Optional<MedicineDto>;
}

const initialState: MedicineState = {
  isCreateMedicineDialogOpen: false,
  isEditMedicineDialogOpen: false,
  isCalculatePrognosisDialogOpen: false,
  isBuyMedicineDialogOpen: false,
  currentEditableMedicine: undefined,
};

export const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    setIsCreateMedicineDialogOpen: (state, { payload }) => {
      state.isCreateMedicineDialogOpen = payload;
    },
    setIsEditMedicineDialogOpen: (state, { payload }) => {
      state.isEditMedicineDialogOpen = payload;
    },
    setIsCalculatePrognosisDialogOpen: (state, { payload }) => {
      state.isCalculatePrognosisDialogOpen = payload;
    },
    setIsBuyMedicineDialogOpen: (state, { payload }) => {
      state.isBuyMedicineDialogOpen = payload;
    },
    setCurrentEditableMedicine: (state, { payload }) => {
      state.currentEditableMedicine = payload;
    },
  },
});

export const {
  setIsCreateMedicineDialogOpen,
  setIsEditMedicineDialogOpen,
  setCurrentEditableMedicine,
  setIsCalculatePrognosisDialogOpen,
  setIsBuyMedicineDialogOpen,
} = medicineSlice.actions;

export const selectIsCreateMedicineDialogOpen = (state: RootState) =>
  state.medicine.isCreateMedicineDialogOpen;

export const selectIsEditMedicineDialogOpen = (state: RootState) =>
  state.medicine.isEditMedicineDialogOpen;

export const selectIsCalculatePrognosisDialogOpen = (state: RootState) =>
  state.medicine.isCalculatePrognosisDialogOpen;

export const selectCurrentEditableMedicine = (state: RootState) =>
  state.medicine.currentEditableMedicine;

export const selectIsBuyMedicineDialogOpen = (state: RootState) =>
  state.medicine.isBuyMedicineDialogOpen;

export const medicineReducer = medicineSlice.reducer;
