import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { appReducer } from "../features/app/appSlice";
import { medicineReducer } from "../features/medicine/medicineSlice";
import { userReducer } from "../features/users/userSlice";
import { medicineApi } from "../services/api/medicine.api";
import { medicineSaleApi } from "../services/api/medicineSale.api";
import { userApi } from "../services/api/user.api";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    medicine: medicineReducer,
    [userApi.reducerPath]: userApi.reducer,
    [medicineApi.reducerPath]: medicineApi.reducer,
    [medicineSaleApi.reducerPath]: medicineSaleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      medicineApi.middleware,
      medicineSaleApi.middleware
    ),
});

export interface ActionCreator {
  payload: unknown;
  type: string;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
