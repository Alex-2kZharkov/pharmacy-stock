import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { administrativePurchaseReducer } from "../features/administrative-purchase/administrativePurchaseSlice";
import { appReducer } from "../features/app/appSlice";
import { authReducer } from "../features/app/authSlice";
import { categoryReducer } from "../features/category/categorySlice";
import { medicinePurchaseReducer } from "../features/medicine-purchases/medicinePurchaseSlice";
import { medicineSaleReducer } from "../features/medicine-sale/medicineSaleSlice";
import { medicineReducer } from "../features/medicine/medicineSlice";
import { recommendationReducer } from "../features/recommendation/recommendationSlice";
import { userReducer } from "../features/users/userSlice";
import { administrativePurchaseApi } from "../services/api/administrativePurchase.api";
import { categoriesApi } from "../services/api/category.api";
import { medicineApi } from "../services/api/medicine.api";
import { medicinePurchaseApi } from "../services/api/medicinePurchases.api";
import { medicineSaleApi } from "../services/api/medicineSale.api";
import { overviewApi } from "../services/api/overview.api";
import { recommendationApi } from "../services/api/recommendation.api";
import { userApi } from "../services/api/user.api";

export const store = configureStore({
  reducer: {
    app: appReducer,
    category: categoryReducer,
    auth: authReducer,
    user: userReducer,
    medicine: medicineReducer,
    medicinePurchase: medicinePurchaseReducer,
    medicineSale: medicineSaleReducer,
    recommendation: recommendationReducer,
    administrativePurchase: administrativePurchaseReducer,
    [userApi.reducerPath]: userApi.reducer,
    [medicineApi.reducerPath]: medicineApi.reducer,
    [medicinePurchaseApi.reducerPath]: medicinePurchaseApi.reducer,
    [medicineSaleApi.reducerPath]: medicineSaleApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [recommendationApi.reducerPath]: recommendationApi.reducer,
    [administrativePurchaseApi.reducerPath]: administrativePurchaseApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      medicineApi.middleware,
      medicinePurchaseApi.middleware,
      medicineSaleApi.middleware,
      overviewApi.middleware,
      recommendationApi.middleware,
      administrativePurchaseApi.middleware,
      categoriesApi.middleware
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
