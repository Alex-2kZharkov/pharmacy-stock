import { useCallback, useEffect } from "react";

import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { isEmpty } from "lodash";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithFallback,
} from "react-error-boundary";
import { Routes, Route, useNavigate } from "react-router-dom";

import { ErrorFallback } from "../../components/ErrorFallback";
import { LOCAL_STORAGE_CURRENT_USER_PROPERTY } from "../../constants/names.constants";
import { useLazyGetUserQuery } from "../../services/api/user.api";
import { useAppDispatch } from "../../store/hooks";
import { theme } from "../../theme/theme";
import { AdministrativePurchase } from "../administrative-purchase";
import { Login } from "../login";
import { Medicines } from "../medicine";
import { MedicinePurchases } from "../medicine-purchases";
import { MedicineSale } from "../medicine-sale";
import { Overview } from "../overview";
import { Recommendation } from "../recommendation";
import { UsersPage } from "../users";

import { setCredentials } from "./authSlice";

export const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [getUser] = useLazyGetUserQuery();

  const handleDefaultError: ErrorBoundaryPropsWithFallback["onError"] =
    useCallback((error) => {
      // eslint-disable-next-line no-console
      console.error(`Error [BOUNDARY] ${JSON.stringify(error)}`);
    }, []);

  useEffect(() => {
    const startApp = async () => {
      const currentUser = localStorage.getItem(
        LOCAL_STORAGE_CURRENT_USER_PROPERTY
      );
      const parsedCurrentCredentials = JSON.parse(currentUser ?? "{}");
      if (!isEmpty(parsedCurrentCredentials)) {
        try {
          await getUser(parsedCurrentCredentials._id).unsubscribe();
          dispatch(setCredentials(parsedCurrentCredentials));
        } catch {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    startApp();
  }, [dispatch, getUser, navigate]);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={handleDefaultError}
        >
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/medicine-sales" element={<MedicineSale />} />
            <Route path="/medicine-purchases" element={<MedicinePurchases />} />
            <Route
              path="//administrative-purchases"
              element={<AdministrativePurchase />}
            />
            <Route path="/employees" element={<UsersPage />} />
            <Route path="/recommendations" element={<Recommendation />} />
          </Routes>
        </ErrorBoundary>
      </MuiThemeProvider>
    </>
  );
};
