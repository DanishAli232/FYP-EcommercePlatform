import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DashboardContext } from "./Dashboard/Context/DashboardContext";
import { ContextState } from "./Context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CheckAuth from "./Auth/CheckAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId='227793295238-gljju5k00hmeo2q6ngsol47u0gicpc42.apps.googleusercontent.com'>
    <React.StrictMode>
      <ContextState>
        <DashboardContext>
          <Router>
            <CheckAuth>
              <React.Fragment>
                <App />
              </React.Fragment>{" "}
            </CheckAuth>{" "}
          </Router>{" "}
        </DashboardContext>{" "}
      </ContextState>{" "}
    </React.StrictMode>{" "}
  </GoogleOAuthProvider>
);
