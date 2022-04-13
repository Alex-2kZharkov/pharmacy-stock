import { useCallback } from "react";

import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithFallback,
} from "react-error-boundary";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { ErrorFallback } from "../../components/ErrorFallback";
import { theme } from "../../theme/theme";
import { MedicinesList } from "../medicine/MedicinesList";
import { Overview } from "../overview/Overview";
import { UsersPage } from "../users/UsersPage";

export const App = () => {
  const handleDefaultError: ErrorBoundaryPropsWithFallback["onError"] =
    useCallback((error) => {
      // eslint-disable-next-line no-console
      console.error(`Error [BOUNDARY] ${JSON.stringify(error)}`);
    }, []);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={handleDefaultError}
          >
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/medicines" element={<MedicinesList />} />
              <Route path="/employees" element={<UsersPage />} />
              <Route path="/" element={<MedicinesList />} />{" "}
              <Route path="/" element={<MedicinesList />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </MuiThemeProvider>
    </>
  );
};
