import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { appReducer } from "../features/app/appSlice";
import { medicineReducer } from "../features/medicine/medicineSlice";
import { userReducer } from "../features/users/userSlice";
import { userApi } from "../services/api/user.api";

export const store = configureStore({
  reducer: {
    app: appReducer,
    medicine: medicineReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
