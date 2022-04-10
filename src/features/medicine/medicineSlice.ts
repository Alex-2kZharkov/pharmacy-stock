import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { MedicineDto } from "../../types/dto/medicine.types";

export interface MedicineState {
  medicines: MedicineDto[];
}

const initialState: MedicineState = {
  medicines: [],
};

export const medicineSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.medicines.push(payload);
    },
  },
});

export const { add } = medicineSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.medicine.medicines;

export const medicineReducer = medicineSlice.reducer;
