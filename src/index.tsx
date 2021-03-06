import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./features/app";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />{" "}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your store to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
