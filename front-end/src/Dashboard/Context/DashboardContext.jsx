import { Box } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const DashboardGlobalContext = React.createContext();

export const DashboardContext = ({ children }) => {
  const [navcontent, setnavcontent] = useState("Dashboard");
  const [status, setstatus] = useState("admin");

  return (
    <DashboardGlobalContext.Provider
      value={{ navcontent, setnavcontent, status, setstatus }}
    >
      {children}
    </DashboardGlobalContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardGlobalContext);
