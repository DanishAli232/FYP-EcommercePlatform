import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DashboardContext } from "./Dashboard/Context/DashboardContext";
import { ContextState } from "./Context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CheckAuth from "./Auth/CheckAuth";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { TransactionsProvider } from "./Context/TransactionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId='227793295238-gljju5k00hmeo2q6ngsol47u0gicpc42.apps.googleusercontent.com'>
    <React.StrictMode>
      <Router>
        <ContextState>
          <TransactionsProvider>
            <DashboardContext>
              <CheckAuth>
                <React.Fragment>
                  <PayPalScriptProvider deferLoading={true}>
                    <App />
                  </PayPalScriptProvider>{" "}
                </React.Fragment>{" "}
              </CheckAuth>{" "}
            </DashboardContext>{" "}
          </TransactionsProvider>{" "}
        </ContextState>{" "}
      </Router>{" "}
    </React.StrictMode>{" "}
  </GoogleOAuthProvider>
);
