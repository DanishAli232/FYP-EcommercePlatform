import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DashboardContext } from "./Dashboard/Context/DashboardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DashboardContext>
      <Router>
        <App />
      </Router>{" "}
    </DashboardContext>{" "}
  </React.StrictMode>
);
