import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { medicineReducer } from "../features/medicine/medicineSlice";

export const store = configureStore({
  reducer: {
    medicine: medicineReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
