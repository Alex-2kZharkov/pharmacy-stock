import { useCallback } from "react";

import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithFallback,
} from "react-error-boundary";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { ErrorFallback } from "../../components/ErrorFallback";
import { theme } from "../../theme/theme";
import { Medicines } from "../medicine";
import { MedicineSaleList } from "../medicine-sale";
import { Overview } from "../overview";
import { UsersPage } from "../users";

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
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/medicine-sales" element={<MedicineSaleList />} />
              <Route path="/medicine-purchases" element={<h1>Hello 2</h1>} />
              <Route path="/employees" element={<UsersPage />} />
              <Route path="/" element={<Medicines />} />{" "}
              <Route path="/" element={<Medicines />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </MuiThemeProvider>
    </>
  );
};
