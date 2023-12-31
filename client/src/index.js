import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import ErrorBoundry from "./HOC/ErrsorBoundary/ErrorBoundary";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
