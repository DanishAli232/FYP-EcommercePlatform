import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DashboardContext } from "./Dashboard/Context/DashboardContext";
import { ContextState } from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextState>
      <DashboardContext>
        <Router>
          <App />
        </Router>{" "}
      </DashboardContext>{" "}
    </ContextState>{" "}
  </React.StrictMode>
);
