import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { theme } from "../../theme/theme";
import { Medicine } from "../medicine/Medicine";

export const App = () => {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Sidebar />} />
            <Route path="/medicines" element={<Medicine />} />
            <Route path="/employees" element={<Medicine />} />
            <Route path="/" element={<Medicine />} />{" "}
            <Route path="/" element={<Medicine />} />
          </Routes>
        </Router>
      </MuiThemeProvider>
    </>
  );
};
