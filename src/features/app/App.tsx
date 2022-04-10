import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { theme } from "../../theme/theme";
import { MedicinesList } from "../medicine/MedicinesList";
import { Overview } from "../overview/Overview";
import { UsersPage } from "../users/UsersPage";

export const App = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/medicines" element={<MedicinesList />} />
            <Route path="/employees" element={<UsersPage />} />
            <Route path="/" element={<MedicinesList />} />{" "}
            <Route path="/" element={<MedicinesList />} />
          </Routes>
        </Router>
      </MuiThemeProvider>
    </>
  );
};
