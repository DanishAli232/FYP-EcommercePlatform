import { Box } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const GlobalContext = React.createContext();

export const ContextState = ({ children }) => {
  const [dashboardOpen, setdashboardOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        dashboardOpen,
        setdashboardOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
