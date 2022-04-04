import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { theme } from "../../theme/theme";
import { Medicine } from "../medicine/Medicine";
import { Overview } from "../overview/Overview";

export const App = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Overview />} />
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
